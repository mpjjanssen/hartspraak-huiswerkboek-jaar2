import express from "express";
import { getDb } from "../db.js";
import { users } from "../../drizzle/schema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

// Share homework endpoint
router.post("/", async (req, res) => {
  try {
    const { workshopId, workshopTitle } = req.body;
    const userId = (req as any).session?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Niet ingelogd" });
    }

    if (!workshopId || !workshopTitle) {
      return res.status(400).json({ message: "Workshop ID en titel zijn verplicht" });
    }

    const db = await getDb();

    // Get user info
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return res.status(404).json({ message: "Gebruiker niet gevonden" });
    }

    // Get Word document from client (sent as base64)
    const { wordDocumentBase64 } = req.body;
    
    if (!wordDocumentBase64) {
      return res.status(400).json({ message: "Word document is verplicht" });
    }

    // Send email via Gmail MCP
    const { execSync } = await import("child_process");
    const fs = await import("fs");
    const path = await import("path");
    
    // Save Word file temporarily
    const tmpDir = "/tmp";
    const fileName = `${user.firstName || "Deelnemer"}_${workshopTitle.replace(/[^a-z0-9]/gi, "_")}_${Date.now()}.docx`;
    const filePath = path.join(tmpDir, fileName);
    
    // Decode base64 and save
    const wordBuffer = Buffer.from(wordDocumentBase64, "base64");
    fs.writeFileSync(filePath, wordBuffer);

    // Upload file to get public URL
    const uploadResult = execSync(`manus-upload-file "${filePath}"`, { encoding: "utf-8" });
    const fileUrl = uploadResult.trim();

    // Send email with download link
    const emailBody = `
Hallo Martien en Lonneke,

${user.firstName || "Een deelnemer"} ${user.lastName || ""} heeft huiswerk gedeeld voor ${workshopTitle}.

Deelnemer: ${user.firstName || ""} ${user.lastName || ""}
Email: ${user.email}
Workshop: ${workshopTitle}
Datum: ${new Date().toLocaleDateString("nl-NL", { 
  weekday: "long", 
  year: "numeric", 
  month: "long", 
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
})}

Download het huiswerk document hier:
${fileUrl}

Met vriendelijke groet,
Hartspraak Huiswerkboek Systeem
    `.trim();

    // Send to both therapists
    const recipients = [
      "info@hartspraak.com",
      "lonnekevanhouten@gmail.com"
    ];

    for (const recipient of recipients) {
      try {
        execSync(
          `manus-mcp-cli tool call send_email --server gmail --input '${JSON.stringify({
            to: recipient,
            subject: `📚 Huiswerk gedeeld: ${workshopTitle} - ${user.firstName || "Deelnemer"} ${user.lastName || ""}`,
            body: emailBody
          })}'`,
          { encoding: "utf-8" }
        );
      } catch (emailError) {
        console.error(`Failed to send email to ${recipient}:`, emailError);
      }
    }

    // Clean up temp file
    fs.unlinkSync(filePath);

    res.json({ 
      success: true, 
      message: "Huiswerk succesvol gedeeld met Martien en Lonneke" 
    });

  } catch (error) {
    console.error("Share homework error:", error);
    res.status(500).json({ 
      message: "Er ging iets mis bij het delen van het huiswerk",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
