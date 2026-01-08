import { Router } from "express";
import { getDb } from "../db";
import { sharedHomework } from "../../drizzle/schema";
import { requireAuth } from "../lib/auth";
import { eq, and, desc } from "drizzle-orm";

const router = Router();

// Apply auth middleware
router.use(requireAuth);

/**
 * POST /api/shared-homework
 * Submit homework to be shared with the team
 */
router.post("/", async (req, res) => {
  console.log("[API] Received share request from user:", (req as any).user?.email);
  try {
    const { 
      workshopId, 
      workshopNumber, 
      workshopTitle, 
      workshopDate, 
      pdfData, 
      fileName 
    } = req.body;
    
    const userId = (req as any).user.userId;
    const userEmail = (req as any).user.email;

    console.log("[API] Sharing workshop:", workshopTitle, "for user:", userEmail);

    if (!workshopId || !pdfData || !fileName) {
      console.error("[API] Missing required fields:", { workshopId, hasPdf: !!pdfData, fileName });
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb();
    if (!db) {
      console.error("[API] Database unavailable");
      return res.status(503).json({ error: "Database unavailable" });
    }

    // Insert into shared_homework table
    const result = await db.insert(sharedHomework).values({
      userId,
      userEmail,
      workshopId,
      workshopNumber,
      workshopTitle,
      workshopDate,
      pdfData,
      fileName,
      status: "pending",
      sharedAt: new Date(),
    });

    console.log("[API] Successfully inserted shared homework. Result:", result);

    res.json({ success: true, message: "Huiswerk succesvol gedeeld met het team" });
  } catch (error) {
    console.error("[API] Failed to share homework:", error);
    res.status(500).json({ error: "Failed to share homework" });
  }
});

/**
 * GET /api/shared-homework/my-submissions
 * Get all submissions by the current user
 */
router.get("/my-submissions", async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const db = await getDb();
    
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const submissions = await db
      .select({
        id: sharedHomework.id,
        workshopTitle: sharedHomework.workshopTitle,
        sharedAt: sharedHomework.sharedAt,
        status: sharedHomework.status,
      })
      .from(sharedHomework)
      .where(eq(sharedHomework.userId, userId))
      .orderBy(desc(sharedHomework.sharedAt));

    res.json({ submissions });
  } catch (error) {
    console.error("[API] Failed to get submissions:", error);
    res.status(500).json({ error: "Failed to get submissions" });
  }
});

export default router;
