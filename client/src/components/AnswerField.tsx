import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Check, Cloud, CloudOff, ChevronDown, ChevronUp } from "lucide-react";
import { useEncryption } from "@/contexts/EncryptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { encryptData, decryptData } from "@/lib/encryption";

interface AnswerFieldProps {
  workshopId: string;
  questionId: string;
  placeholder?: string;
  rows?: number;
}

export function AnswerField({ workshopId, questionId, placeholder = "Schrijf hier je antwoord...", rows = 6 }: AnswerFieldProps) {
  const { user } = useAuth();
  const userId = user?.id;
  
  // Include userId in storage key to prevent cross-account data leakage
  const storageKey = userId ? `hartspraak-${userId}-${workshopId}-${questionId}` : null;
  const [value, setValue] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [isExpanded, setIsExpanded] = useState(true);
  const { encryptionKey, isReady } = useEncryption();

  // Load answer from server (or localStorage as fallback)
  useEffect(() => {
    if (!isReady || !encryptionKey || !userId) return;

    const loadAnswer = async () => {
      try {
        // Try to load from server first
        const authToken = sessionStorage.getItem('auth_token');
        if (authToken) {
          const response = await fetch(`/api/user-data/answers/${workshopId}/${questionId}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.answerEncrypted && data.encryptionIv) {
              // Try to decrypt
              const decrypted = decryptData(data.answerEncrypted, data.encryptionIv, encryptionKey);
              if (decrypted) {
                setValue(decrypted);
                setSyncStatus('synced');
                // Also update localStorage with correct user-specific key
                if (storageKey) {
                  localStorage.setItem(storageKey, decrypted);
                }
                return;
              } else {
                console.warn('[AnswerField] Decryption returned null, falling back to localStorage');
                // Fall through to localStorage fallback
              }
            }
          }
        }

        // Fallback to localStorage (only if we have a user-specific key)
        if (storageKey) {
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            setValue(saved);
          }
        }
      } catch (error) {
        console.error('[AnswerField] Failed to load answer:', error);
        // Fallback to localStorage
        if (storageKey) {
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            setValue(saved);
          }
        }
      }
    };

    loadAnswer();
  }, [workshopId, questionId, storageKey, encryptionKey, isReady, userId]);

  // Save answer to localStorage and server with debounce
  useEffect(() => {
    console.log('[AnswerField] Save effect triggered:', { isReady, hasEncryptionKey: !!encryptionKey, valueLength: value.length, userId });
    if (!isReady || !encryptionKey || !userId) {
      console.log('[AnswerField] Skipping sync - not ready or no encryption key or no userId');
      return;
    }

    const timeoutId = setTimeout(async () => {
      if (value !== "") {
        // Save to localStorage with user-specific key
        if (storageKey) {
          localStorage.setItem(storageKey, value);
        }
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);

        // Dispatch custom event for progress tracking
        window.dispatchEvent(new Event('answerSaved'));

        // Sync to server (encrypted)
        console.log('[AnswerField] Starting server sync...');
        setSyncStatus('syncing');
        try {
          const authToken = sessionStorage.getItem('auth_token');
          if (authToken) {
            const encrypted = encryptData(value, encryptionKey);
            
            const response = await fetch(`/api/user-data/answers/${workshopId}/${questionId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                answerEncrypted: encrypted.data,
                encryptionIv: encrypted.iv,
                answerPlaintext: value, // Also send plaintext - server decides whether to store it
              }),
            });

            if (response.ok) {
              console.log('[AnswerField] Sync successful!');
              setSyncStatus('synced');
              setTimeout(() => setSyncStatus('idle'), 2000);
            } else {
              console.error('[AnswerField] Sync failed:', response.status, await response.text());
              setSyncStatus('error');
            }
          }
        } catch (error) {
          console.error('[AnswerField] Failed to sync answer - exception:', error);
          setSyncStatus('error');
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [value, storageKey, workshopId, questionId, encryptionKey, isReady, userId]);

  return (
    <div className="space-y-2">
      {value && value.length > 200 && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Je antwoord</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Inklappen
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Uitklappen
              </>
            )}
          </button>
        </div>
      )}
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={!isExpanded && value.length > 200 ? 3 : rows}
        className={`w-full resize-y min-h-[120px] bg-background border-2 focus:border-primary transition-all ${
          !isExpanded && value.length > 200 ? 'max-h-[120px] overflow-hidden' : ''
        }`}
      />
      <div className="flex items-center justify-between">
        {showSaved && (
          <div className="flex items-center gap-2 text-sm text-primary animate-in fade-in slide-in-from-bottom-2">
            <Check className="h-4 w-4" />
            <span>Antwoord opgeslagen</span>
          </div>
        )}
        {syncStatus === 'syncing' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
            <Cloud className="h-4 w-4 animate-pulse" />
            <span>Synchroniseren...</span>
          </div>
        )}
        {syncStatus === 'synced' && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 ml-auto animate-in fade-in">
            <Cloud className="h-4 w-4" />
            <span>Gesynchroniseerd ✓</span>
          </div>
        )}
        {syncStatus === 'error' && (
          <div className="flex items-center gap-2 text-sm text-destructive ml-auto">
            <CloudOff className="h-4 w-4" />
            <span>Sync mislukt</span>
          </div>
        )}
      </div>
    </div>
  );
}
