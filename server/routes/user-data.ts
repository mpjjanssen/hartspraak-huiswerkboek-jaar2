import { Router } from "express";
import { getDb } from "../db";
import { userAnswers, aiConversations, aiUsageLogs, authUsers } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth";

const router = Router();

// Apply auth middleware to all routes
router.use(requireAuth);

/**
 * GET /api/user-data/share-consent
 * Get user's current share consent status
 */
router.get("/share-consent", async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const result = await db
      .select({ shareConsent: authUsers.shareConsent })
      .from(authUsers)
      .where(eq(authUsers.id, userId))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ shareConsent: result[0].shareConsent ?? false });
  } catch (error) {
    console.error("[API] Failed to get share consent:", error);
    res.status(500).json({ error: "Failed to get share consent" });
  }
});

/**
 * PUT /api/user-data/share-consent
 * Update user's share consent status
 */
router.put("/share-consent", async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const { shareConsent } = req.body;

    if (typeof shareConsent !== "boolean") {
      return res.status(400).json({ error: "shareConsent must be a boolean" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    await db
      .update(authUsers)
      .set({ shareConsent })
      .where(eq(authUsers.id, userId));

    // If user disables sharing, clear all plaintext answers
    if (!shareConsent) {
      await db
        .update(userAnswers)
        .set({ answerPlaintext: null })
        .where(eq(userAnswers.userId, userId));
    }

    res.json({ success: true, shareConsent });
  } catch (error) {
    console.error("[API] Failed to update share consent:", error);
    res.status(500).json({ error: "Failed to update share consent" });
  }
});

/**
 * GET /api/user-data/answers/:workshopId/:questionId
 * Get encrypted answer for a specific question
 */
router.get("/answers/:workshopId/:questionId", async (req, res) => {
  try {
    const { workshopId, questionId } = req.params;
    const userId = (req as any).user.userId;

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const result = await db
      .select()
      .from(userAnswers)
      .where(
        and(
          eq(userAnswers.userId, userId),
          eq(userAnswers.workshopId, workshopId),
          eq(userAnswers.questionId, questionId)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return res.json({ answer: null });
    }

    const answer = result[0];
    res.json({
      answerEncrypted: answer.answerEncrypted,
      encryptionIv: answer.encryptionIv,
      updatedAt: answer.updatedAt,
    });
  } catch (error) {
    console.error("[API] Failed to get answer:", error);
    res.status(500).json({ error: "Failed to get answer" });
  }
});

/**
 * POST /api/user-data/answers/:workshopId/:questionId
 * Save encrypted answer for a specific question
 */
router.post("/answers/:workshopId/:questionId", async (req, res) => {
  try {
    const { workshopId, questionId } = req.params;
    const { answerEncrypted, encryptionIv, answerPlaintext } = req.body;
    const userId = (req as any).user.userId;

    if (!answerEncrypted || !encryptionIv) {
      return res.status(400).json({ error: "Missing encrypted data" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    // Check user's shareConsent status
    const userResult = await db
      .select({ shareConsent: authUsers.shareConsent })
      .from(authUsers)
      .where(eq(authUsers.id, userId))
      .limit(1);

    const hasShareConsent = userResult[0]?.shareConsent ?? false;
    
    // Only store plaintext if user has enabled sharing
    const plaintextToStore = hasShareConsent ? answerPlaintext : null;

    // Check if answer already exists
    const existing = await db
      .select()
      .from(userAnswers)
      .where(
        and(
          eq(userAnswers.userId, userId),
          eq(userAnswers.workshopId, workshopId),
          eq(userAnswers.questionId, questionId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing answer
      await db
        .update(userAnswers)
        .set({
          answerEncrypted,
          encryptionIv,
          answerPlaintext: plaintextToStore,
          updatedAt: new Date(),
        })
        .where(eq(userAnswers.id, existing[0].id));
    } else {
      // Insert new answer
      await db.insert(userAnswers).values({
        userId,
        workshopId,
        questionId,
        answerEncrypted,
        encryptionIv,
        answerPlaintext: plaintextToStore,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("[API] Failed to save answer:", error);
    res.status(500).json({ error: "Failed to save answer" });
  }
});

/**
 * GET /api/user-data/conversations/:workshopId/:questionId
 * Get encrypted AI conversation for a specific question
 */
router.get("/conversations/:workshopId/:questionId", async (req, res) => {
  try {
    const { workshopId, questionId } = req.params;
    const userId = (req as any).user.userId;

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const result = await db
      .select()
      .from(aiConversations)
      .where(
        and(
          eq(aiConversations.userId, userId),
          eq(aiConversations.workshopId, workshopId),
          eq(aiConversations.questionId, questionId)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return res.json({ conversation: null });
    }

    const conversation = result[0];
    res.json({
      messagesEncrypted: conversation.messagesEncrypted,
      encryptionIv: conversation.encryptionIv,
      messageCount: conversation.messageCount,
      updatedAt: conversation.updatedAt,
    });
  } catch (error) {
    console.error("[API] Failed to get conversation:", error);
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

/**
 * POST /api/user-data/conversations/:workshopId/:questionId
 * Save encrypted AI conversation for a specific question
 */
router.post("/conversations/:workshopId/:questionId", async (req, res) => {
  try {
    const { workshopId, questionId } = req.params;
    const { messagesEncrypted, encryptionIv, messageCount } = req.body;
    const userId = (req as any).user.userId;

    if (!messagesEncrypted || !encryptionIv || messageCount === undefined) {
      return res.status(400).json({ error: "Missing encrypted data" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    // Check if conversation already exists
    const existing = await db
      .select()
      .from(aiConversations)
      .where(
        and(
          eq(aiConversations.userId, userId),
          eq(aiConversations.workshopId, workshopId),
          eq(aiConversations.questionId, questionId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing conversation
      await db
        .update(aiConversations)
        .set({
          messagesEncrypted,
          encryptionIv,
          messageCount,
          updatedAt: new Date(),
        })
        .where(eq(aiConversations.id, existing[0].id));
    } else {
      // Insert new conversation
      await db.insert(aiConversations).values({
        userId,
        workshopId,
        questionId,
        messagesEncrypted,
        encryptionIv,
        messageCount,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("[API] Failed to save conversation:", error);
    res.status(500).json({ error: "Failed to save conversation" });
  }
});

/**
 * DELETE /api/user-data/conversations/:workshopId/:questionId
 * Delete AI conversation for a specific question
 */
router.delete("/conversations/:workshopId/:questionId", async (req, res) => {
  try {
    const { workshopId, questionId } = req.params;
    const userId = (req as any).user.userId;

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    await db
      .delete(aiConversations)
      .where(
        and(
          eq(aiConversations.userId, userId),
          eq(aiConversations.workshopId, workshopId),
          eq(aiConversations.questionId, questionId)
        )
      );

    res.json({ success: true });
  } catch (error) {
    console.error("[API] Failed to delete conversation:", error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

/**
 * POST /api/user-data/ai-usage-log
 * Log AI usage for cost tracking
 */
router.post("/ai-usage-log", async (req, res) => {
  try {
    const { workshopId, questionId, promptTokens, completionTokens, totalTokens, model } = req.body;
    const userId = (req as any).user.userId;
    const userEmail = (req as any).user.email || "unknown";

    if (!workshopId || !questionId || !totalTokens || !model) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    await db.insert(aiUsageLogs).values({
      userId,
      userEmail,
      workshopId,
      questionId,
      promptTokens: promptTokens || 0,
      completionTokens: completionTokens || 0,
      totalTokens,
      model,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("[API] Failed to log AI usage:", error);
    res.status(500).json({ error: "Failed to log AI usage" });
  }
});

export default router;
