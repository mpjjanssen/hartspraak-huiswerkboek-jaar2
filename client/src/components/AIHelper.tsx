import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Loader2, ThumbsUp, ThumbsDown, Trash2, Check, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useEncryption } from "@/contexts/EncryptionContext";
import { encryptData, decryptData } from "@/lib/encryption";

interface AIHelperProps {
  questionTitle: string;
  questionId: string;
  workshopId: string;
  context?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  feedback?: 'positive' | 'negative' | null;
}

export function AIHelper({ questionTitle, questionId, workshopId, context }: AIHelperProps) {
  const storageKey = `hartspraak-ai-${workshopId}-${questionId}`;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set());
  const { encryptionKey, isReady } = useEncryption();
  useEffect(() => {
    console.log('[AIHelper Debug] Status:', { isReady, hasEncryptionKey: !!encryptionKey, workshopId, questionId });
  }, [isReady, encryptionKey, workshopId, questionId]);


  const toggleMessage = (index: number) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Load conversation from server (or localStorage as fallback)
  useEffect(() => {
    if (!isReady || !encryptionKey) return;

    const loadConversation = async () => {
      try {
        // Try to load from server first
        const authToken = sessionStorage.getItem('auth_token');
        if (authToken) {
          const response = await fetch(`/api/user-data/conversations/${workshopId}/${questionId}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.messagesEncrypted && data.encryptionIv) {
              // Try to decrypt
              const decrypted = decryptData(data.messagesEncrypted, data.encryptionIv, encryptionKey);
              if (decrypted) {
                try {
                  const parsedMessages = JSON.parse(decrypted);
                  setMessages(parsedMessages);
                  return;
                } catch (parseError) {
                  console.warn('[AIHelper] Failed to parse decrypted messages:', parseError);
                  // Fall through to localStorage fallback
                }
              } else {
                console.warn('[AIHelper] Decryption returned null, falling back to localStorage');
                // Fall through to localStorage fallback
              }
            }
          }
        }

        // Fallback to localStorage
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          try {
            const parsedMessages = JSON.parse(saved);
            setMessages(parsedMessages);
          } catch (error) {
            console.error('[AIHelper] Failed to parse saved messages:', error);
          }
        }
      } catch (error) {
        console.error('[AIHelper] Failed to load conversation:', error);
        // Fallback to localStorage
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          try {
            const parsedMessages = JSON.parse(saved);
            setMessages(parsedMessages);
          } catch (error) {
            console.error('[AIHelper] Failed to parse saved messages:', error);
          }
        }
      }
    };

    loadConversation();
  }, [workshopId, questionId, storageKey, encryptionKey, isReady]);

  // Save conversation to localStorage and server
  useEffect(() => {
    if (messages.length === 0 || !isReady || !encryptionKey) return;

    const saveConversation = async () => {
      console.log('[AIHelper] Starting sync...');
      setSyncStatus('syncing');
      
      // Save to localStorage (unencrypted for now, for backwards compatibility)
      localStorage.setItem(storageKey, JSON.stringify(messages));

      // Sync to server (encrypted)
      try {
        const authToken = sessionStorage.getItem('auth_token');
        if (authToken) {
          const messagesJson = JSON.stringify(messages);
          const encrypted = encryptData(messagesJson, encryptionKey);
          
          const response = await fetch(`/api/user-data/conversations/${workshopId}/${questionId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              messagesEncrypted: encrypted.data,
              encryptionIv: encrypted.iv,
              messageCount: messages.length,
            }),
          });
          
          if (response.ok) {
            console.log('[AIHelper] Sync successful, showing confirmation');
            setSyncStatus('synced');
            // Reset to idle after 5 seconds
            setTimeout(() => {
              console.log('[AIHelper] Hiding sync confirmation');
              setSyncStatus('idle');
            }, 5000);
          } else {
            setSyncStatus('error');
          }
        } else {
          setSyncStatus('error');
        }
      } catch (error) {
        console.error('[AIHelper] Failed to sync conversation:', error);
        setSyncStatus('error');
      }
    };

    saveConversation();
  }, [messages, storageKey, workshopId, questionId, encryptionKey, isReady]);

  const handleFeedback = (messageIndex: number, feedback: 'positive' | 'negative') => {
    setMessages(prev => prev.map((msg, idx) => {
      if (idx === messageIndex) {
        const newFeedback = msg.feedback === feedback ? null : feedback;
        return { ...msg, feedback: newFeedback };
      }
      return msg;
    }));
  };

  const clearConversation = async () => {
    if (!confirm('Weet je zeker dat je deze conversatie wilt wissen?')) return;

    // Clear from state and localStorage
    setMessages([]);
    localStorage.removeItem(storageKey);

    // Delete from server
    try {
      const authToken = sessionStorage.getItem('auth_token');
      if (authToken) {
        await fetch(`/api/user-data/conversations/${workshopId}/${questionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      }
    } catch (error) {
      console.error('[AIHelper] Failed to delete conversation from server:', error);
    }
  };

  const getUserAnswer = () => {
    const key = `hartspraak-${workshopId}-${questionId}`;
    return localStorage.getItem(key) || "";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Get user's current answer
      const userAnswer = getUserAnswer();
      
      // Build context for AI
      const systemContext = `Je bent een empathische AI begeleider voor het Hartspraak programma. 
Je helpt deelnemers met reflectievragen over psychologische basisbehoeften, hechtingspatronen, eigenwaarde en emoties.

Huidige vraag: "${questionTitle}"
${context ? `Context: ${context}` : ''}
${userAnswer ? `Het huidige antwoord van de deelnemer: "${userAnswer}"` : 'De deelnemer heeft deze vraag nog niet beantwoord.'}

Geef warme, ondersteunende begeleiding. Stel verdiepende vragen. Wees compassievol en niet-oordelend.`;

      // Call AI API via server (for usage logging)
      const authToken = sessionStorage.getItem('auth_token');
      const response = await fetch('/api/ai-helper/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
        body: JSON.stringify({
          workshopId,
          questionId,
          systemContext,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          userMessage: input,
        })
      });

      if (!response.ok) {
        throw new Error('AI response failed');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, ik kan momenteel niet reageren. Probeer het later opnieuw.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border-2 border-primary/20 rounded-lg p-4 bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">AI Begeleider</h3>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearConversation}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Wis conversatie
          </Button>
        )}
      </div>

      {messages.length > 0 && (
        <div className="space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border'
              }`}
            >
              <div className="flex items-start justify-between gap-2 p-3">
                <p className={`text-sm whitespace-pre-wrap break-words flex-1 ${
                  !expandedMessages.has(idx) && msg.content.length > 150 ? 'line-clamp-3' : ''
                }`}>
                  {msg.content}
                </p>
                {msg.content.length > 150 && (
                  <button
                    onClick={() => toggleMessage(idx)}
                    className="shrink-0 p-1 hover:bg-muted/50 rounded transition-colors"
                    aria-label={expandedMessages.has(idx) ? 'Inklappen' : 'Uitklappen'}
                  >
                    {expandedMessages.has(idx) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
            {msg.role === 'assistant' && (
              <div className="flex gap-1 mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 w-7 p-0 ${
                    msg.feedback === 'positive'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-muted-foreground hover:text-green-600'
                  }`}
                  onClick={() => handleFeedback(idx, 'positive')}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 w-7 p-0 ${
                    msg.feedback === 'negative'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-muted-foreground hover:text-red-600'
                  }`}
                  onClick={() => handleFeedback(idx, 'negative')}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-background border rounded-lg p-3">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        </div>
      )}

      <div className={messages.length > 0 ? "border-t pt-4" : ""}>
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Vraag de AI Begeleider om hulp</span>
        </div>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stel een vraag of vraag om feedback op je antwoord..."
            className="resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Sync Status Indicator */}
        {syncStatus !== 'idle' && (
          <div className="mt-2 flex items-center gap-2 text-sm">
            {syncStatus === 'syncing' && (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Conversatie wordt opgeslagen...</span>
              </>
            )}
            {syncStatus === 'synced' && (
              <>
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-green-600">Conversatie opgeslagen ✓</span>
              </>
            )}
            {syncStatus === 'error' && (
              <>
                <AlertCircle className="h-3 w-3 text-red-600" />
                <span className="text-red-600">Opslaan mislukt - probeer opnieuw</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
