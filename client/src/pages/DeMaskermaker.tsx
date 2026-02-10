import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import PortraitSection from "../components/PortraitSection";

// ═══════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════

type StructureKey = "A" | "B" | "S" | "C" | "D" | "E";

interface ScenarioOption {
  structure: StructureKey;
  text: string;
}

interface Scenario {
  id: number;
  title: string;
  situation: string;
  question: string;
  options: ScenarioOption[];
  shuffledOptions?: ScenarioOption[];
}

interface PairOption {
  s: StructureKey;
  t: string;
}

interface Pair {
  id: number;
  a: PairOption;
  b: PairOption;
}

interface LikertItem {
  id: number;
  text: string;
  reversed?: boolean;
}

type Scores = Record<StructureKey, number>;

// ═══════════════════════════════════════════════════════════
// DEEL I — SCENARIO DATA (15 scenarios, 6 opties elk)
// ═══════════════════════════════════════════════════════════

const SCENARIOS: Scenario[] = [
  {
    id: 1, title: "Het verjaardagsfeest",
    situation: "Je bent uitgenodigd op het verjaardagsfeest van een kennis. Als je binnenkomt, blijkt dat je verder niemand kent. De jarige is druk in gesprek. De kamer is vol onbekende gezichten.",
    question: "Wat doe je het meest waarschijnlijk?",
    options: [
      { structure: "A", text: "Je voelt een lichte beklemming op je borst. Je zoekt een rustige plek — het balkon, de boekenplank — en hoopt dat het snel voorbij is. Mocht iemand een interessant gesprek beginnen, dan praat je mee, maar je maakt geen aanstalten." },
      { structure: "B", text: "Je loopt naar de jarige toe, maar die heeft het druk. Je voelt je wat verloren en gaat ergens staan waar je goed zichtbaar bent. Je merkt dat je hoopt dat iemand jou aanspreekt en bij het gezelschap betrekt." },
      { structure: "S", text: "Je scant de kamer om de sfeer te peilen. Je schuift aan bij een groepje en past je aan het gesprek aan — als zij lachen, lach je mee. Na een tijdje merk je dat je de houding van je buurman hebt overgenomen zonder dat je het doorhad." },
      { structure: "C", text: "Je overziet de ruimte, ziet wie bij wie hoort, en stapt zelfverzekerd op het meest interessante groepje af. Binnen een paar minuten stuur je het gesprek naar een onderwerp waar je goed in bent." },
      { structure: "D", text: "Je biedt aan om in de keuken te helpen, hangt jassen op, maakt je nuttig. Als iemand later vraagt of je het naar je zin hebt, zeg je \"ja hoor, prima!\" — terwijl er een zwaar gevoel in je maag zit." },
      { structure: "E", text: "Je stelt je netjes voor aan een paar mensen, let erop dat je er verzorgd uitziet, en voert beleefd een gesprek. Ondertussen merk je dat je in je hoofd bijhoudt of je een goede indruk maakt." },
    ],
  },
  {
    id: 2, title: "De afgewezen inbreng",
    situation: "Tijdens een teamoverleg op je werk breng je een idee in waarover je hebt nagedacht. Een collega veegt het van tafel met de woorden: \"Dat gaat nooit werken.\" De rest zwijgt.",
    question: "Wat gebeurt er bij jou?",
    options: [
      { structure: "A", text: "Je wordt stil. Het voelt alsof er een glazen wand tussen jou en de rest schuift. Je lichaam voelt verdoofd. In gedachten ben je al ergens anders — bij dat boek dat je aan het lezen bent, of bij een idee dat je thuis wilt uitwerken." },
      { structure: "B", text: "Je voelt je leeggelopen, alsof iemand de stekker eruit heeft getrokken. Je kijkt de tafel rond in de hoop dat iemand het voor je opneemt. Je merkt dat je moe wordt." },
      { structure: "S", text: "Je knikt snel en zegt: \"Ja, je hebt waarschijnlijk gelijk.\" Je past je mening aan aan die van de groep. Later, thuis onder de douche, vraag je je af wat je eigenlijk zelf vond." },
      { structure: "C", text: "Er flitst iets van woede door je heen. Je laat een korte stilte vallen, kijkt je collega recht aan, en brengt je argument opnieuw in — sterker geformuleerd dit keer. Niemand veegt jou zomaar van tafel." },
      { structure: "D", text: "Je slikt je frustratie in, knikt, en zegt: \"Je hebt vast gelijk.\" Een zware druk zet zich in je buik. Vanavond vertel je thuis uitgebreid hoe het ging — met de moed die je op het werk niet kon vinden." },
      { structure: "E", text: "Je voelt een steek van vernedering. Je herstelt je snel, ordent je gedachten en presenteert je punt opnieuw, nu gestructureerder en met onderbouwing. Je wilt laten zien dat je niet zomaar iemand bent." },
    ],
  },
  {
    id: 3, title: "De partner die afstand neemt",
    situation: "Je partner zegt op een avond: \"Ik heb de laatste tijd meer ruimte nodig. Niet omdat er iets mis is — ik wil gewoon af en toe wat meer tijd voor mezelf.\"",
    question: "Wat is je eerste impuls, nog vóór je antwoord geeft?",
    options: [
      { structure: "A", text: "Je voelt een mengeling van opluchting en schuld over die opluchting. Ergens denk je: eindelijk wat tijd alleen. Maar je zegt dat niet hardop." },
      { structure: "B", text: "Er golft paniek door je heen. Je denkt meteen: gaat hij/zij me verlaten? Je voelt de neiging om te vragen wat je anders kunt doen, wat je beter kunt doen, om hem of haar te laten blijven." },
      { structure: "S", text: "De grond lijkt onder je weg te zakken. Je voelt je ineens leeg, alsof er een deel van jou verdwijnt. Je merkt dat je onmiddellijk wilt weten: wat voel je dan? Wat denk je? Ben ik er nog?" },
      { structure: "C", text: "Je voelt een flits van irritatie, misschien boosheid. In je hoofd begin je al na te denken: wat is hier aan de hand? Wie heeft invloed op hem/haar? Je wilt de situatie doorgronden voordat je reageert." },
      { structure: "D", text: "Je eerste gedachte is: wat heb ik fout gedaan? Je voelt een bekende zwaarte. Je knikt begrijpend en zegt dat je het snapt, terwijl je je eigen verlangen naar nabijheid inslikt alsof het er niet toe doet." },
      { structure: "E", text: "Je zegt kalm: \"Natuurlijk, dat begrijp ik.\" Je stelt een praktische oplossing voor — misschien vaste avonden afspreken. Ondertussen voel je een strakke band om je borstkas die je negeert." },
    ],
  },
  {
    id: 4, title: "Alleen op de Camino",
    situation: "Je loopt al drie dagen alleen over de Camino. Het is vroeg in de ochtend, de weg is leeg, het regent zachtjes. Je telefoon heeft geen bereik. Het volgende dorp is nog twee uur lopen. Er is niemand in de buurt.",
    question: "Wat gaat er in je om?",
    options: [
      { structure: "A", text: "Je voelt een diepe rust die je zelden ervaart. Zonder mensen om je heen valt er iets van je af. Je gedachten worden helder, bijna scherp. Een deel van je wenst dat deze weg nooit ophoudt — dat er geen dorp komt, geen herberg vol pelgrims waar je straks iets moet zeggen." },
      { structure: "B", text: "De stilte weegt. Je merkt dat je aan mensen denkt — wie zou je nu missen? Je controleert je telefoon, ook al weet je dat er geen bereik is. Je benen voelen zwaarder dan gisteren. Ergens verlang je naar de herberg, naar een stem, een kop koffie die iemand voor je neerzet." },
      { structure: "S", text: "Zonder iemand naast je voelt de wereld vreemd onwerkelijk. Je betapt jezelf erop dat je in gedachten een gesprek voert met je partner, je moeder, een vriend — alsof je iemand nodig hebt om te bevestigen dat je hier bent. Als een andere pelgrim je zou inhalen, zou je opgelucht zijn." },
      { structure: "C", text: "Je checkt de kaart, berekent je tempo, schat in wanneer je het dorp bereikt. De regen deert je niet — je hebt de juiste kleding. Je merkt dat je in gedachten al plant hoe je vanavond in de herberg je verhaal vertelt. Je loopt stevig door. Stilstaan is niks voor jou." },
      { structure: "D", text: "De regen druipt langs je nek. Je voelt blaren opkomen maar loopt door — stoppen voelt als opgeven. Je denkt: anderen doen dit ook, ik mag niet klagen. Er ligt een zwaar maar merkwaardig vertrouwd gevoel in je lijf, alsof dit lijden ergens bij hoort." },
      { structure: "E", text: "Je loopt in een goed ritme. Je let op je ademhaling, je houding, de lengte van je passen. Maar als de stilte te lang duurt, merk je dat er iets onder de oppervlakte duwt — een gevoel zonder naam. Je versnelt je pas. Bewegen helpt." },
    ],
  },
  {
    id: 5, title: "De ruzie die blijft hangen",
    situation: "Gisteravond hadden jij en je partner een flinke ruzie. Het ging over iets kleins — de vaatwasser, wie wat zou regelen — maar het liep uit de hand. Er werden dingen gezegd die pijn deden. Vanmorgen zitten jullie zwijgend aan de ontbijttafel.",
    question: "Wat doe je?",
    options: [
      { structure: "A", text: "Je drinkt je koffie en leest de krant, of staart uit het raam. Ergens voel je wel dat er iets opgelost moet worden, maar je lichaam wil weg uit deze geladen ruimte. Je wacht tot de spanning vanzelf zakt — of tot je partner begint. Zelf het woord nemen voelt als een mijnenveld betreden." },
      { structure: "B", text: "De stilte is ondraaglijk. Je wilt het goedmaken, nu, meteen. Je legt je hand op die van je partner, of je zegt iets luchtig om het ijs te breken. De angst dat de verbinding verbroken is, is groter dan je boosheid. Je merkt dat je bereid bent je eigen punt te laten varen als dat de vrede herstelt." },
      { structure: "S", text: "Je scant het gezicht van je partner om te peilen hoe erg het is. Je stemt je onbewust af op zijn of haar energie — als die boos lijkt, krimp je; als die zachter wordt, ontspan je. Je wilt zeggen: \"voel je nog hetzelfde over mij?\" maar je durft niet. De vraag die brandt is niet 'wie had gelijk' maar 'zijn wij nog wij?'" },
      { structure: "C", text: "Je denkt na over het verloop van de ruzie. Je weet precies op welk punt je partner onredelijk werd. Je voelt geen behoefte om te beginnen — als iemand moet toegeven, is dat niet jij. Je pakt je telefoon, beantwoordt wat berichten. Je laat de stilte voor je werken." },
      { structure: "D", text: "Je schenkt koffie in voor je partner, smeert een boterham, ruimt stilzwijgend de keuken op. De woede van gisteren zit nog in je buik, als een baksteen, maar je zegt: \"Zullen we het vergeten?\" Je weet dat je daarmee je eigen punt begraven hebt, maar vrede voelt belangrijker — of in elk geval veiliger." },
      { structure: "E", text: "Je wilt erover praten, maar dan wél op een redelijke manier. Je ordent in je hoofd wat er gisteren misging, formuleert wat je wilt zeggen, en wacht op het juiste moment. Je stelt voor: \"Kunnen we even rustig bespreken wat er gisteren gebeurde?\" Je borstkas voelt strak, maar je stem is beheerst." },
    ],
  },
  {
    id: 6, title: "De onverwachte tranen",
    situation: "Je zit in de auto, alleen, na een gewone dag. Op de radio begint een lied dat je raakt — misschien de melodie, misschien een regel tekst. Opeens voel je tranen opkomen, zonder duidelijke reden.",
    question: "Wat gebeurt er?",
    options: [
      { structure: "A", text: "De tranen verrassen je. Je voelt ze als iets dat van ver komt, uit een deel van je dat je normaal niet bereikt. Even is er een opening — maar dan sluit iets zich weer. Je zet een andere zender op, of je zet de radio uit. Thuisgekomen weet je niet meer precies wat je voelde." },
      { structure: "B", text: "De tranen komen als een golf en je laat ze stromen. Er welt een diep verlangen in je op — waarnaar precies weet je niet, maar het voelt als heimwee naar iets dat je nooit hebt gehad. Je zou nu iemand willen bellen, gewoon om een stem te horen. De auto voelt te leeg." },
      { structure: "S", text: "De tranen verbazen je. Je vraagt je af: is dit van mij? Je denkt meteen aan iemand — je partner, je moeder, een vriendin — en vraagt je af of die persoon misschien verdrietig is. Het voelt alsof het gevoel niet helemaal van jou is, alsof je iets opvangt dat ergens anders thuishoort." },
      { structure: "C", text: "Je voelt de tranen opkomen en spant onmiddellijk je kaak. Je knippert ze weg en richt je op de weg. Je zoekt een verklaring: slechte nacht gehad, te veel stress op het werk. Huilen zonder reden — dat is niks voor jou. Je zet het volume harder en rijdt door." },
      { structure: "D", text: "De tranen voelen vertrouwd, bijna troostend. Je laat ze komen maar je zou ze nooit aan iemand laten zien. Er zit iets wrangs in het gevoel — alsof je altijd al wist dat er onder de oppervlakte iets zwaars lag. Je parkeert even, snuit je neus, en gaat verder. Niemand hoeft dit te weten." },
      { structure: "E", text: "De tranen maken je onrustig. Je probeert te begrijpen waar ze vandaan komen — je gaat je dag na, zoekt een oorzaak. Het gevoel zelf is ongemakkelijk, alsof er iets is losgeraakt dat op zijn plek hoort te zitten. Je haalt diep adem, recht je rug, en tegen de tijd dat je thuiskomt ben je weer 'normaal'." },
    ],
  },
  {
    id: 7, title: "Zondagmiddag bij je moeder",
    situation: "Je bent op zondagmiddag bij je moeder op bezoek. Jullie zitten aan de keukentafel. Ze vertelt voor de derde keer hetzelfde verhaal over de buurvrouw. Dan zegt ze, terloops: \u201EJe ziet er moe uit. Eet je wel goed? Je zus was vorige week nog langs, die zag er veel beter uit.\u201C",
    question: "Wat gaat er in je om, nog vóór je reageert?",
    options: [
      { structure: "A", text: "Je voelt je wegzakken. Haar woorden raken je ergens, maar het is alsof ze door dik glas komen. Je kijkt naar de klok en berekent wanneer je weg kunt zonder dat het onbeleefd is. Je lijf voelt stijf, je ademhaling oppervlakkig. Je bent er wel, maar ook weer niet." },
      { structure: "B", text: "De vergelijking met je zus raakt een oude plek. Je voelt een steek — alsof je weer dat kind bent dat niet genoeg was. Je wilt iets zeggen als \u201EIk doe ook mijn best, hoor\u201C maar slikt het in. Je merkt dat je verlangt naar een moment waarop ze gewoon zegt dat ze blij is dat j\u00EDj er bent." },
      { structure: "S", text: "Je voelt haar stemming binnenkomen alsof het de jouwe is. Is ze teleurgesteld? Bezorgd? Boos? Je past je houding aan, leunt naar voren, knikt vaker. Je merkt dat je onbewust probeert te voelen wat zij voelt, zodat je het juiste kunt zeggen. Je eigen gevoel is even zoek." },
      { structure: "C", text: "Je registreert de steek en parkeert hem. Je denkt: dit is haar spelletje, dit doe ik niet mee. Je reageert luchtig, misschien met een kwinkslag over je zus, en stuurt het gesprek een andere kant op. Je weigert je in de ondergeschikte positie te laten duwen. Niet door haar, niet door iemand." },
      { structure: "D", text: "Je slikt. Je voelt de bekende zwaarte in je buik zakken. Je zegt: \u201EJa, het is druk geweest op het werk.\u201C Je smeert nog een cracker voor haar en ruimt de kopjes af. Ergens weet je dat je boos zou m\u00F3gen zijn, maar de boosheid zit vast, ergens diep, onder lagen van 'ze bedoelt het goed'." },
      { structure: "E", text: "Je rug stijft. De vergelijking met je zus voelt als een beoordeling, en beoordelingen moeten kloppen. Je begint uit te leggen hoe druk je het hebt, wat je allemaal doet, hoe goed het eigenlijk gaat. Je hoort jezelf praten en denkt: waarom moet ik me verdedigen? Maar je kunt niet stoppen." },
    ],
  },
  { id: 8, title: "Het onverwachte compliment", situation: "Je hebt iets gemaakt waar je trots op bent — een project op het werk, een schilderij, een tuin, een maaltijd voor vrienden. Iemand die je respecteert bekijkt het en zegt, oprecht: \u201EDit is echt bijzonder. Hier zit iets in dat alleen van jou kan komen.\u201C", question: "Wat voel je op dat moment?", options: [ { structure: "A", text: "Even is er een warm gevoel, ergens in je borst — maar het is alsof je het van een afstand waarneemt. Je weet niet goed wat je ermee moet doen. Je mompelt \u201Edank je\u201C en wilt het gesprek snel een andere kant op sturen. Het compliment voelt als een schijnwerper die te dichtbij komt." }, { structure: "B", text: "Je voelt een golf van warmte, bijna als honger die wordt gestild. Je wilt meer horen — wat precies is er bijzonder? Waarom? Een deel van je drinkt de woorden op, een ander deel wantrouwt ze: meent hij het echt, of zegt hij het om aardig te zijn? Je merkt dat het compliment je gelukkig máákt, maar ook onrustig." }, { structure: "S", text: "Je straalt. Het gevoel is intens — maar je merkt dat je trots niet helemaal van jezelf lijkt te komen. Het is alsof je het pas écht kunt voelen omdat iemand anders het bevestigt. Zonder die woorden had je niet geweten of het goed was. Je wilt weten: vinden anderen het ook zo?" }, { structure: "C", text: "Je neemt het compliment in ontvangst met een lichte glimlach. Natuurlijk is het goed — je wist het al. Maar ergens voelt erkenning ook ongemakkelijk, alsof het je kwetsbaar maakt. Je stuurt het gesprek naar het proces, het technische, het maakbare. Daar voel je je zekerder dan bij \u201Eiets dat alleen van jou kan komen.\u201C" }, { structure: "D", text: "Je glimlacht, maar het compliment landt niet echt. Je begint meteen te relativeren: \u201EAch, het stelt niet zoveel voor\u201C of \u201EIk had eigenlijk meer willen doen.\u201C Er is een ongemak, alsof je de vreugde niet mag hebben. In je buik zit iets dat het compliment tegenhoudt, als een deur die maar half opengaat." }, { structure: "E", text: "Je voelt voldoening, maar onmiddellijk ook de gedachte: is het \u00E9cht goed genoeg? Je bedankt, noemt drie dingen die je achteraf anders had willen doen, en legt uit hoeveel werk erin zat. De erkenning voelt fijn maar onaf — alsof er altijd nog één stap is tussen jou en het gevoel dat het genoeg is." } ] },
  { id: 9, title: "De vriend die je nodig heeft", situation: "Een goede vriend belt je 's avonds op. Hij klinkt niet goed. Hij vertelt dat zijn relatie op springen staat en vraagt of je morgen tijd hebt om te praten. Je hebt eigenlijk een volle dag.", question: "Wat is je eerste impuls?", options: [ { structure: "A", text: "Je wilt helpen, maar je voelt ook een beklemming. Iemands emotionele nood zo dichtbij — het kost je iets. Je zegt dat je 's avonds even kunt bellen, en hoopt dat dat genoeg is. Na het gesprek merk je dat je uitgeput bent, alsof je iets van je eigen energie hebt moeten afstaan." }, { structure: "B", text: "Je zegt meteen ja, schuift je eigen afspraken opzij. Dat iemand jóu nodig heeft, geeft je een warm gevoel. Later merk je dat je moe bent — niet van het luisteren, maar van de energie die het kost om te geven wat je zelf ook nodig hebt. Je vraagt je af of hij ook voor jou zou opkomen." }, { structure: "S", text: "Zijn pijn komt meteen binnen. Nog voor hij uitgepraat is, voel je zijn verdriet alsof het van jou is. Je annuleert alles en bent er morgen. Maar 's nachts in bed merk je dat je zijn probleem aan het oplossen bent in je hoofd, alsof het jouw relatie is die op het spel staat." }, { structure: "C", text: "Je luistert, stelt gerichte vragen, en geeft meteen een paar adviezen. Je voelt je helder en competent — dit kun je. Je spreekt af, maar op jouw voorwaarden: een uur, koffie, jij bepaalt waar. Een deel van je geniet ervan dat hij juist jóu belt. Je bent de persoon die weet hoe het moet." }, { structure: "D", text: "Je zegt: \u201ENatuurlijk, ik maak tijd.\u201C Je reorganiseert je hele dag zonder er iets over te zeggen. Dat je zelf moe bent, dat je eigen week ook zwaar was — dat doet er even niet toe. Terwijl je ophangt, voel je die bekende mengeling van zwaarte en voldoening: jij bent er altijd, voor iedereen." }, { structure: "E", text: "Je wilt helpen, maar dan wél goed. Je denkt na over wat je kunt zeggen, welke vragen je moet stellen. Je stelt een concreet tijdstip voor en bereidt je mentaal voor. Ondertussen voel je iets trekken — zijn verdriet komt te dichtbij. Je richt je op het praktische: hoe los je dit op? Dat is veiliger dan meevoelen." } ] },
  { id: 10, title: "De brief van de bank", situation: "Er ligt een brief op de mat. Je opent hem en leest dat een investering is mislukt, of dat er een onverwachte naheffing komt. Het bedrag is fors — niet levensbedreigend, maar het raakt je financiële zekerheid. Je staat alleen in de gang met de brief in je hand.", question: "Wat is je eerste reactie?", options: [ { structure: "A", text: "Je leest de brief twee keer, legt hem neer, en doet iets anders. Je voelt een vage onrust, maar het is alsof het nieuws iemand anders betreft. Later die dag merk je dat je vergeten bent te eten. Het probleem zweeft ergens in je bewustzijn, maar je kunt het niet goed landen in je lichaam." }, { structure: "B", text: "Er trekt een golf van paniek door je heen. Je voelt je klein worden, alsof je opeens niet meer weet hoe je dit moet oplossen. Je eerste impuls is iemand bellen — je partner, een vriend, je broer — niet zozeer voor advies, maar om niet alleen te zijn met dit gevoel. De wereld voelt opeens heel groot en jij heel kwetsbaar." }, { structure: "S", text: "Je eerste gedachte is niet het geld, maar de mensen om je heen. Wat zal je partner zeggen? Wordt hij of zij boos? Teleurgesteld? Je merkt dat je angst niet gaat over het bedrag maar over hoe dit de sfeer tussen jullie zal veranderen. Je overweegt om het pas te vertellen als je een oplossing hebt — zodat niemand zich zorgen hoeft te maken." }, { structure: "C", text: "Na de eerste schrik schakel je snel. Je pakt je laptop, bekijkt je opties, belt je adviseur. Het probleem is vervelend maar oplosbaar — je hebt ergere dingen overleefd. Je voelt een koele helderheid die je goed kent: in een crisis ben je op je best. Pas 's avonds, als alles geregeld is, voel je iets trillen in je handen." }, { structure: "D", text: "Er daalt een vertrouwde zwaarte over je heen. Natuurlijk, denk je. Natuurlijk gaat dit mis. Er is een merkwaardig deel van je dat niet eens verbaasd is — alsof je altijd al wist dat het goed hebben niet voor jou was weggelegd. Je stopt de brief in een la en gaat verder met je dag, het gewicht dragend als iets dat erbij hoort." }, { structure: "E", text: "Je wordt stil en alert. Je maakt een berekening: wat heb je, wat kost dit, wat zijn de opties? De feiten eerst, het gevoel later. Je merkt dat je kaak op elkaar staat. Je maakt een lijstje, belt wie je moet bellen, handelt. Maar ergens is er een gedachte die je niet hardop uitspreekt: hoe heb ik dit kunnen laten gebeuren?" } ] },
  { id: 11, title: "De deur die dichtgaat", situation: "Je werkgever vertelt je dat je functie vervalt. Het ligt niet aan jou — reorganisatie, bezuinigingen. Je krijgt een goede regeling, er is tijd om iets anders te vinden. Maar als je die middag naar huis rijdt, dringt het pas echt door: morgen hoef je niet meer te komen.", question: "Wat gaat er door je heen op de weg naar huis?", options: [ { structure: "A", text: "Er is een vreemd gevoel van lichtheid. Geen mensen meer, geen vergaderingen, geen kantoorgeluiden. Een deel van je is opgelucht, en dat maakt je onrustig — zou je dit niet erg moeten vinden? Je rijdt wat langer om, neemt de route langs het bos. Je hebt geen haast. Je hebt nu nergens haast voor." }, { structure: "B", text: "Het voelt als verlaten worden. Niet door een persoon, maar door een plek die houvast gaf — een structuur, collega's, een reden om 's ochtends op te staan. Je voelt je leeg, bijna letterlijk — alsof iemand iets uit je heeft weggehaald. Je denkt: wie ben ik als ik daar niet meer ben? Je wilt het iemand vertellen, snel, nu." }, { structure: "S", text: "Je eerste gedachte is je team. Wie gaat het overnemen? Hoe zullen ze reageren? Je voelt je schuldig, alsof je hen in de steek laat — ook al is het besluit niet van jou. Ondertussen merk je iets ongemakkelijks: je weet niet wie je bent zonder die rol, zonder die mensen, zonder dat dagelijkse 'ergens bij horen'." }, { structure: "C", text: "De eerste schok zakt snel. Je begint al na te denken: wie moet ik bellen, welke opties liggen er, hoe speel ik dit in mijn voordeel? De regeling is redelijk — maar je kunt misschien beter onderhandelen. Je voelt je scherp, bijna jaagachtig. Stilzitten is geen optie. Je weigert slachtoffer te zijn van andermans beslissing." }, { structure: "D", text: "Je knikt tegen jezelf, alsof je het verwachtte. Het is niet eerlijk, maar je gaat er niet over klagen. Je denkt aan je collega's die blijven en voelt iets dat op opluchting lijkt — voor hún. Op de snelweg merk je dat je tranen over je wangen lopen, maar je veegt ze weg en zet de ruitenwissers aan alsof het de regen is." }, { structure: "E", text: "Je maakt in je hoofd al een plan: cv bijwerken, netwerk activeren, financiën doorrekenen. Het voelt als een project — en projecten kun je. Maar als je de oprit naar huis neemt en het stuur losser laat, is daar die ene onverdraaglijke gedachte: was ik niet goed genoeg? Je parkeert, haalt adem, en gaat naar binnen met rechte rug." } ] },
  { id: 12, title: "De stilte na de liefde", situation: "Je hebt net de liefde bedreven met je partner. Het was goed — teder, dichtbij. Nu liggen jullie naast elkaar in het donker. Jullie raken elkaar nog net aan, een hand op een heup, een been tegen een been. Het is stil.", question: "Wat ervaar je in die stilte?", options: [ { structure: "A", text: "Het was mooi, maar nu de nabijheid blijft, voel je iets in je dat wil terugtrekken. Je draait je om, niet om te vluchten, maar omdat het voelt alsof je even moet terugkeren naar jezelf. Het is alsof je grenzen vervagen als je te lang zo dicht bij iemand bent. Je ademt uit en zoekt de rand van het bed." }, { structure: "B", text: "Je wilt dat dit moment niet ophoudt. Je schuift dichter naar je partner toe, legt je hoofd op zijn of haar borst. De warmte vult iets in je dat altijd leeg lijkt te zijn. Maar ergens is er al die stille angst: straks draait hij of zij zich om, straks is het weer gewoon. Je klamt je niet vast — maar je wilt wél vasthouden." }, { structure: "S", text: "Je voelt je opgelost, op een goede manier — of misschien op een te goede manier. De grens tussen jou en de ander is weg. Je ademhaling volgt de zijne, je hartslag de hare. Het is zalig, maar ook een beetje beangstigend: als hij of zij nu zou opstaan, zou je niet weten waar jij ophoudt en de ander begint." }, { structure: "C", text: "Je voelt voldoening — het was goed, je weet dat je partner genoot. Maar de kwetsbaarheid van dit moment maakt je onrustig. Je maakt een grapje, of je pakt je telefoon even, of je begint over morgen te praten. Iets in je wil de zachtheid kortsluiten voordat het te diep gaat — alsof overgave een terrein is waar je de controle kunt verliezen." }, { structure: "D", text: "Er is een diepe warmte, maar ook iets dat je niet helemaal kunt ontvangen. Je denkt: was het goed voor hem of haar? Heb ik genoeg gegeven? Er kruipt een licht schuldgevoel je bewustzijn binnen, alsof genieten zonder iets terug te hoeven doen niet helemaal is toegestaan. Je streelt je partner — geven is makkelijker dan ontvangen." }, { structure: "E", text: "Er is een opening geweest — even was je helemaal daar, helemaal in je lichaam, helemaal bij de ander. Maar nu de golven wegebben, voel je het harnas terugkomen, spier voor spier. Je ademt bewust, probeert het vast te houden. Maar de gedachten komen al terug: de dag van morgen, de dingen die moeten. Het wilde hart trekt zich weer terug achter de muur." } ] },
  { id: 13, title: "De ochtend dat je lichaam niet meewerkt", situation: "Je wordt wakker met koorts. Alles doet pijn — je hoofd, je spieren, je keel. Je kunt vandaag niet wat je van plan was. Je partner of huisgenoot vraagt vanuit de deuropening: \u201EKan ik iets voor je doen?\u201C", question: "Wat gaat er door je heen?", options: [ { structure: "A", text: "Je wilt alleen gelaten worden. De vraag is lief bedoeld, maar iemands aanwezigheid terwijl je ziek bent voelt als te dichtbij. Je zegt: \u201ENee, het gaat wel.\u201C Je draait je om naar de muur. Ziek zijn is draaglijk — zolang niemand je in die kwetsbare toestand ziet." }, { structure: "B", text: "De vraag ontroert je meer dan je verwacht. Je knikt en vraagt om thee, een extra deken, misschien even gezelschap. Het ziek zijn zelf is minder erg dan het alleen zijn ermee. Je merkt dat je partner's hand op je voorhoofd je meer goed doet dan welke paracetamol ook." }, { structure: "S", text: "Je eerste gedachte is: ik val lastig. Je partner heeft vast andere dingen te doen. Je zegt: \u201EHoeft niet hoor, ga maar.\u201C Maar als hij of zij daadwerkelijk weggaat, voel je een steek van verlatenheid. Je betapt jezelf erop dat je luistert naar geluiden in het huis — is hij er nog? Hoort ze me als ik roep?" }, { structure: "C", text: "Je ergert je aan je eigen lichaam. Ziek zijn is tijd verliezen, controle kwijtraken. Je stuurt toch een paar mails vanuit bed, checkt je agenda, regelt wat je kunt regelen. De hulp van je partner neem je kort aan — aspirine, water — maar je wilt geen verzorging. Afhankelijk zijn voelt als een zwakte die je jezelf niet toestaat." }, { structure: "D", text: "Je zegt: \u201EHet valt wel mee\u201C terwijl alles pijn doet. Je probeert op te staan om toch iets nuttigs te doen — de afwasmachine uitruimen, brood uit de vriezer halen. Je partner dwingt je terug in bed. Je ligt daar met een gevoel dat je goed kent: schuld over het feit dat iemand anders nu voor jou moet zorgen." }, { structure: "E", text: "Je rekent uit: als de koorts vanavond zakt, kun je morgen weer functioneren. Je neemt braaf medicijnen, drinkt water, doet alles 'goed' — ook ziek zijn doe je grondig. Maar de hulpeloosheid knaagt. Je lichaam gehoorzaamt niet aan je wil, en dat is misschien nog erger dan de koorts zelf." } ] },
  { id: 14, title: "De waarheid of de vrede", situation: "Een goede vriendin vertelt je stralend over haar nieuwe partner. Ze is verliefd, gelukkiger dan in jaren. Maar jij weet iets dat zij niet weet: je hebt haar partner in een bar gezien met iemand anders, en het leek niet op een zakelijke afspraak.", question: "Wat doe je met wat je weet?", options: [ { structure: "A", text: "Je wilt je er niet mee bemoeien. Niet uit onverschilligheid — je geeft om haar — maar omdat emotioneel geladen gesprekken je uitputten op een manier die je moeilijk kunt uitleggen. Je besluit het bij je te houden. Als het misgaat, ben je er voor haar. Maar de confrontatie aangaan voelt als een mijnenveld waar je niet in wilt stappen." }, { structure: "B", text: "Het dilemma vreet aan je. Je wilt het haar vertellen, maar je bent bang dat ze boos wordt — op jou. Dat ze de boodschapper straft. Je probeert voorzichtig te peilen: \u201EVertrouw je hem helemaal?\u201C en hoopt dat ze zelf de juiste vragen stelt. Want het laatste wat je wilt is haar kwijtraken door eerlijk te zijn." }, { structure: "S", text: "Je voelt haar geluk als het jouwe, en dat maakt het des te moeilijker. De gedachte haar te kwetsen is bijna ondraaglijk — het voelt alsof je dan ook jezelf kwetst. Je past je aan haar stemming aan, lacht mee, stelt het uit. Ondertussen draag je het geheim als een fysieke last in je maag. Je weet dat je het moet zeggen, maar je kunt het 'wij' niet breken." }, { structure: "C", text: "Je hebt snel een plan. Je vertelt het haar — maar strategisch, op een moment dat je kiest, in woorden die jij formuleert. Je presenteert het als bezorgdheid, niet als beschuldiging. Een deel van je registreert ook dat je nu informatie hebt die haar partner niet weet dat je hebt. Kennis is macht, zelfs onder vrienden." }, { structure: "D", text: "Je neemt de last op je. Je zegt niets, maar je voelt het gewicht van het geheim elke keer als je haar ziet. Je overweegt keer op keer het te vertellen, maar je wilt haar geluk niet kapotmaken — alsof haar pijn erger zou zijn dan de jouwe. Je draagt het, zoals je alles draagt: in stilte, met dat bekende zware gevoel onder je ribben." }, { structure: "E", text: "Je worstelt met de principes. Eerlijkheid is belangrijk, maar je wilt het wél op de juiste manier doen. Je denkt na over timing, formulering, onderbouwing — misschien moet je eerst meer zekerheid hebben. Was het echt wat het leek? Je merkt dat je het morele vraagstuk intellectualiseert om het ongemak van het gesprek uit te stellen." } ] },
  { id: 15, title: "De lege stoel", situation: "Iemand van wie je hield is gestorven. Het is een paar weken geleden. Het eerste verdriet is gezakt, de kaarten zijn beantwoord, het leven gaat door. Op een avond zit je in de kamer en je blik valt op de stoel waar die persoon altijd zat. De stoel is leeg.", question: "Wat gebeurt er in je?", options: [ { structure: "A", text: "Je kijkt naar de stoel en voelt\u2026 weinig. Dat is het ergste. Je w\u00E9\u00E9t dat je verdrietig zou moeten zijn, je w\u00E9\u00E9t dat je van die persoon hield. Maar het gevoel zit achter glas. Je staat op, zet een raam open, ademt de koude lucht in. Misschien komt het verdriet later. Misschien komt het nooit op de manier waarop anderen het voelen." }, { structure: "B", text: "De lege stoel raakt je als een vuistslag. Er welt iets op dat groter is dan alleen dit verlies — het is alsof alle afscheid van je leven in die ene stoel samenkomt. Je voelt een verlangen dat geen naam heeft, een leegte die er altijd al was maar die nu niet meer gevuld kan worden. Je pakt de telefoon en belt iemand. Je kunt dit niet alleen dragen." }, { structure: "S", text: "De stoel maakt iets los dat je niet kunt benoemen. Het is niet alleen verdriet — het is alsof er een stuk van jezelf mee is gegaan. Je merkt dat je dingen doet die die persoon deed: dezelfde thee zetten, dezelfde uitdrukking gebruiken. Alsof je hem of haar in leven houdt door te worden wie hij of zij was. De grens tussen jouw rouw en jouw identiteit is niet helder." }, { structure: "C", text: "Je kijkt naar de stoel en voelt een steek die je snel parkeert. Je staat op en doet iets: de kamer anders inrichten, de stoel wegzetten, of juist bewust laten staan als eerbetoon. Je neemt regie over het rouwen zoals je regie neemt over alles. Pas in een onbewaakt moment — onder de douche, in de auto — is daar het verdriet dat je overdag niet toelaat." }, { structure: "D", text: "Je laat de tranen komen. Het verdriet voelt vertrouwd, bijna als een thuis — en dat schrikt je niet af. Je hebt altijd al geweten hoe je pijn moet dragen. Je haalt een foto tevoorschijn, steekt een kaars aan. Er is iets in je dat zich bijna troost zoekt in het verlies, alsof rouwen de meest natuurlijke staat is die je kent." }, { structure: "E", text: "Je voelt het verdriet opkomen en probeert het te ordenen. Je denkt aan mooie herinneringen, aan wat die persoon zou zeggen als hij of zij je nu zag. Je glimlacht — dapper, beheerst. Maar diep in je borst zit iets dat niet past in mooie woorden of nette herinneringen. Het is rauw en het wil eruit, maar jij houdt het binnen. Zo doe je dat. Zo heb je het altijd gedaan." } ] },
];

// ═══════════════════════════════════════════════════════════
// DEEL II — GEFORCEERDE KEUZE (30 paren)
// ═══════════════════════════════════════════════════════════

const PAIRS: Pair[] = [
  { id:1, a:{s:"A",t:"Na een drukke week verlang ik het meest naar een avond alleen — stilte, een boek, niemand die iets van me vraagt."}, b:{s:"B",t:"Na een drukke week verlang ik het meest naar gezelschap — samen eten, praten, het gevoel dat ik ergens bij hoor."}},
  { id:2, a:{s:"A",t:"In een groep vind ik het prettig om aan de rand te staan en van een afstand mee te kijken. Ik hoef niet midden in het gebeuren te zitten."}, b:{s:"S",t:"In een groep stem ik me vanzelf af op de sfeer. Ik merk dat ik onbewust de houding en energie van de mensen om me heen overneem."}},
  { id:3, a:{s:"A",t:"Als ik een probleem heb, denk ik het liefst alleen na. De oplossing komt vanzelf als ik er ruimte aan geef."}, b:{s:"C",t:"Als ik een probleem heb, pak ik het meteen aan. Ik maak een plan, bel wie ik moet bellen, en handel."}},
  { id:4, a:{s:"A",t:"Ik trek me liever terug dan dat ik iets doe waar ik geen zin in heb. Mijn tijd is van mij."}, b:{s:"D",t:"Ik doe liever iets waar ik geen zin in heb dan dat ik iemand teleurstel. Ik kan slecht nee zeggen."}},
  { id:5, a:{s:"A",t:"Ik leef het liefst zonder vaste structuur. Routines voelen als een keurslijf — ik wil vrij zijn om te volgen wat er in me opkomt."}, b:{s:"E",t:"Ik voel me het prettigst met een heldere structuur. Als ik weet wat er van me verwacht wordt, kan ik het goed doen."}},
  { id:6, a:{s:"B",t:"Als mijn partner een avond weg is, merk ik dat ik me eenzaam voel. Ik mis het gezelschap, de aandacht, het gevoel gezien te worden."}, b:{s:"S",t:"Als mijn partner een avond weg is, merk ik dat ik niet goed weet wat ik wil. Zonder de ander valt er een soort kompas weg."}},
  { id:7, a:{s:"B",t:"Ik heb liever dat iemand voor mij kiest als het spannend wordt. Ik voel me veiliger als een ander de leiding neemt."}, b:{s:"C",t:"Ik neem liever zelf de leiding, ook als het spannend wordt. Ik vertrouw op mijn eigen inschatting."}},
  { id:8, a:{s:"B",t:"Als ik moe of verdrietig ben, heb ik het meest behoefte aan iemand die naar me luistert en bij me is."}, b:{s:"D",t:"Als ik moe of verdrietig ben, ga ik door met wat er gedaan moet worden. Mijn eigen gevoel komt later wel."}},
  { id:9, a:{s:"B",t:"Complimenten geven me energie. Als iemand zegt dat hij me waardeert, kan ik daar de hele dag op teren."}, b:{s:"E",t:"Complimenten maken me verlegen. Ik weet liever concreet wat ik goed heb gedaan, zodat ik weet waar ik sta."}},
  { id:10, a:{s:"S",t:"In een meningsverschil merk ik dat ik snel geneigd ben het standpunt van de ander over te nemen. Harmonie voelt belangrijker dan gelijk hebben."}, b:{s:"C",t:"In een meningsverschil merk ik dat ik scherper word. Ik wil niet per se gelijk — maar ik laat me ook niet overrulen."}},
  { id:11, a:{s:"S",t:"Ik pas me aan aan anderen omdat ik me dan verbonden voel. Samen hetzelfde voelen geeft me rust."}, b:{s:"D",t:"Ik pas me aan aan anderen omdat ik niet wil dat ze last van me hebben. Hun welzijn gaat voor het mijne."}},
  { id:12, a:{s:"S",t:"Ik merk dat mijn stemming sterk afhangt van de mensen om me heen. Als zij zich goed voelen, voel ik me ook goed."}, b:{s:"E",t:"Ik merk dat ik mijn stemming goed kan reguleren. Ik laat me niet snel meeslepen door de emoties van anderen."}},
  { id:13, a:{s:"C",t:"Als iemand een grens overgaat, zeg ik het meteen. Ik laat niet over me heen lopen."}, b:{s:"D",t:"Als iemand een grens overgaat, slik ik het vaak in. Pas veel later merk ik hoe boos ik eigenlijk was."}},
  { id:14, a:{s:"C",t:"Regels zijn er om de werkelijkheid te dienen. Als een regel niet werkt, negeer ik hem zonder veel moeite."}, b:{s:"E",t:"Regels geven houvast. Ik houd me er liever aan, ook als het soms onhandig is — anders weet ik niet waar ik sta."}},
  { id:15, a:{s:"D",t:"Ik voel me het nuttigst als ik iets voor een ander kan doen, ook als het ten koste gaat van mijn eigen plannen."}, b:{s:"E",t:"Ik voel me het best als ik mijn eigen doelen haal. Ik help graag, maar niet als het mijn eigen werk in gevaar brengt."}},
  { id:16, a:{s:"A",t:"Op vakantie zoek ik plekken waar weinig mensen komen. Een leeg strand, een berghut, een stad in het laagseizoen — hoe stiller, hoe beter."}, b:{s:"B",t:"Op vakantie wil ik het liefst met mensen om me heen. Een gezellig terras, een groepsreis, samen ontdekken — alleen reizen voelt eenzaam."}},
  { id:17, a:{s:"A",t:"Ik merk dat ik in gesprekken snel in mijn hoofd verdwijn. Ik luister wel, maar een deel van me is ergens anders — bij een gedachte, een beeld, een eigen wereld."}, b:{s:"S",t:"Ik merk dat ik in gesprekken helemaal opga in de ander. Ik voel wat hij voelt, denk mee met zijn probleem, en vergeet even waar ik zelf mee bezig was."}},
  { id:18, a:{s:"A",t:"In een groep houd ik me het liefst op de achtergrond. Aandacht voor mij voelt ongemakkelijk, soms zelfs bedreigend."}, b:{s:"C",t:"In een groep neem ik vanzelf een centrale positie in. Ik voel me op mijn gemak als ik invloed heb op het gesprek."}},
  { id:19, a:{s:"A",t:"Ik heb weinig last van schuldgevoel. Het klinkt misschien koud, maar ik voel me zelden verantwoordelijk voor andermans stemming."}, b:{s:"D",t:"Ik heb snel het gevoel dat ik iets fout heb gedaan, zelfs als ik niet precies weet wat. Een vaag schuldgevoel is bijna altijd aanwezig."}},
  { id:20, a:{s:"A",t:"Mijn rijkste momenten zijn innerlijk: een inzicht, een droom, een gevoel van verbinding met iets groters. De buitenwereld is vaak minder interessant dan mijn binnenwereld."}, b:{s:"E",t:"Mijn rijkste momenten zijn momenten van prestatie: iets afmaken, iets beheersen, iets moois neerzetten. Ik voel me het best als ik kan laten zien wat ik kan."}},
  { id:21, a:{s:"B",t:"Als een vriend na een lang gesprek ophangt, voel ik een leegte. Het contact was fijn — maar nu het weg is, voel ik het gemis aan energie die de ander me gaf."}, b:{s:"S",t:"Als een vriend na een lang gesprek ophangt, moet ik mezelf even terugvinden. Het is alsof ik tijdens het gesprek zijn gevoelens heb overgenomen en nu niet meer weet wat van mij is."}},
  { id:22, a:{s:"B",t:"Als ik ergens nieuw ben, wacht ik af en hoop dat mensen me opmerken. Het initiatief nemen voel ik als een risico — stel dat ze me niet willen."}, b:{s:"C",t:"Als ik ergens nieuw ben, stap ik op mensen af. Afwachten is niks voor mij — ik bepaal liever zelf hoe het eerste contact verloopt."}},
  { id:23, a:{s:"B",t:"In een relatie wil ik het liefst ontvangen: aandacht, warmte, het gevoel dat ik er mag zijn. Ik heb dat nodig om me heel te voelen."}, b:{s:"D",t:"In een relatie ben ik vooral bezig met geven: zorgen, regelen, er zijn voor de ander. Mijn eigen behoeften stel ik uit zonder erbij na te denken."}},
  { id:24, a:{s:"B",t:"Als ik iets niet lukt, voel ik me al snel hulpeloos. De energie om opnieuw te beginnen moet van buiten komen — een bemoedigend woord, een helpende hand."}, b:{s:"E",t:"Als ik iets niet lukt, voel ik frustratie en ga harder proberen. Ik wil het zelf oplossen, en falen voelt als een persoonlijk tekort."}},
  { id:25, a:{s:"S",t:"Ik merk dat ik in relaties vaak de kleur aanneem van de ander. Ik luister naar dezelfde muziek, neem dezelfde gewoontes over, zonder dat ik het doorheb."}, b:{s:"C",t:"Ik merk dat ik in relaties vaak de toon zet. Zonder het bewust te doen, volgt de ander mijn ritme, mijn voorkeuren, mijn manier van leven."}},
  { id:26, a:{s:"S",t:"Als mijn partner boos is, voel ik die boosheid in mijn eigen lichaam — alsof het mijn gevoel is, niet het zijne. De grens tussen ons vervaagt."}, b:{s:"D",t:"Als mijn partner boos is, ga ik harder mijn best doen. Ik ruim op, ik kook iets lekkers, ik maak het goed — ook als ik niet weet wat ik fout heb gedaan."}},
  { id:27, a:{s:"S",t:"Ik twijfel vaak over mijn eigen mening. Pas als iemand die ik vertrouw het bevestigt, durf ik erop te rekenen dat het klopt."}, b:{s:"E",t:"Ik heb meestal een duidelijke mening en vertrouw op mijn eigen oordeel. Ik hoef niet door anderen bevestigd te worden, maar wel door feiten."}},
  { id:28, a:{s:"C",t:"Als iemand me om hulp vraagt, overweeg ik eerst of het me iets oplevert — niet per se materieel, maar in invloed, positie of goodwill. Ik help graag, maar niet onvoorwaardelijk."}, b:{s:"D",t:"Als iemand me om hulp vraagt, zeg ik bijna altijd ja — ook als het me uitput. Nee zeggen voelt als falen, alsof ik niet goed genoeg ben voor de ander."}},
  { id:29, a:{s:"C",t:"Ik vertrouw op mijn instinct. Als mijn gevoel zegt dat iets klopt, heb ik geen bewijs nodig. Ik durf te springen zonder alles te overzien."}, b:{s:"E",t:"Ik vertrouw op mijn analyse. Voordat ik een beslissing neem, wil ik de feiten kennen, de risico's wegen, en een plan hebben. Springen zonder te kijken is niks voor mij."}},
  { id:30, a:{s:"D",t:"Na een lange dag voel ik me het meest mezelf als ik iets heb kunnen betekenen voor iemand anders — zelfs als ik er zelf moe van ben geworden."}, b:{s:"E",t:"Na een lange dag voel ik me het meest mezelf als ik iets heb afgemaakt of gepresteerd — een resultaat waar ik trots op kan zijn."}},
];

// ═══════════════════════════════════════════════════════════
// DEEL III — LIKERT (48 items)
// ═══════════════════════════════════════════════════════════

const LIKERT_ITEMS: LikertItem[] = [
  {id:1, text:"Ik geef de behoeften van anderen voorrang boven die van mezelf, ook als niemand dat van me vraagt."},
  {id:2, text:"Ik kan urenlang in mijn eigen gedachten zijn zonder dat ik iemand mis."},
  {id:3, text:"Ik merk dat ik in gesprekken snel inschat wie het sterkst staat en wie het kwetsbaarst is."},
  {id:4, text:"Ik merk dat ik in gezelschap onbewust de lichaamshouding of gezichtsuitdrukking van de ander overneem."},
  {id:5, text:"Terwijl ik iets doe, ben ik in mijn hoofd al bezig met hoe het eruit ziet of overkomt."},
  {id:6, text:"Ik voel me beter als iemand me geruststelt, ook als ik weet dat er niets aan de hand is."},
  {id:7, text:"Ik word onrustig als ik te lang alleen ben.", reversed:true},
  {id:8, text:"Ik heb zelden behoefte aan bevestiging van anderen over mijn keuzes.", reversed:true},
  {id:9, text:"Ik weet meestal heel duidelijk wat ik zelf voel, ongeacht de stemming van mensen om me heen."},
  {id:10, text:"Ik vind het prettig om de leiding aan iemand anders over te laten."},
  {id:11, text:"Ik kan genieten van vrije tijd zonder het gevoel dat ik eigenlijk iets zou moeten doen."},
  {id:12, text:"Ik kan dingen laten liggen zonder er last van te hebben — niet alles hoeft af."},
  {id:13, text:"Na een goed gesprek met een vriend voel ik me opgeladen, alsof ik energie heb ontvangen."},
  {id:14, text:"Ik voel me het prettigst als ik degene ben die de besluiten neemt."},
  {id:15, text:"Als er iets misgaat, is mijn eerste gedachte: wat heb ik verkeerd gedaan?", reversed:true},
  {id:16, text:"In gezelschap voel ik me soms alsof ik door een glazen wand naar de anderen kijk.", reversed:true},
  {id:17, text:"Na een intens gesprek weet ik soms niet meer welke gevoelens van mij waren en welke van de ander."},
  {id:18, text:"Ik controleer mijn werk meerdere keren voordat ik het uit handen geef."},
  {id:19, text:"Ik merk dat ik mijn mening aanpas aan die van de persoon met wie ik praat, zonder dat ik het doorheb."},
  {id:20, text:"Ik slik mijn irritatie vaak in en merk pas uren later hoe boos ik eigenlijk was."},
  {id:21, text:"Mijn lichaam voelt soms vreemd aan, alsof het niet helemaal van mij is."},
  {id:22, text:"Als ik iets goed gedaan wil hebben, doe ik het liever zelf dan dat ik het uit handen geef."},
  {id:23, text:"Ik controleer vaker dan nodig of mensen nog aan me denken — een berichtje, een belletje.", reversed:true},
  {id:24, text:"Ik vind het moeilijk om iets af te leveren dat niet perfect is, zelfs als 'goed genoeg' volstaat.", reversed:true},
  {id:25, text:"Ik zoek uit mezelf lichamelijk contact met mensen van wie ik houd — een omhelzing, een hand op een schouder."},
  {id:26, text:"Ik voel me energiek en stabiel, ook als ik een tijdje op mezelf aangewezen ben."},
  {id:27, text:"Mijn smaak in muziek, kleding en eten is door de jaren heen vrij constant gebleven, ongeacht mijn relaties."},
  {id:28, text:"Ik laat me gemakkelijk overtuigen door een goed argument, ook als dat betekent dat ik ongelijk had."},
  {id:29, text:"Als iemand me onrecht aandoet, uit ik mijn boosheid direct en duidelijk."},
  {id:30, text:"Ik laat me soms meeslepen door mijn emoties zonder te proberen ze te beheersen."},
  {id:31, text:"Ik merk dat ik mijn emoties in bedwang houd, ook als de situatie het toelaat om ze te voelen.", reversed:true},
  {id:32, text:"Als ik moe ben, is het eerste wat ik wil iemand om me heen hebben.", reversed:true},
  {id:33, text:"Ik kan goed aanvoelen wat iemand wil horen, en ik gebruik dat soms om het gesprek te sturen."},
  {id:34, text:"Als mijn partner of beste vriend verdrietig is, voel ik dat fysiek in mijn eigen lichaam."},
  {id:35, text:"Ik voel me schuldig als ik een middag niets nuttigs doe."},
  {id:36, text:"Ik vergeet regelmatig te eten of te drinken als ik ergens mee bezig ben."},
  {id:37, text:"Na een sociaal evenement heb ik minstens een dag nodig om bij te komen."},
  {id:38, text:"Ik vind het moeilijk om alleen een beslissing te nemen zonder eerst iemand te raadplegen."},
  {id:39, text:"Mijn interesses en voorkeuren veranderen afhankelijk van met wie ik omga.", reversed:true},
  {id:40, text:"Hulp vragen kost me veel moeite, zelfs als ik weet dat ik het nodig heb.", reversed:true},
  {id:41, text:"Ik zeg regelmatig \u201Ehet geeft niet\u201C terwijl het wél iets geeft."},
  {id:42, text:"Als ik huil, probeer ik er zo snel mogelijk mee te stoppen."},
  {id:43, text:"Ik voel me meer thuis in ideeën dan in de tastbare wereld om me heen."},
  {id:44, text:"Ik voel me leeg als ik een paar dagen geen echt contact heb gehad."},
  {id:45, text:"Als ik een tijdje alleen ben, voel ik me soms alsof ik een beetje ophoud te bestaan."},
  {id:46, text:"In nieuwe situaties scan ik snel de verhoudingen: wie heeft hier invloed, wie niet?"},
  {id:47, text:"Na een compliment voel ik de neiging om het af te zwakken of te relativeren.", reversed:true},
  {id:48, text:"Ik voel me ongemakkelijk als iemand mij uitbundig prijst — ik weet dan niet goed waar ik moet kijken.", reversed:true},
];

const LIKERT_STRUCTURE_MAP: Record<number, StructureKey> = {};
LIKERT_ITEMS.forEach(item => {
  if (item.id <= 8) LIKERT_STRUCTURE_MAP[item.id] = "A";
  else if (item.id <= 16) LIKERT_STRUCTURE_MAP[item.id] = "B";
  else if (item.id <= 24) LIKERT_STRUCTURE_MAP[item.id] = "S";
  else if (item.id <= 32) LIKERT_STRUCTURE_MAP[item.id] = "C";
  else if (item.id <= 40) LIKERT_STRUCTURE_MAP[item.id] = "D";
  else LIKERT_STRUCTURE_MAP[item.id] = "E";
});

const LIKERT_OPTIONS = [
  { value: 1, label: "Zelden" },
  { value: 2, label: "Soms" },
  { value: 3, label: "Vaak" },
  { value: 4, label: "Bijna altijd" },
];

// ═══════════════════════════════════════════════════════════
// STRUCTURE INFO & HELPERS
// ═══════════════════════════════════════════════════════════

const STRUCTURE_INFO: Record<StructureKey, { name: string; color: string; fullName: string }> = {
  A: { name: "De Ontwijker", color: "#5B7B9A", fullName: "Ontwijkende structuur" },
  B: { name: "De zoeker", color: "#C4836A", fullName: "Zoekende structuur" },
  S: { name: "De versmelter", color: "#8B6F8E", fullName: "Versmeltende structuur" },
  C: { name: "De strateeg", color: "#6A8E6B", fullName: "Strategische structuur" },
  D: { name: "De drager", color: "#A68B5B", fullName: "Dragende structuur" },
  E: { name: "De Presteerder", color: "#7A8BA0", fullName: "Presterende structuur" },
};

const STRUCTURE_ORDER: StructureKey[] = ["A", "B", "S", "C", "D", "E"];

const INTERPRETATION = [
  { min: 70, max: 100, label: "Dominante structuur", desc: "Dit patroon is sterk aanwezig en waarschijnlijk zichtbaar in je dagelijks leven." },
  { min: 40, max: 69, label: "Aanwezige structuur", desc: "Dit patroon speelt een rol, vooral onder stress of in intieme relaties." },
  { min: 15, max: 39, label: "Achtergrondstructuur", desc: "Dit patroon is niet dominant maar kan in specifieke situaties een rol spelen." },
  { min: 0, max: 14, label: "Nauwelijks aanwezig", desc: "Dit patroon speelt geen wezenlijke rol in het huidige functioneren." },
];

function getInterpretation(score: number) {
  return INTERPRETATION.find(i => score >= i.min && score <= i.max) || INTERPRETATION[3];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ═══════════════════════════════════════════════════════════
// STYLE CONSTANTS
// ═══════════════════════════════════════════════════════════

const S = {
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'Lora', Georgia, serif",
  bg: "#faf8f4",
  text: "#3d3629",
  muted: "#8a8578",
  subtle: "#a09888",
  accent: "#9b8e7a",
  border: "#e0dbd2",
  hover: "#5a5347",
  card: "#f5f1ea",
};

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  const pct = (current / total) * 100;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: S.muted, fontFamily: S.fontBody }}>
        <span>{label}</span><span>{current} / {total}</span>
      </div>
      <div style={{ height: 4, backgroundColor: "#e8e2d8", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, backgroundColor: S.accent, borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%", padding: "40px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: 560 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: S.subtle, marginBottom: 24, fontFamily: S.fontBody }}>Hartspraak</div>
        <h1 style={{ fontSize: 42, fontWeight: 400, color: S.text, marginBottom: 8, fontFamily: S.fontDisplay, lineHeight: 1.2 }}>Spiegelwerk</h1>
        <p style={{ fontSize: 16, color: S.muted, marginBottom: 40, fontFamily: S.fontBody, fontStyle: "italic" }}>Karakterstructurentest</p>
        <div style={{ textAlign: "left", marginBottom: 40 }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: S.hover, fontFamily: S.fontBody, marginBottom: 20 }}>Welkom. Deze test brengt in kaart welke karakterstructuren bij jou het sterkst aanwezig zijn. Niet als label, maar als spiegel — een uitnodiging om te zien hoe je onbewuste patronen je dagelijks leven kleuren.</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: S.hover, fontFamily: S.fontBody, marginBottom: 20 }}>De test bestaat uit drie delen die samen een profiel opleveren:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {([["I", "Scenariovragen", "15 situaties — circa 12 minuten"], ["II", "Geforceerde keuze", "30 paren — circa 8 minuten"], ["III", "Likertschaal", "48 stellingen — circa 8 minuten"]] as const).map(([nr, title, desc]) => (
              <div key={nr} style={{ display: "flex", gap: 16, alignItems: "baseline", padding: "10px 16px", backgroundColor: S.card, borderRadius: 6 }}>
                <span style={{ fontSize: 13, color: S.accent, fontFamily: S.fontBody, fontWeight: 600, minWidth: 20 }}>{nr}</span>
                <div><span style={{ fontSize: 14, color: S.text, fontFamily: S.fontBody, fontWeight: 600 }}>{title}</span><span style={{ fontSize: 13, color: S.muted, fontFamily: S.fontBody, marginLeft: 8 }}>— {desc}</span></div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody, fontStyle: "italic" }}>Er zijn geen goede of foute antwoorden. De test meet patronen, geen prestaties.</p>
        </div>
        <button onClick={onStart} style={{ padding: "14px 48px", fontSize: 16, fontFamily: S.fontBody, backgroundColor: S.text, color: "#f0ebe3", border: "none", borderRadius: 6, cursor: "pointer", letterSpacing: 0.5 }}>Begin de test</button>
      </div>
    </div>
  );
}

function TransitionScreen({ title, subtitle, description, onContinue, buttonText }: { title: string; subtitle: string; description: string; onContinue: () => void; buttonText?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%", padding: "40px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: 500 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: S.subtle, marginBottom: 24, fontFamily: S.fontBody }}>{subtitle}</div>
        <h2 style={{ fontSize: 32, fontWeight: 400, color: S.text, marginBottom: 20, fontFamily: S.fontDisplay, lineHeight: 1.3 }}>{title}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: S.hover, marginBottom: 36, fontFamily: S.fontBody }}>{description}</p>
        <button onClick={onContinue} style={{ padding: "14px 40px", fontSize: 16, fontFamily: S.fontBody, backgroundColor: S.text, color: "#f0ebe3", border: "none", borderRadius: 6, cursor: "pointer" }}>{buttonText || "Verder"}</button>
      </div>
    </div>
  );
}

function ScenarioQuestion({ scenario, shuffledOptions, onAnswer, scenarioIndex, total }: { scenario: Scenario; shuffledOptions: ScenarioOption[]; onAnswer: (s: StructureKey) => void; scenarioIndex: number; total: number }) {
  const [selected, setSelected] = useState<StructureKey | null>(null);
  const [animating, setAnimating] = useState(false);
  const handleSelect = (option: ScenarioOption) => {
    if (animating) return;
    setSelected(option.structure);
    setAnimating(true);
    setTimeout(() => { onAnswer(option.structure); setSelected(null); setAnimating(false); }, 350);
  };
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
      <ProgressBar current={scenarioIndex + 1} total={total} label="Deel I — Scenariovragen" />
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 20, fontWeight: 400, color: S.text, marginBottom: 14, fontFamily: S.fontDisplay }}>{scenario.title}</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.8, color: S.hover, fontFamily: S.fontBody, marginBottom: 10 }}>{scenario.situation}</p>
        <p style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody, fontStyle: "italic" }}>{scenario.question}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {shuffledOptions.map((option, idx) => {
          const isSelected = selected === option.structure;
          return (<button key={idx} onClick={() => handleSelect(option)} style={{ padding: "16px 20px", fontSize: 14.5, lineHeight: 1.7, fontFamily: S.fontBody, color: isSelected ? "#f0ebe3" : S.hover, backgroundColor: isSelected ? S.text : S.bg, border: "1px solid", borderColor: isSelected ? S.text : S.border, borderRadius: 8, cursor: "pointer", textAlign: "left", transition: "all 0.25s ease", opacity: selected && !isSelected ? 0.5 : 1 }}>{option.text}</button>);
        })}
      </div>
    </div>
  );
}

function PairQuestion({ pair, onAnswer, pairIndex, total, flipped }: { pair: Pair; onAnswer: (s: StructureKey) => void; pairIndex: number; total: number; flipped: boolean }) {
  const [selected, setSelected] = useState<StructureKey | null>(null);
  const [animating, setAnimating] = useState(false);
  const optionA = flipped ? pair.b : pair.a;
  const optionB = flipped ? pair.a : pair.b;
  const handleSelect = (option: PairOption) => {
    if (animating) return;
    setSelected(option.s);
    setAnimating(true);
    setTimeout(() => { onAnswer(option.s); setSelected(null); setAnimating(false); }, 300);
  };
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
      <ProgressBar current={pairIndex + 1} total={total} label="Deel II — Geforceerde keuze" />
      <p style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody, fontStyle: "italic", marginBottom: 24, textAlign: "center" }}>Welke uitspraak lijkt het meest op jou?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[optionA, optionB].map((option, idx) => {
          const isSelected = selected === option.s;
          const isOther = selected !== null && !isSelected;
          return (<button key={idx} onClick={() => handleSelect(option)} style={{ padding: "24px 24px", fontSize: 15, lineHeight: 1.8, fontFamily: S.fontBody, color: isSelected ? "#f0ebe3" : S.hover, backgroundColor: isSelected ? S.text : S.bg, border: "1.5px solid", borderColor: isSelected ? S.text : S.border, borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.25s ease", opacity: isOther ? 0.4 : 1 }}>{option.t}</button>);
        })}
      </div>
    </div>
  );
}

function LikertBlock({ items, answers, onAnswer, total }: { items: LikertItem[]; answers: Record<number, number>; onAnswer: (id: number, val: number) => void; total: number }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
      <ProgressBar current={Object.keys(answers).length} total={total} label="Deel III — Likertschaal" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {items.map((item) => {
          const answered = answers[item.id] !== undefined;
          return (
            <div key={item.id} style={{ padding: "20px 24px", backgroundColor: answered ? S.card : S.bg, border: `1px solid ${answered ? "#d4cfc5" : S.border}`, borderRadius: 10, transition: "all 0.3s" }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: S.hover, fontFamily: S.fontBody, marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: S.subtle, marginRight: 10 }}>{item.id}.</span>{item.text}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {LIKERT_OPTIONS.map((opt) => {
                  const isSelected = answers[item.id] === opt.value;
                  return (<button key={opt.value} onClick={() => onAnswer(item.id, opt.value)} style={{ padding: "8px 18px", fontSize: 13, fontFamily: S.fontBody, color: isSelected ? "#f0ebe3" : S.hover, backgroundColor: isSelected ? S.text : "transparent", border: `1px solid ${isSelected ? S.text : S.border}`, borderRadius: 20, cursor: "pointer", fontWeight: isSelected ? 600 : 400 }}>{opt.label}</button>);
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FinalResults({ scoresI, scoresII, likertAnswers }: { scoresI: Scores; scoresII: Scores; likertAnswers: Record<number, number> }) {
  const normI: Record<StructureKey, number> = {} as any;
  STRUCTURE_ORDER.forEach(s => { normI[s] = ((scoresI[s] || 0) / 15) * 100; });
  const normII: Record<StructureKey, number> = {} as any;
  STRUCTURE_ORDER.forEach(s => { normII[s] = ((scoresII[s] || 0) / 10) * 100; });
  const rawIII: Scores = { A: 0, B: 0, S: 0, C: 0, D: 0, E: 0 };
  LIKERT_ITEMS.forEach(item => {
    const val = likertAnswers[item.id];
    if (val === undefined) return;
    const structure = LIKERT_STRUCTURE_MAP[item.id];
    rawIII[structure] += item.reversed ? (5 - val) : val;
  });
  const normIII: Record<StructureKey, number> = {} as any;
  STRUCTURE_ORDER.forEach(s => { normIII[s] = Math.max(0, ((rawIII[s] - 8) / 24) * 100); });
  const combined: Record<StructureKey, number> = {} as any;
  STRUCTURE_ORDER.forEach(s => { combined[s] = Math.round(0.40 * normI[s] + 0.30 * normII[s] + 0.30 * normIII[s]); });

  const chartData = STRUCTURE_ORDER.map(s => ({ structure: STRUCTURE_INFO[s].name, score: combined[s], fullMark: 100 }));
  const sorted = [...STRUCTURE_ORDER].sort((a, b) => combined[b] - combined[a]);
  const top3 = sorted.slice(0, 3);
  const profileType = (combined[sorted[0]] - combined[sorted[1]] >= 15) ? "Piektype" : "Mengtype";

  const discrepancies: { structure: StructureKey; note: string; spread: number }[] = [];
  STRUCTURE_ORDER.forEach(s => {
    const vals = [normI[s], normII[s], normIII[s]];
    const spread = Math.max(...vals) - Math.min(...vals);
    if (spread >= 25) {
      let note = "Verschil tussen de drie meetmethoden";
      if (normI[s] > normIII[s] + 25) note = "Actief patroon, niet erkend in zelfbeeld";
      else if (normIII[s] > normI[s] + 25) note = "Zelfbeeld wijkt af van onbewust patroon";
      else if (Math.abs(normII[s] - normI[s]) > 25 || Math.abs(normII[s] - normIII[s]) > 25) note = "Waardehiërarchie wijkt af";
      discrepancies.push({ structure: s, note, spread: Math.round(spread) });
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 640, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: S.subtle, marginBottom: 16, fontFamily: S.fontBody }}>Resultaat</div>
          <h2 style={{ fontSize: 32, fontWeight: 400, color: S.text, marginBottom: 8, fontFamily: S.fontDisplay }}>Jouw Spiegelwerk-profiel</h2>
          <p style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody, fontStyle: "italic" }}>Gecombineerde score uit drie meetmethoden — {profileType.toLowerCase()}</p>
        </div>
        <div style={{ width: "100%", height: 360, marginBottom: 40 }}>
          <ResponsiveContainer>
            <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="72%">
              <PolarGrid stroke={S.border} />
              <PolarAngleAxis dataKey="structure" tick={{ fontSize: 12, fill: S.hover, fontFamily: S.fontBody }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="score" stroke={S.accent} fill={S.accent} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 13, color: S.subtle, marginBottom: 16, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Je drie sterkste structuren</p>
          {top3.map((s, i) => {
            const interp = getInterpretation(combined[s]);
            return (
              <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 0", borderBottom: i < 2 ? "1px solid #f0ebe3" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: STRUCTURE_INFO[s].color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: S.fontBody, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                    <span style={{ fontSize: 16, color: S.text, fontFamily: S.fontBody, fontWeight: 600 }}>{STRUCTURE_INFO[s].name}</span>
                    <span style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody }}>{combined[s]}%</span>
                  </div>
                  <p style={{ fontSize: 13, color: S.muted, fontFamily: S.fontBody, fontStyle: "italic" }}>{interp.label} — {interp.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 13, color: S.subtle, marginBottom: 12, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Volledig profiel</p>
          {sorted.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 5 ? "1px solid #f0ebe3" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: STRUCTURE_INFO[s].color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: S.fontBody }}>{i + 1}</div>
              <div style={{ flex: 1 }}><span style={{ fontSize: 14, color: S.text, fontFamily: S.fontBody }}>{STRUCTURE_INFO[s].name}</span><span style={{ fontSize: 12, color: S.muted, fontFamily: S.fontBody, marginLeft: 8 }}>({STRUCTURE_INFO[s].fullName})</span></div>
              <div style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody }}>{combined[s]}%</div>
            </div>
          ))}
        </div>

        {discrepancies.length > 0 && (
          <div style={{ marginBottom: 36, padding: "20px 24px", backgroundColor: S.card, borderRadius: 10, border: `1px solid ${S.border}` }}>
            <p style={{ fontSize: 13, color: S.subtle, marginBottom: 12, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Discrepantie-indicator</p>
            <p style={{ fontSize: 13, color: S.muted, fontFamily: S.fontBody, marginBottom: 12 }}>Bij de volgende structuren is er een opvallend verschil tussen de drie meetmethoden. Dit kan wijzen op het verschil tussen onbewust patroon en zelfbeeld.</p>
            {discrepancies.map(d => (
              <div key={d.structure} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "8px 0" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: STRUCTURE_INFO[d.structure].color, fontFamily: S.fontBody, minWidth: 130 }}>{STRUCTURE_INFO[d.structure].name}</span>
                <span style={{ fontSize: 13, color: S.muted, fontFamily: S.fontBody }}>{d.note} (spreiding {d.spread}%)</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 13, color: S.subtle, marginBottom: 12, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Score per meetmethode</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: S.fontBody, fontSize: 13 }}>
              <thead><tr style={{ borderBottom: `2px solid ${S.border}` }}>
                <th style={{ textAlign: "left", padding: "8px", color: S.muted, fontWeight: 600 }}>Structuur</th>
                <th style={{ textAlign: "center", padding: "8px", color: S.muted, fontWeight: 600 }}>I</th>
                <th style={{ textAlign: "center", padding: "8px", color: S.muted, fontWeight: 600 }}>II</th>
                <th style={{ textAlign: "center", padding: "8px", color: S.muted, fontWeight: 600 }}>III</th>
                <th style={{ textAlign: "center", padding: "8px", color: S.text, fontWeight: 600 }}>Totaal</th>
              </tr></thead>
              <tbody>{sorted.map(s => (
                <tr key={s} style={{ borderBottom: "1px solid #f0ebe3" }}>
                  <td style={{ padding: "8px", color: S.text }}>{STRUCTURE_INFO[s].name}</td>
                  <td style={{ textAlign: "center", padding: "8px", color: S.muted }}>{Math.round(normI[s])}%</td>
                  <td style={{ textAlign: "center", padding: "8px", color: S.muted }}>{Math.round(normII[s])}%</td>
                  <td style={{ textAlign: "center", padding: "8px", color: S.muted }}>{Math.round(normIII[s])}%</td>
                  <td style={{ textAlign: "center", padding: "8px", color: S.text, fontWeight: 600 }}>{combined[s]}%</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      <PortraitSection normI={normI} normII={normII} normIII={normIII} />
        <p style={{ fontSize: 13, color: S.subtle, fontFamily: S.fontBody, fontStyle: "italic", textAlign: "center" }}>Dit profiel is een uitnodiging tot zelfonderzoek, geen diagnose. Bespreek de resultaten met je therapeut voor verdere verdieping.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function DeMaskermaker() {
  const [phase, setPhase] = useState("welcome");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scoresI, setScoresI] = useState<Scores>({ A: 0, B: 0, S: 0, C: 0, D: 0, E: 0 });
  const [pairIndex, setPairIndex] = useState(0);
  const [scoresII, setScoresII] = useState<Scores>({ A: 0, B: 0, S: 0, C: 0, D: 0, E: 0 });
  const [likertAnswers, setLikertAnswers] = useState<Record<number, number>>({});
  const [likertPage, setLikertPage] = useState(0);
  const LIKERT_PAGE_SIZE = 12;

  const shuffledScenarios = useMemo(() => SCENARIOS.map(s => ({ ...s, shuffledOptions: shuffle(s.options) })), []);
  const pairFlips = useMemo(() => PAIRS.map(() => Math.random() > 0.5), []);

  const handleScenarioAnswer = useCallback((structure: StructureKey) => {
    setScoresI(prev => ({ ...prev, [structure]: prev[structure] + 1 }));
    if (scenarioIndex + 1 >= SCENARIOS.length) setPhase("transition-2");
    else setScenarioIndex(prev => prev + 1);
  }, [scenarioIndex]);

  const handlePairAnswer = useCallback((structure: StructureKey) => {
    setScoresII(prev => ({ ...prev, [structure]: prev[structure] + 1 }));
    if (pairIndex + 1 >= PAIRS.length) setPhase("transition-3");
    else setPairIndex(prev => prev + 1);
  }, [pairIndex]);

  const handleLikertAnswer = useCallback((itemId: number, value: number) => {
    setLikertAnswers(prev => ({ ...prev, [itemId]: value }));
  }, []);

  const likertPages = Math.ceil(LIKERT_ITEMS.length / LIKERT_PAGE_SIZE);
  const currentLikertItems = LIKERT_ITEMS.slice(likertPage * LIKERT_PAGE_SIZE, (likertPage + 1) * LIKERT_PAGE_SIZE);
  const allCurrentPageAnswered = currentLikertItems.every(item => likertAnswers[item.id] !== undefined);
  const allLikertAnswered = Object.keys(likertAnswers).length >= LIKERT_ITEMS.length;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [scenarioIndex, pairIndex, phase, likertPage]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: S.bg, fontFamily: S.fontBody, color: S.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      <div style={{ maxWidth: 800, margin: "0 auto", minHeight: "100vh", padding: "24px 0" }}>
        {phase === "welcome" && <WelcomeScreen onStart={() => setPhase("transition-1")} />}
        {phase === "transition-1" && <TransitionScreen subtitle="Deel I van III" title="Scenariovragen" description="Je krijgt vijftien korte situatieschetsen uit het dagelijks leven. Bij elke situatie staan zes mogelijke reacties. Kies de reactie die het dichtst bij je komt — ga op je gevoel af, niet op nadenken." onContinue={() => setPhase("part1")} buttonText="Start deel I" />}
        {phase === "part1" && <ScenarioQuestion scenario={shuffledScenarios[scenarioIndex]} shuffledOptions={shuffledScenarios[scenarioIndex].shuffledOptions} onAnswer={handleScenarioAnswer} scenarioIndex={scenarioIndex} total={SCENARIOS.length} />}
        {phase === "transition-2" && <TransitionScreen subtitle="Deel II van III" title="Geforceerde keuze" description="Hieronder staan dertig paren van twee uitspraken. Beide uitspraken zijn herkenbaar — het gaat er niet om welke 'beter' is. Kies steeds de uitspraak die het meest op jou lijkt, ook als het verschil klein is." onContinue={() => setPhase("part2")} buttonText="Start deel II" />}
        {phase === "part2" && <PairQuestion pair={PAIRS[pairIndex]} flipped={pairFlips[pairIndex]} onAnswer={handlePairAnswer} pairIndex={pairIndex} total={PAIRS.length} />}
        {phase === "transition-3" && <TransitionScreen subtitle="Deel III van III" title="Likertschaal" description="Hieronder staan 48 korte uitspraken over het dagelijks leven. Geef bij elke uitspraak aan hoe vaak dit op jou van toepassing is. Ga op je eerste gevoel af — denk niet te lang na over je antwoord." onContinue={() => setPhase("part3")} buttonText="Start deel III" />}
        {phase === "part3" && (
          <div>
            <LikertBlock items={currentLikertItems} answers={likertAnswers} onAnswer={handleLikertAnswer} total={LIKERT_ITEMS.length} />
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, padding: "0 20px", marginBottom: 40 }}>
              {likertPage > 0 && <button onClick={() => setLikertPage(p => p - 1)} style={{ padding: "12px 32px", fontSize: 14, fontFamily: S.fontBody, backgroundColor: "transparent", color: S.text, border: `1px solid ${S.border}`, borderRadius: 6, cursor: "pointer" }}>Vorige</button>}
              {likertPage < likertPages - 1 && allCurrentPageAnswered && <button onClick={() => setLikertPage(p => p + 1)} style={{ padding: "12px 32px", fontSize: 14, fontFamily: S.fontBody, backgroundColor: S.text, color: "#f0ebe3", border: "none", borderRadius: 6, cursor: "pointer" }}>Volgende</button>}
              {likertPage === likertPages - 1 && allLikertAnswered && <button onClick={() => setPhase("results")} style={{ padding: "14px 40px", fontSize: 16, fontFamily: S.fontBody, backgroundColor: S.text, color: "#f0ebe3", border: "none", borderRadius: 6, cursor: "pointer", letterSpacing: 0.5 }}>Bekijk mijn profiel</button>}
            </div>
          </div>
        )}
        {phase === "results" && <FinalResults scoresI={scoresI} scoresII={scoresII} likertAnswers={likertAnswers} />}
      </div>
    </div>
  );
}

