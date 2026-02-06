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
  citation: {
    text: string;
    source: string;
  };
}

export default function Workshop1Day2() {
  const questionPairs: QuestionPair[] = [
    {
      id: "pair-1",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1d2-q1-main",
        title: "Het eerste tekort",
        fullText: "Als je terugvoelt naar je vroege kindertijd, of de verhalen daarover: was er sprake van fysieke of emotionele schaarste? Was je moeder (of vader) écht beschikbaar, of was ze er wel fysiek maar niet emotioneel?"
      },
      deepQuestion: {
        id: "ws1d2-q1-deep",
        title: "Het eerste tekort - verdiepende vraag",
        fullText: "Als je je voorstelt dat je als baby volledig gevoed en gezien was, hoe zou je leven er dan nu anders uitzien? Welk deel van jezelf zou dan meer ruimte hebben gekregen om te groeien?"
      },
      citation: {
        text: "Hun trauma ligt niet in wat er gebeurde, maar in wat er níet gebeurde. Geen mishandeling, geen actieve wreedheid - alleen afwezigheid. Een moeder die werkt, die ziek is, die emotioneel niet beschikbaar is.",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-2",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1d2-q2-main",
        title: "Systemische leegte",
        fullText: "Is er in jouw familiesysteem sprake van onverwerkt verlies of een generatielange 'tekortkoming' (armoede, oorlog, jong gestorven ouders)? Heb jij onbewust geprobeerd de leegte van je ouders te vullen?"
      },
      deepQuestion: {
        id: "ws1d2-q2-deep",
        title: "Systemische leegte - verdiepende vraag",
        fullText: "Als je de honger van eerdere generaties zou kunnen teruggeven aan wie het toebehoort, wat zou je dan tegen hen zeggen? En wat zou er in jou vrijkomen als je die last neerlegt?"
      },
      citation: {
        text: "Vaak was er in je familiegeschiedenis een groot verdriet dat de familieleden niet konden dragen, bijvoorbeeld een in het kraambed gestorven oma.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-3",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1d2-q3-main",
        title: "Het gevoel van 'niet genoeg'",
        fullText: "Op welke gebieden in je huidige leven voel je de pijnlijke overtuiging dat je tekortkomt, of dat je moet vechten voor kruimels? (Denk aan aandacht, geld, liefde)."
      },
      deepQuestion: {
        id: "ws1d2-q3-deep",
        title: "Het gevoel van 'niet genoeg' - verdiepende vraag",
        fullText: "Welke innerlijke stem herhaalt dit verhaal van tekort? Van wie heb je die stem geleerd, en wat zou je tegen die stem willen zeggen vanuit het deel van jou dat wél weet dat je genoeg bent?"
      },
      citation: {
        text: "Je vergelijkt je doorlopend met anderen. 'Zie je wel, ik alweer niet,' zegt een stemmetje in je. Je houdt zelfs een lijstje bij van niet gekregen zaken.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-4",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1d2-q4-main",
        title: "De emotionele vampier",
        fullText: "Herken je bij jezelf (of je partner) het patroon dat hoeveel aandacht er ook wordt gegeven, het nooit genoeg voelt? Dat er na een fijn moment direct weer een gevoel van leegte of claim ontstaat?"
      },
      deepQuestion: {
        id: "ws1d2-q4-deep",
        title: "De emotionele vampier - verdiepende vraag",
        fullText: "Wat zou er gebeuren als je na een moment van ontvangen even zou pauzeren en het werkelijk zou laten binnenkomen? Wat maakt het zo moeilijk om te geloven dat het genoeg is?"
      },
      citation: {
        text: "Een partner van een orale man vertelde me uitgeput: 'Het is alsof ik met een vampier leef, maar dan een emotionele vampier. Hij zuigt alle energie uit me.'",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-5",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1d2-q5-main",
        title: "Ruilhandel in aandacht",
        fullText: "Geef jij vaak aan anderen wat je eigenlijk zélf zo graag zou willen ontvangen? En voel je wrok als dit niet 'terugbetaald' wordt?"
      },
      deepQuestion: {
        id: "ws1d2-q5-deep",
        title: "Ruilhandel in aandacht - verdiepende vraag",
        fullText: "Stel je voor dat je zou kunnen geven zonder iets terug te verwachten. Wat zou er dan veranderen in hoe je geeft? En durf je ook te ontvangen zonder daar iets voor 'terug te hoeven doen'?"
      },
      citation: {
        text: "Je 'regelt' aandacht door voor de ander te zorgen met lief of aangepast gedrag in de hoop dat je er iets voor terugkrijgt.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-6",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1d2-q6-main",
        title: "Destructief recht",
        fullText: "Herken je momenten waarop je vindt dat je recht hebt op compensatie voor wat je hebt gemist? Uit zich dit in eisen, claimen, of boos worden als de ander niet levert?"
      },
      deepQuestion: {
        id: "ws1d2-q6-deep",
        title: "Destructief recht - verdiepende vraag",
        fullText: "Als je het kleine kind in jou dat tekort is gekomen zou kunnen troosten, wat zou je tegen dat kind zeggen? En wat zou het werkelijk nodig hebben – niet van de ander, maar van jou?"
      },
      citation: {
        text: "Het destructief recht staat op de voorgrond: het gevoel dat de ander teruggepakt moet worden omdat er zoveel is misgegaan.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-7",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1d2-q7-main",
        title: "De ingestorte houding",
        fullText: "Ga voor de spiegel staan en laat je schouders en borstkas hangen zoals je doet als je moe of verdrietig bent. Wat zie je? Herken je de fysieke kenmerken van de 'ondervoeding'?"
      },
      deepQuestion: {
        id: "ws1d2-q7-deep",
        title: "De ingestorte houding - verdiepende vraag",
        fullText: "Als je je borstkas zou openen en je schouders naar achteren zou brengen, welke emotie komt er dan naar boven? Wat zou je dan moeten voelen dat je nu niet voelt?"
      },
      citation: {
        text: "Het orale lichaam vertelt het verhaal van ondervoeding. Lang en mager vaak, met spieren die als slappe touwtjes aan het skelet hangen.",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-8",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1d2-q8-main",
        title: "Het hongergat",
        fullText: "Voel eens in het centrum van je borstkas, ter hoogte van het hart. Voelt het daar vol en krachtig, of is er een sensatie van een 'gat', een inzinking of een zuigende leegte?"
      },
      deepQuestion: {
        id: "ws1d2-q8-deep",
        title: "Het hongergat - verdiepende vraag",
        fullText: "Als je adem en liefde naar die plek zou kunnen sturen, wat zou die leegte dan nodig hebben om langzaam gevuld te raken? En van wie zou die vulling moeten komen?"
      },
      citation: {
        text: "En inderdaad, in het centrum van de borst, daar waar volgens de Chinezen het hart-chakra zit, is vaak een inzinking te zien - het 'hongergat' zoals we het noemen.",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-9",
      section: "ONDERDEEL 4: DE KWALITEIT (HET GOUD)",
      mainQuestion: {
        id: "ws1d2-q9-main",
        title: "De voedster / de bron",
        fullText: "Als jij je niet leeg en behoeftig voelt, maar 'gevuld', wat heb jij de wereld dan te bieden? Wat is jouw specifieke kwaliteit in het aanvoelen van wat anderen nodig hebben?"
      },
      deepQuestion: {
        id: "ws1d2-q9-deep",
        title: "De voedster / de bron - verdiepende vraag",
        fullText: "Kun je een moment herinneren waarop je gaf vanuit overvloed in plaats van uit hoop op terugkrijgen? Hoe voelde dat anders, en hoe zou je meer van die momenten kunnen creëren?"
      },
      citation: {
        text: "Orale mensen die hun eigen bron hebben gevonden, kunnen geven zoals niemand anders kan geven. Ze kennen de honger, ze kennen de leegte, dus ze weten precies wat anderen nodig hebben.",
        source: "Van wond naar wonder, Hoofdstuk 2"
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
              <span>Workshop 1 - Dag 2</span>
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                18-19 april 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                De honger die nooit stilt
              </h1>
              <p className="text-xl text-muted-foreground">
                De orale structuur
              </p>
            </div>
          </div>

          <ProgressBar workshopId="workshop1_dag2_jaar2" totalQuestions={allQuestions.length} />

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
            <DownloadButtons 
              workshopId="workshop1_dag2_jaar2"
              workshopTitle="Workshop 1 - Dag 2: De honger die nooit stilt"
              workshopDate="18-19 april 2026"
              questions={allQuestions}
            />
          </div>

          {/* Introduction */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  <strong>Thema: De honger die nooit stilt & de weg naar de bron</strong>
                </p>
                <p>
                  Beste deelnemer,
                </p>
                <p>
                  Welkom bij de tweede stap op onze reis. Waar de schizoïde structuur gaat over het recht om te bestaan, gaat de orale structuur over het recht om nodig te hebben. Het raakt aan onze diepste, pre-verbale herinnering van afhankelijkheid.
                </p>
                <p>
                  Velen van ons dragen een vorm van deze 'honger' met zich mee. De angst dat er niet genoeg is: niet genoeg liefde, niet genoeg tijd, niet genoeg aandacht. In mijn praktijk zie ik vaak hoe we deze leegte proberen te vullen met partners, werk of middelen, terwijl de enige echte voeding van binnenuit moet komen.
                </p>
                <p>
                  Ik nodig je uit om met mildheid naar je eigen behoeftigheid te kijken. Het is geen zwakte, het is een roep om verbinding die ooit onbeantwoord bleef.
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
                        De orale wond ontstaat in de vroege kinderjaren (0-2 jaar), de tijd van de mond, het zuigen en de totale afhankelijkheid van de moeder (of verzorger) voor voeding en warmte.
                      </p>
                    )}
                    {pair.section === "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)" && (
                      <p className="text-foreground/70 mt-2">
                        De orale dynamiek in relaties is vaak uitputtend: het is de dans van de 'bodemloze put' of de 'helper' die geeft om te krijgen.
                      </p>
                    )}
                    {pair.section === "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE" && (
                      <p className="text-foreground/70 mt-2">
                        Het orale lichaam toont vaak de instorting, de leegte, of de wanhopige greep naar contact.
                      </p>
                    )}
                    {pair.section === "ONDERDEEL 4: DE KWALITEIT (HET GOUD)" && (
                      <p className="text-foreground/70 mt-2">
                        Als de orale mens leert zichzelf te voeden, ontstaat er een enorme capaciteit tot geven vanuit overvloed, in plaats van uit tekort.
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
                      workshopId="workshop1_dag2_jaar2" 
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
                      workshopId="workshop1_dag2_jaar2" 
                      questionId={pair.deepQuestion.id} 
                      placeholder="Schrijf hier je reflectie..."
                    />
                  </CardContent>
                </Card>

                {/* Citation */}
                <Card className="border-primary/20 bg-primary/5 italic">
                  <CardContent className="pt-6">
                    <blockquote className="text-foreground/80 leading-relaxed">
                      <p className="mb-3">"{pair.citation.text}"</p>
                      <p className="text-sm text-foreground/60">
                        (Bron: {pair.citation.source})
                      </p>
                    </blockquote>
                  </CardContent>
                </Card>

                {/* AI Feedback Box after each pair */}
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <AIHelper 
                    questionTitle={`${pair.mainQuestion.title} & ${pair.deepQuestion.title}`}
                    questionId={pair.id}
                    workshopId="workshop1_dag2_jaar2"
                    context={`Vraag 1: ${pair.mainQuestion.title}\n${pair.mainQuestion.fullText}\n\nVraag 2: ${pair.deepQuestion.title}\n${pair.deepQuestion.fullText}\n\nCitaat: "${pair.citation.text}" (${pair.citation.source})`}
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
                  De orale structuur confronteert ons met onze afhankelijkheid. Dat kan pijnlijk zijn, maar onthoud: alleen door de leegte te erkennen, kunnen we leren onszelf te vullen. Neem je bevindingen mee naar de groep. We gaan werken aan het vinden van je eigen bodem.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link href="/workshop/1">
              <Button variant="ghost">Terug naar dag 1</Button>
            </Link>
            <Link href="/workshop/2"><Button className="gap-2">Volgende workshop <ChevronRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
