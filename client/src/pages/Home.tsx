import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Sparkles, ExternalLink, Quote, Download, FileText, Shield } from "lucide-react";

export default function Home() {
  const workshops = [
    {
      id: 1,
      title: "Fundament en bestaansrecht",
      date: "18-19 april 2026",
      description: "De schizoïde en orale structuur: Op aarde komen en de innerlijke bron voeden",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5",
    },
    {
      id: 2,
      title: "Relatie en Autonomie",
      date: "20-21 juni 2026",
      description: "De symbiotische en masochistische structuur: De kunst van het begrenzen en de vrijheid om gelukkig te zijn",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5-1",
    },
    {
      id: 3,
      title: "Wil, Overgave en Vorm",
      date: "19-20 september 2026",
      description: "De psychopathische en rigide structuur: Vertrouwen wagen en de liefde durven aangaan",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5-2",
    },
    {
      id: 4,
      title: "Integratie en Transformatie",
      date: "5-6 december 2026",
      description: "Het Meesterstuk: De dans van de maskers en leven vanuit essentie",
      available: true,
      infoUrl: "https://www.hartspraak.com/blank-5-1-1",
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
                bij het tweede jaar Hartspraak
              </p>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-primary mt-4">
              ‘De Maskers Meesteren’
            </h2>
            
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
              In dit verdiepingsjaar gaan we dieper in op de onbewuste overlevingsstrategieën die we als reactie op vroege kwetsingen hebben ontwikkeld. 
              Een reis naar binnen: een liefdevolle ontmoeting met ons schaduwkind om het te helen en te integreren.
            </p>
          </div>
        </div>
      </section>

      {/* Workshops Overview */}
      <section id="workshops-overview" className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              De Workshops van 2026
            </h2>
            <p className="text-lg text-muted-foreground">
              Vier weekenden van transformatie en verdieping
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">Workshop {workshop.id}: {workshop.title}</CardTitle>
                      <CardDescription className="font-medium text-primary">{workshop.date}</CardDescription>
                    </div>
                    <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                      2026
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{workshop.description}</p>
                  <div className="flex gap-3">
                    <Link href={`/workshop/${workshop.id}`} className="flex-1">
                      <Button className="w-full">Naar Huiswerk</Button>
                    </Link>
                    <a href={workshop.infoUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book Downloads Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Studiemateriaal
              </h2>
              <p className="text-lg text-muted-foreground">
                Essentiële literatuur voor dit verdiepingsjaar
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-center">
                    De Maskermaker
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    Wibe Veenbaas - Systemisch werk en lichaamswerk
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <p className="text-muted-foreground">
                    Dit boek dient als leidraad voor ons onderzoek naar de zes fundamentele karakterstructuren.
                  </p>
                  <Button className="w-full" size="lg" disabled>
                    <Download className="mr-2 h-5 w-5" />
                    PDF volgt per e-mail
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
