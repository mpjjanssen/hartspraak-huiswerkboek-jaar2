/**
 * Maskermaker Portrait Generator — Server Route
 * Roept de Claude API aan om een persoonlijk portret te genereren
 * op basis van de Maskermaker-testscores.
 *
 * Bestand: server/routes/maskermaker-portrait.ts
 */

import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = express.Router();

// Claude client — gebruikt ANTHROPIC_API_KEY uit environment
const anthropic = new Anthropic();

// Structuurinformatie voor de prompt
const STRUCTURE_INFO: Record<string, { name: string; fullName: string; description: string; wound: string; gift: string; challenge: string }> = {
  A: {
    name: "De teruggetrokkene",
    fullName: "Schizoïde structuur",
    description: "Trekt zich terug uit contact en het lichaam wanneer de wereld overweldigend is. Leeft veel in het hoofd, in verbeelding en abstractie.",
    wound: "Het basale recht om te bestaan werd bedreigd — vaak prenataal of in de eerste levensmaanden. De wereld voelde onveilig nog voordat er woorden waren.",
    gift: "Diep innerlijk leven, creativiteit, spirituele gevoeligheid, vermogen om voorbij het gewone te kijken.",
    challenge: "Leren landen in het lichaam, aanwezig blijven in contact, de aarde als veilig ervaren.",
  },
  B: {
    name: "De zoeker",
    fullName: "Orale structuur",
    description: "Zoekt voeding, erkenning en verbinding. Ervaart een basisgevoel van tekort — alsof er nooit genoeg is.",
    wound: "Emotionele of fysieke ondervoeding in de vroege kindertijd. Het kind kreeg niet genoeg — niet genoeg melk, niet genoeg warmte, niet genoeg aanwezigheid.",
    gift: "Empathie, warmte, vermogen om te verbinden, generositeit, gevoeligheid voor de behoeften van anderen.",
    challenge: "Leren dat je genoeg hebt, dat je zelf een bron bent, dat vragen niet hetzelfde is als smeken.",
  },
  S: {
    name: "De versmelter",
    fullName: "Symbiotische structuur",
    description: "Stemt zich af op de ander tot het punt waar de grens tussen zelf en ander vervaagt. Voelt wat de ander voelt, vaak nog voordat de ander het zelf weet.",
    wound: "De ouder (meestal de moeder) had het kind nodig voor eigen emotionele regulatie. Het kind leerde: mijn taak is voelen wat jij voelt en daarvoor zorgen.",
    gift: "Buitengewone gevoeligheid, diep inlevingsvermogen, vermogen om sfeer en onderstroom te lezen.",
    challenge: "Leren waar de ander ophoudt en waar jij begint. Grenzen voelen als membraan, niet als verraad.",
  },
  C: {
    name: "De strateeg",
    fullName: "Psychopathische structuur",
    description: "Neemt de regie, denkt strategisch, positioneert zich boven de situatie. Controle is veiligheid.",
    wound: "Het kind werd gemanipuleerd of verraden door een ouder die macht misbruikte. De les was: als je niet controleert, word je gecontroleerd.",
    gift: "Leiderschap, strategisch denken, daadkracht, vermogen om grote lijnen te zien en anderen te inspireren.",
    challenge: "Leren dat kwetsbaarheid geen zwakte is. Controle loslaten zonder het gevoel te hebben te vallen.",
  },
  D: {
    name: "De drager",
    fullName: "Masochistische structuur",
    description: "Draagt het gewicht van anderen — emotioneel, relationeel, soms letterlijk. Geeft meer dan er terugkomt, vaak zonder het te merken.",
    wound: "Het kind leerde dat eigen behoeften er niet toe deden, of dat het veiliger was te geven dan te vragen. Autonomie werd onderdrukt door overbescherming of beschaming.",
    gift: "Uithoudingsvermogen, loyaliteit, betrouwbaarheid, vermogen om anderen te dragen en vast te houden.",
    challenge: "Leren neerleggen wat niet van jou is. Ontvangen zonder het te hoeven verdienen. Grenzen stellen zonder schuldgevoel.",
  },
  E: {
    name: "De performer",
    fullName: "Rigide structuur",
    description: "Functioneert, presteert, laat zien dat het goed gaat. Houdt de boel bij elkaar door te doen.",
    wound: "Het kind ervoer dat liefde voorwaardelijk was — gekoppeld aan presteren, braaf zijn, voldoen aan verwachtingen. Het hart werd beschermd achter competentie.",
    gift: "Discipline, competentie, doorzettingsvermogen, vermogen om structuur te bieden en doelen te bereiken.",
    challenge: "Leren dat je niet hoeft te presteren om geliefd te zijn. Het hart openen voorbij het functioneren.",
  },
};

const STRUCTURE_ORDER = ["A", "B", "S", "C", "D", "E"];

/**
 * Bouwt de systeem-prompt voor het genereren van een portret.
 */
function buildSystemPrompt(): string {
  return `Je bent een ervaren, warm en psychologisch geschoold schrijver die werkt in de traditie van de lichaamsgerichte psychotherapie (Reich, Lowen, Pierrakos). Je schrijft persoonlijke portretten voor deelnemers die de Maskermaker-test hebben ingevuld — een test die zes karakterstructuren meet.

De zes structuren en hun nieuwe namen:
${STRUCTURE_ORDER.map(s => {
  const info = STRUCTURE_INFO[s];
  return `• ${info.name} (${info.fullName}): ${info.description}
  Wond: ${info.wound}
  Gave: ${info.gift}
  Uitdaging: ${info.challenge}`;
}).join("\n\n")}

SCHRIJFSTIJL:
- Schrijf in de tweede persoon ("je", "jij") — direct, warm, zonder afstand
- Gebruik beeldspraak en metaforen die voelbaar zijn, niet intellectueel
- Schrijf alsof je iemand aankijkt die je kent — niet als diagnose, maar als herkenning
- Gebruik cursieve tekst (*zo*) voor nadruk en kernzinnen
- Gebruik blockquotes (> zo) voor kernformuleringen die de lezer raken
- Gebruik "• • •" als sectie-scheider
- Wees psychologisch precies maar menselijk warm
- Benoem het samenspel tussen structuren — hoe ze elkaar versterken, compenseren, of in de weg zitten
- Benoem ook wat opvallend AFWEZIG is (lage scores) en wat dat betekent
- Eindig altijd met een uitnodiging, nooit met een oordeel

STRUCTUUR VAN HET PORTRET:
1. Titel: "Jouw maskermaker-portret"
2. Ondertitel: "Een persoonlijk profiel op basis van je testresultaten"
3. Profieltype (bijv. "Drager-versmelter")
4. Scores-overzicht
5. "Het grotere beeld" — de dominante structuur in context
6. Samenspel tussen de top-2 of top-3 structuren
7. Achtergrondstructuren en hun subtiele rol
8. Opvallend afwezige structuren en hun betekenis
9. "In relaties" — hoe het profiel zich uit in relaties
10. "Onder stress" — wat er gebeurt als de druk toeneemt
11. "De uitnodiging" — de groeirichting, warm en uitnodigend

Als er discrepanties zijn (verschil ≥25% tussen meetmethoden), verwerk dit in het portret als informatie over het verschil tussen onbewust patroon en zelfbeeld.

BELANGRIJK:
- Gebruik NOOIT de klinische termen (schizoïd, oraal, etc.) in de lopende tekst. Alleen de nieuwe namen.
- Schrijf minimaal 800 woorden, maximaal 1200 woorden
- Elk portret moet uniek zijn — geen standaardtekst, maar echt afgestemd op de specifieke scorecombinatie
- Het portret is bedoeld als therapeutisch instrument, niet als entertainment`;
}

/**
 * Bouwt de gebruikersprompt met de specifieke scores.
 */
function buildUserPrompt(data: {
  normI: Record<string, number>;
  normII: Record<string, number>;
  normIII: Record<string, number>;
  combined: Record<string, number>;
  sorted: string[];
  profileType: string;
  discrepancies: Array<{ structure: string; note: string; spread: number }>;
}): string {
  const { normI, normII, normIII, combined, sorted, profileType, discrepancies } = data;

  // Bepaal profielnaam op basis van top-2
  const top1Name = STRUCTURE_INFO[sorted[0]].name.replace("De ", "").replace("de ", "");
  const top2Name = STRUCTURE_INFO[sorted[1]].name.replace("De ", "").replace("de ", "");
  const profileLabel = `${top1Name.charAt(0).toUpperCase() + top1Name.slice(1)}-${top2Name}`;

  let prompt = `Schrijf een persoonlijk Maskermaker-portret voor iemand met het volgende profiel:

**Profieltype:** ${profileLabel} (${profileType})

**Gecombineerde scores (aflopend):**
${sorted.map((s, i) => `${i + 1}. ${STRUCTURE_INFO[s].name}: ${combined[s]}%`).join("\n")}

**Scores per meetmethode:**
| Structuur | Deel I | Deel II | Deel III | Totaal |
|-----------|--------|---------|----------|--------|
${sorted.map(s => `| ${STRUCTURE_INFO[s].name} | ${normI[s]}% | ${normII[s]}% | ${normIII[s]}% | ${combined[s]}% |`).join("\n")}
`;

  if (discrepancies.length > 0) {
    prompt += `\n**Discrepanties (≥25% verschil tussen meetmethoden):**\n`;
    discrepancies.forEach(d => {
      prompt += `- ${STRUCTURE_INFO[d.structure].name}: ${d.note} (spreiding ${d.spread}%)\n`;
    });
    prompt += `\nVerwerk deze discrepanties in het portret — ze wijzen op een verschil tussen onbewust patroon en bewust zelfbeeld.\n`;
  }

  return prompt;
}

/**
 * POST /api/maskermaker/portrait
 * Genereert een persoonlijk portret op basis van testscores.
 */
router.post("/portrait", async (req, res) => {
  try {
    const { normI, normII, normIII } = req.body;

    // Validatie
    if (!normI || !normII || !normIII) {
      return res.status(400).json({ error: "Alle drie de normscores zijn vereist." });
    }

    // Bereken gecombineerde scores
    const combined: Record<string, number> = {};
    STRUCTURE_ORDER.forEach(s => {
      combined[s] = Math.round(0.40 * normI[s] + 0.30 * normII[s] + 0.30 * normIII[s]);
    });

    // Sorteer op score
    const sorted = [...STRUCTURE_ORDER].sort((a, b) => combined[b] - combined[a]);

    // Bepaal profieltype
    const profileType = (combined[sorted[0]] - combined[sorted[1]] >= 15) ? "Piektype" : "Mengtype";

    // Bereken discrepanties
    const discrepancies: Array<{ structure: string; note: string; spread: number }> = [];
    STRUCTURE_ORDER.forEach(s => {
      const vals = [normI[s], normII[s], normIII[s]];
      const spread = Math.max(...vals) - Math.min(...vals);
      if (spread >= 25) {
        let note = "Verschil tussen de drie meetmethoden";
        if (normI[s] > normIII[s] + 25) note = "Actief patroon, niet erkend in zelfbeeld";
        else if (normIII[s] > normI[s] + 25) note = "Zelfbeeld wijkt af van onbewust patroon";
        discrepancies.push({ structure: s, note, spread: Math.round(spread) });
      }
    });

    // Roep Claude API aan
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: buildSystemPrompt(),
      messages: [
        {
          role: "user",
          content: buildUserPrompt({ normI, normII, normIII, combined, sorted, profileType, discrepancies }),
        },
      ],
    });

    // Extraheer de tekst
    const portraitText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map(block => block.text)
      .join("\n");

    res.json({
      success: true,
      portrait: portraitText,
      profileLabel: `${STRUCTURE_INFO[sorted[0]].name.replace(/^De /, "")} - ${STRUCTURE_INFO[sorted[1]].name.replace(/^De /, "")}`,
      scores: { combined, sorted, discrepancies, profileType },
    });

  } catch (error: any) {
    console.error("Portrait generation error:", error);

    if (error?.status === 429) {
      return res.status(429).json({ error: "Te veel verzoeken. Probeer het over een minuut opnieuw." });
    }

    res.status(500).json({
      error: "Er ging iets mis bij het genereren van je portret. Probeer het opnieuw.",
    });
  }
});

export default router;
