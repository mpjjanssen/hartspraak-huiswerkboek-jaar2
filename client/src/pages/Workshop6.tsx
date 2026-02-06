import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, Heart, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AnswerField } from "@/components/AnswerField";
import { AIHelper } from "@/components/AIHelper";

export default function Workshop6() {
  const [showOptional, setShowOptional] = useState(false);
  
  const workshopId = "workshop6";
  const workshopTitle = "Workshop 6: Integratie: Je nieuwe zelf leven";
  const workshopDate = "20.02.2027 - 21.02.2027";
  
  const questionIds = [
    "w6_q1_inzichten", "w6_q1_overtuigingen", "w6_q1_veranderd", "w6_q1_voelen",
    "w6_q2_kompas", "w6_q2_mensen", "w6_q2_praktijken", "w6_q2_hulpbronnen",
    "w6_q3_triggers", "w6_q3_signalen", "w6_q3_strategieen", "w6_q3_compassie",
    "w6_q4_observeren", "w6_q4_brief", "w6_q4_stemmetje",
    "w6_q5_jaar", "w6_q5_droom", "w6_q5_stappen", "w6_q5_belofte"
  ];

  const questions = [
    { id: "w6_q1_inzichten", title: "Vraag 1" },
    { id: "w6_q1_overtuigingen", title: "Vraag 2" },
    { id: "w6_q1_veranderd", title: "Vraag 3" },
    { id: "w6_q1_voelen", title: "Vraag 4" },
    { id: "w6_q2_kompas", title: "Vraag 5" },
    { id: "w6_q2_mensen", title: "Vraag 6" },
    { id: "w6_q2_praktijken", title: "Vraag 7" },
    { id: "w6_q2_hulpbronnen", title: "Vraag 8" },
    { id: "w6_q3_triggers", title: "Vraag 9" },
    { id: "w6_q3_signalen", title: "Vraag 10" },
    { id: "w6_q3_strategieen", title: "Vraag 11" },
    { id: "w6_q3_compassie", title: "Vraag 12" },
    { id: "w6_q4_observeren", title: "Vraag 13" },
    { id: "w6_q4_brief", title: "Vraag 14" },
    { id: "w6_q4_stemmetje", title: "Vraag 15" },
    { id: "w6_q5_jaar", title: "Vraag 16" },
    { id: "w6_q5_droom", title: "Vraag 17" },
    { id: "w6_q5_stappen", title: "Vraag 18" },
    { id: "w6_q5_belofte", title: "Vraag 19" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">{workshopTitle}</h1>
            <p className="text-muted-foreground">{workshopDate}</p>
          </div>

          <ProgressBar workshopId={workshopId} totalQuestions={15} />
          <DownloadButtons workshopId={workshopId} workshopTitle={workshopTitle} workshopDate={workshopDate}
            questions={questions} />

          <Card className="bg-gradient-to-br from-accent/30 to-background border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">We hebben naar onze lichamen geluisterd. Naar die kleine stemmetjes die fluisteren in de marge van ons bewustzijn. Sommigen hebben misschien voor het eerst die zachte, bijna onhoorbare stem gehoord die zegt: "Dit wil ik" of juist "Dit niet meer."</p>
              <p className="text-foreground/90 leading-relaxed">Er is moed voor nodig die stemmen te erkennen. Nog meer moed om ze ruimte te geven. En de grootste moed? Om te onderzoeken waar die stemmen vandaan komen en hoe je ze kunt integreren in je dagelijks leven.</p>
              <p className="text-foreground/90 leading-relaxed">In deze laatste, afsluitende workshop komen alle puzzelstukjes samen. Niet in een perfect plaatje, maar in levend begrip van wie je bent en kunt zijn. Je leert hoe je nieuwe inzichten en ervaringen kunt integreren. Hoe blijf je trouw aan jezelf in een wereld met andere verwachtingen? Hoe navigeer je tussen oude patronen en nieuwe mogelijkheden?</p>
              <p className="text-foreground/90 leading-relaxed">In onze lichamen dragen we verhalen. Niet alleen onze eigen, maar soms die van generaties voor ons. Ons lichaam onthoudt wat bewustzijn vergeet of verdringt. Het bewaart de vreugde van een eerste kus, maar ook de schrik van een ongewenste aanraking. Het kent het verschil tussen een hand die veiligheid biedt en één waarvan we terugdeinzen, zelfs als we niet begrijpen waarom.</p>
              <p className="text-foreground/90 leading-relaxed">Deze workshop nodigt je uit alle inzichten van de afgelopen maanden samen te brengen. Om te vieren wat je hebt ontdekt, te eren wat je hebt geheeld, en te oefenen met hoe je dit alles gaat leven in je dagelijks bestaan.</p>
              <p className="text-foreground/90 leading-relaxed">Want integratie is geen bestemming maar een vertrekpunt. Het is de kunst van leven met wat je hebt ontdekt. De moed om dagelijks opnieuw te kiezen voor wie je werkelijk bent, zelfs wanneer dat betekent tegen de stroom in te gaan.</p>
              <p className="text-foreground/90 leading-relaxed">Om je voor te bereiden nodigen we je uit thuis alvast alle inzichten samen te brengen. Dit huiswerk helpt de oogst van je reis te verzamelen en een brug te bouwen naar de toekomst.</p>
            </CardContent>
          </Card>

          {/* Wat Deze Workshop Jou Biedt */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-primary mb-3">Wat deze workshop jou biedt</h3>
            <p className="text-foreground/90 leading-relaxed">
              In deze afsluitende workshop gaan we op drie niveaus werken:
            </p>
            <div className="grid md:grid-cols-3 gap-6 my-6">
              <div className="p-6 bg-white rounded-lg border-2 border-rose-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-6 w-6 text-rose-600" />
                  <h4 className="font-bold text-lg text-rose-900">Begrijpen</h4>
                </div>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="leading-relaxed">
                    Je brengt <strong>alle inzichten samen</strong> uit de zes workshops en ontdekt hoe ze een coherent geheel vormen.
                  </p>
                  <p className="leading-relaxed italic text-rose-800">
                    "Alle puzzelstukjes komen samen - niet in een perfect plaatje, maar in levend begrip van wie je bent."
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-6 w-6 text-purple-600" />
                  <h4 className="font-bold text-lg text-purple-900">Voelen</h4>
                </div>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="leading-relaxed">
                    Door oefeningen <strong>vier je wat je hebt ontdekt</strong>, eer je wat je hebt geheeld, en voel je je nieuwe zelf.
                  </p>
                  <p className="leading-relaxed italic text-purple-800">
                    In je lichaam dragen we verhalen - niet alleen onze eigen, maar soms die van generaties voor ons.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg border-2 border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                  <h4 className="font-bold text-lg text-amber-900">Transformeren</h4>
                </div>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="leading-relaxed">
                    Je leert <strong>hoe je dit alles gaat leven</strong> in je dagelijks bestaan - de kunst van leven met wat je hebt ontdekt.
                  </p>
                  <p className="leading-relaxed italic text-amber-800">
                    Van "Hoe was ik?" naar "Wie wil ik zijn?" - dagelijks opnieuw kiezen voor je authentieke zelf.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Leeswerk</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Uit het boek "Wie we zijn":</h3>
                  <p className="text-foreground/90 leading-relaxed">Lees afsluitende hoofdstukken over integratie en het leven van je nieuwe zelf.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Uit het werkboek "Wie we zijn":</h3>
                  <p className="text-foreground/90 leading-relaxed">Werk door "Persoonlijk bouwplan" (blz. 119-126) en "Aan het einde van de reis" (blz. 129-130).</p>
                </div>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">📝 Belangrijkste opdracht uit het werkboek:</p>
                  <p className="text-sm text-foreground/80">
                    <strong>Jouw persoonlijke bouwplan (blz. 119):</strong> Je maakt een concreet actieplan voor je verdere ontwikkeling. Welke inzichten wil je vasthouden? Welke patronen wil je veranderen? Je formuleert concrete stappen die je kunt nemen in je dagelijks leven.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Reflectieopdrachten</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">1. De oogst van je reis</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Je belangrijkste inzichten:</p>
                      <p className="text-sm text-muted-foreground mb-3">Wat zijn de drie belangrijkste inzichten tijdens dit programma?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q1_inzichten" />
                      <AIHelper workshopId="workshop6" questionId="w6_q1_inzichten" questionTitle="Inzichten" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Oude vs. nieuwe overtuigingen:</p>
                      <p className="text-sm text-muted-foreground mb-3">Maak een tabel met oude en nieuwe overtuigingen.</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q1_overtuigingen" />
                      <AIHelper workshopId="workshop6" questionId="w6_q1_overtuigingen" questionTitle="Overtuigingen" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Wat is veranderd:</p>
                      <p className="text-sm text-muted-foreground mb-3">Beschrijf concrete veranderingen in je gedrag en keuzes.</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q1_veranderd" />
                      <AIHelper workshopId="workshop6" questionId="w6_q1_veranderd" questionTitle="Veranderd" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Wat voel je anders:</p>
                      <p className="text-sm text-muted-foreground mb-3">Hoe voel je anders in je lichaam, hart, hoofd?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q1_voelen" />
                      <AIHelper workshopId="workshop6" questionId="w6_q1_voelen" questionTitle="Voelen" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">2. Jouw innerlijke kompas en steunpilaren</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Jouw innerlijke kompas:</p>
                      <p className="text-sm text-muted-foreground mb-3">Wat zijn je kernwaarden?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q2_kompas" />
                      <AIHelper workshopId="workshop6" questionId="w6_q2_kompas" questionTitle="Kompas" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Jouw steunpilaren - mensen:</p>
                      <p className="text-sm text-muted-foreground mb-3">Wie zijn de mensen die je nieuwe zelf ondersteunen?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q2_mensen" />
                      <AIHelper workshopId="workshop6" questionId="w6_q2_mensen" questionTitle="Mensen" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Jouw steunpilaren - praktijken:</p>
                      <p className="text-sm text-muted-foreground mb-3">Welke praktijken helpen je verbonden te blijven met jezelf?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q2_praktijken" />
                      <AIHelper workshopId="workshop6" questionId="w6_q2_praktijken" questionTitle="Praktijken" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Jouw steunpilaren - hulpbronnen:</p>
                      <p className="text-sm text-muted-foreground mb-3">Welke hulpbronnen kun je gebruiken als je vastloopt?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q2_hulpbronnen" />
                      <AIHelper workshopId="workshop6" questionId="w6_q2_hulpbronnen" questionTitle="Hulpbronnen" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">3. Duurzame transformatie & terugvalpreventie</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Jouw triggers:</p>
                      <p className="text-sm text-muted-foreground mb-3">Wat zijn situaties die je triggeren om terug te vallen?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q3_triggers" />
                      <AIHelper workshopId="workshop6" questionId="w6_q3_triggers" questionTitle="Triggers" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Vroege waarschuwingssignalen:</p>
                      <p className="text-sm text-muted-foreground mb-3">Hoe merk je dat je terugvalt?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q3_signalen" />
                      <AIHelper workshopId="workshop6" questionId="w6_q3_signalen" questionTitle="Signalen" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Jouw strategieën:</p>
                      <p className="text-sm text-muted-foreground mb-3">Wat kun je doen als je merkt dat je terugvalt?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q3_strategieen" />
                      <AIHelper workshopId="workshop6" questionId="w6_q3_strategieen" questionTitle="Strategieen" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Zelfcompassie:</p>
                      <p className="text-sm text-muted-foreground mb-3">Hoe ga je met jezelf om als je terugvalt?</p>
                      <AnswerField workshopId="workshop6" questionId="w6_q3_compassie" />
                      <AIHelper workshopId="workshop6" questionId="w6_q3_compassie" questionTitle="Compassie" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">Verdiepende opdrachten (optioneel)</h2>
                <Button variant="outline" onClick={() => setShowOptional(!showOptional)}>
                  {showOptional ? "Verberg" : "Toon"}
                </Button>
              </div>
              <p className="text-sm italic text-muted-foreground mb-4">
                De volgende opdrachten zijn voor wie nog dieper in het thema wil duiken.
              </p>
              {showOptional && (
                <div className="space-y-8 mt-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">4. De taal van je lichaam</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold mb-2">Observeren zonder oordeel:</p>
                        <AnswerField workshopId="workshop6" questionId="w6_q4_observeren" />
                        <AIHelper workshopId="workshop6" questionId="w6_q4_observeren" questionTitle="Observeren" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">De brief van je lichaam:</p>
                        <AnswerField workshopId="workshop6" questionId="w6_q4_brief" />
                        <AIHelper workshopId="workshop6" questionId="w6_q4_brief" questionTitle="Brief" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Het kleine stemmetje:</p>
                        <AnswerField workshopId="workshop6" questionId="w6_q4_stemmetje" />
                        <AIHelper workshopId="workshop6" questionId="w6_q4_stemmetje" questionTitle="Stemmetje" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">5. Je visie voor de toekomst</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold mb-2">Over één jaar:</p>
                        <AnswerField workshopId="workshop6" questionId="w6_q5_jaar" />
                        <AIHelper workshopId="workshop6" questionId="w6_q5_jaar" questionTitle="Jaar" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Je grootste droom:</p>
                        <AnswerField workshopId="workshop6" questionId="w6_q5_droom" />
                        <AIHelper workshopId="workshop6" questionId="w6_q5_droom" questionTitle="Droom" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Eerste stappen:</p>
                        <AnswerField workshopId="workshop6" questionId="w6_q5_stappen" />
                        <AIHelper workshopId="workshop6" questionId="w6_q5_stappen" questionTitle="Stappen" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Je belofte aan jezelf:</p>
                        <AnswerField workshopId="workshop6" questionId="w6_q5_belofte" />
                        <AIHelper workshopId="workshop6" questionId="w6_q5_belofte" questionTitle="Belofte" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Link href="/workshop5">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Workshop 5
              </Button>
            </Link>
            <Link href="/">
              <Button className="gap-2">
                Terug naar home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
