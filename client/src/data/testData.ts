// Auto-extracted from karaktertypentest-hartspraak
// Part 1: 25 scenario questions (multiple choice, 6 options each)
// Part 2: 100 yes/no statements
// 6 character structures: A=Schizoïd, B=Oraal, S=Symbiotisch, D=Masochistisch, C=Psychopathisch, E=Rigide

export type StructureCode = "A" | "B" | "S" | "D" | "C" | "E";

export interface Part1Option {
  letter: string;
  text: string;
  score: StructureCode;
}

export interface Part1Question {
  id: number;
  question: string;
  options: Part1Option[];
}

export interface Part2Question {
  id: number;
  question: string;
  score: StructureCode;
}

export interface CharacterStructure {
  code: StructureCode;
  name: string;
  theme: string;
  description: string;
  color: string;
}

export interface TestResult {
  code: StructureCode;
  name: string;
  theme: string;
  description: string;
  color: string;
  score: number;
  percentage: number;
}

export const part1Questions: Part1Question[] = [
  {
    "id": 1,
    "question": "Welke vorm van 'even helemaal weg' zijn of vakantie prefereer je?",
    "options": [
      {
        "letter": "a",
        "text": "Een werkvakantie of zware tocht waar ik mezelf nuttig maak en afzie.",
        "score": "D"
      },
      {
        "letter": "b",
        "text": "Een romantische 'babymoon' of retreat waar ik 24/7 samensmelt met mijn partner.",
        "score": "S"
      },
      {
        "letter": "c",
        "text": "Een perfect geplande stedentrip met een efficiënt schema om alle highlights te zien.",
        "score": "E"
      },
      {
        "letter": "d",
        "text": "Een groepsreis of all-inclusive waar ik volledig verzorgd word en kan relaxen.",
        "score": "B"
      },
      {
        "letter": "e",
        "text": "Een exclusieve VIP-trip vol actie en status (die er goed uitziet op Instagram).",
        "score": "C"
      },
      {
        "letter": "f",
        "text": "Een 'Digital Detox' in een afgelegen hutje, ver weg van mensen en prikkels.",
        "score": "A"
      }
    ]
  },
  {
    "id": 2,
    "question": "Welk genre op Netflix/streamingdiensten kijk je het liefst?",
    "options": [
      {
        "letter": "a",
        "text": "True Crime of detectives waar een mysterie logisch en feitelijk wordt opgelost.",
        "score": "E"
      },
      {
        "letter": "b",
        "text": "Sci-fi, fantasy of abstracte documentaires (ontsnappen aan de realiteit).",
        "score": "A"
      },
      {
        "letter": "c",
        "text": "Series over intense relaties of families die alles samen doen (\"wij tegen de wereld\").",
        "score": "S"
      },
      {
        "letter": "d",
        "text": "Romantische drama's of feelgood series (comfort en warmte).",
        "score": "B"
      },
      {
        "letter": "e",
        "text": "Series over macht, intrige, rijkdom en winnaars (zoals Succession).",
        "score": "C"
      },
      {
        "letter": "f",
        "text": "Zware drama's of documentaires over ellende, die ik over me heen laat komen.",
        "score": "D"
      }
    ]
  },
  {
    "id": 3,
    "question": "Wat is je grootste angst als je je smartphone vergeet?",
    "options": [
      {
        "letter": "a",
        "text": "Dat ik zakelijke kansen mis of mijn invloed/status verlies.",
        "score": "C"
      },
      {
        "letter": "b",
        "text": "Dat ik niet bereikbaar ben en me daardoor leeg of onvervuld voel.",
        "score": "B"
      },
      {
        "letter": "c",
        "text": "Dat ik de verbinding met mijn dierbaren verlies en me 'geamputeerd' voel.",
        "score": "S"
      },
      {
        "letter": "d",
        "text": "Opluchting... eindelijk rust en onbereikbaar zijn in mijn eigen bubbel.",
        "score": "A"
      },
      {
        "letter": "e",
        "text": "Dat ik mijn plichten verzaak of anderen teleurstel (schuldgevoel).",
        "score": "D"
      },
      {
        "letter": "f",
        "text": "Dat mijn planning in de soep loopt en ik de controle over mijn dag verlies.",
        "score": "E"
      }
    ]
  },
  {
    "id": 4,
    "question": "Hoe gedraag je je op een netwerkborrel waar je niemand kent?",
    "options": [
      {
        "letter": "a",
        "text": "Ik voel me zwaar en ongemakkelijk, ik wacht af tot iemand mij 'redt'.",
        "score": "D"
      },
      {
        "letter": "b",
        "text": "Ik houd me aan de etiquette, sta rechtop en zorg dat ik perfect overkom.",
        "score": "E"
      },
      {
        "letter": "c",
        "text": "Ik scan de ruimte, stap op de belangrijkste persoon af en neem de leiding.",
        "score": "C"
      },
      {
        "letter": "d",
        "text": "Ik zoek oogcontact en hoop dat iemand mij aanspreekt, ik voel me klein.",
        "score": "B"
      },
      {
        "letter": "e",
        "text": "Ik plak aan iemand vast die er aardig uitziet en wijk niet van zijn/haar zijde.",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik dissocieer een beetje; ik ben er fysiek wel, maar met mijn hoofd ergens anders.",
        "score": "A"
      }
    ]
  },
  {
    "id": 5,
    "question": "Iemand geeft onterechte kritiek op je in een groepsapp. Hoe reageer je?",
    "options": [
      {
        "letter": "a",
        "text": "Ik reageer met een feitelijke correctie en bewijs met screenshots dat ik gelijk heb.",
        "score": "E"
      },
      {
        "letter": "b",
        "text": "Ik incasseer het, zeg niets, maar voel me zwaar en verongelijkt (\"waarom ik weer\").",
        "score": "D"
      },
      {
        "letter": "c",
        "text": "Ik voel me diep gekwetst en zoek onmiddellijk steun/bevestiging bij anderen.",
        "score": "B"
      },
      {
        "letter": "d",
        "text": "Ik verlaat de groep of reageer helemaal niet (ik trek me terug in mijn schulp).",
        "score": "A"
      },
      {
        "letter": "e",
        "text": "Ik pas me aan aan de mening van de groep om de verbinding niet te verliezen.",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik stuur een scherpe, dominante reactie terug om de discussie te winnen.",
        "score": "C"
      }
    ]
  },
  {
    "id": 6,
    "question": "Wat is jouw relatie tot eten?",
    "options": [
      {
        "letter": "a",
        "text": "Ik eet exclusief of duur; het moet de beste kwaliteit zijn of indruk maken.",
        "score": "C"
      },
      {
        "letter": "b",
        "text": "Ik eet precies hetzelfde als mijn partner; samen eten is versmelten.",
        "score": "S"
      },
      {
        "letter": "c",
        "text": "Ik ben een emotie-eter; ik zoek troost in zoetigheid of zacht voedsel.",
        "score": "B"
      },
      {
        "letter": "d",
        "text": "Ik zoek troost in eten en voel me daarna vaak opgeblazen of zwaar (straffen/belonen).",
        "score": "D"
      },
      {
        "letter": "e",
        "text": "Ik vergeet vaak te eten, of ik heb er weinig gevoel bij (hoofdzaak).",
        "score": "A"
      },
      {
        "letter": "f",
        "text": "Ik eet vaak alleen, snel en zonder er echt van te genieten (functioneel).",
        "score": "E"
      }
    ]
  },
  {
    "id": 7,
    "question": "Hoe sta je op een druk feestje?",
    "options": [
      {
        "letter": "a",
        "text": "Ik sta dicht bij de hapjes/drankjes, zoekend naar vervulling.",
        "score": "B"
      },
      {
        "letter": "b",
        "text": "Ik voel me bezwaard en help maar met opruimen of bedienen (nuttig maken).",
        "score": "D"
      },
      {
        "letter": "c",
        "text": "Ik sta strak in het pak/jurk, houd de controle en voer nette gesprekken.",
        "score": "E"
      },
      {
        "letter": "d",
        "text": "Ik sta in het midden van de belangstelling of zorg dat ik opval.",
        "score": "C"
      },
      {
        "letter": "e",
        "text": "Ik klamp me vast aan iemand die ik ken (of mijn partner) en laat niet los.",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik sta liever aan de rand of buiten, weg van de drukte, observerend.",
        "score": "A"
      }
    ]
  },
  {
    "id": 8,
    "question": "Je wordt 'geghost' na een paar dates. Wat voel je?",
    "options": [
      {
        "letter": "a",
        "text": "Ik voel me beledigd in mijn trots en schakel mijn gevoel uit (hun verlies).",
        "score": "C"
      },
      {
        "letter": "b",
        "text": "Ik voel me geamputeerd; zonder die ander ben ik incompleet.",
        "score": "S"
      },
      {
        "letter": "c",
        "text": "Ik trek me terug. Zie je wel, mensen zijn onveilig en dringen binnen om te verdwijnen.",
        "score": "A"
      },
      {
        "letter": "d",
        "text": "Ik voel me in de steek gelaten en blijf berichten sturen, vragend om contact.",
        "score": "B"
      },
      {
        "letter": "e",
        "text": "Ik voel me zwaar en denk: dit is mijn lot, ik moet dit verdragen.",
        "score": "D"
      },
      {
        "letter": "f",
        "text": "Ik analyseer al onze gesprekken om te zien waar het logischerwijs misging.",
        "score": "E"
      }
    ]
  },
  {
    "id": 9,
    "question": "Wat is jouw \"guilty pleasure\"?",
    "options": [
      {
        "letter": "a",
        "text": "Roddelen of stiekem kijken wie er minder succesvol is dan ik.",
        "score": "C"
      },
      {
        "letter": "b",
        "text": "Urenlang gamen, lezen of verdwijnen in een fantasiewereld.",
        "score": "A"
      },
      {
        "letter": "c",
        "text": "De kleding van mijn partner dragen of hun telefoon checken (alles samen doen).",
        "score": "S"
      },
      {
        "letter": "d",
        "text": "Alles in huis labelen, sorteren op kleur en obsessief schoonmaken.",
        "score": "E"
      },
      {
        "letter": "e",
        "text": "Een hele pot Nutella leeglepelen of comfort food eten tot ik vol zit.",
        "score": "B"
      },
      {
        "letter": "f",
        "text": "Zwelgen in melancholische muziek en me even heel erg slachtoffer voelen.",
        "score": "D"
      }
    ]
  },
  {
    "id": 10,
    "question": "Hoe ervaar je seks/intimiteit?",
    "options": [
      {
        "letter": "a",
        "text": "Het moet 'kloppen', hygiënisch zijn en technisch goed.",
        "score": "E"
      },
      {
        "letter": "b",
        "text": "Ik hunker naar contact en warmte, maar ben bang dat ik niet genoeg krijg.",
        "score": "B"
      },
      {
        "letter": "c",
        "text": "Ik wil volledig versmelten, grenzen laten vervagen en één worden.",
        "score": "S"
      },
      {
        "letter": "d",
        "text": "Ik vind het soms beangstigend of overweldigend en ga 'uit' mijn lichaam.",
        "score": "A"
      },
      {
        "letter": "e",
        "text": "Ik doe het om de ander te plezieren of te dienen; mijn eigen genot is secundair.",
        "score": "D"
      },
      {
        "letter": "f",
        "text": "Het is een prestatie, een spel van verovering en techniek.",
        "score": "C"
      }
    ]
  },
  {
    "id": 11,
    "question": "Wat is jouw grootste valkuil op het werk?",
    "options": [
      {
        "letter": "a",
        "text": "Ik trek me terug en doe mijn koptelefoon op om in mijn eigen wereld te blijven.",
        "score": "A"
      },
      {
        "letter": "b",
        "text": "Ik voel me overal verantwoordelijk voor en neem taken van anderen over.",
        "score": "D"
      },
      {
        "letter": "c",
        "text": "Ik gebruik ellebogenwerk of charme om mijn positie veilig te stellen.",
        "score": "C"
      },
      {
        "letter": "d",
        "text": "Ik klaag over de werkdruk, maar vind het moeilijk om 'nee' te zeggen.",
        "score": "D"
      },
      {
        "letter": "e",
        "text": "Ik ga nog strakker plannen, werk neurotisch de lijsten af en focus op details.",
        "score": "E"
      },
      {
        "letter": "f",
        "text": "Ik raak mijn eigen mening kwijt en neem die van mijn dominante collega over.",
        "score": "S"
      }
    ]
  },
  {
    "id": 12,
    "question": "Hoe ga je om met een geheim dat je hoort?",
    "options": [
      {
        "letter": "a",
        "text": "Ik bewaar het met moeite, het voelt als een zware last die ik moet dragen.",
        "score": "D"
      },
      {
        "letter": "b",
        "text": "Ik houd me strak aan de regels: een geheim is een geheim (integriteit).",
        "score": "E"
      },
      {
        "letter": "c",
        "text": "Ik kan het moeilijk voor me houden, ik heb de drang het te delen voor verbinding.",
        "score": "B"
      },
      {
        "letter": "d",
        "text": "Ik gebruik het strategisch als het mij uitkomt (macht).",
        "score": "C"
      },
      {
        "letter": "e",
        "text": "Ik vertel het aan één iemand met wie ik heel close ben (mijn 'andere helft').",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik houd het voor me, ik deel sowieso weinig van mezelf met de buitenwereld.",
        "score": "A"
      }
    ]
  },
  {
    "id": 13,
    "question": "Wat is je eerste reactie bij grote stress?",
    "options": [
      {
        "letter": "a",
        "text": "Ik probeer de situatie te controleren, te structureren en te ordenen.",
        "score": "E"
      },
      {
        "letter": "b",
        "text": "Ik trek me terug in mijn hoofd en sluit me af van de wereld.",
        "score": "A"
      },
      {
        "letter": "c",
        "text": "Ik zoek onmiddellijk iemand om mijn gevoelens bij te storten (ventileren).",
        "score": "B"
      },
      {
        "letter": "d",
        "text": "Ik klamp me vast aan een 'redder' of voel me slachtoffer.",
        "score": "D"
      },
      {
        "letter": "e",
        "text": "Ik pas me aan de ander aan en verlies mezelf in de chaos.",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik voel een leegte en probeer die te vullen (eten, kopen, aandacht).",
        "score": "B"
      }
    ]
  },
  {
    "id": 14,
    "question": "Wat vind je van deadlines?",
    "options": [
      {
        "letter": "a",
        "text": "Ik voel me snel één met het team en verlies mijn eigen taken uit het oog.",
        "score": "S"
      },
      {
        "letter": "b",
        "text": "Ik werk door tot ik erbij neerval, ten koste van mezelf (lijden).",
        "score": "D"
      },
      {
        "letter": "c",
        "text": "Ze benauwen me; ik wil mijn eigen ritme en vrijheid.",
        "score": "A"
      },
      {
        "letter": "d",
        "text": "Ik haal ze perfect, maar raak gestrest als de regels onduidelijk zijn.",
        "score": "E"
      },
      {
        "letter": "e",
        "text": "Ik heb hulp en steun nodig om ze te halen, anders verdrink ik.",
        "score": "B"
      },
      {
        "letter": "f",
        "text": "Ik gebruik ze om druk op anderen te zetten en te presteren.",
        "score": "C"
      }
    ]
  },
  {
    "id": 15,
    "question": "Hoe sta je op een groepsfoto?",
    "options": [
      {
        "letter": "a",
        "text": "Ik sta er een beetje 'hangend' bij, leunend tegen iemand aan.",
        "score": "B"
      },
      {
        "letter": "b",
        "text": "Ik sta erbij met een houding van \"ik ben de leider\" of \"kijk naar mij\".",
        "score": "C"
      },
      {
        "letter": "c",
        "text": "Ik sta er een beetje ongemakkelijk bij, alsof ik er niet echt wil zijn.",
        "score": "A"
      },
      {
        "letter": "d",
        "text": "Ik sta er een beetje ongemakkelijk bij, strak in de plooi (gecontroleerd).",
        "score": "E"
      },
      {
        "letter": "e",
        "text": "Ik sta vooraan, zoekend naar connectie, glimlachend voor goedkeuring.",
        "score": "B"
      },
      {
        "letter": "f",
        "text": "Ik sta strak tegen mijn partner of beste vriend aan gedrukt.",
        "score": "S"
      }
    ]
  },
  {
    "id": 16,
    "question": "Wat doe je als je je eenzaam voelt?",
    "options": [
      {
        "letter": "a",
        "text": "Ik ga obsessief schoonmaken, werken of sporten (actie/prestatie).",
        "score": "E"
      },
      {
        "letter": "b",
        "text": "Ik ga mensen appen/bellen, op zoek naar iemand die reageert.",
        "score": "B"
      },
      {
        "letter": "c",
        "text": "Ik ga piekeren, voel de zwaarte van het leven en doe niets.",
        "score": "D"
      },
      {
        "letter": "d",
        "text": "Ik zoek prikkels (eten, drinken, tv) om de leegte te vullen.",
        "score": "B"
      },
      {
        "letter": "e",
        "text": "Ik klamp me vast aan de dichtstbijzijnde persoon.",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik trek me nog verder terug in meditatie, boeken of mijn hoofd (veiligheid).",
        "score": "A"
      }
    ]
  },
  {
    "id": 17,
    "question": "Hoe ziet jouw ideale woning eruit?",
    "options": [
      {
        "letter": "a",
        "text": "Een mix van stijlen, vooral aangepast aan wie er bij me woont (\"ons huis\").",
        "score": "S"
      },
      {
        "letter": "b",
        "text": "Strak, minimalistisch, design, alles heeft een vaste plek (perfectie).",
        "score": "E"
      },
      {
        "letter": "c",
        "text": "Een veilige plek met dikke muren, waar niemand zomaar binnenkomt.",
        "score": "A"
      },
      {
        "letter": "d",
        "text": "Vol met spullen, rommelig, zwaar meubilair, een beetje beklemmend.",
        "score": "D"
      },
      {
        "letter": "e",
        "text": "Gezellig, vol kussens, warmte en eten (een nest).",
        "score": "B"
      },
      {
        "letter": "f",
        "text": "Spartaans, ik heb weinig nodig om te leven, functioneel.",
        "score": "A"
      }
    ]
  },
  {
    "id": 18,
    "question": "Iemand vraagt je om hulp bij een zware verhuizing. Wat doe je?",
    "options": [
      {
        "letter": "a",
        "text": "Ik help, maar zucht en steun de hele dag over hoe zwaar het is.",
        "score": "D"
      },
      {
        "letter": "b",
        "text": "Ik stuur iemand anders of regel het zo dat ik zelf niet hoef te zweten.",
        "score": "C"
      },
      {
        "letter": "c",
        "text": "Ik trek me terug en zeg dat ik niet kan (smoesje of stilte).",
        "score": "A"
      },
      {
        "letter": "d",
        "text": "Ik help mee en doe precies wat er gevraagd wordt (volgzaam).",
        "score": "D"
      },
      {
        "letter": "e",
        "text": "Ik ga mee als mijn partner ook gaat, we doen het samen.",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik ga mee, maar voel me al snel leeg en heb veel aanmoediging nodig.",
        "score": "B"
      }
    ]
  },
  {
    "id": 19,
    "question": "Hoe ga je om met autoriteit (je baas, politie)?",
    "options": [
      {
        "letter": "a",
        "text": "Ik probeer perfect te doen wat er gevraagd wordt om geen fouten te maken.",
        "score": "E"
      },
      {
        "letter": "b",
        "text": "Ik dissocieer een beetje; ze raken me niet echt, ik ben onbereikbaar.",
        "score": "A"
      },
      {
        "letter": "c",
        "text": "Ik zoek bevestiging en goedkeuring, bang om het fout te doen.",
        "score": "B"
      },
      {
        "letter": "d",
        "text": "Ik voel me zwaar en onderdanig, ik verdraag het maar.",
        "score": "D"
      },
      {
        "letter": "e",
        "text": "Ik pas me volledig aan en voel wat de autoriteit van mij verwacht (versmelting).",
        "score": "S"
      },
      {
        "letter": "f",
        "text": "Ik voel me snel verontwaardigd of ga de strijd aan (ik laat me niet kisten).",
        "score": "C"
      }
    ]
  },
  {
    "id": 20,
    "question": "Wat is jouw houding ten opzichte van het woord 'ik'?",
    "options": [
      {
        "letter": "a",
        "text": "Ik zeg liever \"wij\"; ik voel me onderdeel van een symbiose.",
        "score": "S"
      },
      {
        "letter": "b",
        "text": "Ik vind het moeilijk om \"ik\" te zeggen, ik voel me minderwaardig/zwaar.",
        "score": "D"
      },
      {
        "letter": "c",
        "text": "Ik zie \"ik\" als een project dat geperfectioneerd moet worden.",
        "score": "E"
      },
      {
        "letter": "d",
        "text": "Ik voel me klein en behoeftig als ik \"ik\" moet zeggen.",
        "score": "B"
      },
      {
        "letter": "e",
        "text": "Ik ben heel erg op mezelf, mijn \"ik\" is een veilige vesting.",
        "score": "A"
      },
      {
        "letter": "f",
        "text": "Ik heb een sterk ego, ik sta graag vooraan of boven anderen.",
        "score": "C"
      }
    ]
  },
  {
    "id": 21,
    "question": "Hoe gedraag je je in een liefdesrelatie?",
    "options": [
      {
        "letter": "a",
        "text": "Ik zoek constante nabijheid en versmelting (grenzeloos).",
        "score": "S"
      },
      {
        "letter": "b",
        "text": "Ik heb veel bevestiging nodig en klamp me vast (angst voor tekort).",
        "score": "B"
      },
      {
        "letter": "c",
        "text": "Ik geef mezelf helemaal weg en cijfer mezelf weg voor de ander (opoffering).",
        "score": "D"
      },
      {
        "letter": "d",
        "text": "Ik streef naar perfectie in de relatie en werk er hard aan (prestatie).",
        "score": "E"
      },
      {
        "letter": "e",
        "text": "Ik ben dominant of manipulatief om de controle te houden.",
        "score": "C"
      },
      {
        "letter": "f",
        "text": "Ik vind het moeilijk om me te binden; ik heb veel vrijheid nodig.",
        "score": "A"
      }
    ]
  },
  {
    "id": 22,
    "question": "Wat is je grootste kracht?",
    "options": [
      {
        "letter": "a",
        "text": "Mijn vermogen om mensen te charmeren en dingen voor elkaar te krijgen.",
        "score": "C"
      },
      {
        "letter": "b",
        "text": "Mijn uithoudingsvermogen; ik kan veel dragen en verdragen.",
        "score": "D"
      },
      {
        "letter": "c",
        "text": "Mijn discipline, structuur en oog voor detail.",
        "score": "E"
      },
      {
        "letter": "d",
        "text": "Mijn gevoeligheid en vermogen om me te verbinden (hulp vragen).",
        "score": "B"
      },
      {
        "letter": "e",
        "text": "Mijn onafhankelijkheid, observatievermogen en fantasie.",
        "score": "A"
      },
      {
        "letter": "f",
        "text": "Mijn vermogen om me aan te passen en in te voelen in anderen.",
        "score": "S"
      }
    ]
  },
  {
    "id": 23,
    "question": "Wat vind je van 'small talk' over koetjes en kalfjes?",
    "options": [
      {
        "letter": "a",
        "text": "Ik pas me aan de ander aan en praat mee met de sfeer.",
        "score": "S"
      },
      {
        "letter": "b",
        "text": "Leuk als ik de leiding heb in het gesprek en kan shinen.",
        "score": "C"
      },
      {
        "letter": "c",
        "text": "Vermoeiend, ik wil liever diepe emotionele verbinding en steun.",
        "score": "B"
      },
      {
        "letter": "d",
        "text": "Vreselijk, ik weet nooit wat ik moet zeggen en trek me terug.",
        "score": "A"
      },
      {
        "letter": "e",
        "text": "Ik vind het zonde van de tijd, ik wil nuttige of diepe gesprekken.",
        "score": "E"
      },
      {
        "letter": "f",
        "text": "Ik doe het wel, maar voel me er ongemakkelijk en 'gemaakt' bij.",
        "score": "D"
      }
    ]
  },
  {
    "id": 24,
    "question": "Hoe ziet jouw kledingstijl eruit?",
    "options": [
      {
        "letter": "a",
        "text": "Perfect verzorgd, schoon, strak, 'correct' volgens de situatie.",
        "score": "E"
      },
      {
        "letter": "b",
        "text": "Onopvallend, bedekkend, misschien wat zwaar of donker.",
        "score": "D"
      },
      {
        "letter": "c",
        "text": "Ik trek vaak hetzelfde aan als ik denk dat het me 'veilig' maakt (ongezien).",
        "score": "A"
      },
      {
        "letter": "d",
        "text": "Sexy, opvallend, merkleding of duur; ik wil indruk maken.",
        "score": "C"
      },
      {
        "letter": "e",
        "text": "Comfortabel, zacht, of ik vraag anderen wat ik aan moet.",
        "score": "B"
      },
      {
        "letter": "f",
        "text": "'Wij' kleden ons vaak in dezelfde stijl (matching).",
        "score": "S"
      }
    ]
  },
  {
    "id": 25,
    "question": "Wat is je diepste, onbewuste overtuiging?",
    "options": [
      {
        "letter": "a",
        "text": "\"Ik moet lijden of hard werken om bestaansrecht te hebben.\"",
        "score": "D"
      },
      {
        "letter": "b",
        "text": "\"Er is niet genoeg voor mij, ik kom altijd tekort.\"",
        "score": "B"
      },
      {
        "letter": "c",
        "text": "\"Zonder jou ben ik niets; alleen ben ik verloren.\"",
        "score": "S"
      },
      {
        "letter": "d",
        "text": "\"De wereld is onveilig, ik moet me terugtrekken om te overleven.\"",
        "score": "A"
      },
      {
        "letter": "e",
        "text": "\"Ik moet de beste zijn/winnen om niet gebruikt te worden.\"",
        "score": "C"
      },
      {
        "letter": "f",
        "text": "\"Als ik niet perfect ben, word ik afgewezen.\"",
        "score": "E"
      }
    ]
  }
];

export const part2Questions: Part2Question[] = [
  {
    "id": 1,
    "question": "Heb je moeite om te weten wat JIJ wilt, los van wat je partner/vrienden willen?",
    "score": "S"
  },
  {
    "id": 2,
    "question": "Heb je vaak het gevoel dat je niet echt 'in' je lichaam zit (dissociatie)?",
    "score": "A"
  },
  {
    "id": 3,
    "question": "Eet je vaak je bord leeg, ook als je vol zit, uit schuldgevoel of gewoonte?",
    "score": "D"
  },
  {
    "id": 4,
    "question": "Ben je vaak onhandig of stoot je je vaak?",
    "score": "A"
  },
  {
    "id": 5,
    "question": "Geef je vaak toe in een discussie om de harmonie te bewaren?",
    "score": "S"
  },
  {
    "id": 6,
    "question": "Vlucht je liever in je hoofd (denken/analyseren) dan dat je voelt?",
    "score": "A"
  },
  {
    "id": 7,
    "question": "Is 'volhouden' of 'doorbijten' een van jouw grootste kwaliteiten?",
    "score": "D"
  },
  {
    "id": 8,
    "question": "Zou je wel willen huilen om spanning los te laten, maar lukt het niet?",
    "score": "E"
  },
  {
    "id": 9,
    "question": "Heb je een mond die eruitziet alsof hij iets wil 'vragen' of 'zuigen'?",
    "score": "B"
  },
  {
    "id": 10,
    "question": "Vind je het belangrijk om in bed goed te presteren of technieken te kennen?",
    "score": "E"
  },
  {
    "id": 11,
    "question": "Neem je in groepen graag de leiding of controle over?",
    "score": "C"
  },
  {
    "id": 12,
    "question": "Kun je seks en liefde makkelijk van elkaar scheiden?",
    "score": "C"
  },
  {
    "id": 13,
    "question": "Heb je de neiging om gedachten en gevoelens strikt van elkaar te scheiden?",
    "score": "E"
  },
  {
    "id": 14,
    "question": "Kun je urenlang genieten van geaaid en geknuffeld worden?",
    "score": "B"
  },
  {
    "id": 15,
    "question": "Vind je het ongemakkelijk om iemand lang en diep in de ogen te kijken?",
    "score": "A"
  },
  {
    "id": 16,
    "question": "Vind je het vreselijk om een avond alleen thuis te zijn?",
    "score": "B"
  },
  {
    "id": 17,
    "question": "Heb je het gevoel dat je hoofd zwaar is of vol zit?",
    "score": "D"
  },
  {
    "id": 18,
    "question": "Heb je brede, gespannen schouders (alsof je een last draagt)?",
    "score": "D"
  },
  {
    "id": 19,
    "question": "Raak je snel geïrriteerd als dingen niet gaan zoals jij wilt?",
    "score": "E"
  },
  {
    "id": 20,
    "question": "Voelt het woord \"ik\" soms egoïstisch of ongemakkelijk om te gebruiken?",
    "score": "S"
  },
  {
    "id": 21,
    "question": "Heb je wel eens meerdere relaties of flirts tegelijkertijd (om leegte te vullen)?",
    "score": "B"
  },
  {
    "id": 22,
    "question": "Werd je als kind erg gepusht om te presteren door je ouders?",
    "score": "E"
  },
  {
    "id": 23,
    "question": "Voelde je je als kind vaak onbelangrijk of niet gezien in het gezin?",
    "score": "B"
  },
  {
    "id": 24,
    "question": "Overvalt je soms een gevoel van paniek of horror zonder duidelijke reden?",
    "score": "A"
  },
  {
    "id": 25,
    "question": "Vind je het moeilijk om spontaan blijdschap te tonen (gezicht in de plooi)?",
    "score": "E"
  },
  {
    "id": 26,
    "question": "Ben je soms bang dat je 'vernietigd' of overspoeld wordt door de buitenwereld?",
    "score": "A"
  },
  {
    "id": 27,
    "question": "Flirt je graag en zet je je charme in als instrument?",
    "score": "C"
  },
  {
    "id": 28,
    "question": "Ben je iemand die altijd bezig moet zijn en moeilijk stilzit ('doen')?",
    "score": "E"
  },
  {
    "id": 29,
    "question": "Ben je snel moe of voel je je snel leeggezogen na contact?",
    "score": "B"
  },
  {
    "id": 30,
    "question": "Speelde je vader (of machtsfiguur) een dominante rol in je jeugd?",
    "score": "C"
  },
  {
    "id": 31,
    "question": "Cijfer je jezelf makkelijk weg voor de behoeften van een ander?",
    "score": "S"
  },
  {
    "id": 32,
    "question": "Is je nek eerder kort en dik (alsof je hem intrekt)?",
    "score": "D"
  },
  {
    "id": 33,
    "question": "Was je als kind stiekem ongehoorzaam (uiterlijk braaf, innerlijk verzet)?",
    "score": "D"
  },
  {
    "id": 34,
    "question": "Is waardering en bewondering van anderen cruciaal voor je zelfbeeld?",
    "score": "C"
  },
  {
    "id": 35,
    "question": "Is je huid vaak bleek of zie je er vermoeid uit?",
    "score": "A"
  },
  {
    "id": 36,
    "question": "Voel je je onrustig als je partner niet direct op een appje reageert?",
    "score": "S"
  },
  {
    "id": 37,
    "question": "Heb je een charismatische uitstraling waar mensen op afkomen?",
    "score": "C"
  },
  {
    "id": 38,
    "question": "Heb je meer aandacht en bevestiging nodig dan de meeste mensen?",
    "score": "B"
  },
  {
    "id": 39,
    "question": "Kun je makkelijk met je vuist op tafel slaan als het moet?",
    "score": "C"
  },
  {
    "id": 40,
    "question": "Moest je als kind altijd gehoorzamen en 'braaf' zijn?",
    "score": "D"
  },
  {
    "id": 41,
    "question": "Heb je een diepe angst om verlaten te worden?",
    "score": "B"
  },
  {
    "id": 42,
    "question": "Heb je heldere, glanzende ogen (soms met een starende of priemende blik)?",
    "score": "C"
  },
  {
    "id": 43,
    "question": "Praat je snel en veel, alsof je bang bent onderbroken te worden?",
    "score": "B"
  },
  {
    "id": 44,
    "question": "Droom je ervan een held te zijn of iemand te redden?",
    "score": "C"
  },
  {
    "id": 45,
    "question": "Heb je een stevig of 'gevuld' achterwerk?",
    "score": "D"
  },
  {
    "id": 46,
    "question": "Pas je je energie automatisch aan aan de sfeer in de kamer?",
    "score": "S"
  },
  {
    "id": 47,
    "question": "Heb je een gevoel van leegte (ingevallen plek) bij je borstbeen?",
    "score": "B"
  },
  {
    "id": 48,
    "question": "Voel je je snel afhankelijk van anderen voor je geluk?",
    "score": "B"
  },
  {
    "id": 49,
    "question": "Zeg je vaak dat je nooit bang bent?",
    "score": "C"
  },
  {
    "id": 50,
    "question": "Heb je een grote mond of ben je verbaal sterk?",
    "score": "C"
  },
  {
    "id": 51,
    "question": "Ben je bang om uit elkaar te vallen (fragmentatie) als je je laat gaan?",
    "score": "A"
  },
  {
    "id": 52,
    "question": "Heb je een holle rug (onderrug naar voren)?",
    "score": "E"
  },
  {
    "id": 53,
    "question": "Ben je graag en veel alleen (isolatie)?",
    "score": "A"
  },
  {
    "id": 54,
    "question": "Weet je niet goed wie je bent los van je relatie/werk?",
    "score": "S"
  },
  {
    "id": 55,
    "question": "Twijfel je vaak aan je eigen mening als iemand anders iets zegt?",
    "score": "S"
  },
  {
    "id": 56,
    "question": "Zoek je steeds nieuwe prikkels of partners?",
    "score": "B"
  },
  {
    "id": 57,
    "question": "Is je bovenlichaam veel sterker ontwikkeld dan je onderlichaam?",
    "score": "C"
  },
  {
    "id": 58,
    "question": "Ben je traag in je bewegingen of kom je moeilijk op gang?",
    "score": "D"
  },
  {
    "id": 59,
    "question": "Voel je je vaak afgewezen of niet welkom in de wereld?",
    "score": "A"
  },
  {
    "id": 60,
    "question": "Voel je je soms onverzadigbaar (eten, aandacht, kopen)?",
    "score": "B"
  },
  {
    "id": 61,
    "question": "Voel je je snel verantwoordelijk voor hoe anderen zich voelen?",
    "score": "S"
  },
  {
    "id": 62,
    "question": "Had je een moeder die veel zorgde maar ook verstikkend/claimend was?",
    "score": "S"
  },
  {
    "id": 63,
    "question": "Wil je wel relaties, maar mag het niet té intiem/kwetsbaar worden?",
    "score": "A"
  },
  {
    "id": 64,
    "question": "Hebben mensen het vaak over je aangename of verleidelijke stem?",
    "score": "B"
  },
  {
    "id": 65,
    "question": "Was je vroeger klassenvertegenwoordiger of leider van de groep?",
    "score": "C"
  },
  {
    "id": 66,
    "question": "Heb je opvallend grote, vragende ogen?",
    "score": "B"
  },
  {
    "id": 67,
    "question": "Raak je snel opgezogen in de problemen van anderen?",
    "score": "S"
  },
  {
    "id": 68,
    "question": "Ben je gek op zachte dingen (knuffels, dekens, comfort)?",
    "score": "B"
  },
  {
    "id": 69,
    "question": "Vind je het vreselijk als iemand je ziet huilen (gezichtsverlies)?",
    "score": "E"
  },
  {
    "id": 70,
    "question": "Voel je je snel gedwongen of in een hoek gedreven?",
    "score": "D"
  },
  {
    "id": 71,
    "question": "Was je als baby veel alleen of moest je jezelf vermaken?",
    "score": "A"
  },
  {
    "id": 72,
    "question": "Voel je zoveel mee dat je niet meer weet wat van jou is?",
    "score": "S"
  },
  {
    "id": 73,
    "question": "Schik je je naar wat de ander wil om ruzie te voorkomen?",
    "score": "S"
  },
  {
    "id": 74,
    "question": "Kun je moeilijk kiezen in een restaurant (kijken wat de ander neemt)?",
    "score": "S"
  },
  {
    "id": 75,
    "question": "Vind je het moeilijk om grenzen te stellen ('nee' zeggen)?",
    "score": "S"
  },
  {
    "id": 76,
    "question": "Vind je het moeilijk om alleen belangrijke beslissingen te nemen?",
    "score": "S"
  },
  {
    "id": 77,
    "question": "Ben je bang om anders te zijn dan de groep?",
    "score": "S"
  },
  {
    "id": 78,
    "question": "Neem je vaak dezelfde keuzes/smaak over als mensen om je heen?",
    "score": "S"
  },
  {
    "id": 79,
    "question": "Kun je moeilijk bij jezelf blijven als iemand verdrietig is?",
    "score": "S"
  },
  {
    "id": 80,
    "question": "Voel je je schuldig als je kiest wat jij wilt ten koste van een ander?",
    "score": "S"
  },
  {
    "id": 81,
    "question": "Ben je sterk behaard of heb je een 'dikke huid'?",
    "score": "D"
  },
  {
    "id": 82,
    "question": "Was je als kind een kameleon (aanpassen aan iedereen)?",
    "score": "S"
  },
  {
    "id": 83,
    "question": "Voel je haarfijn aan wat er onuitgesproken speelt tussen mensen?",
    "score": "S"
  },
  {
    "id": 84,
    "question": "Stop je vaak met projecten voordat ze af zijn (gebrek aan energie)?",
    "score": "B"
  },
  {
    "id": 85,
    "question": "Ben je bang dat je dierbaren je verlaten of doodgaan?",
    "score": "B"
  },
  {
    "id": 86,
    "question": "Voel je je stiekem een slecht of schuldig mens?",
    "score": "D"
  },
  {
    "id": 87,
    "question": "Zeg je vaker 'wij' dan 'ik'?",
    "score": "S"
  },
  {
    "id": 88,
    "question": "Klaag of jammer je regelmatig over hoe zwaar het is?",
    "score": "D"
  },
  {
    "id": 89,
    "question": "Heb je het gevoel dat je iets moet presteren om geliefd te zijn?",
    "score": "E"
  },
  {
    "id": 90,
    "question": "Heb je een strakke, gespannen kaaklijn?",
    "score": "E"
  },
  {
    "id": 91,
    "question": "Neig je naar depressiviteit of zwaarmoedigheid?",
    "score": "D"
  },
  {
    "id": 92,
    "question": "Voel je een leegte als je geliefden er niet zijn?",
    "score": "B"
  },
  {
    "id": 93,
    "question": "Is de vraag \"wie ben ik\" pijnlijk of verwarrend voor jou?",
    "score": "S"
  },
  {
    "id": 94,
    "question": "Ben je afhankelijk van de aanwezigheid van anderen om je goed te voelen?",
    "score": "S"
  },
  {
    "id": 95,
    "question": "Vind je het moeilijk om je hart te volgen (ratio wint)?",
    "score": "E"
  },
  {
    "id": 96,
    "question": "Heb je altijd koude handen en voeten?",
    "score": "A"
  },
  {
    "id": 97,
    "question": "Ben je erg zwijgzaam of teruggetrokken in gezelschap?",
    "score": "A"
  },
  {
    "id": 98,
    "question": "Heb je het gevoel dat niemand echt naar je luistert?",
    "score": "B"
  },
  {
    "id": 99,
    "question": "Droom je vaak weg (dagdromen) om aan de realiteit te ontsnappen?",
    "score": "A"
  },
  {
    "id": 100,
    "question": "Heb je een vlak of ingetrokken achterwerk (alsof je staart tussen je benen zit)?",
    "score": "A"
  }
];

export const characterStructures: CharacterStructure[] = [
  {
    "code": "A",
    "name": "Schizoïde structuur",
    "theme": "Ik heb het recht om te bestaan",
    "description": "Kern: angst voor contact en nabijheid, terugtrekking, moeilijkheden met het voelen van emoties en lichamelijke sensaties.",
    "color": "oklch(0.70 0.12 220)"
  },
  {
    "code": "B",
    "name": "Orale structuur",
    "theme": "Ik heb het recht om behoeftig te zijn",
    "description": "Kern: afhankelijkheid, angst voor verlating, honger naar contact en bevestiging, gebrek aan innerlijke steun.",
    "color": "oklch(0.60 0.14 200)"
  },
  {
    "code": "S",
    "name": "Symbiotische structuur",
    "theme": "Ik ben wat ik voel",
    "description": "Kern: vervloeiing met de ander, moeite met autonomie, angst voor alleen zijn, onduidelijke identiteit, kameleongedrag.",
    "color": "oklch(0.65 0.15 260)"
  },
  {
    "code": "D",
    "name": "Masochistische structuur",
    "theme": "Ik mag zijn als ik me onderwerp",
    "description": "Kern: onderdrukte assertiviteit, moeilijkheden met zelfexpressie, angst voor vrijheid, passief-agressief gedrag.",
    "color": "oklch(0.55 0.12 160)"
  },
  {
    "code": "C",
    "name": "Psychopathische structuur",
    "theme": "Ik ben wat ik kan",
    "description": "Kern: controle, wantrouwen, moeite met kwetsbaarheid tonen, angst voor onderwerping, dominantiegedrag.",
    "color": "oklch(0.65 0.13 180)"
  },
  {
    "code": "E",
    "name": "Rigide structuur",
    "theme": "Ik ben wat ik presteer",
    "description": "Kern: perfectionisme, controle over emoties, angst voor vernedering, moeilijkheden met overgave en kwetsbaarheid.",
    "color": "oklch(0.50 0.11 140)"
  }
];

export function calculateResults(
  part1Answers: Record<number, string>,
  part2Answers: Record<number, boolean>
): TestResult[] {
  const scores: Record<StructureCode, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, S: 0 };

  // Score Part 1
  part1Questions.forEach((q) => {
    const selected = part1Answers[q.id];
    if (selected) {
      const option = q.options.find((o) => o.letter === selected);
      if (option) {
        const code = option.score;
        scores[code] = (scores[code] || 0) + 1;
      }
    }
  });

  // Score Part 2
  part2Questions.forEach((q) => {
    if (part2Answers[q.id]) {
      const code = q.score;
      scores[code] = (scores[code] || 0) + 1;
    }
  });

  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);

  return characterStructures.map((s) => ({
    code: s.code,
    name: s.name,
    theme: s.theme,
    description: s.description,
    color: s.color,
    score: scores[s.code] || 0,
    percentage: total > 0 ? Math.round((scores[s.code] / total) * 100) : 0,
  }));
}

