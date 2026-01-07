/**
 * Cleanup old localStorage data
 * 
 * Removes old answer and conversation keys that were used before server-side storage
 * This should be called once after user logs in to clean up legacy data
 */

export function cleanupLegacyLocalStorage() {
  const keysToRemove: string[] = [];

  // Scan all localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    // Match old answer keys: answer_workshop_{workshopId}_question_{questionId}
    if (key.match(/^answer_workshop_\d+_question_\d+$/)) {
      keysToRemove.push(key);
    }

    // Match old conversation keys: ai_conversation_workshop_{workshopId}_question_{questionId}
    if (key.match(/^ai_conversation_workshop_\d+_question_\d+$/)) {
      keysToRemove.push(key);
    }
  }

  // Remove all matched keys
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });

  // Mark cleanup as done
  if (keysToRemove.length > 0) {
    localStorage.setItem('legacy_data_cleaned', 'true');
    console.log(`Cleaned up ${keysToRemove.length} legacy localStorage items`);
  }
}

/**
 * Check if cleanup has been done
 */
export function isCleanupDone(): boolean {
  return localStorage.getItem('legacy_data_cleaned') === 'true';
}
