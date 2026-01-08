import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { AnswerField } from "@/components/AnswerField";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AIHelper } from "@/components/AIHelper";

export default function Workshop2() {
  const questions = [
    {
        "id": "ws2-q1",
        "title": "De Angst voor Autonomie",
        "fullText": "Vraag: Als je terugkijkt naar je jeugd, werd jouw eigen wil en jouw 'nee' toegejuicht, of werd het gezien als lastig of gevaarlijk? Kreeg je de boodschap dat de wereld onveilig was en dat je beter 'dichtbij' kon blijven?\nVerdiepende vraag: Welke onuitgesproken boodschap kreeg je over wat er zou gebeuren als je w\u00e9l je eigen weg zou gaan? Wiens angst of verdriet zou je dan moeten dragen?\n\"Het kind verinnerlijkt de angst van zijn ouders bij zijn eerste stappen naar zelfstandigheid. [...] De ouders stralen uit: doe het voor ons. Een vaardigheid die het net onder de knie probeert te krijgen, wordt door hen 'gekaapt'.\"\n(Bron: De Maskermaker, Hoofdstuk 6)"
    },
    {
        "id": "ws2-q2",
        "title": "Het Ik-loze Kind",
        "fullText": "Vraag: Herken jij momenten uit je kindertijd waarin je letterlijk niet wist wat je voelde of wilde totdat je naar je ouder (of broer/zus) keek? Heb je geleerd om als een kameleon te zijn?\nVerdiepende vraag: Als je nu, als volwassene, even de tijd neemt om naar binnen te luisteren zonder eerst naar de ander te kijken \u2013 wat voel je dan? Wat wil jij, los van wat iedereen om je heen zou willen?\n\"Wat Tim als zesjarige al voelt... het gevoel dat er alleen een 'ik' bestaat als er een 'wij' is. [...] Niet fysiek - dat zou te opvallend zijn - maar energetisch, emotioneel, door jezelf als een kameleon aan te passen aan wat de ander nodig heeft.\"\n(Bron: Van wond naar wonder, Hoofdstuk 3)"
    },
    {
        "id": "ws2-q3",
        "title": "Systemische Grensvervaging",
        "fullText": "Vraag: Was er in jouw gezin sprake van een 'heilige ruimte' die alleen van jou was? Of liepen ouders zomaar binnen, lazen ze mee, of deelden ze hun volwassen zorgen met jou alsof je hun partner was?\nVerdiepende vraag: Als je nu een denkbeeldige grens zou trekken rondom jezelf \u2013 waar zou die lopen? En welke mensen of rollen zitten er nu binnen die grens die er eigenlijk niet thuishoren?\n\"Er zijn ook systemen waar grenzen simpelweg niet bestaan. Papa loopt zonder kloppen de badkamer binnen waar zijn dochter van twaalf onder de douche staat. Mama leest het dagboek van haar zoon... Het kind groeit op zonder besef van een 'heilige ruimte'.\"\n(Bron: Van wond naar wonder, Hoofdstuk 3)\nONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)\nIn volwassen relaties toont de symbioot zich vaak door claimen (\"waar ben je?\"), over-aanpassing of het niet kunnen maken van eigen keuzes."
    },
    {
        "id": "ws2-q4",
        "title": "De Paniek van het Alleen Zijn",
        "fullText": "Vraag: Wat gebeurt er in jou als je partner (of een goede vriend) afstand neemt, op reis gaat, of emotioneel even niet beschikbaar is? Voel je een gezonde 'ik mis je', of een existenti\u00eble paniek/leegte (\"ik besta niet meer\")?\nVerdiepende vraag: Kun je je herinneren wanneer je voor het eerst dit gevoel van 'niet bestaan zonder de ander' hebt ervaren? Wat zou je het kleine kind dat dit voelde willen zeggen?\n\"Want de symbiotische partner heeft altijd de ander nodig om zich compleet te voelen. De angst voor verlating is allesoverheersend. Alleen zijn voelt als niet bestaan.\"\n(Bron: De Maskermaker, Hoofdstuk 6)"
    },
    {
        "id": "ws2-q5",
        "title": "Kameleongedrag en 'Wij'",
        "fullText": "Vraag: Betrap je jezelf erop dat je vaak in de 'wij-vorm' spreekt (\"wij vinden...\", \"wij gaan...\")? En als je in een restaurant zit, bestel je dan wat je \u00e9cht zelf wilt, of pas je je aan aan wat de ander neemt of suggereert?\nVerdiepende vraag: Durf je een week lang bij elke keuze \u2013 hoe klein ook \u2013 eerst naar jezelf te luisteren voordat je de ander raadpleegt? Wat zou het ergste zijn dat zou kunnen gebeuren als je echt zou kiezen wat jij wilt?\n\"En de symbioot? Die weet precies wat iedereen voelt, denkt en wil - behalve zichzelf. 'Wat vind jij ervan?' is een vraag die hem in paniek brengt. Zijn eerste reactie is terugvragen: 'Wat vind jij?'\"\n(Bron: Van wond naar wonder, Hoofdstuk 3)"
    },
    {
        "id": "ws2-q6",
        "title": "Energetische Invasie",
        "fullText": "Vraag: Heb je wel eens gehoord (of voel je zelf) dat je 'te veel' bent, of dat je 'onder de huid' van de ander kruipt? Dat je al gaat helpen of zorgen voordat de ander erom gevraagd heeft?\nVerdiepende vraag: Wat vul je in of op voor de ander dat je eigenlijk niet weet? En wat zou er gebeuren als je zou wachten tot de ander \u00e9cht om hulp vraagt?\n\"Ze zitten energetisch zo in jouw veld dat het voor jou soms benauwend kan worden, terwijl zij zich nergens bewust van zijn. 'Wat doe ik dan?' vragen ze verbaasd als je aangeeft dat ze te dichtbij zijn.\"\n(Bron: Van wond naar wonder, Hoofdstuk 3)\nONDERDEEL 3: HET LICHAAM EN DE ENERGIE\nHet symbiotische lichaam is vaak zacht, weinig begrensd, soms 'vloeibaar' of juist zwaar om houvast te zoeken."
    },
    {
        "id": "ws2-q7",
        "title": "De Vage Grenzen",
        "fullText": "Vraag: Ga eens staan en voel je lichaam. Voel je een duidelijke grens (je huid) tussen jou en de ruimte om je heen? Of voelt je energie diffuus, wijdverspreid, alsof je 'overal en nergens' bent?\nVerdiepende vraag: Als je je voeten stevig in de grond zou planten en je zou voorstellen dat je huid een duidelijke, liefdevolle grens is, hoe voelt dat dan? Wat verandert er in je beleving van jezelf?\n\"Lichamelijk is de symbioot moeilijk te vatten. Alsof er geen echte begrenzing is. [...] Andere zijn juist transparant, bijna etherisch. Ze lijken weinig ruimte in te nemen.\"\n(Bron: Van wond naar wonder, Hoofdstuk 3)"
    },
    {
        "id": "ws2-q8",
        "title": "De Radar",
        "fullText": "Vraag: Merk op hoe je een ruimte binnenkomt. Zijn je ogen en energie direct gericht op wie er is en hoe de sfeer is (naar buiten gericht), of kun je ook voelen hoe jij je voelt in je eigen buik (naar binnen gericht)?\nVerdiepende vraag: Kun je je radar een moment uitzetten en alleen bij jezelf blijven? Wat neem je dan waar in je eigen lichaam dat je normaal gesproken mist omdat je aandacht naar buiten gericht is?\n\"En dan die blik. Soms zie je ze recht aankijken, maar hun ogen zijn ergens anders. Ze scannen je, nemen je waar, proberen erachter te komen wat je wilt - maar contact is er niet echt. Het is meer een radarwerk...\"\n(Bron: Van wond naar wonder, Hoofdstuk 3)\nONDERDEEL 4: DE KWALITEIT (HET GOUD)\nWanneer de symbioot leert om op eigen benen te staan, transformeert de 'plakkerigheid' in een hoogstaand vermogen tot verbinding."
    },
    {
        "id": "ws2-q9",
        "title": "De Verbinder / De Empath",
        "fullText": "Vraag: Jouw gevoeligheid is je grootste talent. Als je niet versmelt, maar bij jezelf blijft, wat kun jij dan waarnemen of betekenen voor anderen dat voor anderen verborgen blijft?\nVerdiepende vraag: Hoe zou je jouw gave van aanvoelen kunnen inzetten terwijl je tegelijkertijd in je eigen energie blijft? Wat is het verschil tussen meevoelen en versmelten in jouw ervaring?\n\"Ten eerste: die verbazingwekkende sensitiviteit. De symbioot voelt dingen aan die anderen volledig ontgaan. Hij kan in een ruimte komen en binnen seconden weten wat er speelt.\"\n(Bron: Van wond naar wonder, Hoofdstuk 3)\nTer afsluiting:\nDe symbiotische structuur nodigt ons uit om te leren: Ik besta, ook als ik alleen ben. En van daaruit kunnen we echt verbinden, in plaats van versmelten. Neem je antwoorden en je moed mee.\nMartien\nWorkshop 4: De Masochistische Structuur\nThema: De Druk van het Moeten & De Vrijheid van de Wil\nBeste deelnemer,\nWe dalen af in de aarde, in de materie, in de zwaarte. De masochistische structuur wordt vaak misbegrepen als 'houden van pijn'. Niets is minder waar. Het is de structuur van het grote hart dat heeft geleerd om te dragen, te verdragen en zich op te offeren om de verbinding niet te verliezen.\nHet is de beweging van de energie die naar binnen slaat en daar onder hoge druk komt te staan. In mijn praktijk zie ik vaak mensen die muurvast zitten in een 'moeras' van loyaliteit en schuldgevoel. De vraag is: mag jij genieten zonder daarvoor te betalen? Mag jij 'nee' zeggen zonder dat de ander instort?\nIk nodig je uit om met compassie te kijken naar je eigen neiging tot zwoegen.\nONDERDEEL 1: DE OORSPRONG (ACHTERGROND)\nDe masochistische wond ontstaat in de fase van de autonomie en zindelijkheid (1,5 tot 3 jaar). Het is de tijd waarin het kind zijn eigen wil ontdekt (\"Nee!\", \"Zelf doen!\"), maar waarin deze wil wordt gebroken of gesmoord door (liefdevolle) dominantie."
    },
    {
        "id": "ws2-q10",
        "title": "De Gebroken Wil",
        "fullText": "Vraag: Als je terugkijkt: mocht jij als peuter/kind boos zijn, weigeren of vies worden? Of werd je liefdevol 'gekortwiekt' en geprezen als je braaf, schoon en gehoorzaam was?\nVerdiepende vraag: Kun je je herinneren wanneer je voor het laatst \u00e9cht 'nee' zei zonder je schuldig te voelen? Wat moest je opgeven om 'lief' te blijven, en waar in je lichaam voel je dat nu nog?\n\"De technieken die deze moeders gebruiken zijn gevarieerd maar hebben allemaal hetzelfde doel: de wil van het kind breken zonder zichtbaar geweld te gebruiken.\"\n(Bron: Van wond naar wonder, Hoofdstuk 4)"
    },
    {
        "id": "ws2-q11",
        "title": "De Dwangvoeding",
        "fullText": "Vraag: Herken je het thema van gedwongen moeten opeten (je bord leegeten), of figuurlijk: het moeten 'slikken' van de emoties of zorgen van je ouders?\nVerdiepende vraag: Wat 'slik' je nu nog steeds dat eigenlijk niet van jou is? En wat zou er gebeuren als je het zou uitspugen of teruggeven aan wie het toebehoort?\n\"Het patroon van opgelegde consumptie gaat veel verder dan alleen eten. Het kind moet ook liefde consumeren, aandacht, zorg...\"\n(Bron: Van wond naar wonder, Hoofdstuk 4)"
    },
    {
        "id": "ws2-q12",
        "title": "Het Dragen van de Last",
        "fullText": "Vraag: Heb jij als kind onbewust de zwaarte, het verdriet of de schuld van je ouders op je schouders genomen om hen te ontlasten? Voelde je je verantwoordelijk voor hun geluk?\nVerdiepende vraag: Als je de last die niet van jou is symbolisch zou neerleggen, wat zou je dan voelen? Opluchting? Angst? Schuld? En wat zegt dat over de prijs die je betaalt om te dragen?\n\"In de familie werd het lijden geleefd en was er een grote mate van opoffering... 'Laad maar op, ik kan het er wel bij hebben,' is de overtuiging...\"\n(Bron: De Maskermaker, Hoofdstuk 8)\nONDERDEEL 2: DYNAMIEK IN RELATIES (ZELF EN ANDER)\nIn relaties toont de masochist zich als de helper, de drager, maar ook als degene die klaagt en zich (passief) verzet."
    },
    {
        "id": "ws2-q13",
        "title": "De Onbetaalde Rekening",
        "fullText": "Vraag: Herken je bij jezelf de neiging om je op te offeren voor je partner of vrienden, terwijl er onderhuids een wrok groeit (\"Zie je niet wat ik allemaal voor je doe?\")?\nVerdiepende vraag: Wat zou er veranderen als je zou stoppen met bijhouden wat je 'tegoed' hebt? En durf je te vragen om wat je nodig hebt, in plaats van te hopen dat de ander het ziet?\n\"Als er uiteindelijk niet voldoende naar je terugkomt [...] blijf je zitten met het gevoel van een 'onbetaalde rekening', een openstaand tegoed.\"\n(Bron: De Maskermaker, Hoofdstuk 8)"
    },
    {
        "id": "ws2-q14",
        "title": "Passieve Agressie",
        "fullText": "Vraag: Hoe uit jij je onvrede in een relatie? Zeg je direct \"Nee, ik ben boos\", of merk je dat je gaat mopperen, klagen, dingen vergeet, te laat komt of 'per ongeluk' onhandig bent?\nVerdiepende vraag: Wat zou er gebeuren als je je boosheid direct en open zou uiten? Welke angst houdt je tegen, en wiens reactie vrees je het meest?\n\"Of beter gezegd, de enige uitlaatklep die is toegestaan is passieve agressie - het 'per ongeluk' laten vallen van een bord, het 'vergeten' van een afspraak...\"\n(Bron: Van wond naar wonder, Hoofdstuk 4)"
    },
    {
        "id": "ws2-q15",
        "title": "De Angst voor Vrijheid",
        "fullText": "Vraag: Stel dat je partner zegt: \"Doe vandaag maar precies waar jij zin in hebt, ik hoef niets van je.\" Wat roept dat op? Opluchting? Of paniek en schuldgevoel (\"Mag dat wel? Ben ik dan niet ego\u00efstisch?\")?\nVerdiepende vraag: Als je werkelijk vrij zou zijn om te doen wat jij wilt, wat zou dat dan zijn? En welke stem in je hoofd protesteert direct met redenen waarom dat niet kan of mag?\n\"De vraag 'Wat wil jij?' kan totale paniek veroorzaken. Ze hebben zo lang geleefd volgens de wensen van anderen dat ze het contact met hun eigen verlangens volledig zijn kwijtgeraakt.\"\n(Bron: Van wond naar wonder, Hoofdstuk 4)\nONDERDEEL 3: HET LICHAAM EN DE ENERGIE\nHet masochistische lichaam is gebouwd om te dragen en binnen te houden. Er is veel energie, maar die zit 'vast'."
    },
    {
        "id": "ws2-q16",
        "title": "De Pressure Cooker",
        "fullText": "Vraag: Voel je lichaam. Is het licht en ruim, of voelt het compact, stevig en soms 'vol'? Ervaar je spanning in je keel of buik, alsof je dingen inslikt of vasthoudt?\nVerdiepende vraag: Als je de druk zou mogen loslaten \u2013 door te schreeuwen, te huilen of wild te bewegen \u2013 wat zou er dan vrijkomen? En wat houdt je tegen om dat te doen?\n\"Dit cre\u00ebert wat ik de 'pressure cooker' dynamiek noem. De druk bouwt op, en bouwt op... maar er is geen uitlaatklep.\"\n(Bron: Van wond naar wonder, Hoofdstuk 4)"
    },
    {
        "id": "ws2-q17",
        "title": "De Zwaarte en de Atlas",
        "fullText": "Vraag: Ga staan en let op je schouders en nek. Heb je de neiging om je schouders op te trekken en je hoofd erin te trekken (als bescherming)? Voelt het alsof je een zware last draagt?\nVerdiepende vraag: Als je je voorstelt dat je de last van je schouders laat glijden, wat zou er dan met je houding veranderen? En wie zou dan de last dragen die jij hebt neergelegd?\n\"Je lichaam maakt een compacte indruk, een soort massief fort. [...] Je ademhaling is regelmatig, maar vaak moeizaam; werkend en lijdend.\"\n(Bron: De Maskermaker, Hoofdstuk 8)\nONDERDEEL 4: DE KWALITEIT (HET GOUD)\nAls de masochist zijn vrijheid hervindt, transformeert het 'zwoegen' in een enorme kracht en uithoudingsvermogen, ingezet vanuit vrije keuze."
    },
    {
        "id": "ws2-q18",
        "title": "De Vrije Dienaar / De Drager",
        "fullText": "Vraag: Jij hebt een enorm uithoudingsvermogen en loyaliteit. Als je dit niet meer doet omdat het moet, maar omdat je het wilt, wat heb jij de wereld dan te bieden?\nVerdiepende vraag: Kun je een moment herinneren waarop je hielp of droeg vanuit pure keuze, zonder enige verplichting? Hoe voelde dat anders dan je gebruikelijke 'moeten'?\n\"Nog een kwaliteit is het doordragen van dingen: je zorg voor continu\u00efteit. [...] Bij jou hoort de liefde voor het lot van de ander: de kwaliteit van het grote hart.\"\n(Bron: De Maskermaker, Hoofdstuk 8)\nTer afsluiting:\nDe stap uit het masochistische patroon vraagt moed: de moed om 'nee' te zeggen, de moed om ruimte in te nemen, en de moed om je eigen plezier serieus te nemen. Het is tijd om de zak van Sinterklaas neer te zetten en te kijken wat erin zit voor jou.\nMartien"
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
              <span>Workshop 2</span>
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                13-14 juni 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Verbinding en Autonomie
              </h1>
              <p className="text-xl text-muted-foreground">
                De Symbiotische en Masochistische structuur
              </p>
            </div>
          </div>

          <ProgressBar workshopId="workshop2_jaar2" totalQuestions={questions.length} />

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
            <DownloadButtons 
              workshopId="workshop2_jaar2"
              workshopTitle="Workshop 2: Verbinding en Autonomie"
              workshopDate="13-14 juni 2026"
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
                    workshopId="workshop2_jaar2" 
                    questionId={q.id} 
                    placeholder="Schrijf hier je reflectie..."
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <AIHelper 
            workshopId="workshop2_jaar2"
            workshopTitle="Verbinding en Autonomie"
            context="Deze workshop behandelt de volgende thema's: De Symbiotische en Masochistische structuur. De teksten zijn letterlijk overgenomen uit het huiswerkboek van Martien Janssen."
          />

          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link href="/">
              <Button variant="ghost">Terug naar Home</Button>
            </Link>
            <Link href="/workshop/3"><Button className="gap-2">Volgende Workshop <ChevronRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
