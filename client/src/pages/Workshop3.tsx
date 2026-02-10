import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { AnswerField } from "@/components/AnswerField";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AIHelper } from "@/components/AIHelper";

export default function Workshop3() {
  const questions = [
    {
        "id": "ws3-q1",
        "title": "Het verraad van het vertrouwen",
        "fullText": "Vraag: Herinner jij je momenten (of een sfeer) waarin je als kind voelde dat je gebruikt werd voor het geluk van je vader of moeder? Of dat er beloftes werden gedaan die niet werden nagekomen?\nVerdiepende vraag: Welk besluit heb je toen onbewust genomen over mensen en vertrouwen? En hoe beïnvloedt dat besluit nog steeds hoe je je vandaag in relaties beweegt?\n\"Als je structureel in de steek gelaten wordt... dan wordt het basisvertrouwen dat je als kind van nature hebt beschaamd. Je bent in hen teleurgesteld en je voelt je verraden.\"\n(Bron: De Maskermaker, Hoofdstuk 7)"
    },
    {
        "id": "ws3-q2",
        "title": "Parentificatie en de kleine prins/prinses",
        "fullText": "Vraag: Heb jij je als kind 'groter' of sterker gevoeld dan je ouders? Had je het gevoel dat jij de situatie moest redden of de speciale vertrouweling was?\nVerdiepende vraag: Wat moest je opgeven van je kindertijd om die 'grote' rol te kunnen spelen? En is er een deel van jou dat nog steeds rouwt om het kind dat niet kind mocht zijn?\n\"Je nam de taak van een afwezige ouder vaak over om op die manier dicht bij de blijvende ouder te zijn. Met je kinderlijke almacht zei je: ik doe het voor jou, dat kan ik best.\"\n(Bron: De Maskermaker, Hoofdstuk 7)"
    },
    {
        "id": "ws3-q3",
        "title": "Het besluit tot onkwetsbaarheid",
        "fullText": "Vraag: Herken je het moment (of de houding) dat je besloot: \"Ik doe het wel alleen\" of \"Niemand krijgt mij er nog onder\"?\nVerdiepende vraag: Wat zou er gebeuren als je dat pantser even zou afleggen? Welke kwetsbaarheid of pijn ligt eronder verborgen die je nooit meer wilde voelen?\n\"Hij leerde vroeg dat de wereld verdeeld was in roofdieren en prooi, en hij had besloten nooit prooi te zijn. [...] Ik geef mezelf nooit volledig. Ik blijf in controle.\"\n(Bron: Van wond naar wonder, Hoofdstuk 5)\nONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)\nIn relaties toont deze structuur zich door verleiding, strijd, controle houden en moeite met werkelijke overgave."
    },
    {
        "id": "ws3-q4",
        "title": "Verleiden en afstoten",
        "fullText": "Vraag: Herken je bij jezelf (of een partner) dat de jacht spannender is dan de vangst? Gebruik je charme of hulpvaardigheid om de situatie naar je hand te zetten?\nVerdiepende vraag: Wat zou er gebeuren als je zou blijven nádat je iemand 'veroverd' hebt? Welke intimiteit vermijd je door steeds verder te jagen?\n\"In de liefde wordt de strategische dynamiek het meest pijnlijk zichtbaar. Want wat de Strateeg zoekt is niet liefde maar verovering, niet intimiteit maar controle... Deze cyclus van verleiden en afstoten, van veroveren en verlaten, is typerend.\"\n(Bron: Van wond naar wonder, Hoofdstuk 5)"
    },
    {
        "id": "ws3-q5",
        "title": "Macht en strijd",
        "fullText": "Vraag: Hoe reageer je als je partner of een autoriteitsfiguur je vertelt wat je moet doen? Voel je direct de neiging om in verzet te komen, de discussie te winnen, of te bewijzen dat jij het beter weet?\nVerdiepende vraag: Wat zou er veranderen als je een keer zou 'verliezen' of toegeven, zonder dat het betekent dat je zwak of ondergeschikt bent? Wat is het ergste dat zou kunnen gebeuren?\n\"Een relatie bekijk je vooral vanuit het perspectief hoog of laag, meer of minder, macht of onmacht. Jij staat per definitie bovenaan... In een ruzie toon je je onaangedaan of je verschuilt je achter grootspraak.\"\n(Bron: De Maskermaker, Hoofdstuk 7)"
    },
    {
        "id": "ws3-q6",
        "title": "Angst voor afhankelijkheid",
        "fullText": "Vraag: Hoe makkelijk is het voor jou om te zeggen: \"Ik heb je nodig\" of \"Ik weet het even niet\"? Of los je je problemen liever alleen op om niemand dankbaar te hoeven zijn?\nVerdiepende vraag: Kun je je een moment herinneren waarop je wél afhankelijk was en het goed afliep? Wat zou het je kosten om dat opnieuw te proberen?\n\"Afhankelijkheid voorkom je het liefst... Steun vragen brengt je in een lastig parket. Je bijt liever je tong af dan hieraan toe te geven. [...] Je hebt het gevoel dat je je kracht kwijtraakt als je 'ik heb je nodig' zegt.\"\n(Bron: De Maskermaker, Hoofdstuk 7)\nONDERDEEL 3: HET LICHAAM EN DE ENERGIE\nHet lichaam straalt kracht en 'opgeblazenheid' uit, vooral aan de bovenkant, terwijl de basis smal of onstabiel is."
    },
    {
        "id": "ws3-q7",
        "title": "De omgekeerde piramide",
        "fullText": "Vraag: Ga voor de spiegel staan. Kijk naar de verhouding tussen je schouders/borstkas en je bekken/benen. Is er sprake van een \"V-shape\"? Voelt je bovenlichaam krachtiger of meer 'aanwezig' dan je benen?\nVerdiepende vraag: Als je je aandacht en energie naar je benen en voeten zou brengen, hoe zou dat voelen? Wat zou er veranderen als je steviger 'gegrond' zou zijn?\n\"Deze ongelijke verdeling van energie en aandacht creëert wat ik het 'omgekeerde piramide lichaam' noem - massief bovenaan, smal onderaan. Het is een lichaam dat macht uitstraalt maar letterlijk geen sterke basis heeft om op te staan.\"\n(Bron: Van wond naar wonder, Hoofdstuk 5)"
    },
    {
        "id": "ws3-q8",
        "title": "De ogen die scannen",
        "fullText": "Vraag: Let eens op hoe je een ruimte met nieuwe mensen binnenkomt. Ben je aan het scannen? Kijk je wie er belangrijk is, wie een bedreiging vormt, of wie je kunt 'gebruiken' of charmeren?\nVerdiepende vraag: Wat zou er gebeuren als je een ruimte zou binnenkomen zonder te scannen? Als je gewoon aanwezig zou zijn, zonder strategie? Welke kwetsbaarheid zou dat blootleggen?\n\"Ze scannen constant de omgeving: Wie is een bedreiging? Wie kan gebruikt worden? Wie moet geneutraliseerd worden?\"\n(Bron: Van wond naar wonder, Hoofdstuk 5)\nONDERDEEL 4: DE KWALITEIT (HET GOUD)\nAls de strijd wordt opgegeven, transformeert de manipulator in een ware leider die dient in plaats van heerst."
    },
    {
        "id": "ws3-q9",
        "title": "De krijger van het hart / de leider",
        "fullText": "Vraag: Jij hebt een enorme daadkracht en charisma. Als je deze kwaliteiten niet inzet om jezelf te beschermen of te winnen, maar om anderen te steunen of een hoger doel te dienen, hoe ziet dat er dan uit?\nVerdiepende vraag: Kun je je een situatie voorstellen waarin je je kracht inzet om iets kwetsbaars te beschermen, in plaats van om macht te verwerven? Hoe zou dat voelen?\n\"De energie die ooit gebruikt werd om te domineren kan nu gebruikt worden om te beschermen wat kwetsbaar is. Ze worden de krijgers van het hart.\"\n(Bron: Van wond naar wonder, Hoofdstuk 5)\nTer afsluiting:\nDe stap van macht naar overgave is misschien wel de spannendste sprong die er is. Het vraagt moed om te erkennen dat je het niet alleen kunt. In de workshop gaan we oefenen met die sprong, in een veilige bedding.\nMartien\nWorkshop 6: De presterende structuur\nThema: Het Harnas van Perfectie & De Kunst van Overgave\nBeste deelnemer,\nWe eindigen onze reis met de structuur die vaak het meest 'succesvol' oogt aan de buitenkant, maar die van binnen misschien wel het eenzaamst is. Het is de structuur van de perfectie, de prestatie, en het hart dat op slot ging om nooit meer gekwetst te worden.\nIn mijn praktijk zie ik hier vaak prachtige, krachtige mensen binnenkomen. Alles lijkt te kloppen: de baan, het uiterlijk, het verhaal. Maar de prijs voor die perfectie is hoog: het verlies van levendigheid. De Presteerder heeft geleerd: \"Als ik perfect ben, kan niemand me pijn doen.\" Maar als je perfect bent, kan niemand je ook écht raken.\nIk nodig je uit om je harnas heel even op een kier te zetten en te kijken wat eronder zit.\nONDERDEEL 1: DE OORSPRONG (ACHTERGROND)\nDe presterende wond ontstaat later dan de andere, in de 'genitale fase' (3 tot 6 jaar). Het is de tijd waarin het kind zijn hart en zijn bekken (vitaliteit/seksualiteit) wil verbinden en zich voluit wil laten zien aan de ouders, maar daarin wordt afgewezen of gecorrigeerd."
    },
    {
        "id": "ws3-q10",
        "title": "De afgewezen vitaliteit",
        "fullText": "Vraag: Herinner jij je uit je kindertijd dat je spontaniteit, je wildheid of je prille verliefdheid/seksualiteit werd afgeremd? Werd er gezegd \"doe maar gewoon\", of \"dat hoort niet\"? Voelde je dat je prestaties welkom waren, maar je gevoelens niet?\nVerdiepende vraag: Welk deel van je levenskracht heb je toen 'op slot' gezet? En wat zou er gebeuren als je dat deel nu weer zou toelaten?\n\"Wat alle presterende kinderen leren - is dat hun natuurlijke vitaliteit, hun spontane levenslust, hun wilde hart niet welkom is. Niet verboden... Maar gewoon... irrelevant.\"\n(Bron: Van wond naar wonder, Hoofdstuk 6)"
    },
    {
        "id": "ws3-q11",
        "title": "De alchemie van perfectie",
        "fullText": "Vraag: Op welke gebieden in je leven (werk, uiterlijk, huishouden) streef jij naar foutloosheid? Heb je het gevoel dat je liefde moet verdienen door dingen goed te doen?\nVerdiepende vraag: Wat zou er gebeuren als je een fout zou maken en niemand zou je minder waarderen? Kun je je voorstellen geliefd te worden om wie je bent, niet om wat je doet?\n\"Het presterende kind vindt een briljante oplossing: het wordt perfect. Als mijn natuurlijke zelf niet goed genoeg is, dan creëer ik een zelf dat wel goed genoeg is.\"\n(Bron: Van wond naar wonder, Hoofdstuk 6)"
    },
    {
        "id": "ws3-q12",
        "title": "De split tussen hart en bekken",
        "fullText": "Vraag: Herken je bij jezelf dat je óf heel erg in je hoofd zit (controle), óf heel erg in de actie/seksualiteit (prestatie), maar zelden met je hele hart en gevoel aanwezig bent in het moment?\nVerdiepende vraag: Wat zou er nodig zijn om je hart, je hoofd en je bekken met elkaar te verbinden? En welke emotie vermijd je door ze gescheiden te houden?\n\"Je trekt je terug uit je bekken om zo je lust te beheersen... Je hoofd, hart en geslacht verbinden is een voorwaarde voor overgave, maar je bewaakt op die fronten de controle.\"\n(Bron: De Maskermaker, Hoofdstuk 9)\nONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)\nIn relaties is de Presteerder vaak de 'ideale' partner op papier: trouw, plichtsgetrouw en stabiel. Maar de partner voelt vaak een afstand, een onbereikbaarheid."
    },
    {
        "id": "ws3-q13",
        "title": "De glazen wand (de actor)",
        "fullText": "Vraag: Heb je wel eens van een partner gehoord dat je \"alles volgens het boekje doet\" maar dat ze je niet kunnen voelen? Dat je functioneert als een perfecte echtgenoot/vriend, maar dat de intimiteit ontbreekt?\nVerdiepende vraag: Als je zou stoppen met 'spelen' en zou laten zien wat er werkelijk in je omgaat, wat zou je partner dan zien? Wat houd je achter die glazen wand verborgen?\n\"'Het is alsof ik leef met een actor die perfect de rol van echtgenoot speelt. Hij doet alle juiste dingen, zegt alle juiste woorden, maar ik voel hem niet. Waar is híj in dit alles?'\"\n(Bron: Van wond naar wonder, Hoofdstuk 6)"
    },
    {
        "id": "ws3-q14",
        "title": "Aantrekken en afstoten",
        "fullText": "Vraag: Herken je het patroon van verleiden (charmeren, aantrekken) en vervolgens afstand nemen zodra de ander echt voor je gaat?\nVerdiepende vraag: Wat is het moment waarop je 'dichtslaat'? En welke kwetsbaarheid of angst bescherm je door afstand te nemen voordat de ander te dichtbij komt?\n\"Als het op intimiteit aankomt, wordt het al snel verwarrend door je dubbele boodschappen als 'kom alstublieft' en 'blijf op een afstand'. [...] Je houdt jezelf in twijfel en voorzichtigheid gevangen.\"\n(Bron: De Maskermaker, Hoofdstuk 9)"
    },
    {
        "id": "ws3-q15",
        "title": "De strijd om de eerste plek",
        "fullText": "Vraag: Merk je dat je in relaties (of vriendschappen) bezig bent met wie er 'beter' is, wie er gelijk heeft, of wie de controle heeft? Is het moeilijk voor je om je ongelijk toe te geven of je kwetsbaar op te stellen?\nVerdiepende vraag: Wat zou er veranderen in je relaties als je zou stoppen met vergelijken en strijden? En wat zou je moeten loslaten om 'gewoon' gelijkwaardig te kunnen zijn?\n\"Je bent geneigd de ander te beoordelen, bijvoorbeeld over de vormgeving van een sessie. [...] Je houdt koste wat kost de regie.\"\n(Bron: De Maskermaker, Hoofdstuk 9)\nONDERDEEL 3: HET LICHAAM EN DE ENERGIE\nHet presterende lichaam is vaak atletisch, proportioneel en 'mooi', maar er zit een hoge spanning op. Het is een fort."
    },
    {
        "id": "ws3-q16",
        "title": "De rechte rug (trots)",
        "fullText": "Vraag: Ga staan en voel je houding. Heb je de neiging je kin iets op te tillen en je rug kaarsrecht te houden (de \"militaire houding\")? Voelt het alsof je altijd 'aan' staat en klaar bent om te presteren?\nVerdiepende vraag: Wat zou er gebeuren als je zou zakken, zou hangen, zou 'falen' in je houding? Welke emotie zou dan naar boven komen die je nu met je rechte rug in bedwang houdt?\n\"Je bewegingen zijn beheerst en soms wat star, als een mannequin of militair... De stand van je hoofd met opgeheven kin zit een zekere trots.\"\n(Bron: De Maskermaker, Hoofdstuk 9)"
    },
    {
        "id": "ws3-q17",
        "title": "De machine",
        "fullText": "Vraag: Probeer eens 5 minuten lang doelloos te bewegen of gewoon te 'hangen' zonder doel. Wat gebeurt er? Voelt je lichaam ongemakkelijk als het niet 'nuttig' bezig is?\nVerdiepende vraag: Als je lichaam geen machine zou zijn maar een levend wezen met eigen verlangens, wat zou het dan willen? Wat mist het al jarenlang?\n\"'Mijn lichaam is een machine,' zei hij later. 'Een heel efficiënte machine. Maar machines hebben geen verlangens.' [...] Thomas stond daar, verlamd.\"\n(Bron: Van wond naar wonder, Hoofdstuk 6)\nONDERDEEL 4: DE KWALITEIT (HET GOUD)\nWanneer het pantser smelt, komt er een enorme kracht vrij: de kracht van het open hart, passie en leiderschap."
    },
    {
        "id": "ws3-q18",
        "title": "De edelman / de jonkvrouw (authenticiteit)",
        "fullText": "Vraag: Jij hebt discipline en vormkracht. Als je deze niet gebruikt om jezelf te beschermen of te verharden, maar om voluit lief te hebben en schoonheid te creëren, hoe ziet jouw leven er dan uit?\nVerdiepende vraag: Kun je een moment herinneren waarop je écht open was, zonder harnas, en het goed was? Wat maakte dat moment mogelijk, en hoe kun je meer van die momenten creëren?\n\"Doorleefde presterende energie maakt het mogelijk om voluit in de liefde te staan door hart- en bekkenenergie met elkaar te verbinden. De essentie van deze structuur zit in oog hebben voor de innerlijke schoonheid van ieder mens.\"\n(Bron: De Maskermaker, Hoofdstuk 9)\nTer afsluiting:\nDe presterende structuur vraagt ons om de controle te verliezen. Dat klinkt als sterven, maar het is de enige weg naar echt leven. Zoals ik in het boek schrijf: \"Faal vandaag ergens in. Niet dramatisch, maar gewoon menselijk.\"\nIk zie ernaar uit om samen met jullie het harnas af te leggen.\nMartien"
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
              <span>Workshop 3</span>
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                19-20 september 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Macht, controle en perfectie
              </h1>
              <p className="text-xl text-muted-foreground">
                De strategische en presterende structuur
              </p>
            </div>
          </div>

          <ProgressBar workshopId="workshop3_jaar2" totalQuestions={questions.length} />

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
            <DownloadButtons 
              workshopId="workshop3_jaar2"
              workshopTitle="Workshop 3: Macht, controle en perfectie"
              workshopDate="19-20 september 2026"
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
                    workshopId="workshop3_jaar2" 
                    questionId={q.id} 
                    placeholder="Schrijf hier je reflectie..."
                  />
                  <AIHelper 
                    workshopId="workshop3_jaar2"
                    questionId={q.id}
                    workshopTitle="Macht, controle en perfectie"
                    context={`Vraag: ${q.title}\nInhoud: ${q.fullText}` }
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link href="/">
              <Button variant="ghost">Terug naar home</Button>
            </Link>
            
            <Link href="/workshop/4"><Button className="gap-2">Volgende workshop <ChevronRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

