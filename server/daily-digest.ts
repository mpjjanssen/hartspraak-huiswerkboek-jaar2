import cron from "node-cron";
import { getDb } from "./db";
import { userAnswers, authUsers, verifiedMembers } from "../drizzle/schema";
import { eq, and, gte, isNotNull } from "drizzle-orm";
import { sendDailyDigest } from "./email";

export function startDailyDigestCron() {
  cron.schedule("0 20 * * *", async () => {
    console.log("[Daily Digest] Starting daily digest...");
    await runDailyDigest();
  }, {
    timezone: "Europe/Berlin",
  });
  console.log("[Daily Digest] Cron job scheduled: daily at 20:00 Europe/Berlin");
}

export async function runDailyDigest(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const db = await getDb();
    if (!db) {
      return { success: false, count: 0, error: "Database not available" };
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const results = await db
      .select({
        answerPlaintext: userAnswers.answerPlaintext,
        workshopId: userAnswers.workshopId,
        questionId: userAnswers.questionId,
        updatedAt: userAnswers.updatedAt,
        userName: verifiedMembers.fullName,
        userEmail: authUsers.email,
      })
      .from(userAnswers)
      .innerJoin(authUsers, eq(userAnswers.userId, authUsers.id))
      .innerJoin(verifiedMembers, eq(authUsers.verifiedMemberId, verifiedMembers.id))
      .where(
        and(
          eq(authUsers.shareConsent, true),
          isNotNull(userAnswers.answerPlaintext),
          gte(userAnswers.updatedAt, since)
        )
      )
      .orderBy(userAnswers.updatedAt);

    const answers = results
      .filter((r) => r.answerPlaintext && r.answerPlaintext.trim().length > 0)
      .map((r) => ({
        userName: r.userName,
        userEmail: r.userEmail,
        workshopId: r.workshopId,
        questionId: r.questionId,
        answer: r.answerPlaintext!,
        updatedAt: r.updatedAt,
      }));

    if (answers.length === 0) {
      console.log("[Daily Digest] No new answers with share consent in the last 24 hours.");
      return { success: true, count: 0 };
    }

    console.log(`[Daily Digest] Found ${answers.length} answers from ${new Set(answers.map(a => a.userEmail)).size} user(s).`);

    const sent = await sendDailyDigest(answers);

    if (sent) {
      console.log(`[Daily Digest] Successfully sent digest with ${answers.length} answers.`);
      return { success: true, count: answers.length };
    } else {
      return { success: false, count: answers.length, error: "Email sending failed" };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Daily Digest] Error:", message);
    return { success: false, count: 0, error: message };
  }
}
