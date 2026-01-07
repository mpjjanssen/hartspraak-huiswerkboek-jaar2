import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, BookOpen, Heart, Lightbulb } from "lucide-react";
import { useState } from "react";
import { AnswerField } from "@/components/AnswerField";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AIHelper } from "@/components/AIHelper";

export default function Workshop2() {
  const [showOptional, setShowOptional] = useState(false);

  // Definieer alle vragen voor deze workshop
  const workshop2Questions = [
    { id: "q1-beschikbaarheid", title: "Emotionele beschikbaarheid van je verzorgers" },
    { id: "q1-reacties", title: "Reacties op je emoties" },
    { id: "q1-herinnering", title: "Een sleutelherinnering" },
    { id: "q1-boodschap", title: "De boodschap die je meekrijgt" },
    { id: "q2-angst", title: "Angst voor afwijzing" },
    { id: "q2-nabijheid", title: "Nabijheid en afstand" },
    { id: "q2-vertrouwen", title: "Vertrouwen" },
    { id: "q3-veiligheid", title: "Jouw veilige plek" },
    { id: "q4-patronen", title: "De hechtingsdans in je relaties" },
    { id: "q5-brief", title: "Brief aan je gehechte zelf" }
  ];


  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/">
                <span className="hover:text-primary cursor-pointer">Home</span>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Workshop 2</span>
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                9-10 mei 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Ontdek je Hechtingsfundament
              </h1>
              <p className="text-xl text-muted-foreground">
                Hoe vroege hechtingservaringen je huidige relaties vormgeven
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar workshopId="workshop2" totalQuestions={10} />

          {/* Download and Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-end">
            <DownloadButtons 
              workshopId="workshop2"
              workshopTitle="Workshop 2: Ontdek je Hechtingsfundament"
              workshopDate="9-10 mei 2026"
              questions={workshop2Questions}
            />
          </div>

                    {/* Introduction */}
          <Card className="bg-gradient-to-br from-accent/30 to-background border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Sluit je ogen. Reis terug naar een moment waarop je volledig veilig was bij iemand. Of juist naar dat moment waarop die veiligheid wegviel. De stilte die volgt is zwanger van verhalen - verhalen over die eerste keer dat een ouder er niet was toen het er echt toe deed, over die leraar die wel zag wat er speelde, over die partner die te dichtbij kwam of nooit dichtbij genoeg.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                In deze tweedaagse onderzoeken we deze verhalen. Niet om in het verleden te blijven hangen, maar om te begrijpen hoe vroege hechtingservaringen als een onzichtbaar script ons huidige relaties blijven regisseren. Want of we nu worstelen met verlatingangst, bindingsangst of die uitputtende dans tussen afstand en nabijheid - de sleutel ligt vaak verborgen in onze allereerste ervaringen met gehecht-zijn.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Dit is geen theoretische exercitie. Dit is een uitnodiging om werkelijk te voelen hoe je je verhoudt tot anderen. Om patronen te herkennen die je misschien ziet als "karakterfout" maar die eigenlijk begrijpelijke reacties zijn op vroege ervaringen. Om te ontdekken dat je manier van relateren niet per se "fout" is - het was ooit de beste strategie die je had.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                We werken met beweging, adem, systemisch werk, opstelling, gesprek en stilte - maar altijd met respect voor ieders tempo en grenzen. Want juist bij hechting is het cruciaal dat je je veilig voelt om te onderzoeken wat er leeft.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                "Ik begreep eindelijk dat mijn neiging om mensen op afstand te houden niet betekent dat er iets mis is met mij," zei een deelnemer. "Het was ooit de slimste manier om mezelf te beschermen. Maar nu mag er iets nieuws ontstaan."
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Deze workshop is een reis naar het hart van je relaties - met anderen én met jezelf. Een kans om oude patronen te transformeren en nieuwe mogelijkheden te ontdekken. Want wanneer je begrijpt hoe je geworden bent wie je bent in relatie, kun je bewuster kiezen wie je wilt zijn.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Om je voor te bereiden nodigen we je uit thuis alvast je hechtingsgeschiedenis te onderzoeken. Dit huiswerk helpt je bewust te worden van patronen die misschien je hele leven al meelopen maar nog nooit expliciet werden benoemd.
              </p>
            </CardContent>
          </Card>

          {/* Wat Deze Workshop Jou Biedt */}
          <div className="space-y-4">
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
                    Je ontdekt <strong>hoe vroege hechtingservaringen</strong> een onzichtbaar script vormen dat je huidige relaties stuurt.
                  </p>
                  <p className="leading-relaxed italic text-rose-800">
                    "Mijn neiging om mensen op afstand te houden was ooit de slimste manier om mezelf te beschermen."
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
                    Door oefeningen <strong>ervaar je lichamelijk</strong> hoe je je verhoudt tot nabijheid en afstand in relaties.
                  </p>
                  <p className="leading-relaxed italic text-purple-800">
                    Die uitputtende dans tussen te dichtbij en nooit dichtbij genoeg - herken je die?
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
                    Je leert <strong>nieuwe patronen</strong> ontwikkelen in hoe je relateert, gebaseerd op bewustzijn in plaats van automatisme.
                  </p>
                  <p className="leading-relaxed italic text-amber-800">
                    Van "Ik moet onafhankelijk zijn" naar "Ik mag verbinding zoeken en toch mezelf blijven."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Leeswerk */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">Leeswerk</h2>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Uit het boek "Wie we zijn"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-foreground/90">
                    • Lees "Hechting: De basis van het leven" (<strong>blz. 43-53</strong>). Dit hoofdstuk legt uit hoe onze allereerste ervaringen 
                    met verzorgers een blauwdruk vormen voor alle latere relaties.
                  </p>
                  <p className="text-foreground/90">
                    • Bestudeer "De mentale kaart en bindingstypes voor kinderen" (<strong>blz. 46-48</strong>). Hier lees je hoe kinderen een innerlijke 
                    kaart ontwikkelen van hoe relaties werken.
                  </p>
                  <p className="text-foreground/90">
                    • Lees aandachtig "Onzekere bindingsstijlen" (<strong>blz. 48-51</strong>). Dit beschrijft hoe onveilige hechting zich uit.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  💡 Markeer niet alleen herkenning, maar ook weerstand. Wees mild voor jezelf bij pijnlijke herkenning - dit is het begin van begrip, 
                  niet van veroordeling.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Uit het werkboek "Wie we zijn"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-foreground/90">
                    • Werk de zelfreflecties door op <strong>blz. 15-17</strong> ("Waar voel je dat je thuishoort?")
                  </p>
                  <p className="text-foreground/90">
                    • Maak de oefeningen op <strong>blz. 32-37</strong> over hechting
                  </p>
                  <p className="text-foreground/90">
                    • Doe minimaal één zelfhelende oefening van <strong>blz. 41-42</strong>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  💡 Deze oefeningen brengen je in contact met je eigen hechtingspatronen en helpen een veiliger gevoel in jezelf te ontwikkelen.
                </p>
              
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">📝 Belangrijkste opdracht uit het werkboek:</p>
                  <p className="text-sm text-foreground/80">
                    <strong>Is jouw hechtingsstijl veilig of onzeker? (blz. 39):</strong> Deze opdracht helpt je je eigen hechtingsstijl herkennen. Je onderzoekt patronen in je huidige relaties die voortkomen uit vroege hechtingservaringen. Voel je je veilig in nabijheid, of word je angstig bij te veel intimiteit of afstand?
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Reflectieopdrachten */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-foreground">Reflectieopdrachten</h2>

            {/* Opdracht 1 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl">1. Jouw Hechtingsverhaal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  Reis terug naar je vroege kindertijd. Sluit je ogen en laat beelden opkomen van momenten met je ouders of verzorgers.
                </p>
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Emotionele beschikbaarheid</h4>
                    <p className="text-sm text-foreground/80">
                      Waren je verzorgers er voor je als je hen nodig had? Konden ze je troosten bij verdriet? Vierden ze je vreugde? 
                      Of waren ze vaak afwezig - fysiek of emotioneel? Beschrijf hoe dit voelde voor jou als kind.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Reacties op emoties</h4>
                    <p className="text-sm text-foreground/80">
                      Hoe reageerden ze op je angst, verdriet, boosheid? Mocht je voelen of moest je wegstoppen? 
                      Werd je getroost of afgewezen? Geef concrete voorbeelden.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Een sleutelherinnering</h4>
                    <p className="text-sm text-foreground/80">
                      Beschrijf één specifieke herinnering waarin je je ofwel volkomen veilig en gezien voelde, ofwel juist niet. 
                      Wat gebeurde er? Wie was erbij? En vooral: hoe voelde dat in je lichaam? Schrijf gedetailleerd.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">De boodschap</h4>
                    <p className="text-sm text-foreground/80">
                      Welke conclusie over relaties heb je getrokken? (Bijvoorbeeld: "Ik kan op anderen rekenen", "Ik moet het alleen doen", 
                      "Liefde is onvoorspelbaar", "Ik ben te veel")
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-6">
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Emotionele beschikbaarheid</h5>
                    <AnswerField workshopId="workshop2" questionId="q1-emotioneel" rows={6} />
            <AIHelper questionTitle="Vraag" questionId="q1-emotioneel" workshopId="workshop2" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Reacties op emoties</h5>
                    <AnswerField workshopId="workshop2" questionId="q1-reacties" rows={6} />
            <AIHelper questionTitle="Reacties op je emoties" questionId="q1-reacties" workshopId="workshop2" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Een sleutelherinnering</h5>
                    <AnswerField workshopId="workshop2" questionId="q1-herinnering" rows={8} />
            <AIHelper questionTitle="Een sleutelherinnering" questionId="q1-herinnering" workshopId="workshop2" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">De boodschap</h5>
                    <AnswerField workshopId="workshop2" questionId="q1-boodschap" rows={4} />
            <AIHelper questionTitle="De boodschap die je meekrijgt" questionId="q1-boodschap" workshopId="workshop2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opdracht 2 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl">2. Patronen in het Heden</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  Hoe werken je vroege hechtingservaringen nog steeds door in je huidige relaties?
                </p>
                <div className="bg-accent/20 p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold text-foreground">Herkenning in relaties</h4>
                  <p className="text-sm text-foreground/80">Reflecteer op je huidige relaties. Welke patronen zie je? Bijvoorbeeld:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 ml-4">
                    <li>Moeite met grenzen stellen uit angst iemand te verliezen?</li>
                    <li>Snel terugtrekken als het emotioneel dichtbij komt?</li>
                    <li>Je vaak verlaten voelen?</li>
                    <li>Moeite met vertrouwen dat mensen er écht voor je zijn?</li>
                    <li>Constant bezig met de vraag of de ander je wel mag?</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Drie concrete voorbeelden</h4>
                  <p className="text-sm text-foreground/80">
                    Beschrijf minstens drie recente situaties waarin je een hechtingspatroon herkent. Wat gebeurde er? Hoe reageerde je? 
                    Welk gevoel zat eronder? Kun je het patroon terugvoeren naar vroege ervaringen?
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Jouw hechtingsstijl</h4>
                  <p className="text-sm text-foreground/80">
                    Op basis van wat je hebt gelezen en gevoeld, welke hechtingsstijl herken je? Veilig, vermijdend, ambivalent, gedesorganiseerd? 
                    Beschrijf waarom. Wees eerlijk - er is geen "goede" hechtingsstijl, alleen bewustzijn.
                  </p>
                </div>
                <div className="mt-6 space-y-6">
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Herkenning in relaties (patronen)</h5>
                    <AnswerField workshopId="workshop2" questionId="q2-patronen" rows={6} />
            <AIHelper questionTitle="Vraag" questionId="q2-patronen" workshopId="workshop2" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Drie concrete voorbeelden</h5>
                    <AnswerField workshopId="workshop2" questionId="q2-voorbeelden" rows={8} />
            <AIHelper questionTitle="Vraag" questionId="q2-voorbeelden" workshopId="workshop2" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Jouw hechtingsstijl</h5>
                    <AnswerField workshopId="workshop2" questionId="q2-hechtingsstijl" rows={6} />
            <AIHelper questionTitle="Vraag" questionId="q2-hechtingsstijl" workshopId="workshop2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opdracht 3 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl">3. Jouw Veilige Plek</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  Deze oefening helpt een gevoel van veiligheid en geborgenheid in jezelf te ontwikkelen.
                </p>
                <div className="bg-accent/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">De oefening</h4>
                  <p className="text-sm text-foreground/80">
                    Doe de oefening "Jouw plaats van geborgenheid" uit het werkboek (<strong>blz. 15-16</strong>). Zoek een rustig moment. 
                    Je kunt de bijbehorende audiotrance gebruiken. Laat jezelf volledig in de oefening zakken.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-foreground mb-2">Jouw ervaring - noteer uitgebreid:</h4>
                  <p className="text-sm text-foreground/80">• Welke plek kwam op? Echt of gefantaseerd?</p>
                  <p className="text-sm text-foreground/80">• Welke zintuiglijke ervaringen? Wat zag, hoorde, rook, voelde je?</p>
                  <p className="text-sm text-foreground/80">• Hoe voelde je je tijdens en na de oefening?</p>
                  <p className="text-sm text-foreground/80">• Was het makkelijk of moeilijk deze plek te vinden? Wat zegt dat over je hechtingsgeschiedenis?</p>
                </div>
                <div className="mt-6">
                  <h5 className="font-semibold text-foreground mb-3">Jouw ervaring met de oefening</h5>
                  <AnswerField workshopId="workshop2" questionId="q3-veilige-plek" rows={8} />
            <AIHelper questionTitle="Vraag" questionId="q3-veilige-plek" workshopId="workshop2" />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Verdiepende opdrachten */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-foreground">Verdiepende opdrachten (optioneel)</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowOptional(!showOptional)}
              >
                {showOptional ? "Verberg" : "Toon"} optionele opdrachten
              </Button>
            </div>
            <p className="text-muted-foreground italic">
              De volgende opdrachten zijn voor wie nog dieper in het thema wil duiken. Voel je volledig vrij om te kiezen wat je nu aanspreekt.
            </p>

            {showOptional && (
              <div className="space-y-6">
                <Card className="border-dashed border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">4. De Hechtingsdans in je Relaties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/90">
                      Deze opdracht helpt de dynamiek in je belangrijkste relaties te begrijpen.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Kies een relatie</h4>
                        <p className="text-sm text-foreground/80">
                          Denk aan je meest belangrijke relatie nu. Beschrijf de "dans" die jullie doen. Wie komt dichterbij, wie gaat achteruit? 
                          Wie zoekt contact, wie trekt zich terug?
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">De trigger</h4>
                        <p className="text-sm text-foreground/80">
                          Wat triggert jou? Wanneer voel je je onveilig, angstig, afgewezen? Beschrijf een concrete situatie. 
                          Kun je het terugvoeren naar vroege ervaringen?
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">De reactie van de ander</h4>
                        <p className="text-sm text-foreground/80">
                          Hoe reageert de ander op jouw hechtingspatroon? Bevestigt hun gedrag jouw angsten, of bieden ze een nieuwe, veiligere ervaring?
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Een nieuwe dans</h4>
                        <p className="text-sm text-foreground/80">
                          Als je een gezondere dans zou kunnen creëren, hoe zou die eruitzien? Wat zou jij anders doen? Wat heb je nodig van de ander?
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">De hechtingsdans (beschrijving)</h5>
                        <AnswerField workshopId="workshop2" questionId="q4-dans" rows={6} />
            <AIHelper questionTitle="Vraag" questionId="q4-dans" workshopId="workshop2" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">De trigger (concrete situatie)</h5>
                        <AnswerField workshopId="workshop2" questionId="q4-trigger" rows={5} />
            <AIHelper questionTitle="Vraag" questionId="q4-trigger" workshopId="workshop2" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">De reactie van de ander</h5>
                        <AnswerField workshopId="workshop2" questionId="q4-reactie" rows={5} />
            <AIHelper questionTitle="Vraag" questionId="q4-reactie" workshopId="workshop2" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">Een nieuwe dans</h5>
                        <AnswerField workshopId="workshop2" questionId="q4-nieuwe-dans" rows={5} />
            <AIHelper questionTitle="Vraag" questionId="q4-nieuwe-dans" workshopId="workshop2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">5. Brief aan je Gehechte Zelf</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/90">
                      Deze oefening helpt compassie te ontwikkelen voor het deel dat zo hard heeft gevochten voor verbinding en veiligheid.
                    </p>
                    <p className="text-foreground/90">
                      Schrijf een brief aan jezelf als kind, het kind dat leerde hoe relaties werken in een omgeving die misschien niet altijd veilig 
                      of voorspelbaar was.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm text-foreground/80">
                      <p>• Begin met: "Lieve [jouw naam], ik zie hoe hard je je best deed om veilig te zijn, om geliefd te worden..."</p>
                      <p>• Benoem de overlevingsstrategie die je ontwikkelde. Wat je ook deed - het was de beste manier die je toen had. Erken dat.</p>
                      <p>• Sluit af met een belofte. Wat beloof je dit deel van jezelf nu? Hoe ga je anders zorgen? Hoe ga je nieuwe, veiligere relaties creëren?</p>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      💡 Lees de brief hardop voor aan jezelf, met je hand op je hart. Laat de woorden landen.
                    </p>
                    <div className="mt-6">
                      <h5 className="font-semibold text-foreground mb-3">Je brief aan je gehechte zelf</h5>
                      <AnswerField workshopId="workshop2" questionId="q5-brief" placeholder="Lieve [jouw naam], ik zie hoe hard je je best deed om veilig te zijn, om geliefd te worden..." rows={12} />
            <AIHelper questionTitle="Brief aan je gehechte zelf" questionId="q5-brief" workshopId="workshop2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </section>

          {/* Navigation */}
          <div className="flex justify-between pt-8 border-t">
            <Link href="/workshop/1">
              <Button variant="outline">← Vorige workshop</Button>
            </Link>
            <Link href="/">
              <Button>Terug naar overzicht</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
