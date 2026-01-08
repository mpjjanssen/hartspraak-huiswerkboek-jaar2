import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Anchor } from "lucide-react";
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

export default function Workshop1() {
  const schizoidPairs: QuestionPair[] = [
    {
      id: "pair-1",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-q1-main",
        title: "Het Eerste Welkom",
        fullText: "Als je stilstaat bij je eigen begin (zwangerschap, geboorte), wat is dan het verhaal dat je lichaam je vertelt? Voelde je je welkom, of was er een sensatie van kou, stress of 'verkeerd' zijn?"
      },
      deepQuestion: {
        id: "ws1-q1-deep",
        title: "Het Eerste Welkom - Verdiepende Vraag",
        fullText: "Als je lichaam zou kunnen spreken over het allereerste moment dat het 'besloot' om zich terug te trekken of te beschermen, wat zou het dan zeggen? En wat had het nodig gehad om die beslissing niet te hoeven nemen?"
      },
      citation: {
        text: "In mijn jaren van werken met trauma heb ik geleerd dat de schizoïde structuur zich ontwikkelt in een zeer specifieke periode: voor, tijdens en direct na de geboorte. Het is de tijd waarin we het meest kwetsbaar zijn [...] Een cliënt vertelde me eens: 'Ik wist vanaf het begin dat ik een vergissing was. Niet in woorden natuurlijk, maar mijn lichaam wist het.'",
        source: "Van wond naar wonder, Hoofdstuk 1, Blz. 19"
      }
    },
    {
      id: "pair-2",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-q2-main",
        title: "De Ladder naar de Hemel",
        fullText: "Herken jij bij jezelf de neiging om een \"ladder naar de hemel\" uit te zetten? Heb je het gevoel dat je hier op aarde 'te gast' bent, of dat je eigenlijk ergens anders thuishoort?"
      },
      deepQuestion: {
        id: "ws1-q2-deep",
        title: "De Ladder naar de Hemel - Verdiepende Vraag",
        fullText: "Wat zou er veranderen als je die ladder niet meer nodig had? Wat zou je moeten voelen, ervaren of onder ogen zien als je volledig op aarde zou landen?"
      },
      citation: {
        text: "Hij vocht uit alle macht voor zijn ladder naar de hemel, een ontsnapping naar de wereld van oneindigheid. Hij kon immers niet zonder die vluchtroute. Als hij het moeilijk had op aarde klom hij meteen omhoog en weg was hij.",
        source: "De Maskermaker, Hoofdstuk 4"
      }
    },
    {
      id: "pair-3",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-q3-main",
        title: "De Systemische Blik",
        fullText: "Soms kijken we niet naar het leven, maar naar de dood of naar iemand die er niet meer is. Is er in jouw familiesysteem sprake van 'dubbele werkelijkheid' (geheimen, verzwegen familieleden of onverwerkte rouw) waardoor jouw aandacht onbewust naar 'de andere kant' wordt getrokken?"
      },
      deepQuestion: {
        id: "ws1-q3-deep",
        title: "De Systemische Blik - Verdiepende Vraag",
        fullText: "Als je zou ontdekken dat je onbewust trouw bent aan iemand die niet meer leeft of die uit het systeem is gestoten, wat zou je tegen die persoon willen zeggen? En wat zou je nodig hebben om je blik volledig naar het leven te kunnen richten?"
      },
      citation: {
        text: "Vaak leef je als het ware in een dubbele werkelijkheid: terwijl je je in de aardse realiteit beweegt, luister je tegelijkertijd naar de roep van die andere wereld.",
        source: "De Maskermaker, Hoofdstuk 4"
      }
    },
    {
      id: "pair-4",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-q4-main",
        title: "De Glazen Muur",
        fullText: "Herken je het patroon dat je relaties kiest die 'veilig' zijn omdat ze niet écht dichtbij komen (lange afstand, emotioneel onbereikbaar)? Of dat je zelf een onzichtbare muur optrekt zodra iemand te dichtbij komt?"
      },
      deepQuestion: {
        id: "ws1-q4-deep",
        title: "De Glazen Muur - Verdiepende Vraag",
        fullText: "Wat is de ergste angst die je hebt over wat er zou gebeuren als iemand je werkelijk zou zien en kennen? En wat zou je kunnen winnen als je dat risico toch zou nemen?"
      },
      citation: {
        text: "Een partner van een schizoïde cliënt zei me eens: 'Het is alsof ik verliefd ben geworden op iemand achter een glazen muur. Ik kan hem zien, soms zelfs voelen, maar er is altijd die barrière tussen ons.'",
        source: "Van wond naar wonder, Hoofdstuk 1"
      }
    },
    {
      id: "pair-5",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-q5-main",
        title: "Contactbreuk en Terugtrekking",
        fullText: "Wanneer in een contact haak jij af? Wat doe je precies als je afhaakt? (Bijvoorbeeld: oogcontact verbreken, intellectueel gaan praten, of fysiek de kamer verlaten)."
      },
      deepQuestion: {
        id: "ws1-q5-deep",
        title: "Contactbreuk en Terugtrekking - Verdiepende Vraag",
        fullText: "Kun je het exacte moment herkennen waarop de 'schakelaar' omgaat? Wat voelde je net vóór dat moment, en wat probeer je te ontwijken door weg te gaan?"
      },
      citation: {
        text: "Je ijzig terugtrekken is je meest vertrouwde oplossing bij een conflict. Zo probeer je buiten de relatie te blijven. Dat geldt ook voor je neiging tot ontkennen als de ander je duidelijk maakt dat je er niet werkelijk bent.",
        source: "De Maskermaker, Hoofdstuk 4"
      }
    },
    {
      id: "pair-6",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-q6-main",
        title: "Angst voor Versmelting",
        fullText: "Heb je wel eens ervaren dat liefde of intimiteit voelde alsof je zou verdwijnen, of alsof je 'opgeslokt' zou worden?"
      },
      deepQuestion: {
        id: "ws1-q6-deep",
        title: "Angst voor Versmelting - Verdiepende Vraag",
        fullText: "Als liefde niet zou betekenen dat je verdwijnt, maar dat je juist méér jezelf zou kunnen zijn, hoe zou dat er dan uitzien? Wat zou de eerste kleine stap zijn om dat te onderzoeken?"
      },
      citation: {
        text: "Een cliënt beschreef het prachtig: 'Als iemand echt van me houdt, word ik bang. Niet alleen bang om gekwetst te worden, maar bang om te verdwijnen, om opgeslokt te worden. Het is alsof liefde een zwart gat is...'",
        source: "Van wond naar wonder, Hoofdstuk 1"
      }
    },
    {
      id: "pair-7",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1-q7-main",
        title: "De Vier Linkervoeten",
        fullText: "Ga voor de spiegel staan en beweeg. Voel je je lichaam als één soepel geheel, of voelt het soms mechanisch, of alsof je lichaamsdelen niet goed met elkaar verbonden zijn?"
      },
      deepQuestion: {
        id: "ws1-q7-deep",
        title: "De Vier Linkervoeten - Verdiepende Vraag",
        fullText: "Als je de verschillende delen van je lichaam stem zou geven, welk deel voelt zich het meest 'buitengesloten' of 'niet thuis'? Wat zou dat deel nodig hebben om weer deel van het geheel te worden?"
      },
      citation: {
        text: "Een cliënt zei het eens perfect: 'Ik voel me alsof ik geboren ben met vier linkervoeten.' [...] De armen en benen bungelen als slecht bevestigde onderdelen aan de romp, alsof ze niet echt bij het lichaam horen.",
        source: "Van wond naar wonder, Hoofdstuk 1"
      }
    },
    {
      id: "pair-8",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1-q8-main",
        title: "De Koude Kern",
        fullText: "Scan je lichaam op temperatuur en aanwezigheid. Zijn je handen en voeten vaak koud? Voel je een spanning rond je middenrif of je nekbasis die dient om gevoelens (en energie) af te splitsen van je hoofd?"
      },
      deepQuestion: {
        id: "ws1-o8-deep",
        title: "De Koude Kern - Verdiepende Vraag",
        fullText: "Als je je voorstelt dat warmte en levensenergie door je hele lichaam zouden stromen tot in je vingertoppen en tenen, wat zou er dan anders voelen? Welke emotie of sensatie zou dan misschien bovenkomen?"
      },
      citation: {
        text: "Je energie en je ademhaling zitten hoog; je stem kan ook hoog of jong klinken. Vaak beleef je je lichaam niet als een geheel... Je handen en voeten zijn koud, omdat je niet zo ver komt met je levensenergie.",
        source: "De Maskermaker, Hoofdstuk 4"
      }
    },
    {
      id: "pair-9",
      section: "ONDERDEEL 4: DE KWALITEIT (HET GOUD)",
      mainQuestion: {
        id: "ws1-q9-main",
        title: "De Dromer / De Ziener",
        fullText: "Jouw vermogen om je terug te trekken heeft je ook iets gebracht. Welke creatieve, spirituele of visionaire kwaliteiten heb jij ontwikkeld in je binnenwereld, die je nu als een geschenk aan de wereld kunt geven?"
      },
      deepQuestion: {
        id: "ws1-q9-deep",
        title: "De Dromer / De Ziener - Verdiepende Vraag",
        fullText: "Hoe zou je deze kwaliteiten kunnen delen terwijl je tegelijkertijd geaard blijft? Welke concrete stap zou je kunnen zetten om je innerlijke rijkdom te verbinden met de aardse werkelijkheid?"
      },
      citation: {
        text: "Je vermogen is dat je voeding uit andere werelden kunt halen dan alleen uit de aardse. [...] Je flitsende gedachten helpen je vaak aan geniale oplossingen voor ingewikkelde problemen. In je analyses ben je kristalhelder omdat je je niet laat afleiden.",
        source: "De Maskermaker, Hoofdstuk 4"
      }
    }
  ];

  const oralPairs: QuestionPair[] = [
    {
      id: "pair-o1",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-o1-main",
        title: "Het Eerste Tekort",
        fullText: "Als je terugvoelt naar je vroege kindertijd, of de verhalen daarover: was er sprake van fysieke of emotionele schaarste? Was je moeder (of vader) écht beschikbaar, of was ze er wel fysiek maar niet emotioneel?"
      },
      deepQuestion: {
        id: "ws1-o1-deep",
        title: "Het Eerste Tekort - Verdiepende Vraag",
        fullText: "Als je je voorstelt dat je als baby volledig gevoed en gezien was, hoe zou je leven er dan nu anders uitzien? Welk deel van jezelf zou dan meer ruimte hebben gekregen om te groeien?"
      },
      citation: {
        text: "Hun trauma ligt niet in wat er gebeurde, maar in wat er níet gebeurde. Geen mishandeling, geen actieve wreedheid - alleen afwezigheid. Een moeder die werkt, die ziek is, die emotioneel niet beschikbaar is.",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-o2",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-o2-main",
        title: "Systemische Leegte",
        fullText: "Is er in jouw familiesysteem sprake van onverwerkt verlies of een generatielange 'tekortkoming' (armoede, oorlog, jong gestorven ouders)? Heb jij onbewust geprobeerd de leegte van je ouders te vullen?"
      },
      deepQuestion: {
        id: "ws1-o2-deep",
        title: "Systemische Leegte - Verdiepende Vraag",
        fullText: "Als je de honger van eerdere generaties zou kunnen teruggeven aan wie het toebehoort, wat zou je dan tegen hen zeggen? En wat zou er in jou vrijkomen als je die last neerlegt?"
      },
      citation: {
        text: "Vaak was er in je familiegeschiedenis een groot verdriet dat de familieleden niet konden dragen, bijvoorbeeld een in het kraambed gestorven oma.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-o3",
      section: "ONDERDEEL 1: DE OORSPRONG (ACHTERGROND)",
      mainQuestion: {
        id: "ws1-o3-main",
        title: "Het Gevoel van 'Niet Genoeg'",
        fullText: "Op welke gebieden in je huidige leven voel je de pijnlijke overtuiging dat je tekortkomt, of dat je moet vechten voor kruimels? (Denk aan aandacht, geld, liefde)."
      },
      deepQuestion: {
        id: "ws1-o3-deep",
        title: "Het Gevoel van 'Niet Genoeg' - Verdiepende Vraag",
        fullText: "Welke innerlijke stem herhaalt dit verhaal van tekort? Van wie heb je die stem geleerd, en wat zou je tegen die stem willen zeggen vanuit het deel van jou dat wél weet dat je genoeg bent?"
      },
      citation: {
        text: "Je vergelijkt je doorlopend met anderen. 'Zie je wel, ik alweer niet,' zegt een stemmetje in je. Je houdt zelfs een lijstje bij van niet gekregen zaken.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-o4",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-o4-main",
        title: "De Emotionele Vampier",
        fullText: "Herken je bij jezelf (of je partner) het patroon dat hoeveel aandacht er ook wordt gegeven, het nooit genoeg voelt? Dat er na een fijn moment direct weer een gevoel van leegte of claim ontstaat?"
      },
      deepQuestion: {
        id: "ws1-o4-deep",
        title: "De Emotionele Vampier - Verdiepende Vraag",
        fullText: "Wat zou er gebeuren als je na een moment van ontvangen even zou pauzeren en het werkelijk zou laten binnenkomen? Wat maakt het zo moeilijk om te geloven dat het genoeg is?"
      },
      citation: {
        text: "Een partner van een orale man vertelde me uitgeput: 'Het is alsof ik met een vampier leef, maar dan een emotionele vampier. Hij zuigt alle energie uit me.'",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-o5",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-o5-main",
        title: "Ruilhandel in Aandacht",
        fullText: "Geef jij vaak aan anderen wat je eigenlijk zélf zo graag zou willen ontvangen? En voel je wrok als dit niet 'terugbetaald' wordt?"
      },
      deepQuestion: {
        id: "ws1-o5-deep",
        title: "Ruilhandel in Aandacht - Verdiepende Vraag",
        fullText: "Stel je voor dat je zou kunnen geven zonder iets terug te verwachten. Wat zou er dan veranderen in hoe je geeft? En durf je ook te ontvangen zonder daar iets voor 'terug te hoeven doen'?"
      },
      citation: {
        text: "Je 'regelt' aandacht door voor de ander te zorgen met lief of aangepast gedrag in de hoop dat je er iets voor terugkrijgt.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-o6",
      section: "ONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)",
      mainQuestion: {
        id: "ws1-o6-main",
        title: "Destructief Recht",
        fullText: "Herken je momenten waarop je vindt dat je recht hebt op compensatie voor wat je hebt gemist? Uit zich dit in eisen, claimen, of boos worden als de ander niet levert?"
      },
      deepQuestion: {
        id: "ws1-o6-deep",
        title: "Destructief Recht - Verdiepende Vraag",
        fullText: "Als je het kleine kind in jou dat tekort is gekomen zou kunnen troosten, wat zou je tegen dat kind zeggen? En wat zou het werkelijk nodig hebben – niet van de ander, maar van jou?"
      },
      citation: {
        text: "Het destructief recht staat op de voorgrond: het gevoel dat de ander teruggepakt moet worden omdat er zoveel is misgegaan.",
        source: "De Maskermaker, Hoofdstuk 5"
      }
    },
    {
      id: "pair-o7",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1-o7-main",
        title: "De Ingestorte Houding",
        fullText: "Ga voor de spiegel staan en laat je schouders en borstkas hangen zoals je doet als je moe of verdrietig bent. Wat zie je? Herken je de fysieke kenmerken van de 'ondervoeding'?"
      },
      deepQuestion: {
        id: "ws1-o7-deep",
        title: "De Ingestorte Houding - Verdiepende Vraag",
        fullText: "Als je je borstkas zou openen en je schouders naar achteren zou brengen, welke emotie komt er dan naar boven? Wat zou je dan moeten voelen dat je nu niet voelt?"
      },
      citation: {
        text: "Het orale lichaam vertelt het verhaal van ondervoeding. Lang en mager vaak, met spieren die als slappe touwtjes aan het skelet hangen.",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-o8",
      section: "ONDERDEEL 3: HET LICHAAM EN DE ENERGIE",
      mainQuestion: {
        id: "ws1-o8-main",
        title: "Het Hongergat",
        fullText: "Voel eens in het centrum van je borstkas, ter hoogte van het hart. Voelt het daar vol en krachtig, of is er een sensatie van een 'gat', een inzinking of een zuigende leegte?"
      },
      deepQuestion: {
        id: "ws1-o8-deep",
        title: "Het Hongergat - Verdiepende Vraag",
        fullText: "Als je adem en liefde naar die plek zou kunnen sturen, wat zou die leegte dan nodig hebben om langzaam gevuld te raken? En van wie zou die vulling moeten komen?"
      },
      citation: {
        text: "En inderdaad, in het centrum van de borst, daar waar volgens de Chinezen het hart-chakra zit, is vaak een inzinking te zien - het 'hongergat' zoals we het noemen.",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    },
    {
      id: "pair-o9",
      section: "ONDERDEEL 4: DE KWALITEIT (HET GOUD)",
      mainQuestion: {
        id: "ws1-o9-main",
        title: "De Voedster / De Bron",
        fullText: "Als jij je niet leeg en behoeftig voelt, maar 'gevuld', wat heb jij de wereld dan te bieden? Wat is jouw specifieke kwaliteit in het aanvoelen van wat anderen nodig hebben?"
      },
      deepQuestion: {
        id: "ws1-o9-deep",
        title: "De Voedster / De Bron - Verdiepende Vraag",
        fullText: "Kun je een moment herinneren waarop je gaf vanuit overvloed in plaats van uit hoop op terugkrijgen? Hoe voelde dat anders, en hoe zou je meer van die momenten kunnen creëren?"
      },
      citation: {
        text: "Orale mensen die hun eigen bron hebben gevonden, kunnen geven zoals niemand anders kan geven. Ze kennen de honger, ze kennen de leegte, dus ze weten precies wat anderen nodig hebben.",
        source: "Van wond naar wonder, Hoofdstuk 2"
      }
    }
  ];

  const renderPairs = (pairs: QuestionPair[], workshopId: string) => (
    <div className="space-y-12">
      {pairs.map((pair, pairIndex) => (
        <div key={pair.id} className="space-y-6">
          {/* Section Header */}
          {(pairIndex === 0 || pairs[pairIndex - 1].section !== pair.section) && (
            <div className="pt-8 border-t-2 border-primary/20">
              <h2 className="text-2xl font-bold text-primary">
                {pair.section}
              </h2>
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
                workshopId={workshopId} 
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
                workshopId={workshopId} 
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
              workshopId={workshopId}
              context={`Vraag 1: ${pair.mainQuestion.title}\n${pair.mainQuestion.fullText}\n\nVraag 2: ${pair.deepQuestion.title}\n${pair.deepQuestion.fullText}\n\nCitaat: "${pair.citation.text}" (${pair.citation.source})`}
            />
          </div>
        </div>
      ))}
    </div>
  );

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
                Workshop 1: Karakterstructuren
              </h1>
            </div>
          </div>

          {/* Quick Navigation */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Inhoudsopgave</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#schizoid" className="flex items-center gap-2 text-primary hover:underline">
                  <Anchor className="h-4 w-4" /> Dag 1: Schizoïde Structuur
                </a>
                <a href="#oral" className="flex items-center gap-2 text-primary hover:underline">
                  <Anchor className="h-4 w-4" /> Dag 2: Orale Structuur
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Schizoid Section */}
          <div id="schizoid" className="space-y-12 scroll-mt-20">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <h2 className="text-3xl font-bold">Dag 1: De Schizoïde Structuur</h2>
                  <p><strong>Thema: Het Recht om te Bestaan & De Dans van Nabijheid en Afstand</strong></p>
                  <p>Beste deelnemer, lees voordat je begint in de “Maskermaker” en “Van wond naar Wonder” het hoofdstuk over deze structuur.</p>
                </div>
              </CardContent>
            </Card>
            {renderPairs(schizoidPairs, "workshop1_schizoid_jaar2")}
          </div>

          {/* Oral Section */}
          <div id="oral" className="space-y-12 scroll-mt-20 pt-16 border-t-4 border-primary/10">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <h2 className="text-3xl font-bold">Dag 2: De Orale Structuur</h2>
                  <p><strong>Thema: De Honger die Nooit Stilt & De Weg naar de Bron</strong></p>
                  <p>Beste deelnemer, welkom bij de tweede stap op onze reis. Waar de schizoïde structuur gaat over het recht om te bestaan, gaat de orale structuur over het recht om nodig te hebben.</p>
                </div>
              </CardContent>
            </Card>
            {renderPairs(oralPairs, "workshop1_oral_jaar2")}
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link href="/">
              <Button variant="ghost">Terug naar Home</Button>
            </Link>
            <Link href="/workshop/2">
              <Button className="gap-2">Volgende Workshop <ChevronRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
