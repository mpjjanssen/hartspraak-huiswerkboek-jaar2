import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DIGEST_RECIPIENTS = [
  "info@hartspraak.com",
  "lonnekevanhouten@gmail.com",
  "serge@regoor.nl",
];

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "Hartspraak Huiswerkboek <huiswerk@hartspraak.com>";

interface DigestAnswer {
  userName: string;
  userEmail: string;
  workshopId: string;
  questionId: string;
  answer: string;
  updatedAt: Date;
}

export async function sendDailyDigest(answers: DigestAnswer[]): Promise<boolean> {
  if (answers.length === 0) {
    console.log("[Daily Digest] No new answers to send.");
    return true;
  }

  const byUser = new Map<string, DigestAnswer[]>();
  for (const answer of answers) {
    const key = `${answer.userName} (${answer.userEmail})`;
    if (!byUser.has(key)) byUser.set(key, []);
    byUser.get(key)!.push(answer);
  }

  const html = buildDigestHtml(byUser, answers.length);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: DIGEST_RECIPIENTS,
      subject: `Hartspraak huiswerkboek jaar 2 – dagelijks overzicht (${answers.length} ${answers.length === 1 ? "antwoord" : "antwoorden"})`,
      html,
    });

    if (error) {
      console.error("[Daily Digest] Resend error:", error);
      return false;
    }

    console.log(`[Daily Digest] Email sent successfully. ID: ${data?.id}`);
    return true;
  } catch (err) {
    console.error("[Daily Digest] Failed to send email:", err);
    return false;
  }
}

function formatWorkshopName(workshopId: string): string {
  const num = workshopId.replace("workshop", "");
  return `Workshop ${num}`;
}

function formatQuestionId(questionId: string): string {
  const match = questionId.match(/^q(\d+)-(.+)$/);
  if (!match) return questionId;
  const [, num, label] = match;
  const prettyLabel = label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, " ");
  return `Opdracht ${num} – ${prettyLabel}`;
}

function buildDigestHtml(byUser: Map<string, DigestAnswer[]>, totalCount: number): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("nl-NL", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  let userSections = "";

  for (const [userLabel, userAnswers] of byUser) {
    const byWorkshop = new Map<string, DigestAnswer[]>();
    for (const a of userAnswers) {
      if (!byWorkshop.has(a.workshopId)) byWorkshop.set(a.workshopId, []);
      byWorkshop.get(a.workshopId)!.push(a);
    }

    let workshopSections = "";
    for (const [workshopId, workshopAnswers] of byWorkshop) {
      let answerRows = "";
      for (const a of workshopAnswers) {
        const time = new Date(a.updatedAt).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
        const escapedAnswer = a.answer
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

        answerRows += `
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5; vertical-align: top;">
              <strong style="color: #0d6e6e;">${formatQuestionId(a.questionId)}</strong>
              <span style="color: #999; font-size: 12px; margin-left: 8px;">${time}</span>
              <div style="margin-top: 8px; color: #333; line-height: 1.6; white-space: pre-wrap;">${escapedAnswer}</div>
            </td>
          </tr>`;
      }

      workshopSections += `
        <div style="margin-bottom: 16px;">
          <h3 style="color: #0d6e6e; font-size: 16px; margin: 16px 0 8px 0; padding: 8px 16px; background: #f0fafa; border-radius: 6px;">
            ${formatWorkshopName(workshopId)}
          </h3>
          <table style="width: 100%; border-collapse: collapse;">${answerRows}</table>
        </div>`;
    }

    userSections += `
      <div style="margin-bottom: 32px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #0d6e6e; color: white; padding: 12px 16px;">
          <h2 style="margin: 0; font-size: 18px;">${userLabel}</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">
            ${userAnswers.length} ${userAnswers.length === 1 ? "antwoord" : "antwoorden"} bijgewerkt
          </p>
        </div>
        ${workshopSections}
      </div>`;
  }

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 680px; margin: 0 auto; padding: 20px; background: #fafafa; color: #333;">
  <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #0d6e6e, #0a5555); padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 22px;">Hartspraak huiswerkboek – jaar 2</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0 0; font-size: 14px;">Dagelijks overzicht – ${dateStr}</p>
    </div>
    <div style="padding: 20px 24px; background: #f8fffe; border-bottom: 1px solid #e5e5e5;">
      <p style="margin: 0; color: #555;">
        Er ${totalCount === 1 ? "is" : "zijn"} <strong>${totalCount}</strong> ${totalCount === 1 ? "antwoord" : "antwoorden"} 
        bijgewerkt door <strong>${byUser.size}</strong> ${byUser.size === 1 ? "deelnemer" : "deelnemers"} met toestemming om te delen.
      </p>
    </div>
    <div style="padding: 24px;">${userSections}</div>
    <div style="padding: 16px 24px; background: #f5f5f5; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0;">Dit is een automatisch bericht van het Hartspraak huiswerkboek (jaar 2).<br>
      Alleen antwoorden van deelnemers die toestemming hebben gegeven worden gedeeld.</p>
    </div>
  </div>
</body>
</html>`;
}

