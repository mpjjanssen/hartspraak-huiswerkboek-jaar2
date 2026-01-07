import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Sparkles, ExternalLink, Quote, Download, FileText, Shield } from "lucide-react";

export default function Home() {
  // The useAuth hook provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  // let { user, loading, error, isAuthenticated, logout } = useAuth();

  const workshops = [
    {
      id: 1,
      title: "De kracht van de psychologische basisbehoeften",
      date: "14-15 maart 2026",
      description: "De fundamenten ontdekken: verbinding, veiligheid, eigenwaarde en plezier",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5",
    },
    {
      id: 2,
      title: "Ontdek je hechtingsfundament",
      date: "9-10 mei 2026",
      description: "Hoe vroege hechtingservaringen je huidige relaties vormgeven",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5-1",
    },
    {
      id: 3,
      title: "Versterk je eigenwaarde",
      date: "29-30 augustus 2026",
      description: "Van zelfkritiek naar zelfcompassie, van schaduwkind naar zonnekind",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5-2",
    },
    {
      id: 4,
      title: "Emoties en angst als wegwijzers",
      date: "31 oktober - 1 november 2026",
      description: "De verborgen intelligentie van emoties en angsten ontdekken",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5-1-1",
    },
    {
      id: 5,
      title: "Authentieke verbinding & autonomie",
      date: "30-31 januari 2027",
      description: "De balans tussen nabijheid en zelfbehoud in relaties",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5-2-1",
    },
    {
      id: 6,
      title: "Integratie - je nieuwe zelf leven",
      date: "20-21 februari 2027",
      description: "Van inzicht naar praktijk - alle elementen samenbrengen",
      available: true,
      infoUrl: "https://www.hartspraak.com/workshop-6",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/30 to-background py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Welkom
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/70">
                bij de reis naar jezelf
              </p>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/70 mt-4">
              Bereid je voor op de workshops van Hartspraak
            </p>
            
            {/* Privacy Badge */}
            <div className="flex justify-center pt-4">
              <Link href="/privacy">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full hover:bg-green-100 transition-colors cursor-pointer">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Je antwoorden zijn end-to-end versleuteld
                  </span>
                </div>
              </Link>
            </div>
            
            <div className="flex justify-center pt-6">
              <Button 
                size="lg" 
                onClick={() => {
                  const workshopsSection = document.getElementById('workshops-overview');
                  workshopsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="text-lg px-8 py-6"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Verken de workshops
              </Button>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Dit werkboek is geen handleiding. Het is een uitnodiging tot een ontmoeting - met jezelf, in al je complexiteit. 
              Wat je hier aantreft zijn geen antwoorden, maar vragen die je wellicht al jaren in je draagt zonder ze ooit hardop te hebben uitgesproken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/aandachtspunten">
                <Button size="lg" className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Aandachtspunten voor onderweg
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Book Downloads Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Download de boeken
              </h2>
              <p className="text-lg text-muted-foreground">
                Begin je voorbereiding met dit essentiële leesmateriaal
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Book 1: Wie we zijn */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-center">
                    Wie we zijn
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Het hoofdboek van Stefanie Stahl met de fundamentele theorie over hechtingsstijlen, het schaduwkind en zonnekind
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-accent/30 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Wat je leert:</strong>
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>De psychologische basisbehoeften</li>
                      <li>Hechtingsstijlen en hun impact</li>
                      <li>Het schaduwkind en zonnekind model</li>
                      <li>Praktische oefeningen voor zelfontwikkeling</li>
                    </ul>
                  </div>
                  <a href="/WieWeZijn.pdf" download="Wie-we-zijn.pdf">
                    <Button className="w-full" size="lg">
                      <Download className="mr-2 h-5 w-5" />
                      Download Wie we zijn
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Book 2: Werkboek wie we zijn */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-center">
                    Werkboek wie we zijn
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Het praktische werkboek met oefeningen en reflectievragen om de theorie te integreren in je eigen leven
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-accent/30 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Wat je doet:</strong>
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Persoonlijke reflectie-oefeningen</li>
                      <li>Je eigen hechtingspatronen ontdekken</li>
                      <li>Contact maken met je schaduwkind</li>
                      <li>Je zonnekind versterken</li>
                    </ul>
                  </div>
                  <a href="/WieWeZijn-Werkboek-.pdf" download="Werkboek-wie-we-zijn.pdf">
                    <Button className="w-full" size="lg">
                      <Download className="mr-2 h-5 w-5" />
                      Download Werkboek
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Info Note */}
            <div className="mt-8 p-6 bg-accent/20 rounded-lg border border-primary/10">
              <p className="text-center text-muted-foreground">
                <strong className="text-foreground">Tip:</strong> Download beide boeken en begin met "Wie we zijn" voor de theorie. 
                Gebruik daarna het werkboek om de inzichten toe te passen op je eigen situatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground/90 leading-relaxed">
                De komende zes workshops vormen een reis door het landschap van je innerlijke wereld. Een reis die geen lineair pad volgt, 
                maar spiraalvormig dieper gaat. Elke workshop opent een nieuwe laag, onthult een nieuw perspectief op dezelfde fundamentele vraag: 
                wie ben je, werkelijk, onder alle beschermingsmechanismen en overlevingsstrategieën die je in de loop der jaren hebt ontwikkeld?
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Dit huiswerk bestaat uit voorbereiding - niet als verplichting, maar als geschenk. Een mogelijkheid om alvast aan te raken 
                wat we samen gaan verkennen. Om je te oriënteren voordat we in de diepte duiken. Een brug tussen je alledaagse leven en 
                de intensiteit van twee dagen waarin alles wat gewoonlijk onder de oppervlakte blijft, ruimte krijgt om zich te tonen.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card className="border-2">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Leeswerk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Hoofdstukken uit "Wie we zijn" van Stefanie Stahl en het bijbehorende werkboek
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Reflectie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Drie kernopdrachten die de theorie verbinden met je eigen levende ervaring
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Verdieping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Optionele opdrachten voor wie de ruimte en behoefte heeft om verder te gaan
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Overview */}
      <section id="workshops-overview" className="py-16 md:py-20 bg-accent/20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Overzicht van de zes workshops
              </h2>
              <p className="text-lg text-muted-foreground">
                Elke workshop bouwt voort op de vorige en brengt je dieper in je innerlijke reis
              </p>
            </div>

            <div className="grid gap-6">
              {workshops.map((workshop) => (
                <Card 
                  key={workshop.id} 
                  className={`transition-all hover:shadow-lg ${
                    workshop.available ? "border-primary/30" : "opacity-60"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                            {workshop.id}
                          </span>
                          <span className="text-sm text-muted-foreground">{workshop.date}</span>
                        </div>
                        <CardTitle className="text-xl md:text-2xl mb-2">
                          {workshop.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {workshop.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        {workshop.available && (
                          <Link href={`/workshop/${workshop.id}`}>
                            <Button variant="outline">
                              Bekijk huiswerk
                            </Button>
                          </Link>
                        )}
                        {!workshop.available && (
                          <Button variant="outline" disabled>
                            Binnenkort beschikbaar
                          </Button>
                        )}
                        <a href={workshop.infoUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="w-full">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Meer info
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/holding-heart-stone.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/80" />
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Quote className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Wat deelnemers zeggen
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Ontdek hoe de Hartspraak workshops anderen hebben geholpen op hun reis naar zelfontdekking en authentieke verbinding.
            </p>
            <div className="pt-6">
              <a 
                href="/referenties"
                className="inline-block"
              >
                <Button size="lg" className="text-lg px-8 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Lees de ervaringen van deelnemers
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Over Ons Section */}
      <section className="py-16 md:py-20 bg-accent/10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Team Photo */}
            <div className="mb-12 flex justify-center">
              <img 
                src="/team.jpeg" 
                alt="Martien Janssen en Lonneke van Houten" 
                className="rounded-lg shadow-lg max-w-4xl w-full object-cover"
              />
            </div>
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Over Ons
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Wij, Martien Janssen en Lonneke van Houten, zijn een team van 2 geëngageerde therapeuten die elkaar al meer dan 12 jaar kennen. We werken vanuit een diepe belangstelling voor mensen, spiritualiteit, filosofie en psychotherapie.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Martien Janssen */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Martien Janssen</CardTitle>
                  <CardDescription className="text-base">
                    Geboren in 1950 • Therapeut – Leraar – Oprichter Hartspraak
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    Put uit meer dan vijf decennia ervaring in therapeutisch werk. Opgeleid door vooraanstaande therapeuten als John en Eva Pierrakos en Hans Korteweg, begeleidt hij mensen op hun reis naar zelfontdekking en innerlijke heling. Zijn benadering integreert diverse therapeutische stromingen met een bijzondere focus op trauma- en verliesverwerking.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Zijn passie voor spiritualiteit, filosofie, psychologie en kunstmatige intelligentie drijft hem om voortdurend nieuwe inzichten te verweven in zijn therapeutische werk. Door zijn integratie van bio-energetica, ademwerk en familieopstellingen biedt hij een unieke holistische benadering van persoonlijke groei. Als vertaler van Stefanie Stahls werk maakt hij deze kennis toegankelijk voor het Nederlands taalgebied.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Naast zijn praktijk vindt hij inspiratie op lange fietstochten, kampeeravonturen en schrijven. Martien leeft in partnerschap met Verena en is vader van twee kinderen en grootvader van een kleinzoon.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Via ZOOM zijn internationale coaching- en therapiesessies mogelijk.
                  </p>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-foreground mb-2">Vertaler van de boeken:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• "Het kind in je een thuis geven" van Stefanie Stahl</li>
                      <li>• Werkboek "Het kind in je een thuis geven"</li>
                      <li>• "Het innerlijke kind en de liefde"</li>
                    </ul>
                  </div>
                  <div className="pt-4 text-sm text-muted-foreground">
                    <p>📧 info@hartspraak.com</p>
                    <p>📞 +49 176 9651 1086</p>
                  </div>
                </CardContent>
              </Card>

              {/* Lonneke van Houten */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Lonneke van Houten</CardTitle>
                  <CardDescription className="text-base">
                    Geboren in 1967 • Therapeut – Verloskundige – Docent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    Als ervaren therapeut en docent combineert Lonneke van Houten haar achtergrond in verloskunde met diepgaande expertise in coaching en counseling. Ze heeft zich gespecialiseerd in het werken met het innerlijke kind, hechtingstrauma en bewustzijnspsychologie.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Met zorg en compassie begeleidt ze mensen bij transformatieprocessen rond zwangerschap, relaties, burn-out, rouw, angst en spirituele groei. In haar relatietherapie staat Emotionally Focused Therapy (EFT) centraal, waarbij ze bijzondere aandacht besteedt aan hechtingspatronen en het innerlijke kind.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Als auteur van "Het Hechtingsplan" deelt ze haar inzichten over de impact van hechting en mogelijkheden tot persoonlijke groei. Naast haar therapeutische werk is ze logistiek en inhoudelijk manager van BabythuisZorg en verzorgt ze opleidingen, lezingen en masterclasses.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Als moeder van vier kinderen beschouwt ze zichzelf als eeuwige student aan de universiteit van het leven. Bij Hartspraak begeleidt ze zowel individuele sessies als groepstherapie.
                  </p>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-foreground mb-2">Schrijfster van het boek:</p>
                    <p className="text-sm text-muted-foreground">• "Het Hechtingsplan"</p>
                  </div>
                  <div className="pt-4 text-sm text-muted-foreground">
                    <p>📧 lonnekevanhouten@gmail.com</p>
                    <p>📞 06 48 81 75 79</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Een laatste woord
            </h2>
            <div className="prose prose-lg max-w-none text-left">
              <p className="text-foreground/90 leading-relaxed">
                Wat je hier begint vraagt moed. Het vraagt eerlijkheid. Het vraagt de bereidheid om te kijken naar wat je misschien liever verborgen houdt. 
                Niet omdat zelfonderzoek een deugd is, maar omdat onbewustzijn een gevangenis is.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Dit is een reis van begrijpen naar voelen, van analyseren naar beleven, van overleven naar daadwerkelijk leven.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                Welkom.
              </p>
            </div>
            <div className="pt-6 text-muted-foreground italic">
              <p>Met respect voor je moed en waardering voor je bereidheid,</p>
              <p className="font-semibold">Martien en Lonneke</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
