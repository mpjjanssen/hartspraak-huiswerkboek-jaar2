import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, GraduationCap, Heart, ExternalLink } from "lucide-react";

export default function Home() {
  const googleDriveUrl = "https://drive.google.com/drive/folders/1gLqoQ4TzDxosB2i7w9L2iT6gmjVs2qR1?usp=sharing";

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
              Bekijk de algemene aandachtspunten en richtlijnen voor dit jaar.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/aandachtspunten">Bekijk Aandachtspunten</a>
            </Button>
          </CardContent>
        </Card>
      </div>

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
              <Button className="w-full" asChild>
                <a href={googleDriveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink size={18} />
                  Openen in Google Drive
                </a>
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
              <Button className="w-full" asChild>
                <a href={googleDriveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink size={18} />
                  Openen in Google Drive
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
   );
}
