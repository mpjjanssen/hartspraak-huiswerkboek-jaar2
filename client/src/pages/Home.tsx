import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, BookOpen, GraduationCap, Heart, ExternalLink, Share2, Loader2, ClipboardList, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const googleDriveUrl = "https://drive.google.com/drive/folders/1gLqoQ4TzDxosB2i7w9L2iT6gmjVs2qR1?usp=sharing";
  const [shareConsent, setShareConsent] = useState(false);
  const [isLoadingConsent, setIsLoadingConsent] = useState(true);
  const [isUpdatingConsent, setIsUpdatingConsent] = useState(false);
  const [showNamenInfo, setShowNamenInfo] = useState(false);

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

  const namenData = [
    { oud: "Schizoïd", nieuw: "De Ontwijker", kern: "Trok zich terug wanneer de wereld te overweldigend werd" },
    { oud: "Oraal", nieuw: "De Zoeker", kern: "Ging zoeken naar de voeding, erkenning en verbinding die het miste" },
    { oud: "Symbiotisch", nieuw: "De Versmelter", kern: "Stemde zich af op de ander tot de eigen grens vervaagde" },
    { oud: "Psychopathisch", nieuw: "De Strateeg", kern: "Nam regie omdat controle veiligheid bood" },
    { oud: "Masochistisch", nieuw: "De Drager", kern: "Droeg het gewicht van anderen op de eigen schouders" },
    { oud: "Rigide", nieuw: "De Presteerder", kern: "Presteerde om geliefd te zijn en toonde een verzorgd, capabel zelf" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
          <Heart className="text-destructive fill-destructive" />
          Hartspraak jaar 2 — Van masker naar zelf
        </h1>
        <p className="text-lg font-medium text-muted-foreground mb-4">
          Ontdek je karakterstructuren
        </p>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Jouw persoonlijke reis naar verdieping, verbinding en innerlijke groei gaat hier verder.
        </p>
      </div>

      {/* Waarom nieuwe namen? */}
      <Card className="mb-8 border-amber-500/30 bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
            <Sparkles className="h-5 w-5" />
            Waarom nieuwe namen?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Karakterstructuren zijn patronen die we als kind ontwikkelen om om te gaan met wat er in ons vroege leven gebeurde. Wanneer een kind niet krijgt wat het nodig heeft — veiligheid, voeding, ruimte, erkenning — vindt het een manier om toch te overleven. Die manier wordt een vast patroon: een structuur die zich nestelt in ons lichaam, onze gevoelens en ons gedrag. We dragen deze patronen mee tot in ons volwassen leven, meestal zonder het te beseffen.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Deze zes structuren zijn al meer dan vijftig jaar bekend onder klinische namen als <em>schizoïd</em>, <em>oraal</em>, <em>symbiotisch</em>, <em>masochistisch</em>, <em>psychopathisch</em> en <em>rigide</em>. Die woorden komen uit de psychiatrie, waar ze bedoeld waren om ziektebeelden te beschrijven. Maar in ons werk gaat het niet om ziekte. Het gaat om kinderen die oplossingen vonden.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Elk kind dat opgroeit in een wereld die te vroeg te veel vraagt, ontwikkelt een briljante overlevingstactiek. Het ene kind trekt zich terug om zichzelf te beschermen. Het andere gaat zoeken naar de voeding die het mist. Weer een ander smelt samen met de ander om verbinding te bewaren, of leert de behoeften van anderen te dragen alsof het de zijne zijn. Dit zijn geen stoornissen — het zijn creatieve antwoorden op onmogelijke situaties.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Heling begint met herkenning. Door deze patronen te zien — met mildheid en zonder oordeel — ontstaat de mogelijkheid om ze los te laten. Niet door ze te bestrijden, maar door het kind dat ze ooit nodig had te erkennen en te troosten. Dat is de kern van ons werk in dit tweede jaar.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Daarom gebruiken we vanaf nu namen die dit proces beschrijven: wat het kind <em>deed</em> om te overleven, niet wat er klinisch 'mis' zou zijn. De kennis van Reich, Lowen en Pierrakos verandert niet. Alleen de woorden veranderen — zodat herkenning de plek kan innemen van schaamte.
          </p>

          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNamenInfo(!showNamenInfo)}
              className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 px-3"
            >
              {showNamenInfo ? "Verberg overzicht ▲" : "Bekijk alle nieuwe namen ▼"}
            </Button>
          </div>

          {showNamenInfo && (
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-amber-200 dark:border-amber-800">
                    <th className="text-left py-2 pr-4 font-semibold text-amber-800 dark:text-amber-400">Oude naam</th>
                    <th className="text-left py-2 pr-4 font-semibold text-amber-800 dark:text-amber-400">Nieuwe naam</th>
                    <th className="text-left py-2 font-semibold text-amber-800 dark:text-amber-400">Wat het kind deed</th>
                  </tr>
                </thead>
                <tbody>
                  {namenData.map((item, index) => (
                    <tr key={index} className="border-b border-amber-100 dark:border-amber-900/50 last:border-0">
                      <td className="py-2 pr-4 text-muted-foreground line-through decoration-muted-foreground/40">{item.oud}</td>
                      <td className="py-2 pr-4 font-medium text-foreground">{item.nieuw}</td>
                      <td className="py-2 text-muted-foreground">{item.kern}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

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
          <Card className="overflow-hidden border-primary/20 flex flex-col">
            <div className="bg-primary/5 p-6 flex justify-center">
              <BookOpen size={80} className="text-primary/40" />
            </div>
            <CardHeader>
              <CardTitle>De Maskermaker deel 1</CardTitle>
              <p className="text-sm text-muted-foreground italic">Wibe Veenbaas</p>
            </CardHeader>
            <CardContent className="mt-auto">
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
          <Card className="overflow-hidden border-primary/20 flex flex-col">
            <div className="bg-primary/5 p-6 flex justify-center">
              <BookOpen size={80} className="text-primary/40" />
            </div>
            <CardHeader>
              <CardTitle>Van Wond naar Wonder</CardTitle>
              <p className="text-sm text-muted-foreground italic">Martien Janssen</p>
            </CardHeader>
            <CardContent className="mt-auto">
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





