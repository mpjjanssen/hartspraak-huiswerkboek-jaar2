import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { AnswerField } from "@/components/AnswerField";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AIHelper } from "@/components/AIHelper";

export default function Workshop1() {
  const questions = [
    {
        "id": "ws1-q1",
        "title": "Het Eerste Welkom",
        "fullText": "Boek: Van wond naar wonder, Hoofdstuk 1\nVraag: Als je stilstaat bij je eigen begin (zwangerschap, geboorte), wat is dan het verhaal dat je lichaam je vertelt? Voelde je je welkom, of was er een sensatie van kou, stress of 'verkeerd' zijn?\nVerdiepende vraag: Als je lichaam zou kunnen spreken over het allereerste moment dat het 'besloot' om zich terug te trekken of te beschermen, wat zou het dan zeggen? En wat had het nodig gehad om die beslissing niet te hoeven nemen?\n\"In mijn jaren van werken met trauma heb ik geleerd dat de schizo\u00efde structuur zich ontwikkelt in een zeer specifieke periode: voor, tijdens en direct na de geboorte. Het is de tijd waarin we het meest kwetsbaar zijn [...] Een cli\u00ebnt vertelde me eens: 'Ik wist vanaf het begin dat ik een vergissing was. Niet in woorden natuurlijk, maar mijn lichaam wist het.'\"\n(Bron: Van wond naar wonder, Hoofdstuk 1, Blz. 19)"
    },
    {
        "id": "ws1-q2",
        "title": "De Ladder naar de Hemel",
        "fullText": "Vraag: Herken jij bij jezelf de neiging om een \"ladder naar de hemel\" uit te zetten? Heb je het gevoel dat je hier op aarde 'te gast' bent, of dat je eigenlijk ergens anders thuishoort?\nVerdiepende vraag: Wat zou er veranderen als je die ladder niet meer nodig had? Wat zou je moeten voelen, ervaren of onder ogen zien als je volledig op aarde zou landen?\n\"Hij vocht uit alle macht voor zijn ladder naar de hemel, een ontsnapping naar de wereld van oneindigheid. Hij kon immers niet zonder die vluchtroute. Als hij het moeilijk had op aarde klom hij meteen omhoog en weg was hij.\"\n(Bron: De Maskermaker, Hoofdstuk 4)"
    },
    {
        "id": "ws1-q3",
        "title": "De Systemische Blik",
        "fullText": "Vraag: Soms kijken we niet naar het leven, maar naar de dood of naar iemand die er niet meer is. Is er in jouw familiesysteem sprake van 'dubbele werkelijkheid' (geheimen, verzwegen familieleden of onverwerkte rouw) waardoor jouw aandacht onbewust naar 'de andere kant' wordt getrokken?\nVerdiepende vraag: Als je zou ontdekken dat je onbewust trouw bent aan iemand die niet meer leeft of die uit het systeem is gestoten, wat zou je tegen die persoon willen zeggen? En wat zou je nodig hebben om je blik volledig naar het leven te kunnen richten?\n\"Een systemische vraag is 'waar is iemand naartoe als hij innerlijk vertrekt, wie is hij trouw'. [...] Vaak leef je als het ware in een dubbele werkelijkheid: terwijl je je in de aardse realiteit beweegt, luister je tegelijkertijd naar de roep van die andere wereld.\"\n(Bron: De Maskermaker, Hoofdstuk 4)\nONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)\nDe relatie is voor de schizo\u00efde structuur de meest bedreigende plek. Het dilemma is: contact willen, maar bang zijn voor vernietiging door datzelfde contact."
    },
    {
        "id": "ws1-q4",
        "title": "De Glazen Muur",
        "fullText": "Vraag: Herken je het patroon dat je relaties kiest die 'veilig' zijn omdat ze niet \u00e9cht dichtbij komen (lange afstand, emotioneel onbereikbaar)? Of dat je zelf een onzichtbare muur optrekt zodra iemand te dichtbij komt?\nVerdiepende vraag: Wat is de ergste angst die je hebt over wat er zou gebeuren als iemand je werkelijk zou zien en kennen? En wat zou je kunnen winnen als je dat risico toch zou nemen?\n\"Een partner van een schizo\u00efde cli\u00ebnt zei me eens: 'Het is alsof ik verliefd ben geworden op iemand achter een glazen muur. Ik kan hem zien, soms zelfs voelen, maar er is altijd die barri\u00e8re tussen ons.'\"\n(Bron: Van wond naar wonder, Hoofdstuk 1)"
    },
    {
        "id": "ws1-q5",
        "title": "Contactbreuk en Terugtrekking",
        "fullText": "Vraag: Wanneer in een contact haak jij af? Wat doe je precies als je afhaakt? (Bijvoorbeeld: oogcontact verbreken, intellectueel gaan praten, of fysiek de kamer verlaten).\nVerdiepende vraag: Kun je het exacte moment herkennen waarop de 'schakelaar' omgaat? Wat voelde je net v\u00f3\u00f3r dat moment, en wat probeer je te ontwijken door weg te gaan?\n\"Je ijzig terugtrekken is je meest vertrouwde oplossing bij een conflict. Zo probeer je buiten de relatie te blijven. Dat geldt ook voor je neiging tot ontkennen als de ander je duidelijk maakt dat je er niet werkelijk bent.\"\n(Bron: De Maskermaker, Hoofdstuk 4)"
    },
    {
        "id": "ws1-q6",
        "title": "Angst voor Versmelting",
        "fullText": "Vraag: Heb je wel eens ervaren dat liefde of intimiteit voelde alsof je zou verdwijnen, of alsof je 'opgeslokt' zou worden?\nVerdiepende vraag: Als liefde niet zou betekenen dat je verdwijnt, maar dat je juist m\u00e9\u00e9r jezelf zou kunnen zijn, hoe zou dat er dan uitzien? Wat zou de eerste kleine stap zijn om dat te onderzoeken?\n\"Een cli\u00ebnt beschreef het prachtig: 'Als iemand echt van me houdt, word ik bang. Niet alleen bang om gekwetst te worden, maar bang om te verdwijnen, om opgeslokt te worden. Het is alsof liefde een zwart gat is...'\"\n(Bron: Van wond naar wonder, Hoofdstuk 1)\nONDERDEEL 3: HET LICHAAM EN DE ENERGIE\nHet schizo\u00efde lichaam toont vaak fragmentatie en een terugtrekking van energie uit de periferie (handen, voeten, ogen) naar de kern."
    },
    {
        "id": "ws1-q7",
        "title": "De Vier Linkervoeten",
        "fullText": "Vraag: Ga voor de spiegel staan en beweeg. Voel je je lichaam als \u00e9\u00e9n soepel geheel, of voelt het soms mechanisch, of alsof je lichaamsdelen niet goed met elkaar verbonden zijn?\nVerdiepende vraag: Als je de verschillende delen van je lichaam stem zou geven, welk deel voelt zich het meest 'buitengesloten' of 'niet thuis'? Wat zou dat deel nodig hebben om weer deel van het geheel te worden?\n\"Een cli\u00ebnt zei het eens perfect: 'Ik voel me alsof ik geboren ben met vier linkervoeten.' [...] De armen en benen bungelen als slecht bevestigde onderdelen aan de romp, alsof ze niet echt bij het lichaam horen.\"\n(Bron: Van wond naar wonder, Hoofdstuk 1)"
    },
    {
        "id": "ws1-q8",
        "title": "De Koude Kern",
        "fullText": "Vraag: Scan je lichaam op temperatuur en aanwezigheid. Zijn je handen en voeten vaak koud? Voel je een spanning rond je middenrif of je nekbasis die dient om gevoelens (en energie) af te splitsen van je hoofd?\nVerdiepende vraag: Als je je voorstelt dat warmte en levensenergie door je hele lichaam zouden stromen tot in je vingertoppen en tenen, wat zou er dan anders voelen? Welke emotie of sensatie zou dan misschien bovenkomen?\n\"Je energie en je ademhaling zitten hoog; je stem kan ook hoog of jong klinken. Vaak beleef je je lichaam niet als een geheel... Je handen en voeten zijn koud, omdat je niet zo ver komt met je levensenergie.\"\n(Bron: De Maskermaker, Hoofdstuk 4)\nONDERDEEL 4: DE KWALITEIT (HET GOUD)\nWanneer de schizo\u00efde mens leert om veilig op aarde te landen, transformeert de afstandelijkheid in een heldere, spirituele en creatieve kracht."
    },
    {
        "id": "ws1-q9",
        "title": "De Dromer / De Ziener",
        "fullText": "Vraag: Jouw vermogen om je terug te trekken heeft je ook iets gebracht. Welke creatieve, spirituele of visionaire kwaliteiten heb jij ontwikkeld in je binnenwereld, die je nu als een geschenk aan de wereld kunt geven?\nVerdiepende vraag: Hoe zou je deze kwaliteiten kunnen delen terwijl je tegelijkertijd geaard blijft? Welke concrete stap zou je kunnen zetten om je innerlijke rijkdom te verbinden met de aardse werkelijkheid?\n\"Je vermogen is dat je voeding uit andere werelden kunt halen dan alleen uit de aardse. [...] Je flitsende gedachten helpen je vaak aan geniale oplossingen voor ingewikkelde problemen. In je analyses ben je kristalhelder omdat je je niet laat afleiden.\"\n(Bron: De Maskermaker, Hoofdstuk 4)\nTer afsluiting:\nDe schizo\u00efde structuur vraagt om geduld en zachtheid. Het is de kunst van het 'ontdooien' zonder te overstromen. Neem je tijd voor deze vragen en weet: je bent welkom, precies zoals je bent, met al je mechanismen.\nWorkshop 2: De Orale Structuur\nThema: De Honger die Nooit Stilt & De Weg naar de Bron\nBeste deelnemer,\nWelkom bij de tweede stap op onze reis. Waar de schizo\u00efde structuur gaat over het recht om te bestaan, gaat de orale structuur over het recht om nodig te hebben. Het raakt aan onze diepste, pre-verbale herinnering van afhankelijkheid.\nVelen van ons dragen een vorm van deze 'honger' met zich mee. De angst dat er niet genoeg is: niet genoeg liefde, niet genoeg tijd, niet genoeg aandacht. In mijn praktijk zie ik vaak hoe we deze leegte proberen te vullen met partners, werk of middelen, terwijl de enige echte voeding van binnenuit moet komen.\nIk nodig je uit om met mildheid naar je eigen behoeftigheid te kijken. Het is geen zwakte, het is een roep om verbinding die ooit onbeantwoord bleef.\nONDERDEEL 1: DE OORSPRONG (ACHTERGROND)\nDe orale wond ontstaat in de vroege kinderjaren (0-2 jaar), de tijd van de mond, het zuigen en de totale afhankelijkheid van de moeder (of verzorger) voor voeding en warmte."
    },
    {
        "id": "ws1-q10",
        "title": "Het Eerste Tekort",
        "fullText": "Vraag: Als je terugvoelt naar je vroege kindertijd, of de verhalen daarover: was er sprake van fysieke of emotionele schaarste? Was je moeder (of vader) \u00e9cht beschikbaar, of was ze er wel fysiek maar niet emotioneel?\nVerdiepende vraag: Als je je voorstelt dat je als baby volledig gevoed en gezien was, hoe zou je leven er dan nu anders uitzien? Welk deel van jezelf zou dan meer ruimte hebben gekregen om te groeien?\n\"Hun trauma ligt niet in wat er gebeurde, maar in wat er n\u00edet gebeurde. Geen mishandeling, geen actieve wreedheid - alleen afwezigheid. Een moeder die werkt, die ziek is, die emotioneel niet beschikbaar is.\"\n(Bron: Van wond naar wonder, Hoofdstuk 2)"
    },
    {
        "id": "ws1-q11",
        "title": "Systemische Leegte",
        "fullText": "Vraag: Is er in jouw familiesysteem sprake van onverwerkt verlies of een generatielange 'tekortkoming' (armoede, oorlog, jong gestorven ouders)? Heb jij onbewust geprobeerd de leegte van je ouders te vullen?\nVerdiepende vraag: Als je de honger van eerdere generaties zou kunnen teruggeven aan wie het toebehoort, wat zou je dan tegen hen zeggen? En wat zou er in jou vrijkomen als je die last neerlegt?\n\"Vaak was er in je familiegeschiedenis een groot verdriet dat de familieleden niet konden dragen, bijvoorbeeld een in het kraambed gestorven oma.\"\n(Bron: De Maskermaker, Hoofdstuk 5)"
    },
    {
        "id": "ws1-q12",
        "title": "Het Gevoel van 'Niet Genoeg'",
        "fullText": "Vraag: Op welke gebieden in je huidige leven voel je de pijnlijke overtuiging dat je tekortkomt, of dat je moet vechten voor kruimels? (Denk aan aandacht, geld, liefde).\nVerdiepende vraag: Welke innerlijke stem herhaalt dit verhaal van tekort? Van wie heb je die stem geleerd, en wat zou je tegen die stem willen zeggen vanuit het deel van jou dat w\u00e9l weet dat je genoeg bent?\n\"Je vergelijkt je doorlopend met anderen. 'Zie je wel, ik alweer niet,' zegt een stemmetje in je. Je houdt zelfs een lijstje bij van niet gekregen zaken.\"\n(Bron: De Maskermaker, Hoofdstuk 5)\nONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)\nDe orale dynamiek in relaties is vaak uitputtend: het is de dans van de 'bodemloze put' of de 'helper' die geeft om te krijgen."
    },
    {
        "id": "ws1-q13",
        "title": "De Emotionele Vampier",
        "fullText": "Vraag: Herken je bij jezelf (of je partner) het patroon dat hoeveel aandacht er ook wordt gegeven, het nooit genoeg voelt? Dat er na een fijn moment direct weer een gevoel van leegte of claim ontstaat?\nVerdiepende vraag: Wat zou er gebeuren als je na een moment van ontvangen even zou pauzeren en het werkelijk zou laten binnenkomen? Wat maakt het zo moeilijk om te geloven dat het genoeg is?\n\"Een partner van een orale man vertelde me uitgeput: 'Het is alsof ik met een vampier leef, maar dan een emotionele vampier. Hij zuigt alle energie uit me.'\"\n(Bron: Van wond naar wonder, Hoofdstuk 2)"
    },
    {
        "id": "ws1-q14",
        "title": "Ruilhandel in Aandacht",
        "fullText": "Vraag: Geef jij vaak aan anderen wat je eigenlijk z\u00e9lf zo graag zou willen ontvangen? En voel je wrok als dit niet 'terugbetaald' wordt?\nVerdiepende vraag: Stel je voor dat je zou kunnen geven zonder iets terug te verwachten. Wat zou er dan veranderen in hoe je geeft? En durf je ook te ontvangen zonder daar iets voor 'terug te hoeven doen'?\n\"Je 'regelt' aandacht door voor de ander te zorgen met lief of aangepast gedrag in de hoop dat je er iets voor terugkrijgt.\"\n(Bron: De Maskermaker, Hoofdstuk 5)"
    },
    {
        "id": "ws1-q15",
        "title": "Destructief Recht",
        "fullText": "Vraag: Herken je momenten waarop je vindt dat je recht hebt op compensatie voor wat je hebt gemist? Uit zich dit in eisen, claimen, of boos worden als de ander niet levert?\nVerdiepende vraag: Als je het kleine kind in jou dat tekort is gekomen zou kunnen troosten, wat zou je tegen dat kind zeggen? En wat zou het werkelijk nodig hebben \u2013 niet van de ander, maar van jou?\n\"Het destructief recht staat op de voorgrond: het gevoel dat de ander teruggepakt moet worden omdat er zoveel is misgegaan.\"\n(Bron: De Maskermaker, Hoofdstuk 5)\nONDERDEEL 3: HET LICHAAM EN DE ENERGIE\nHet orale lichaam toont vaak de instorting, de leegte, of de wanhopige greep naar contact."
    },
    {
        "id": "ws1-q16",
        "title": "De Ingestorte Houding",
        "fullText": "Vraag: Ga voor de spiegel staan en laat je schouders en borstkas hangen zoals je doet als je moe of verdrietig bent. Wat zie je? Herken je de fysieke kenmerken van de \"ondervoeding\"?\nVerdiepende vraag: Als je je borstkas zou openen en je schouders naar achteren zou brengen, welke emotie komt er dan naar boven? Wat zou je dan moeten voelen dat je nu niet voelt?\n\"Het orale lichaam vertelt het verhaal van ondervoeding. Lang en mager vaak, met spieren die als slappe touwtjes aan het skelet hangen.\"\n(Bron: Van wond naar wonder, Hoofdstuk 2)"
    },
    {
        "id": "ws1-q17",
        "title": "Het Hongergat",
        "fullText": "Vraag: Voel eens in het centrum van je borstkas, ter hoogte van het hart. Voelt het daar vol en krachtig, of is er een sensatie van een 'gat', een inzinking of een zuigende leegte?\nVerdiepende vraag: Als je adem en liefde naar die plek zou kunnen sturen, wat zou die leegte dan nodig hebben om langzaam gevuld te raken? En van wie zou die vulling moeten komen?\n\"En inderdaad, in het centrum van de borst, daar waar volgens de Chinezen het hart-chakra zit, is vaak een inzinking te zien - het 'hongergat' zoals we het noemen.\"\n(Bron: Van wond naar wonder, Hoofdstuk 2)\nONDERDEEL 4: DE KWALITEIT (HET GOUD)\nAls de orale mens leert zichzelf te voeden, ontstaat er een enorme capaciteit tot geven vanuit overvloed, in plaats van uit tekort."
    },
    {
        "id": "ws1-q18",
        "title": "De Voedster / De Bron",
        "fullText": "Vraag: Als jij je niet leeg en behoeftig voelt, maar 'gevuld', wat heb jij de wereld dan te bieden? Wat is jouw specifieke kwaliteit in het aanvoelen van wat anderen nodig hebben?\nVerdiepende vraag: Kun je een moment herinneren waarop je gaf vanuit overvloed in plaats van uit hoop op terugkrijgen? Hoe voelde dat anders, en hoe zou je meer van die momenten kunnen cre\u00ebren?\n\"Orale mensen die hun eigen bron hebben gevonden, kunnen geven zoals niemand anders kan geven. Ze kennen de honger, ze kennen de leegte, dus ze weten precies wat anderen nodig hebben.\"\n(Bron: Van wond naar wonder, Hoofdstuk 2)\nTer afsluiting:\nDe orale structuur confronteert ons met onze afhankelijkheid. Dat kan pijnlijk zijn, maar onthoud: alleen door de leegte te erkennen, kunnen we leren onszelf te vullen. Neem je bevindingen mee naar de groep. We gaan werken aan het vinden van je eigen bodem."
    }
];

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
                De Schizoïde en Orale structuur
              </p>
            </div>
          </div>

          <ProgressBar workshopId="workshop1_jaar2" totalQuestions={questions.length} />

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
            <DownloadButtons 
              workshopId="workshop1_jaar2"
              workshopTitle="Workshop 1: Fundament en Bestaansrecht"
              workshopDate="18-19 april 2026"
              questions={questions}
            />
          </div>

          <div className="space-y-8">
            {questions.map((q, index) => (
              <Card key={q.id} className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">
                      {index + 1}
                    </span>
                    {q.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap italic">
                    {q.fullText}
                  </div>
                  <AnswerField 
                    workshopId="workshop1_jaar2" 
                    questionId={q.id} 
                    placeholder="Schrijf hier je reflectie..."
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <AIHelper 
            workshopId="workshop1_jaar2"
            workshopTitle="Fundament en Bestaansrecht"
            context="Deze workshop behandelt de volgende thema's: De Schizoïde en Orale structuur. De teksten zijn letterlijk overgenomen uit het huiswerkboek van Martien Janssen."
          />

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
