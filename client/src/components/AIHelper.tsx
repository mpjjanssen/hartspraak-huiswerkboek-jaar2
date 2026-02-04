import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Loader2, ThumbsUp, ThumbsDown, Trash2, Check, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useEncryption } from "@/contexts/EncryptionContext";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user } = useAuth();
  const userId = user?.id;
  
  // Include userId in storage key to prevent cross-account data leakage
  const storageKey = userId ? `hartspraak-ai-${userId}-${workshopId}-${questionId}` : null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set());
  const { encryptionKey, isReady } = useEncryption();

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
    if (!isReady || !encryptionKey || !userId) return;

    const loadConversation = async () => {
      try {
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
              const decrypted = decryptData(data.messagesEncrypted, data.encryptionIv, encryptionKey);
              if (decrypted) {
                try {
                  const parsedMessages = JSON.parse(decrypted);
                  setMessages(parsedMessages);
                  // Also update localStorage with correct user-specific key
                  if (storageKey) {
                    localStorage.setItem(storageKey, decrypted);
                  }
                  return;
                } catch (parseError) {
                  console.warn('[AIHelper] Failed to parse decrypted messages:', parseError);
                }
              }
            }
          }
        }

        // Fallback to localStorage (only if we have a user-specific key)
        if (storageKey) {
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
      } catch (error) {
        console.error('[AIHelper] Failed to load conversation:', error);
      }
    };

    loadConversation();
  }, [workshopId, questionId, storageKey, encryptionKey, isReady, userId]);

  // Save conversation to localStorage and server
  useEffect(() => {
    if (messages.length === 0 || !isReady || !encryptionKey || !userId) return;

    const saveConversation = async () => {
      setSyncStatus('syncing');
      
      // Save to localStorage with user-specific key
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      }

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
            setSyncStatus('synced');
            setTimeout(() => setSyncStatus('idle'), 5000);
          } else {
            setSyncStatus('error');
          }
        }
      } catch (error) {
        console.error('[AIHelper] Failed to sync conversation:', error);
        setSyncStatus('error');
      }
    };

    saveConversation();
  }, [messages, storageKey, workshopId, questionId, encryptionKey, isReady, userId]);

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
    setMessages([]);
    
    // Clear from localStorage with user-specific key
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }

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
    if (!userId) return "";
    const key = `hartspraak-${userId}-${workshopId}-${questionId}`;
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
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const userAnswer = getUserAnswer();
      const systemContext = `Je bent een empathische AI begeleider voor het Hartspraak programma. 
Je helpt deelnemers met reflectievragen over psychologische basisbehoeften, hechtingspatronen, eigenwaarde en emoties.

Huidige vraag: "${questionTitle}"
${context ? `Context: ${context}` : ''}
${userAnswer ? `Het huidige antwoord van de deelnemer: "${userAnswer}"` : 'De deelnemer heeft deze vraag nog niet beantwoord.'}

Geef warme, ondersteunende begeleiding. Stel verdiepende vragen. Wees compassievol en niet-oordelend.`;

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
          userMessage: currentInput,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI response failed');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('AI Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, er is iets misgegaan: ${error.message || 'Ik kan momenteel niet reageren'}. Probeer het later opnieuw.`,
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
                <div className="p-3">
                  <p className={`text-sm whitespace-pre-wrap break-words ${
                    !expandedMessages.has(idx) && msg.content.length > 300 ? 'line-clamp-4' : ''
                  }`}>
                    {msg.content}
                  </p>
                  {msg.content.length > 300 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-1 h-6 text-xs"
                      onClick={() => toggleMessage(idx)}
                    >
                      {expandedMessages.has(idx) ? (
                        <><ChevronUp className="h-3 w-3 mr-1" /> Minder tonen</>
                      ) : (
                        <><ChevronDown className="h-3 w-3 mr-1" /> Meer tonen</>
                      )}
                    </Button>
                  )}
                </div>
                {msg.role === 'assistant' && (
                  <div className="flex items-center justify-end gap-1 px-2 pb-2 border-t pt-1 bg-muted/10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 ${msg.feedback === 'positive' ? 'text-green-600' : 'text-muted-foreground'}`}
                      onClick={() => handleFeedback(idx, 'positive')}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 ${msg.feedback === 'negative' ? 'text-red-600' : 'text-muted-foreground'}`}
                      onClick={() => handleFeedback(idx, 'negative')}
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className={messages.length > 0 ? "border-t pt-4" : ""}>
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">De AI kan je helpen met feedback, reflectievragen of een andere invalshoek</span>
        </div>
        <div className="relative">
          <Textarea
            placeholder="Stel een vraag of vraag om feedback op je antwoord..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="pr-12 min-h-[80px] resize-none bg-background border-primary/20 focus-visible:ring-primary"
            disabled={loading}
          />
          <Button
            size="icon"
            className="absolute right-2 bottom-2 h-8 w-8"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          {syncStatus === 'syncing' && <><Loader2 className="h-3 w-3 animate-spin" /> Synchroniseren...</>}
          {syncStatus === 'synced' && <><Check className="h-3 w-3 text-green-500" /> Opgeslagen in cloud</>}
          {syncStatus === 'error' && <><AlertCircle className="h-3 w-3 text-destructive" /> Synchronisatie fout</>}
        </div>
        <p>Je gesprekken zijn end-to-end versleuteld en privé.</p>
      </div>
    </div>
  );
}
