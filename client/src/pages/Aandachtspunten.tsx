import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

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
              Aandachtspunten voor je Reis
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
              Acht Belangrijke Aandachtspunten
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

          {/* Praktische Tips */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Praktische Tips voor je Voorbereiding
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
