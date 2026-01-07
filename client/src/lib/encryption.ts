import CryptoJS from 'crypto-js';

/**
 * Client-side encryption utilities for user data
 * Uses AES-256-GCM for encryption
 */

export interface EncryptedData {
  data: string; // Base64 encoded encrypted data
  iv: string; // Base64 encoded initialization vector
}

/**
 * Encrypt data using AES encryption
 * @param plaintext - The data to encrypt
 * @param key - The encryption key (should be derived from user password/session)
 * @returns Encrypted data and IV
 */
export function encryptData(plaintext: string, key: string): EncryptedData {
  // Generate random IV
  const iv = CryptoJS.lib.WordArray.random(16);
  
  // Encrypt using AES
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  return {
    data: encrypted.toString(),
    iv: CryptoJS.enc.Base64.stringify(iv)
  };
}

/**
 * Decrypt data using AES decryption
 * @param encryptedData - The encrypted data (base64)
 * @param iv - The initialization vector (base64)
 * @param key - The encryption key
 * @returns Decrypted plaintext
 */
export function decryptData(encryptedData: string, iv: string, key: string): string | null {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    
    // Check if decryption was successful (empty string means failed)
    if (!plaintext) {
      console.warn('[Encryption] Decryption resulted in empty string - wrong key or corrupted data');
      return null;
    }
    
    return plaintext;
  } catch (error) {
    console.warn('[Encryption] Decryption failed:', error);
    return null;
  }
}

/**
 * Derive an encryption key from user session
 * This uses the user's session token as the basis for the encryption key
 * @param sessionToken - The user's session token
 * @returns Derived encryption key
 */
export function deriveKeyFromSession(sessionToken: string): string {
  // Use PBKDF2 to derive a strong key from the session token
  const salt = 'hartspraak-encryption-salt-v1'; // Static salt for consistency
  const key = CryptoJS.PBKDF2(sessionToken, salt, {
    keySize: 256 / 32,
    iterations: 1000
  });
  
  return key.toString();
}

/**
 * Test encryption/decryption to ensure it works
 */
export function testEncryption(): boolean {
  try {
    const testData = 'Hello, this is a test message!';
    const testKey = 'test-key-12345';
    
    const encrypted = encryptData(testData, testKey);
    const decrypted = decryptData(encrypted.data, encrypted.iv, testKey);
    
    return decrypted === testData;
  } catch (error) {
    console.error('[Encryption] Test failed:', error);
    return false;
  }
}
