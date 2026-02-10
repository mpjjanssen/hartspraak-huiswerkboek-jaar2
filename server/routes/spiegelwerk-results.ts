import { Router } from "express";
import { getDb } from "../db";
import { spiegelwerkResults, authUsers, verifiedMembers } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../lib/auth";

const router = Router();

/**
 * POST /api/spiegelwerk-results
 * Save test results (authenticated user)
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const { userId, email } = (req as any).user;
    const { combined, normI, normII, normIII, profileType, topStructures } = req.body;

    // Validate required fields
    if (!combined || !normI || !normII || !normIII || !profileType || !topStructures) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    await db.insert(spiegelwerkResults).values({
      userId,
      userEmail: email,
      scoreA: combined.A,
      scoreB: combined.B,
      scoreS: combined.S,
      scoreC: combined.C,
      scoreD: combined.D,
      scoreE: combined.E,
      scoresNormI: JSON.stringify(normI),
      scoresNormII: JSON.stringify(normII),
      scoresNormIII: JSON.stringify(normIII),
      profileType,
      topStructures,
    });

    console.log(`[Spiegelwerk] Results saved for ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error("[Spiegelwerk] Failed to save results:", error);
    res.status(500).json({ error: "Failed to save results" });
  }
});

/**
 * GET /api/spiegelwerk-results/mine
 * Get own test results (authenticated user)
 */
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const { userId } = (req as any).user;

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const results = await db
      .select({
        id: spiegelwerkResults.id,
        scoreA: spiegelwerkResults.scoreA,
        scoreB: spiegelwerkResults.scoreB,
        scoreS: spiegelwerkResults.scoreS,
        scoreC: spiegelwerkResults.scoreC,
        scoreD: spiegelwerkResults.scoreD,
        scoreE: spiegelwerkResults.scoreE,
        scoresNormI: spiegelwerkResults.scoresNormI,
        scoresNormII: spiegelwerkResults.scoresNormII,
        scoresNormIII: spiegelwerkResults.scoresNormIII,
        profileType: spiegelwerkResults.profileType,
        topStructures: spiegelwerkResults.topStructures,
        portraitText: spiegelwerkResults.portraitText,
        completedAt: spiegelwerkResults.completedAt,
      })
      .from(spiegelwerkResults)
      .where(eq(spiegelwerkResults.userId, userId))
      .orderBy(desc(spiegelwerkResults.completedAt));

    res.json({ results });
  } catch (error) {
    console.error("[Spiegelwerk] Failed to get user results:", error);
    res.status(500).json({ error: "Failed to get results" });
  }
});

/**
 * GET /api/spiegelwerk-results/admin
 * Get all test results (admin only)
 */
router.get("/admin", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const results = await db
      .select({
        id: spiegelwerkResults.id,
        userId: spiegelwerkResults.userId,
        userEmail: spiegelwerkResults.userEmail,
        scoreA: spiegelwerkResults.scoreA,
        scoreB: spiegelwerkResults.scoreB,
        scoreS: spiegelwerkResults.scoreS,
        scoreC: spiegelwerkResults.scoreC,
        scoreD: spiegelwerkResults.scoreD,
        scoreE: spiegelwerkResults.scoreE,
        scoresNormI: spiegelwerkResults.scoresNormI,
        scoresNormII: spiegelwerkResults.scoresNormII,
        scoresNormIII: spiegelwerkResults.scoresNormIII,
        profileType: spiegelwerkResults.profileType,
        topStructures: spiegelwerkResults.topStructures,
        portraitText: spiegelwerkResults.portraitText,
        completedAt: spiegelwerkResults.completedAt,
      })
      .from(spiegelwerkResults)
      .orderBy(desc(spiegelwerkResults.completedAt));

    // Get member names for display
    const memberNames: Record<string, string> = {};
    const members = await db.select({ email: verifiedMembers.email, fullName: verifiedMembers.fullName }).from(verifiedMembers);
    members.forEach(m => { memberNames[m.email] = m.fullName; });

    const enriched = results.map(r => ({
      ...r,
      userName: memberNames[r.userEmail] || r.userEmail,
    }));

    res.json({ results: enriched });
  } catch (error) {
    console.error("[Spiegelwerk] Failed to get results:", error);
    res.status(500).json({ error: "Failed to get results" });
  }
});

export default router;

