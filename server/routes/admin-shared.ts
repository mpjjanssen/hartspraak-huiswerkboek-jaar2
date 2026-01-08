import { Router } from "express";
import { getDb } from "../db";
import { sharedHomework } from "../../drizzle/schema";
import { requireAdmin } from "../lib/auth";
import { eq, desc } from "drizzle-orm";

const router = Router();

// Apply admin auth middleware
router.use(requireAdmin);

/**
 * GET /api/admin/shared-homework
 * Get all shared homework submissions
 */
router.get("/", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const submissions = await db
      .select({
        id: sharedHomework.id,
        userEmail: sharedHomework.userEmail,
        workshopTitle: sharedHomework.workshopTitle,
        workshopDate: sharedHomework.workshopDate,
        fileName: sharedHomework.fileName,
        sharedAt: sharedHomework.sharedAt,
        status: sharedHomework.status,
      })
      .from(sharedHomework)
      .orderBy(desc(sharedHomework.sharedAt));

    res.json({ submissions });
  } catch (error) {
    console.error("[API] Failed to get shared homework:", error);
    res.status(500).json({ error: "Failed to get shared homework" });
  }
});

/**
 * GET /api/admin/shared-homework/:id/download
 * Get the PDF data for a specific submission
 */
router.get("/:id/download", async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);
    const db = await getDb();
    
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const [submission] = await db
      .select({
        pdfData: sharedHomework.pdfData,
        fileName: sharedHomework.fileName,
      })
      .from(sharedHomework)
      .where(eq(sharedHomework.id, submissionId))
      .limit(1);

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.json({ 
      pdfData: submission.pdfData,
      fileName: submission.fileName
    });
  } catch (error) {
    console.error("[API] Failed to download homework:", error);
    res.status(500).json({ error: "Failed to download homework" });
  }
});

export default router;
