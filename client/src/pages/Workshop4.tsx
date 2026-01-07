import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Heart, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AnswerField } from "@/components/AnswerField";
import { AIHelper } from "@/components/AIHelper";
import { ResetWorkshop } from "@/components/ResetWorkshop";

export default function Workshop4() {
  const [showOptional, setShowOptional] = useState(false);
  
  const workshopId = "workshop4";
  const workshopTitle = "Workshop 4: Emoties en Angst als Wegwijzers";
  const workshopDate = "31.10.2026 - 01.11.2026";
  
  const questionIds = [
    "w4_q1_welkom", "w4_q1_verboden", "w4_q1_boodschappen", "w4_q1_weerspiegeling",
    "w4_q2_angst", "w4_q2_verdriet", "w4_q2_boosheid", "w4_q2_reactie",
    "w4_q3_vermijden", "w4_q3_situaties", "w4_q3_prijs",
    "w4_q4_voelen", "w4_q4_erkennen", "w4_q4_draaglijk", "w4_q4_reflectie",
    "w4_q5_patroon", "w4_q5_dialoog", "w4_q5_afspraak"
  ];

  const questions = [
    { id: "w4_q1_welkom", title: "Vraag 1" },
    { id: "w4_q1_verboden", title: "Vraag 2" },
    { id: "w4_q1_boodschappen", title: "Vraag 3" },
    { id: "w4_q1_weerspiegeling", title: "Vraag 4" },
    { id: "w4_q2_angst", title: "Vraag 5" },
    { id: "w4_q2_verdriet", title: "Vraag 6" },
    { id: "w4_q2_boosheid", title: "Vraag 7" },
    { id: "w4_q2_reactie", title: "Vraag 8" },
    { id: "w4_q3_vermijden", title: "Vraag 9" },
    { id: "w4_q3_situaties", title: "Vraag 10" },
    { id: "w4_q3_prijs", title: "Vraag 11" },
    { id: "w4_q4_voelen", title: "Vraag 12" },
    { id: "w4_q4_erkennen", title: "Vraag 13" },
    { id: "w4_q4_draaglijk", title: "Vraag 14" },
    { id: "w4_q4_reflectie", title: "Vraag 15" },
    { id: "w4_q5_patroon", title: "Vraag 16" },
    { id: "w4_q5_dialoog", title: "Vraag 17" },
    { id: "w4_q5_afspraak", title: "Vraag 18" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">{workshopTitle}</h1>
            <p className="text-muted-foreground">{workshopDate}</p>
          </div>

          <ProgressBar workshopId={workshopId} totalQuestions={20} />
          <DownloadButtons workshopId={workshopId} workshopTitle={workshopTitle} workshopDate={workshopDate}
            questions={questions} />

          <Card className="bg-gradient-to-br from-accent/30 to-background border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">In het zachte ochtendlicht staan we in een kring. Ik vraag de groep de hand op het hart te leggen.</p>
              <p className="text-foreground/90 leading-relaxed">"Voel je hartslag, dit kloppende ritme dat je al je hele leven begeleidt. Dat versnelt bij angst, dat rustig wordt bij veiligheid. Je lichaam vertelt een verhaal, als je durft te luisteren."</p>
              <p className="text-foreground/90 leading-relaxed">Een traan rolt over een wang. Later die dag: "Ik realiseerde me dat ik jaren niet meer echt had gevoeld. Ik leefde vanuit mijn hoofd, analyseerde alles. Maar mijn lichaam... mijn lichaam heeft al die tijd geprobeerd me iets te vertellen."</p>
              <p className="text-foreground/90 leading-relaxed">In deze intieme tweedaagse verkennen we de verborgen wijsheid van emoties en angsten. Niet als vijanden die overwonnen moeten worden, maar als diepgewortelde beschermers die ons iets belangrijks willen vertellen.</p>
              <p className="text-foreground/90 leading-relaxed">We werken met adem als anker, beweging als taal, stilte als leraar. Want juist in de ruimte tussen woorden, in het subtiele gesprek tussen lichaam en geest, liggen vaak de diepste inzichten.</p>
              <p className="text-foreground/90 leading-relaxed">"Soms voelt angst als een oude vriend," deelde Robert. "Hij was er altijd, waarschuwde me voor gevaar. Maar nu zie ik dat wat ooit bescherming was, een gevangenis is geworden."</p>
              <p className="text-foreground/90 leading-relaxed">Deze workshop is anders. We duiken niet alleen in theorie. We creëren een veld waarin oude patronen zichtbaar mogen worden. Waarin trauma's die vastzitten in het lichaam, zachtheid mogen ontmoeten. Waarin we leren dat emoties geen golven zijn die ons overspoelen, maar stromingen die ons iets willen leren over onszelf.</p>
              <p className="text-foreground/90 leading-relaxed">Door ervaringsgerichte oefeningen, opstelling, ademwerk en voorzichtige exploratie van het lichaamsbewustzijn, ontdek je een nieuwe manier om met je emotionele landschap om te gaan. Je begint contact te maken met het diepe, ongeuite protest van het kind in je. Je leert het verschil voelen tussen een oude trigger en een actueel gevaar. Tussen een emotie die verwerking vraagt en een die beschermt.</p>
              <p className="text-foreground/90 leading-relaxed">Dit is een uitnodiging om je binnenwereld te betreden met zachtheid en moed. Om te ontdekken dat juist in het voelen van wat we het liefst vermijden, vaak de grootste vrijheid ligt.</p>
              <p className="text-foreground/90 leading-relaxed">Om je voor te bereiden nodigen we je uit thuis alvast bewust te worden van je emoties en de wijsheid die ze dragen. Dit huiswerk helpt contact te maken met gevoelens die je misschien al lang vermijdt.</p>
            </CardContent>
          </Card>

          {/* Wat Deze Workshop Jou Biedt */}
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-primary mb-3">Wat Deze Workshop Jou Biedt</h3>
            <p className="text-foreground/90 leading-relaxed">
              In deze tweedaagse workshop gaan we op drie niveaus werken:
            </p>
            <div className="grid md:grid-cols-3 gap-6 my-6">
              <div className="p-6 bg-white rounded-lg border-2 border-rose-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-6 w-6 text-rose-600" />
                  <h4 className="font-bold text-lg text-rose-900">Begrijpen</h4>
                </div>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="leading-relaxed">
                    Je ontdekt <strong>hoe emoties en angst</strong> als wegwijzers werken en wat ze je willen vertellen over onvervulde behoeften.
                  </p>
                  <p className="leading-relaxed italic text-rose-800">
                    "Angst was er altijd, waarschuwde me voor gevaar. Maar wat ooit bescherming was, is een gevangenis geworden."
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
                    Door oefeningen <strong>leer je emoties voelen</strong> zonder erdoor overspoeld te worden - als stromingen die je iets leren.
                  </p>
                  <p className="leading-relaxed italic text-purple-800">
                    Het verschil voelen tussen een oude trigger en een actueel gevaar - dat is de sleutel.
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
                    Je leert <strong>nieuwe manieren</strong> om met je emotionele landschap om te gaan, gebaseerd op zachtheid en moed.
                  </p>
                  <p className="leading-relaxed italic text-amber-800">
                    Van "Ik moet sterk zijn en emoties vermijden" naar "Ik mag voelen wat er is."
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
                  <p className="text-foreground/90 leading-relaxed">Lees "Plezier zoeken en onlustvermijding" (blz. 75-106). Dit hoofdstuk gaat over onze natuurlijke neiging prettige gevoelens te zoeken en onplezierige te vermijden.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Uit het werkboek "Wie we zijn":</h3>
                  <p className="text-foreground/90 leading-relaxed">Werk door "Wat voel je?" (blz. 97-118). Dit hoofdstuk nodigt je uit onprettige gevoelens niet langer te onderdrukken maar bewust te voelen.</p>
                </div>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">📝 Belangrijkste opdracht uit het werkboek:</p>
                  <p className="text-sm text-foreground/80">
                    <strong>Genot zoeken en ongenoegen vermijden (blz. 99):</strong> Je onderzoekt je vermijdingsstrategieën. Welke situaties, taken of gevoelens probeer je te ontlopen? Wat doe je om te voorkomen dat je angsten werkelijkheid worden? Deze reflectie onthult je automatische beschermingsmechanismen.
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
                  <h3 className="text-xl font-bold mb-4">1. Jouw emotionele landkaart</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Welkom emoties:</p>
                      <p className="text-sm text-muted-foreground mb-3">Welke emoties mag je voelen? Welke zijn "veilig"?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q1_welkom" />
                      <AIHelper workshopId="workshop4" questionId="w4_q1_welkom" questionTitle="Welkom" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Verboden emoties:</p>
                      <p className="text-sm text-muted-foreground mb-3">Welke emoties zijn "verboden" of ongemakkelijk?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q1_verboden" />
                      <AIHelper workshopId="workshop4" questionId="w4_q1_verboden" questionTitle="Verboden" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Vroege boodschappen:</p>
                      <p className="text-sm text-muted-foreground mb-3">Welke boodschappen over emoties kreeg je als kind?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q1_boodschappen" />
                      <AIHelper workshopId="workshop4" questionId="w4_q1_boodschappen" questionTitle="Boodschappen" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Hoe weerspiegelt dit zich nu:</p>
                      <p className="text-sm text-muted-foreground mb-3">Hoe weerspiegelen deze boodschappen zich in je huidige gedrag?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q1_weerspiegeling" />
                      <AIHelper workshopId="workshop4" questionId="w4_q1_weerspiegeling" questionTitle="Weerspiegeling" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">2. De taal van je lichaam</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Angst in je lichaam:</p>
                      <p className="text-sm text-muted-foreground mb-3">Waar voel je angst? Beschrijf de sensaties.</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q2_angst" />
                      <AIHelper workshopId="workshop4" questionId="w4_q2_angst" questionTitle="Angst" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Verdriet in je lichaam:</p>
                      <p className="text-sm text-muted-foreground mb-3">Waar voel je verdriet? Hoe voelt het?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q2_verdriet" />
                      <AIHelper workshopId="workshop4" questionId="w4_q2_verdriet" questionTitle="Verdriet" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Boosheid in je lichaam:</p>
                      <p className="text-sm text-muted-foreground mb-3">Waar voel je boosheid? Hoe voelt het?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q2_boosheid" />
                      <AIHelper workshopId="workshop4" questionId="w4_q2_boosheid" questionTitle="Boosheid" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Je reactie op lichamelijke signalen:</p>
                      <p className="text-sm text-muted-foreground mb-3">Hoe reageer je als je deze signalen opmerkt?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q2_reactie" />
                      <AIHelper workshopId="workshop4" questionId="w4_q2_reactie" questionTitle="Reactie" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">3. Jouw vermijdingsstrategieën</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Hoe vermijd je:</p>
                      <p className="text-sm text-muted-foreground mb-3">Wat doe je om ongemakkelijke gevoelens uit de weg te gaan?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q3_vermijden" />
                      <AIHelper workshopId="workshop4" questionId="w4_q3_vermijden" questionTitle="Vermijden" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Drie situaties:</p>
                      <p className="text-sm text-muted-foreground mb-3">Noteer drie recente situaties die je uitstelt of vermijdt.</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q3_situaties" />
                      <AIHelper workshopId="workshop4" questionId="w4_q3_situaties" questionTitle="Situaties" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">De prijs:</p>
                      <p className="text-sm text-muted-foreground mb-3">Wat is de korte-termijn winst en lange-termijn prijs?</p>
                      <AnswerField workshopId="workshop4" questionId="w4_q3_prijs" />
                      <AIHelper workshopId="workshop4" questionId="w4_q3_prijs" questionTitle="Prijs" />
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
                    <h3 className="text-xl font-bold mb-4">4. Bewust voelen van onprettige gevoelens</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold mb-2">Voel het in je lichaam:</p>
                        <AnswerField workshopId="workshop4" questionId="w4_q4_voelen" />
                        <AIHelper workshopId="workshop4" questionId="w4_q4_voelen" questionTitle="Voelen" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Erken het:</p>
                        <AnswerField workshopId="workshop4" questionId="w4_q4_erkennen" />
                        <AIHelper workshopId="workshop4" questionId="w4_q4_erkennen" questionTitle="Erkennen" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Is het draaglijk:</p>
                        <AnswerField workshopId="workshop4" questionId="w4_q4_draaglijk" />
                        <AIHelper workshopId="workshop4" questionId="w4_q4_draaglijk" questionTitle="Draaglijk" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Reflectie:</p>
                        <AnswerField workshopId="workshop4" questionId="w4_q4_reflectie" />
                        <AIHelper workshopId="workshop4" questionId="w4_q4_reflectie" questionTitle="Reflectie" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">5. Een dialoog met je angst</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold mb-2">Kies een angstpatroon:</p>
                        <AnswerField workshopId="workshop4" questionId="w4_q5_patroon" />
                        <AIHelper workshopId="workshop4" questionId="w4_q5_patroon" questionTitle="Patroon" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Schrijf een dialoog:</p>
                        <AnswerField workshopId="workshop4" questionId="w4_q5_dialoog" />
                        <AIHelper workshopId="workshop4" questionId="w4_q5_dialoog" questionTitle="Dialoog" />
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Een nieuwe afspraak:</p>
                        <AnswerField workshopId="workshop4" questionId="w4_q5_afspraak" />
                        <AIHelper workshopId="workshop4" questionId="w4_q5_afspraak" questionTitle="Afspraak" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Link href="/workshop3">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Workshop 3
              </Button>
            </Link>
            <Link href="/workshop5">
              <Button className="gap-2">
                Workshop 5
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
