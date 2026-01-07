import express from "express";
import { getDb } from "../db";
import { users, verifiedMembers } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../lib/auth";

import { generateEmailContent } from "./workshop-reminders-email-template";

const router = express.Router();

interface WorkshopInfo {
  id: string;
  number: number;
  title: string;
  date: string;
  totalQuestions: number;
}

const WORKSHOPS: WorkshopInfo[] = [
  {
    id: "workshop1",
    number: 1,
    title: "De Kracht van de Psychologische Basisbehoeften",
    date: "14-15 maart 2026",
    totalQuestions: 12,
  },
  {
    id: "workshop2",
    number: 2,
    title: "Ontdek je Hechtingsfundament",
    date: "9-10 mei 2026",
    totalQuestions: 12,
  },
  {
    id: "workshop3",
    number: 3,
    title: "Versterk je Eigenwaarde",
    date: "13-14 juni 2026",
    totalQuestions: 10,
  },
  {
    id: "workshop4",
    number: 4,
    title: "Emoties en Angst als Wegwijzers",
    date: "4-6 juli 2026",
    totalQuestions: 12,
  },
  {
    id: "workshop5",
    number: 5,
    title: "Authentieke Verbinding & Autonomie",
    date: "5-7 september 2026",
    totalQuestions: 10,
  },
  {
    id: "workshop6",
    number: 6,
    title: "Integratie: Je Nieuwe Zelf Leven",
    date: "10-11 oktober 2026",
    totalQuestions: 10,
  },
];

/**
 * Send workshop reminder emails
 * POST /api/admin/send-workshop-reminders
 */
router.post("/send-workshop-reminders", requireAdmin, async (req, res) => {
  try {
    const { workshopNumber } = req.body;
    
    if (!workshopNumber || workshopNumber < 1 || workshopNumber > 6) {
      return res.status(400).json({ error: "Invalid workshop number" });
    }

    const workshop = WORKSHOPS.find(w => w.number === workshopNumber);
    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    // Get all registered users
    const allUsers = await db.select().from(users).where(eq(users.status, "active"));
    
    // Get all verified members to get full names
    const allMembers = await db.select().from(verifiedMembers);
    
    const emailData = [];

    for (const user of allUsers) {
      // Find corresponding verified member for full name
      const member = allMembers.find(m => m.email === user.email);
      const fullName = member?.fullName || user.email.split('@')[0];
      
      // Calculate progress (this would need to be done client-side or via a separate endpoint)
      // For now, we'll send 0% as placeholder
      const progress = 0;
      const questionsAnswered = 0;
      const questionsRemaining = workshop.totalQuestions;

      emailData.push({
        email: user.email,
        fullName,
        progress,
        questionsAnswered,
        questionsRemaining,
      });
    }

    // Prepare emails for manual sending
    const emailsToSend = emailData.map(recipient => {
      const emailBody = generateEmailContent(recipient, workshop);
      const subject = `Workshop ${workshop.number} - ${workshop.title} | ${workshop.date} komt eraan`;
      
      return {
        to: recipient.email,
        fullName: recipient.fullName,
        subject: subject,
        body: emailBody,
        progress: recipient.progress,
        questionsAnswered: recipient.questionsAnswered,
        questionsRemaining: recipient.questionsRemaining
      };
    });

    res.json({
      success: true,
      message: `${emailsToSend.length} emails ready to send`,
      workshop: {
        number: workshop.number,
        title: workshop.title,
        date: workshop.date
      },
      emails: emailsToSend
    });

  } catch (error) {
    console.error("Error preparing workshop reminders:", error);
    res.status(500).json({ error: "Failed to prepare workshop reminders" });
  }
});

/**
 * Get workshop list
 * GET /api/admin/workshops
 */
router.get("/workshops", requireAdmin, async (req, res) => {
  try {
    res.json({ workshops: WORKSHOPS });
  } catch (error) {
    console.error("Error fetching workshops:", error);
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

export default router;
