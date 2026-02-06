import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Bot, Share2 } from "lucide-react";

export default function Aandachtspunten() {
  const aandachtspunten = [
    {
      title: "Zelfcompassie is essentieel",
      content: "Dit werk raakt aan oude pijn, aan patronen die misschien decennia oud zijn, aan overtuigingen die je als kind vormde om te overleven. Er bestaat geen \"goed\" of \"fout\" in jouw ervaring. Alleen de werkelijkheid van wat is. Behandel jezelf met de mildheid die je een dierbare zou geven die iets moeilijks moet verwerken. Als je merkt dat je innerlijke criticus luid is, leg dan liefdevol een hand op je hart en zeg tegen jezelf: \"Ik ben moedig bezig, en het is oké om te worstelen.\""
    },
    {
      title: "Veiligheid boven alles",
      content: "Wanneer intense emoties of herinneringen opkomen die te overweldigend voelen, stop dan. Adem. Zorg voor jezelf. Ga wandelen. Bel iemand. Je hoeft niet door te zetten als het te veel wordt. Dit werk vraagt moed, geen zelfdestructie. Als bepaalde vragen te heftig zijn, sla ze over. Je kunt er tijdens de workshop op terugkomen in een veilige setting. Jouw welzijn is de absolute prioriteit."
    },
    {
      title: "Imperfectie als uitgangspunt",
      content: "We zoeken hier geen perfecte antwoorden of een vlekkeloze zelfontwikkeling. We zoeken bewustzijn. Je zult oude patronen herkennen en er vervolgens weer in vervallen. Dat is niet falen - dat is het proces zelf. Echte groei zit hem in het steeds sneller herkennen van wanneer je terugvalt, en het steeds vaker kunnen kiezen voor iets nieuws. Vier de imperfectie, want daarin schuilt de menselijkheid."
    },
    {
      title: "Jouw ritme, jouw reis",
      content: "Je hoeft niets te forceren. De antwoorden die nu komen zijn de juiste. Wat nog niet zichtbaar is, zal zich op zijn tijd tonen. Als een vraag je niet aanspreekt, laat hem dan los. Niet alle opdrachten zijn voor iedereen even relevant. Volg je innerlijke kompas. Jouw ziel weet het tempo. Vertrouw daarop."
    },
    {
      title: "Ongemak als signaal",
      content: "Groei voelt vaak ongemakkelijk. Het verlaten van oude, vertrouwde patronen roept weerstand op - zelfs wanneer die patronen ons beperken. Confrontatie met jezelf kan pijnlijk zijn. Dat is niet abnormaal. Dat is een teken dat je iets wezenlijks raakt. Ongemak betekent niet dat je de verkeerde weg gaat - vaak betekent het juist dat je op de goede weg bent. Adem erin, en weet dat het een teken van transformatie is."
    },
    {
      title: "Autonomie betekent ook hulp kunnen vragen",
      content: "Als dit huiswerk dingen losmaakt waarmee je liever niet alleen bent, zoek dan steun. Een vriend, een therapeut, een van ons. Autonomie is niet hetzelfde als alles alleen moeten doen. Autonomie betekent dat je zelf bepaalt wanneer je hulp nodig hebt en waar je die zoekt. Het is een teken van kracht om je kwetsbaarheid te erkennen en ondersteuning te organiseren."
    },
    {
      title: "Delen is een keuze, geen verplichting",
      content: "Tijdens de workshops kun je delen uit je huiswerk wanneer dat voelt als een geschenk - aan jezelf en aan de groep. Je hoeft niets te delen. Je privacy is heilig. Je grenzen worden gerespecteerd. Wat je deelt, blijft binnen de groep. Voel je nooit onder druk gezet om meer te onthullen dan wat voor jou goed voelt."
    },
    {
      title: "Het huiswerk is voorbereiding, geen voorwaarde",
      content: "Als je om welke reden dan ook het huiswerk niet (volledig) hebt kunnen doen, kom dan toch. Het huiswerk verdiept de ervaring, maar is geen toegangseis. Je bent welkom zoals je bent - met of zonder voorbereiding, met of zonder antwoorden, met of zonder duidelijkheid. Jouw aanwezigheid is het belangrijkste."
    }
  ];

  const aiTips = [
    {
      title: "Vraag naar je blinde vlekken",
      content: "\"Wat vermijd ik hier te zien over mezelf? Welke waarheid zou ik liever niet horen?\""
    },
    {
      title: "Vraag naar de pijn onder je woorden",
      content: "\"Welke pijn of angst zit er onder dit antwoord die ik niet benoem? Wat zou ik zeggen als ik écht eerlijk was?\""
    },
    {
      title: "Vraag om de confrontatie",
      content: "\"Speel advocaat van de duivel. Waar zit de zelfmisleiding in wat ik schrijf? Waar praat ik mezelf iets aan?\""
    },
    {
      title: "Toets de eerlijkheid",
      content: "\"Was je nu eerlijk tegen me, of hield je je in om me te sparen? Geef me de ongemakkelijke versie.\""
    }
  ];

  const deelOpties = [
    {
      title: "Direct delen met het team",
      content: "Je kunt ons toestemming geven om je antwoorden te lezen. Dit stelt ons in staat om je proces al vóór de workshop te volgen en ons voor te bereiden op waar jij staat.",
      icon: "🔓"
    },
    {
      title: "Per email versturen",
      content: "Je kunt ervoor kiezen om (delen van) je antwoorden per email met ons te delen wanneer jij daar klaar voor bent.",
      icon: "📧"
    },
    {
      title: "Privé houden",
      content: "Je antwoorden blijven volledig bij jou. Je deelt alleen wat je wilt tijdens de workshop zelf.",
      icon: "🔒"
    }
  ];

  const praktischeTips = [
    {
      title: "Begin op tijd",
      content: "Start minimaal twee weken voor de workshop. Geef de vragen tijd om te bezinken, laat ze in je onderbewustzijn werken voordat je antwoorden formuleert."
    },
    {
      title: "Werk gefaseerd",
      content: "Je hoeft niet alles in één sessie af te maken. Werk bijvoorbeeld één opdracht per dag, of verdeel het over meerdere momenten die je ritueel inricht."
    },
    {
      title: "Herlees voor de workshop",
      content: "Lees vlak voor de workshop je antwoorden opnieuw. Vaak zie je dan verbanden die je eerder niet zag, of ontstaan er nieuwe inzichten."
    },
    {
      title: "Markeer wat resoneert",
      content: "Als je iets wilt delen tijdens de workshop, markeer het alvast. Zo hoef je tijdens de workshop niet te zoeken en kun je meer in het moment blijven."
    },
    {
      title: "Bewaar zorgvuldig",
      content: "Dit werkschrift wordt een document van je transformatie. Over een jaar, of vijf jaar, kan het waardevol zijn om terug te lezen en te zien hoeveel er verschoven is - zelfs wanneer die verschuivingen subtiel zijn."
    }
  ];

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Aandachtspunten voor je reis
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Zorg goed voor jezelf tijdens dit proces. Deze pagina is je anker, een plek waar je altijd kunt terugkeren om jezelf te herinneren aan de belangrijkste principes van deze reis.
            </p>
          </div>

          {/* Introduction */}
          <Card className="bg-accent/30 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-foreground/90 leading-relaxed">
                Welkom op deze pagina, een rustpunt tijdens je reis. De workshops en het huiswerk kunnen diepe processen in gang zetten. 
                Dat is prachtig, maar vraagt ook om zorgvuldige zelfzorg. Lees deze punten niet alleen nu, maar kom er regelmatig op terug, 
                vooral wanneer het proces intens voelt.
              </p>
            </CardContent>
          </Card>

          {/* Aandachtspunten */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Acht belangrijke aandachtspunten
            </h2>
            <div className="grid gap-6">
              {aandachtspunten.map((punt, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3 text-xl">
                      <span className="text-2xl">🌟</span>
                      <span>{punt.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed">{punt.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Coach Section */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Je AI-coach: eerlijke spiegel, geen vleierij
            </h2>
            
            <Card className="bg-accent/30 border-primary/20">
              <CardContent className="pt-6 space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  In dit huiswerkboek heb je de <em>mogelijkheid</em> om met een AI-coach te werken die feedback geeft op je antwoorden. Dit kan een waardevolle spiegel zijn in je proces, maar is geen verplichting. Veel deelnemers werken prima zonder AI-hulp. Gebruik het wanneer je behoefte hebt aan een extra perspectief of vastloopt.
                </p>
                
                <div className="pt-2">
                  <h3 className="font-semibold text-lg text-foreground mb-2">Pas op voor de "lieve" AI</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Wanneer je de AI wel gebruikt, is er iets belangrijks dat je moet weten over hoe AI werkt. AI-systemen zijn getraind om behulpzaam en vriendelijk te zijn. Dat klinkt fijn, maar het heeft een keerzijde: ze hebben de neiging om je in watten te pakken. Ze zeggen "wat een mooi inzicht" terwijl je eigenlijk nodig hebt te horen waar je jezelf voor de gek houdt. Ze beschermen je ego in plaats van je groei te dienen.
                  </p>
                </div>
                
                <p className="text-foreground/80 leading-relaxed">
                  In therapeutisch werk is dit problematisch. Je bent hier niet om bevestigd te worden in wat je al denkt. Je bent hier om te groeien, en groei vraagt om eerlijke confrontatie met jezelf. De AI kan daarbij helpen - maar alleen als je hem uitnodigt om eerlijk te zijn.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Hoe je de AI uitnodigt tot eerlijkheid</h3>
              <p className="text-muted-foreground">Je kunt de AI sturen naar meer diepgang. Probeer vragen zoals:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {aiTips.map((tip, index) => (
                  <Card key={index} className="bg-muted/30 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-2">
                        <span className="text-primary">💡</span>
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Waarom dit ertoe doet</h3>
                <p className="text-foreground/80 leading-relaxed">
                  De echte waarde van werken met AI in dit huiswerkboek ligt niet in bevestiging, maar in uitdaging. Wanneer de AI een blinde vlek blootlegt of een vraag stelt die je liever ontwijkt, dán gebeurt er iets. Dát zijn de momenten van potentiële doorbraak.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Dus als je merkt dat de AI je alleen maar complimenteert en bevestigt: wees alert. Vraag door. Vraag om de ongemakkelijke waarheid. Net zoals in therapie geldt: <span className="font-medium text-foreground">het ongemak is vaak de wegwijzer naar wat er werkelijk toe doet.</span>
                </p>
              </CardContent>
            </Card>

            {/* Belangrijke kanttekeningen */}
            <Card className="border-amber-500/30 bg-amber-50/30">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <span>⚠️</span>
                  Belangrijke kanttekeningen
                </h3>
                
                <div className="space-y-3 text-foreground/80">
                  <div>
                    <p className="font-medium text-foreground">De AI is geen therapeut</p>
                    <p className="text-sm leading-relaxed">
                      De AI kan waardevolle spiegels en inzichten bieden, maar vervangt geen menselijke begeleiding. Bij heftige emoties, overweldigende herinneringen, of als je merkt dat iets te veel wordt: stop met de AI en zoek contact met een van ons, of met iemand die je vertrouwt.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-foreground">Privacy en vertrouwelijkheid</p>
                    <p className="text-sm leading-relaxed">
                      Wat je deelt met de AI wordt verwerkt door externe servers. Deel alleen wat je comfortabel vindt om digitaal te delen. Je hoeft geen namen, specifieke details of zeer gevoelige informatie te geven om toch diepgaand met de vragen te kunnen werken. Bij twijfel: houd het algemener, en bewaar de details voor de workshop.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delen van je Antwoorden Section */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-2">
              <Share2 className="h-6 w-6 text-primary" />
              Delen van je antwoorden
            </h2>
            
            <Card className="bg-accent/30 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-foreground/90 leading-relaxed">
                  Je bepaalt zelf wat je met je antwoorden doet. Er zijn drie mogelijkheden:
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {deelOpties.map((optie, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3 text-xl">
                      <span className="text-2xl">{optie.icon}</span>
                      <span>{optie.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed">{optie.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Waarom delen waardevol kan zijn</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Hoe meer je met ons deelt, hoe beter wij kunnen aansluiten bij jouw proces. Wanneer wij je antwoorden vooraf kennen, kunnen we:
                </p>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Dieper ingaan op wat er bij jou speelt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Verbanden zien die je zelf misschien mist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>De workshop beter afstemmen op jouw groeiproces</span>
                  </li>
                </ul>
                <p className="text-foreground/80 leading-relaxed pt-2">
                  <span className="font-medium text-foreground">Delen is geen verplichting, maar een uitnodiging.</span> Het is een manier om meer uit je reis te halen.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Praktische Tips */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Praktische tips voor je voorbereiding
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {praktischeTips.map((tip, index) => (
                <Card key={index} className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 leading-relaxed">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Closing */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Onthoud: deze reis is een marathon, geen sprint. Wees lief voor jezelf. 
                We kijken ernaar uit je te zien bij de volgende workshop.
              </p>
              <div className="pt-4 text-muted-foreground italic">
                <p>Met warme groet,</p>
                <p className="font-semibold text-foreground">Martien en Lonneke</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
