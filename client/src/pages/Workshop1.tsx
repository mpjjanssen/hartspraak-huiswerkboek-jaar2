import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { AnswerField } from "@/components/AnswerField";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AIHelper } from "@/components/AIHelper";

interface QuestionPair {
  id: string;
  section: string;
  mainQuestion: {
    id: string;
    title: string;
    fullText: string;
  };
  deepQuestion: {
    id: string;
    title: string;
    fullText: string;
  };
}

export default function Workshop1() {
  const questionPairs: QuestionPair[] = [
    {
      id: "pair-1",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-q1-main",
        title: "Het Eerste Welkom",
        fullText: "Boek: Van wond naar wonder, Hoofdstuk 1\n\nVraag: Als je stilstaat bij je eigen begin (zwangerschap, geboorte), wat is dan het verhaal dat je lichaam je vertelt? Voelde je je welkom, of was er een sensatie van kou, stress of 'verkeerd' zijn?\n\n\"In mijn jaren van werken met trauma heb ik geleerd dat de schizoïde structuur zich ontwikkelt in een zeer specifieke periode: voor, tijdens en direct na de geboorte. Het is de tijd waarin we het meest kwetsbaar zijn [...] Een cliënt vertelde me eens: 'Ik wist vanaf het begin dat ik een vergissing was. Niet in woorden natuurlijk, maar mijn lichaam wist het.'\"\n(Bron: Van wond naar wonder, Hoofdstuk 1, Blz. 19)"
      },
      deepQuestion: {
        id: "ws1-q1-deep",
        title: "Het Eerste Welkom - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Als je lichaam zou kunnen spreken over het allereerste moment dat het 'besloot' om zich terug te trekken of te beschermen, wat zou het dan zeggen? En wat had het nodig gehad om die beslissing niet te hoeven nemen?"
      }
    },
    {
      id: "pair-2",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-q2-main",
        title: "De Ladder naar de Hemel",
        fullText: "Vraag: Herken jij bij jezelf de neiging om een \"ladder naar de hemel\" uit te zetten? Heb je het gevoel dat je hier op aarde 'te gast' bent, of dat je eigenlijk ergens anders thuishoort?\n\n\"Hij vocht uit alle macht voor zijn ladder naar de hemel, een ontsnapping naar de wereld van oneindigheid. Hij kon immers niet zonder die vluchtroute. Als hij het moeilijk had op aarde klom hij meteen omhoog en weg was hij.\"\n(Bron: De Maskermaker, Hoofdstuk 4)"
      },
      deepQuestion: {
        id: "ws1-q2-deep",
        title: "De Ladder naar de Hemel - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Wat zou er veranderen als je die ladder niet meer nodig had? Wat zou je moeten voelen, ervaren of onder ogen zien als je volledig op aarde zou landen?"
      }
    },
    {
      id: "pair-3",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-q3-main",
        title: "De Systemische Blik",
        fullText: "Vraag: Soms kijken we niet naar het leven, maar naar de dood of naar iemand die er niet meer is. Is er in jouw familiesysteem sprake van 'dubbele werkelijkheid' (geheimen, verzwegen familieleden of onverwerkte rouw) waardoor jouw aandacht onbewust naar 'de andere kant' wordt getrokken?\n\n\"Een systemische vraag is 'waar is iemand naartoe als hij innerlijk vertrekt, wie is hij trouw'. [...] Vaak leef je als het ware in een dubbele werkelijkheid: terwijl je je in de aardse realiteit beweegt, luister je tegelijkertijd naar de roep van die andere wereld.\"\n(Bron: De Maskermaker, Hoofdstuk 4)"
      },
      deepQuestion: {
        id: "ws1-q3-deep",
        title: "De Systemische Blik - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Als je zou ontdekken dat je onbewust trouw bent aan iemand die niet meer leeft of die uit het systeem is gestoten, wat zou je tegen die persoon willen zeggen? En wat zou je nodig hebben om je blik volledig naar het leven te kunnen richten?"
      }
    },
    {
      id: "pair-4",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-q4-main",
        title: "De Glazen Muur",
        fullText: "Vraag: Herken je het patroon dat je relaties kiest die 'veilig' zijn omdat ze niet écht dichtbij komen (lange afstand, emotioneel onbereikbaar)? Of dat je zelf een onzichtbare muur optrekt zodra iemand te dichtbij komt?\n\n\"Een partner van een schizoïde cliënt zei me eens: 'Het is alsof ik verliefd ben geworden op iemand achter een glazen muur. Ik kan hem zien, soms zelfs voelen, maar er is altijd die barrière tussen ons.'\"\n(Bron: Van wond naar wonder, Hoofdstuk 1)"
      },
      deepQuestion: {
        id: "ws1-q4-deep",
        title: "De Glazen Muur - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Wat is de ergste angst die je hebt over wat er zou gebeuren als iemand je werkelijk zou zien en kennen? En wat zou je kunnen winnen als je dat risico toch zou nemen?"
      }
    },
    {
      id: "pair-5",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-q5-main",
        title: "Contactbreuk en Terugtrekking",
        fullText: "Vraag: Wanneer in een contact haak jij af? Wat doe je precies als je afhaakt? (Bijvoorbeeld: oogcontact verbreken, intellectueel gaan praten, of fysiek de kamer verlaten).\n\n\"Je ijzig terugtrekken is je meest vertrouwde oplossing bij een conflict. Zo probeer je buiten de relatie te blijven. Dat geldt ook voor je neiging tot ontkennen als de ander je duidelijk maakt dat je er niet werkelijk bent.\"\n(Bron: De Maskermaker, Hoofdstuk 4)"
      },
      deepQuestion: {
        id: "ws1-q5-deep",
        title: "Contactbreuk en Terugtrekking - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Kun je het exacte moment herkennen waarop de 'schakelaar' omgaat? Wat voelde je net vóór dat moment, en wat probeer je te ontwijken door weg te gaan?"
      }
    },
    {
      id: "pair-6",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-q6-main",
        title: "Angst voor Versmelting",
        fullText: "Vraag: Heb je wel eens ervaren dat liefde of intimiteit voelde alsof je zou verdwijnen, of alsof je 'opgeslokt' zou worden?\n\n\"Een cliënt beschreef het prachtig: 'Als iemand echt van me houdt, word ik bang. Niet alleen bang om gekwetst te worden, maar bang om te verdwijnen, om opgeslokt te worden. Het is alsof liefde een zwart gat is...'\"\n(Bron: Van wond naar wonder, Hoofdstuk 1)"
      },
      deepQuestion: {
        id: "ws1-q6-deep",
        title: "Angst voor Versmelting - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Als liefde niet zou betekenen dat je verdwijnt, maar dat je juist méér jezelf zou kunnen zijn, hoe zou dat er dan uitzien? Wat zou de eerste kleine stap zijn om dat te onderzoeken?"
      }
    },
    {
      id: "pair-7",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1-q7-main",
        title: "De Vier Linkervoeten",
        fullText: "Vraag: Ga voor de spiegel staan en beweeg. Voel je je lichaam als één soepel geheel, of voelt het soms mechanisch, of alsof je lichaamsdelen niet goed met elkaar verbonden zijn?\n\n\"Een cliënt zei het eens perfect: 'Ik voel me alsof ik geboren ben met vier linkervoeten.' [...] De armen en benen bungelen als slecht bevestigde onderdelen aan de romp, alsof ze niet echt bij het lichaam horen.\"\n(Bron: Van wond naar wonder, Hoofdstuk 1)"
      },
      deepQuestion: {
        id: "ws1-q7-deep",
        title: "De Vier Linkervoeten - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Als je de verschillende delen van je lichaam stem zou geven, welk deel voelt zich het meest 'buitengesloten' of 'niet thuis'? Wat zou dat deel nodig hebben om weer deel van het geheel te worden?"
      }
    },
    {
      id: "pair-8",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1-q8-main",
        title: "De Koude Kern",
        fullText: "Vraag: Scan je lichaam op temperatuur en aanwezigheid. Zijn je handen en voeten vaak koud? Voel je een spanning rond je middenrif of je nekbasis die dient om gevoelens (en energie) af te splitsen van je hoofd?\n\n\"Je energie en je ademhaling zitten hoog; je stem kan ook hoog of jong klinken. Vaak beleef je je lichaam niet als een geheel... Je handen en voeten zijn koud, omdat je niet zo ver komt met je levensenergie.\"\n(Bron: De Maskermaker, Hoofdstuk 4)"
      },
      deepQuestion: {
        id: "ws1-q8-deep",
        title: "De Koude Kern - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Als je je voorstelt dat warmte en levensenergie door je hele lichaam zouden stromen tot in je vingertoppen en tenen, wat zou er dan anders voelen? Welke emotie of sensatie zou dan misschien bovenkomen?"
      }
    },
    {
      id: "pair-9",
      section: "ONDERDEEL 4: DE KWALITEIT (HET GOUD)",
      mainQuestion: {
        id: "ws1-q9-main",
        title: "De Dromer / De Ziener",
        fullText: "Vraag: Jouw vermogen om je terug te trekken heeft je ook iets gebracht. Welke creatieve, spirituele of visionaire kwaliteiten heb jij ontwikkeld in je binnenwereld, die je nu als een geschenk aan de wereld kunt geven?\n\n\"Je vermogen is dat je voeding uit andere werelden kunt halen dan alleen uit de aardse. [...] Je flitsende gedachten helpen je vaak aan geniale oplossingen voor ingewikkelde problemen. In je analyses ben je kristalhelder omdat je je niet laat afleiden.\"\n(Bron: De Maskermaker, Hoofdstuk 4)"
      },
      deepQuestion: {
        id: "ws1-q9-deep",
        title: "De Dromer / De Ziener - Verdiepende Vraag",
        fullText: "Verdiepende vraag: Hoe zou je deze kwaliteiten kunnen delen terwijl je tegelijkertijd geaard blijft? Welke concrete stap zou je kunnen zetten om je innerlijke rijkdom te verbinden met de aardse werkelijkheid?"
      }
    }
  ];

  // Flatten all questions for progress tracking
  const allQuestions = questionPairs.flatMap(pair => [
    pair.mainQuestion,
    pair.deepQuestion
  ]);

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/">
                <span className="hover:text-primary cursor-pointer">Home</span>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Workshop 1</span>
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                18-19 april 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Fundament en Bestaansrecht
              </h1>
              <p className="text-xl text-muted-foreground">
                De Schizoïde Structuur
              </p>
            </div>
          </div>

          <ProgressBar workshopId="workshop1_jaar2" totalQuestions={allQuestions.length} />

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
            <DownloadButtons 
              workshopId="workshop1_jaar2"
              workshopTitle="Workshop 1: Fundament en Bestaansrecht"
              workshopDate="18-19 april 2026"
              questions={allQuestions}
            />
          </div>

          {/* Introduction */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  <strong>Thema: Het Recht om te Bestaan & De Dans van Nabijheid en Afstand</strong>
                </p>
                <p>
                  Beste deelnemer,
                </p>
                <p>
                  Lees voordat je met de beantwoording van deze vragen begint in de "Maskermaker" en "Van wond naar Wonder" het hoofdstuk over deze structuur.
                </p>
                <p>
                  We beginnen onze reis bij het absolute fundament: het bestaansrecht. De schizoïde structuur is de eerste verdediging die we als mens ontwikkelen, vaak al in de baarmoeder of vlak na de geboorte. Het is de reactie op de oervraag: Is het veilig voor mij om hier te zijn?
                </p>
                <p>
                  In mijn praktijk zie ik vaak dat mensen deze structuur als 'koud' of 'afwezig' bestempelen. Ik nodig je uit om er anders naar te kijken: als een briljante, creatieve overlevingsstrategie van een heel klein kind dat zijn ziel probeerde te redden door zich terug te trekken uit een overweldigende wereld. We dragen allemaal een stukje van deze 'afwezige' in ons. Laten we die met zachtheid onderzoeken.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Question Pairs with AI Feedback */}
          <div className="space-y-12">
            {questionPairs.map((pair, pairIndex) => (
              <div key={pair.id} className="space-y-6">
                {/* Section Header */}
                {(pairIndex === 0 || questionPairs[pairIndex - 1].section !== pair.section) && (
                  <div className="pt-8 border-t-2 border-primary/20">
                    <h2 className="text-2xl font-bold text-primary">
                      {pair.section}
                    </h2>
                    {pair.section === "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)" && (
                      <p className="text-foreground/70 mt-2">
                        De schizoïde wond ontstaat in de vroegste fase van ons bestaan, wanneer we volledig afhankelijk zijn en de wereld als onveilig, koud of vijandig ervaren.
                      </p>
                    )}
                    {pair.section === "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)" && (
                      <p className="text-foreground/70 mt-2">
                        De relatie is voor de schizoïde structuur de meest bedreigende plek. Het dilemma is: contact willen, maar bang zijn voor vernietiging door datzelfde contact.
                      </p>
                    )}
                    {pair.section === "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE" && (
                      <p className="text-foreground/70 mt-2">
                        Het schizoïde lichaam toont vaak fragmentatie en een terugtrekking van energie uit de periferie (handen, voeten, ogen) naar de kern.
                      </p>
                    )}
                    {pair.section === "ONDERDEEL 4: DE KWALITEIT (HET GOUD)" && (
                      <p className="text-foreground/70 mt-2">
                        Wanneer de schizoïde mens leert om veilig op aarde te landen, transformeert de afstandelijkheid in een heldere, spirituele en creatieve kracht.
                      </p>
                    )}
                  </div>
                )}

                {/* Main Question */}
                <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {pairIndex * 2 + 1}
                      </span>
                      {pair.mainQuestion.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {pair.mainQuestion.fullText}
                    </div>
                    <AnswerField 
                      workshopId="workshop1_jaar2" 
                      questionId={pair.mainQuestion.id} 
                      placeholder="Schrijf hier je reflectie..."
                    />
                  </CardContent>
                </Card>

                {/* Deep Question */}
                <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow ml-4 md:ml-8">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {pairIndex * 2 + 2}
                      </span>
                      {pair.deepQuestion.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {pair.deepQuestion.fullText}
                    </div>
                    <AnswerField 
                      workshopId="workshop1_jaar2" 
                      questionId={pair.deepQuestion.id} 
                      placeholder="Schrijf hier je reflectie..."
                    />
                  </CardContent>
                </Card>

                {/* AI Feedback Box after each pair */}
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <AIHelper 
                    questionTitle={`${pair.mainQuestion.title} & ${pair.deepQuestion.title}`}
                    questionId={pair.id}
                    workshopId="workshop1_jaar2"
                    context={`Vraag 1: ${pair.mainQuestion.title}\n${pair.mainQuestion.fullText}\n\nVraag 2: ${pair.deepQuestion.title}\n${pair.deepQuestion.fullText}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Closing Message */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  <strong>Ter afsluiting:</strong>
                </p>
                <p>
                  De schizoïde structuur vraagt om geduld en zachtheid. Het is de kunst van het 'ontdooien' zonder te overstromen. Neem je tijd voor deze vragen en weet: je bent welkom, precies zoals je bent, met al je mechanismen.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link href="/">
              <Button variant="ghost">Terug naar Home</Button>
            </Link>
            <Link href="/workshop/2"><Button className="gap-2">Volgende Workshop <ChevronRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
