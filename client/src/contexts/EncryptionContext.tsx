import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { deriveKeyFromUser } from '@/lib/encryption';
import { cleanupLegacyLocalStorage, isCleanupDone } from '@/lib/cleanupLocalStorage';
import { useAuth } from './AuthContext';

interface EncryptionContextType {
  encryptionKey: string | null;
  isReady: boolean;
}

const EncryptionContext = createContext<EncryptionContextType>({
  encryptionKey: null,
  isReady: false,
});

export function useEncryption() {
  const context = useContext(EncryptionContext);
  if (!context) {
    throw new Error('useEncryption must be used within EncryptionProvider');
  }
  return context;
}

interface EncryptionProviderProps {
  children: ReactNode;
}

export function EncryptionProvider({ children }: EncryptionProviderProps) {
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Derive encryption key from user identity (stable across sessions)
    if (isAuthenticated && user) {
      const key = deriveKeyFromUser(user.email, user.id);
      setEncryptionKey(key);
      
      // Cleanup legacy localStorage data once per user
      if (!isCleanupDone()) {
        cleanupLegacyLocalStorage();
      }
    } else {
      setEncryptionKey(null);
    }
    
    setIsReady(true);
  }, [user, isAuthenticated]);

  return (
    <EncryptionContext.Provider value={{ encryptionKey, isReady }}>
      {children}
    </EncryptionContext.Provider>
  );
}

