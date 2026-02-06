import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, BookOpen, GraduationCap, Heart, ExternalLink, Share2, Loader2, ClipboardList } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const googleDriveUrl = "https://drive.google.com/drive/folders/1gLqoQ4TzDxosB2i7w9L2iT6gmjVs2qR1?usp=sharing";
  const [shareConsent, setShareConsent] = useState(false);
  const [isLoadingConsent, setIsLoadingConsent] = useState(true);
  const [isUpdatingConsent, setIsUpdatingConsent] = useState(false);

  // Load share consent status on mount
  useEffect(() => {
    const loadShareConsent = async () => {
      try {
        const authToken = sessionStorage.getItem('auth_token');
        if (authToken) {
          const response = await fetch('/api/user-data/share-consent', {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setShareConsent(data.shareConsent);
          }
        }
      } catch (error) {
        console.error('Failed to load share consent:', error);
      } finally {
        setIsLoadingConsent(false);
      }
    };
    loadShareConsent();
  }, []);

  // Update share consent
  const handleShareConsentChange = async (checked: boolean) => {
    setIsUpdatingConsent(true);
    try {
      const authToken = sessionStorage.getItem('auth_token');
      if (authToken) {
        const response = await fetch('/api/user-data/share-consent', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ shareConsent: checked }),
        });
        if (response.ok) {
          setShareConsent(checked);
          if (checked) {
            toast.success('Je antwoorden worden nu gedeeld met Martien en Lonneke');
          } else {
            toast.success('Je antwoorden zijn nu privé');
          }
        } else {
          toast.error('Kon instelling niet opslaan');
        }
      }
    } catch (error) {
      console.error('Failed to update share consent:', error);
      toast.error('Kon instelling niet opslaan');
    } finally {
      setIsUpdatingConsent(false);
    }
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

      {/* Share Consent Toggle */}
      <Card className="mb-8 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Deel je antwoorden met Martien en Lonneke
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                Wanneer je dit inschakelt, kunnen wij je antwoorden lezen. Dit helpt ons om ons beter voor te bereiden op jouw proces en de workshop af te stemmen op waar jij staat.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Let op:</strong> Je kunt dit op elk moment uit- of aanzetten. Wanneer je het uitschakelt, worden de gedeelde kopieën van je antwoorden verwijderd.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isLoadingConsent ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <Switch
                    id="share-consent"
                    checked={shareConsent}
                    onCheckedChange={handleShareConsentChange}
                    disabled={isUpdatingConsent}
                  />
                  <Label htmlFor="share-consent" className="text-sm font-medium">
                    {shareConsent ? 'Aan' : 'Uit'}
                  </Label>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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
              <a href="/workshop/1">Start met Workshop 1</a>
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
            <Button className="w-full" asChild>
              <a href="/aandachtspunten">Bekijk aandachtspunten</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Karakterstructuren Test */}
      <Card className="mb-12 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="text-primary" />
            Karakterstructuren Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Ontdek welke karakterstructuren bij jou het sterkst aanwezig zijn. De test bestaat uit twee delen: 25 scenariovragen en 100 stellingen.
          </p>
          <Button className="w-full" asChild>
            <a href="/test">Start de test</a>
          </Button>
        </CardContent>
      </Card>

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
              <p className="text-sm text-muted-foreground italic">Jaar 2 studiemateriaal</p>
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
