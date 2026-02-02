import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, GraduationCap, Heart } from "lucide-react";

export default function Home() {
  const handleDownload = (filename: string) => {
    // We gebruiken de API route die we in de server hebben aangemaakt
    const downloadUrl = `/api/download-book/${filename}`;
    
    // Maak een tijdelijke link om de download te starten
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
          <Heart className="text-destructive fill-destructive" />
          Welkom bij Hartspraak Jaar 2
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Jouw persoonlijke reis naar verdieping, verbinding en innerlijke groei gaat hier verder.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <Card className="border-primary/20 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-primary" />
              Jouw Huiswerkboek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Hier vind je alle opdrachten, reflecties en oefeningen voor het tweede jaar. 
              Gebruik de navigatie om naar de specifieke workshops te gaan.
            </p>
            <Button className="w-full" asChild>
              <a href="/workshop-1">Start met Workshop 1</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="text-primary" />
              Belangrijke Informatie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Bekijk de algemene aandachtspunten en richtlijnen voor dit jaar om het 
              maximale uit jouw proces te halen.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/aandachtspunten">Bekijk Aandachtspunten</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Studiemateriaal Sectie */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Studiemateriaal</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Boek 1: De Maskermaker */}
          <Card className="overflow-hidden border-primary/20">
            <div className="bg-primary/5 p-6 flex justify-center">
              <BookOpen size={80} className="text-primary/40" />
            </div>
            <CardHeader>
              <CardTitle>De Maskermaker deel 1</CardTitle>
              <p className="text-sm text-muted-foreground italic">Wibe Veenbaas</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Een essentieel naslagwerk over karakterstructuren, maskers en de weg naar heelwording.
              </p>
              <Button 
                onClick={() => handleDownload("De Maskermaker deel 1.pdf")}
                className="w-full flex items-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          {/* Boek 2: Van Wond naar Wonder */}
          <Card className="overflow-hidden border-primary/20">
            <div className="bg-primary/5 p-6 flex justify-center">
              <BookOpen size={80} className="text-primary/40" />
            </div>
            <CardHeader>
              <CardTitle>Van Wond naar Wonder</CardTitle>
              <p className="text-sm text-muted-foreground italic">Jaar 2 Studiemateriaal</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Verdiepende teksten en inzichten die aansluiten bij de thema's van het tweede jaar.
              </p>
              <Button 
                onClick={() => handleDownload("Van wond naar wonder v8 2-2-26.pdf")}
                className="w-full flex items-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center">
        <h3 className="text-xl font-semibold mb-4 italic">"De kortste weg naar jezelf is een reis om de wereld."</h3>
        <p className="text-muted-foreground italic">- Hermann Keyserling</p>
      </div>
    </div>
  );
}
