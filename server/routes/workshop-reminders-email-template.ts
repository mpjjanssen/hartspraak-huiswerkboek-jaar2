interface EmailRecipient {
  email: string;
  fullName: string;
  progress: number;
  questionsAnswered: number;
  questionsRemaining: number;
}

interface WorkshopInfo {
  number: number;
  title: string;
  date: string;
  totalQuestions: number;
}

export function generateEmailContent(recipient: EmailRecipient, workshop: WorkshopInfo): string {
  const { fullName, progress, questionsAnswered, questionsRemaining } = recipient;

  let progressMessage = "";
  if (progress === 100) {
    progressMessage = `Je hebt al je huiswerk afgerond! 🎉 Wat fijn dat je zo goed voorbereid bent.`;
  } else if (progress >= 75) {
    progressMessage = `Je bent al goed op weg - ${progress}% is klaar (${questionsAnswered} van ${workshop.totalQuestions} vragen). Nog ${questionsRemaining} ${questionsRemaining === 1 ? "vraag" : "vragen"} te gaan.`;
  } else if (progress >= 50) {
    progressMessage = `Je bent halverwege - ${progress}% is klaar (${questionsAnswered} van ${workshop.totalQuestions} vragen). Nog ${questionsRemaining} ${questionsRemaining === 1 ? "vraag" : "vragen"} te gaan.`;
  } else if (progress > 0) {
    progressMessage = `Je bent begonnen met ${questionsAnswered} ${questionsAnswered === 1 ? "vraag" : "vragen"} (${progress}%). Nog ${questionsRemaining} ${questionsRemaining === 1 ? "vraag" : "vragen"} te gaan.`;
  } else {
    progressMessage = `Je huiswerk wacht nog op je - ${workshop.totalQuestions} vragen om over na te denken.`;
  }

  const encouragement = progress === 100
    ? "Je bent helemaal klaar! We kijken ernaar uit om je tijdens de workshop te zien."
    : progress >= 75
    ? "Je bent er bijna! Een klein beetje tijd en je bent helemaal voorbereid."
    : progress >= 50
    ? "Je bent goed bezig. Neem de tijd die je nodig hebt om de rest af te ronden."
    : progress > 0
    ? "Elke stap telt. Ga op je eigen tempo verder, zonder druk."
    : "Er is geen haast - begin wanneer het voor jou goed voelt. Elke vraag die je beantwoordt, helpt je om meer uit de workshop te halen.";

  return `Beste ${fullName},

Over twee weken vindt Workshop ${workshop.number} plaats: ${workshop.title}
📅 Datum: ${workshop.date}

${progressMessage}

${encouragement}

Het huiswerk is bedoeld om je voor te bereiden, zodat je meer uit de workshop kunt halen. Het gaat niet om perfectie, maar om jouw persoonlijke reflectie.

👉 Ga naar je huiswerk: https://hartspraak-huiswerkboek-production.up.railway.app/workshop/${workshop.number}

Als je vragen hebt of ergens tegenaan loopt, laat het ons gerust weten.

Warme groet,
Martien en Lonneke
Hartspraak

---
P.S. Dit is een automatische herinnering. Je ontvangt deze email omdat je bent ingeschreven voor het Hartspraak programma 2026-2027.`;
}
