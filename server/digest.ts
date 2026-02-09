import { Router } from "express";
import { runDailyDigest } from "../daily-digest";

const router = Router();

router.post("/send-digest", async (_req, res) => {
  try {
    const result = await runDailyDigest();

    if (result.success) {
      res.json({
        message: result.count > 0
          ? `Samenvatting verstuurd met ${result.count} antwoorden.`
          : "Geen nieuwe antwoorden gevonden in de afgelopen 24 uur.",
        count: result.count,
      });
    } else {
      res.status(500).json({
        error: result.error || "Versturen mislukt.",
        count: result.count,
      });
    }
  } catch (err) {
    console.error("[Digest Route] Error:", err);
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

export default router;
