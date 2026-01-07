import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, BookOpen, Heart, Lightbulb } from "lucide-react";
import { useState } from "react";
import { AnswerField } from "@/components/AnswerField";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";

import { AIHelper } from "@/components/AIHelper";

export default function Workshop1() {
  const [showOptional, setShowOptional] = useState(false);

  // Definieer alle vragen voor deze workshop
  const workshop1Questions = [
    { 
      id: "q1-moment1", 
      title: "Moment 1: Een moment waarin je straalde",
      fullText: "Sluit je ogen. Laat beelden uit je kindertijd en jeugd opkomen zonder ze te sturen. Kies drie momenten die je iets vertellen over wie je was en hoe je werd gezien: Een moment waarin je straalde. Beschrijf voor elk moment: Wat zie je? Waar ben je, wie is erbij, wat gebeurt er? Geef details - details dragen betekenis. Welk gevoel roept dit beeld op nu je het weer beleeft? Laat het gevoel er zijn zonder het te beoordelen. Welke basisbehoefte werd vervuld of juist gefrustreerd? (verbinding, veiligheid, eigenwaarde, levenslust) Welke conclusie trok je toen over jezelf of over het leven? Schrijf de exacte boodschap op die je toen internaliseerde."
    },
    { 
      id: "q1-moment2", 
      title: "Moment 2: Een moment waarin je je klein voelde",
      fullText: "Sluit je ogen. Laat beelden uit je kindertijd en jeugd opkomen zonder ze te sturen. Kies drie momenten die je iets vertellen over wie je was en hoe je werd gezien: Een moment waarin je je klein voelde. Beschrijf voor elk moment: Wat zie je? Waar ben je, wie is erbij, wat gebeurt er? Geef details - details dragen betekenis. Welk gevoel roept dit beeld op nu je het weer beleeft? Laat het gevoel er zijn zonder het te beoordelen. Welke basisbehoefte werd vervuld of juist gefrustreerd? (verbinding, veiligheid, eigenwaarde, levenslust) Welke conclusie trok je toen over jezelf of over het leven? Schrijf de exacte boodschap op die je toen internaliseerde."
    },
    { 
      id: "q1-moment3", 
      title: "Moment 3: Een moment dat je raadselachtig vindt",
      fullText: "Sluit je ogen. Laat beelden uit je kindertijd en jeugd opkomen zonder ze te sturen. Kies drie momenten die je iets vertellen over wie je was en hoe je werd gezien: Een moment dat je raadselachtig vindt. Beschrijf voor elk moment: Wat zie je? Waar ben je, wie is erbij, wat gebeurt er? Geef details - details dragen betekenis. Welk gevoel roept dit beeld op nu je het weer beleeft? Laat het gevoel er zijn zonder het te beoordelen. Welke basisbehoefte werd vervuld of juist gefrustreerd? (verbinding, veiligheid, eigenwaarde, levenslust) Welke conclusie trok je toen over jezelf of over het leven? Schrijf de exacte boodschap op die je toen internaliseerde."
    },
    { 
      id: "q2-verbinding", 
      title: "De kamer van verbinding",
      fullText: "Visualiseer je innerlijke wereld als een huis met vier kamers, één voor elke basisbehoefte. Loop door dit huis. Wat ontdek je? 🤝 De kamer van verbinding: Hoe voelt deze kamer? Warm en bewoond, of kil en verlaten? Wie laat je binnen? Wanneer voel je je werkelijk verbonden en wanneer voel je je eenzaam terwijl er mensen om je heen zijn?"
    },
    { 
      id: "q2-veiligheid", 
      title: "De kamer van veiligheid",
      fullText: "Visualiseer je innerlijke wereld als een huis met vier kamers, één voor elke basisbehoefte. Loop door dit huis. Wat ontdek je? 🛡️ De kamer van veiligheid: Hoe is deze kamer ingericht? Dikke muren of open ramen? Waar voel je je veilig en in controle, waar machteloos en angstig? Beschrijf een situatie waarin je volledig losliet."
    },
    { 
      id: "q2-eigenwaarde", 
      title: "De kamer van eigenwaarde",
      fullText: "Visualiseer je innerlijke wereld als een huis met vier kamers, één voor elke basisbehoefte. Loop door dit huis. Wat ontdek je? ⭐ De kamer van eigenwaarde: Wat zie je als je in de spiegel kijkt? Iemand waardevol of voornamelijk tekortkomingen? Welke stem spreekt hier - kritisch of liefdevol? Beschrijf een moment van echte trots en een moment van diepe twijfel."
    },
    { 
      id: "q2-levenslust", 
      title: "De kamer van levenslust",
      fullText: "Visualiseer je innerlijke wereld als een huis met vier kamers, één voor elke basisbehoefte. Loop door dit huis. Wat ontdek je? ✨ De kamer van levenslust: Is deze kamer gevuld met licht en gelach, of stil en serieus? Wat doe je puur voor je plezier, zonder dat het iets moet opleveren? Wanneer heb je voor het laatst ongeremd gelachen?"
    },
    { 
      id: "q3-overtuigingen", 
      title: "De Echo van het Verleden",
      fullText: "Onze overtuigingen zijn vaak onbewuste echo's uit het verleden. Maak de volgende zinnen af met je eerste gedachte: • Liefde betekent voor mij... • Als ik een fout maak, dan... • Om erbij te horen, moet ik... • Ik ben pas goed genoeg als... • Als ik mijn ware gevoelens toon, dan... • De wereld is een plek waar... 💡 Bekijk je antwoorden. Welke overtuigingen geven je kracht en welke houden je klein? Kies één beperkende overtuiging en onderzoek de oorsprong. Het herkennen van de bron is de eerste stap naar vrijheid."
    },
    { 
      id: "q4-vermijding", 
      title: "Jouw vermijdingsstrategieën",
      fullText: "Deze opdracht onderzoekt de vierde basisbehoefte: plezier maximaliseren en pijn minimaliseren. Jouw vermijdingsstrategieën: Wat doe je om ongemakkelijke gevoelens te ontlopen? Wees radicaal eerlijk. Noteer je top 3."
    },
    { 
      id: "q4-prijs", 
      title: "De prijs van vermijding",
      fullText: "Deze opdracht onderzoekt de vierde basisbehoefte: plezier maximaliseren en pijn minimaliseren. De prijs van vermijding: Kies één strategie. Wat is de korte-termijn winst? En wat is de lange-termijn prijs? Schrijf een eerlijke kosten-batenanalyse."
    },
    { 
      id: "q4-levenslust", 
      title: "De weg naar levenslust",
      fullText: "Deze opdracht onderzoekt de vierde basisbehoefte: plezier maximaliseren en pijn minimaliseren. De weg naar levenslust: Wat geeft jou échte voldoening? Maak een lijst van minimaal 10 dingen. Hoeveel ruimte krijgen deze in je leven? Plan er deze week één concreet in."
    },
    { 
      id: "q5-brief", 
      title: "Brief aan je jongere zelf",
      fullText: "Kies één moment uit opdracht 1 waarin je je onveilig of onzichtbaar voelde. Schrijf een brief aan het kind dat je toen was. • Begin met: 'Lieve kleine [jouw naam], ik zie je daar...' • Beschrijf wat je ziet in de ogen van dit kind • Erken zijn gevoelens • Vertel wat je nu weet • Geef de troost, erkenning of veiligheid die toen ontbrak • Sluit af met een belofte: Wat beloof je dit kind in jezelf vanaf nu? 💡 Lees de brief hardop voor aan jezelf, met je hand op je hart. Laat de woorden binnenkomen."
    }
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
              <span>Workshop 1</span>
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                14-15 maart 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                De Kracht van de Psychologische Basisbehoeften
              </h1>
              <p className="text-xl text-muted-foreground">
                De fundamenten ontdekken: verbinding, veiligheid, eigenwaarde en plezier
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar workshopId="workshop1" totalQuestions={12} />

          {/* Download and Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
            <DownloadButtons 
              workshopId="workshop1"
              workshopTitle="Workshop 1: De Kracht van de Psychologische Basisbehoeften"
              workshopDate="14-15 maart 2026"
              questions={workshop1Questions}
            />

          </div>

                    {/* Introduction */}
          <Card className="bg-gradient-to-br from-accent/30 to-background border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Sluit je ogen en ga terug naar een moment waarop je volledig veilig was. Niet de veiligheid van een afgesloten deur of een verzekering, maar die diepe, lichamelijke gewaarwording van "hier mag ik zijn." Voor sommigen komt direct een herinnering. Voor anderen blijft het stil - een veelzeggende stilte.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Onze diepste behoeften - aan verbinding, veiligheid, erkenning, levenslust - zijn geen abstracte concepten. Het zijn levende krachten die elk moment van je bestaan kleuren. Wanneer ze vervuld zijn, voel je je vrij, levend, present. Wanneer ze gefrustreerd zijn, voel je je leeg, angstig, afgewezen - zelfs wanneer je niet precies kunt benoemen waarom.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Deze tweedaagse is geen theoretische verkenning. Het is een ervaringsgerichte ontdekkingsreis waarin jouw verhaal centraal staat. Waarin we onderzoeken hoe vroege ervaringen een blauwdruk hebben gevormd die nog steeds je keuzes, je reacties, je relaties stuurt. Waarin we ontdekken dat wat persoonlijk lijkt, vaak universeel is.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                We werken met verschillende methoden - beweging, ademwerk, systemische opstelling, dialoog, stilte - maar altijd vanuit respect voor ieders proces en tempo. Want juist bij deze fundamentele behoeften is het essentieel dat je je veilig voelt om te onderzoeken wat er werkelijk leeft.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Een deelnemer formuleerde het ooit zo: "Ik begreep eindelijk waarom bepaalde situaties me zo raken en andere totaal niet. Het ging niet om de situatie zelf, maar om welke basisbehoefte er wel of niet vervuld werd. Dat inzicht alleen al veranderde alles."
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Deze workshop biedt je een kans om te begrijpen waarom je doet wat je doet, voelt wat je voelt. En vooral: hoe je vanuit dat begrip bewuster kunt kiezen wie je wilt zijn, in plaats van automatisch te reageren vanuit oude programma's.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Om je voor te bereiden nodigen we je uit alvast een eerste innerlijke verkenning te starten. Neem er de tijd voor, op een plek waar je ongestoord bent. Dit huiswerk vormt een brug tussen verleden en heden, een eerste stap om onzichtbare krachten zichtbaar te maken.
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
                    Je ontdekt <strong>welke vier basisbehoeften</strong> elk mens heeft: verbinding, veiligheid, eigenwaarde en levenslust.
                  </p>
                  <p className="leading-relaxed italic text-rose-800">
                    "Waarom raakt deze situatie me zo? Het gaat om welke basisbehoefte er wel of niet vervuld werd."
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
                    Door oefeningen <strong>ervaar je lichamelijk</strong> wat veiligheid, verbinding en eigenwaarde betekenen voor jou.
                  </p>
                  <p className="leading-relaxed italic text-purple-800">
                    Die diepe gewaarwording van "hier mag ik zijn" - herken je die?
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
                    Je leert <strong>bewuster kiezen</strong> wie je wilt zijn, in plaats van automatisch reageren vanuit oude programma's.
                  </p>
                  <p className="leading-relaxed italic text-amber-800">
                    Van "Ik moet sterk zijn" naar "Ik mag kwetsbaar zijn en toch oké zijn."
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
                <p className="text-foreground/90">
                  Lees de inleiding en de hoofdstukken tot en met <strong>pagina 43</strong>. Deze pagina's leggen de fundering voor het hele programma 
                  door de vier psychologische basisbehoeften te introduceren.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  💡 Markeer niet alleen wat je herkent, maar ook wat weerstand oproept. Beide zijn informatief.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Uit het werkboek "Wie we zijn"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground/90">
                  Werk de opdrachten door tot en met <strong>pagina 30</strong>. Deze oefeningen brengen je direct in contact met je eigen ervaring.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  💡 Eerlijkheid is belangrijker dan "goede" antwoorden. Schrijf je antwoorden in een apart werkschrift (A4-formaat) dat je meeneemt naar de workshop.
                </p>
              
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">📝 Belangrijkste opdracht uit het werkboek:</p>
                  <p className="text-sm text-foreground/80">
                    <strong>Leer je psychologische basisbehoeften kennen (blz. 15):</strong> Deze opdracht helpt je onderzoeken hoe goed je vier psychologische basisbehoeften vervuld worden. Je reflecteert op vragen zoals: Hoe goed voel je je verbonden met andere mensen? Voel je je welkom en geliefd? Mag je authentiek zijn in relaties, of moet je jezelf aanpassen om erkend te worden?
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Reflectieopdrachten */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-foreground">Reflectieopdrachten</h2>
            <p className="text-muted-foreground">
              Beantwoord de volgende vragen schriftelijk. Voel je vrij om te schrijven, tekenen, of een andere vorm te kiezen. 
              Het gaat om jouw innerlijke proces, niet om een product.
            </p>

            {/* Opdracht 1 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl">1. Jouw Verhaal in Beelden</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  Sluit je ogen. Laat beelden uit je kindertijd en jeugd opkomen zonder ze te sturen. Kies drie momenten die je iets vertellen 
                  over wie je was en hoe je werd gezien:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
                  <li>Een moment waarin je straalde</li>
                  <li>Een moment waarin je je klein voelde</li>
                  <li>Een moment dat je raadselachtig vindt</li>
                </ul>
                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                  <p className="font-semibold text-foreground">Beschrijf voor elk moment:</p>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li><strong>Wat zie je?</strong> Waar ben je, wie is erbij, wat gebeurt er? Geef details - details dragen betekenis.</li>
                    <li><strong>Welk gevoel</strong> roept dit beeld op nu je het weer beleeft? Laat het gevoel er zijn zonder het te beoordelen.</li>
                    <li><strong>Welke basisbehoefte</strong> werd vervuld of juist gefrustreerd? (verbinding, veiligheid, eigenwaarde, levenslust)</li>
                    <li><strong>Welke conclusie</strong> trok je toen over jezelf of over het leven? Schrijf de exacte boodschap op die je toen internaliseerde.</li>
                  </ul>
                </div>
                <div className="mt-6 space-y-6">
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Moment 1: Een moment waarin je straalde</h5>
                    <AnswerField workshopId="workshop1" questionId="q1-moment1" rows={8} />
            <AIHelper questionTitle="Een moment waarin je straalde" questionId="q1-moment1" workshopId="workshop1" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Moment 2: Een moment waarin je je klein voelde</h5>
                    <AnswerField workshopId="workshop1" questionId="q1-moment2" rows={8} />
            <AIHelper questionTitle="Een moment waarin je je klein voelde" questionId="q1-moment2" workshopId="workshop1" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Moment 3: Een moment dat je raadselachtig vindt</h5>
                    <AnswerField workshopId="workshop1" questionId="q1-moment3" rows={8} />
            <AIHelper questionTitle="Een moment dat je raadselachtig vindt" questionId="q1-moment3" workshopId="workshop1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opdracht 2 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl">2. De Vier Kamers van je Hart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  Visualiseer je innerlijke wereld als een huis met vier kamers, één voor elke basisbehoefte. Loop door dit huis. Wat ontdek je?
                </p>
                <div className="space-y-4">
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">🤝 De kamer van verbinding</h4>
                    <p className="text-sm text-foreground/80">
                      Hoe voelt deze kamer? Warm en bewoond, of kil en verlaten? Wie laat je binnen? Wanneer voel je je werkelijk verbonden 
                      en wanneer voel je je eenzaam terwijl er mensen om je heen zijn?
                    </p>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">🛡️ De kamer van veiligheid</h4>
                    <p className="text-sm text-foreground/80">
                      Hoe is deze kamer ingericht? Dikke muren of open ramen? Waar voel je je veilig en in controle, waar machteloos en angstig? 
                      Beschrijf een situatie waarin je volledig losliet.
                    </p>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">⭐ De kamer van eigenwaarde</h4>
                    <p className="text-sm text-foreground/80">
                      Wat zie je als je in de spiegel kijkt? Iemand waardevol of voornamelijk tekortkomingen? Welke stem spreekt hier - 
                      kritisch of liefdevol? Beschrijf een moment van echte trots en een moment van diepe twijfel.
                    </p>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">✨ De kamer van levenslust</h4>
                    <p className="text-sm text-foreground/80">
                      Is deze kamer gevuld met licht en gelach, of stil en serieus? Wat doe je puur voor je plezier, zonder dat het iets moet opleveren? 
                      Wanneer heb je voor het laatst ongeremd gelachen?
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-6">
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">🤝 De kamer van verbinding</h5>
                    <AnswerField workshopId="workshop1" questionId="q2-verbinding" rows={6} />
            <AIHelper questionTitle="De kamer van verbinding" questionId="q2-verbinding" workshopId="workshop1" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">🛡️ De kamer van veiligheid</h5>
                    <AnswerField workshopId="workshop1" questionId="q2-veiligheid" rows={6} />
            <AIHelper questionTitle="De kamer van veiligheid" questionId="q2-veiligheid" workshopId="workshop1" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">⭐ De kamer van eigenwaarde</h5>
                    <AnswerField workshopId="workshop1" questionId="q2-eigenwaarde" rows={6} />
            <AIHelper questionTitle="De kamer van eigenwaarde" questionId="q2-eigenwaarde" workshopId="workshop1" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">✨ De kamer van levenslust</h5>
                    <AnswerField workshopId="workshop1" questionId="q2-levenslust" rows={6} />
            <AIHelper questionTitle="De kamer van levenslust" questionId="q2-levenslust" workshopId="workshop1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opdracht 3 */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl">3. De Echo van het Verleden</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  Onze overtuigingen zijn vaak onbewuste echo's uit het verleden. Maak de volgende zinnen af met je eerste gedachte:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2 text-foreground/90">
                  <p>• Liefde betekent voor mij...</p>
                  <p>• Als ik een fout maak, dan...</p>
                  <p>• Om erbij te horen, moet ik...</p>
                  <p>• Ik ben pas goed genoeg als...</p>
                  <p>• Als ik mijn ware gevoelens toon, dan...</p>
                  <p>• De wereld is een plek waar...</p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  💡 Bekijk je antwoorden. Welke overtuigingen geven je kracht en welke houden je klein? Kies één beperkende overtuiging 
                  en onderzoek de oorsprong. Het herkennen van de bron is de eerste stap naar vrijheid.
                </p>
                <div className="mt-6">
                  <AnswerField workshopId="workshop1" questionId="q3-overtuigingen" placeholder="Schrijf hier je antwoorden op de zinnen en je reflectie..." rows={10} />
            <AIHelper questionTitle="De Echo van het Verleden" questionId="q3-overtuigingen" workshopId="workshop1" />
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
                    <CardTitle className="text-2xl">4. De Dans van Vermijding en Plezier</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/90">
                      Deze opdracht onderzoekt de vierde basisbehoefte: plezier maximaliseren en pijn minimaliseren.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Jouw vermijdingsstrategieën</h4>
                        <p className="text-sm text-foreground/80">
                          Wat doe je om ongemakkelijke gevoelens te ontlopen? Wees radicaal eerlijk. Noteer je top 3.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">De prijs van vermijding</h4>
                        <p className="text-sm text-foreground/80">
                          Kies één strategie. Wat is de korte-termijn winst? En wat is de lange-termijn prijs? 
                          Schrijf een eerlijke kosten-batenanalyse.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">De weg naar levenslust</h4>
                        <p className="text-sm text-foreground/80">
                          Wat geeft jou échte voldoening? Maak een lijst van minimaal 10 dingen. Hoeveel ruimte krijgen deze in je leven? 
                          Plan er deze week één concreet in.
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">Jouw vermijdingsstrategieën (top 3)</h5>
                        <AnswerField workshopId="workshop1" questionId="q4-vermijding" rows={4} />
            <AIHelper questionTitle="Jouw vermijdingsstrategieën" questionId="q4-vermijding" workshopId="workshop1" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">De prijs van vermijding (kosten-batenanalyse)</h5>
                        <AnswerField workshopId="workshop1" questionId="q4-prijs" rows={6} />
            <AIHelper questionTitle="De prijs van vermijding" questionId="q4-prijs" workshopId="workshop1" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">De weg naar levenslust (minimaal 10 dingen)</h5>
                        <AnswerField workshopId="workshop1" questionId="q4-levenslust" rows={6} />
            <AIHelper questionTitle="De weg naar levenslust" questionId="q4-levenslust" workshopId="workshop1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">5. Een Brief aan je Jongere Zelf</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/90">
                      Kies één moment uit opdracht 1 waarin je je onveilig of onzichtbaar voelde. Schrijf een brief aan het kind dat je toen was.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm text-foreground/80">
                      <p>• Begin met: "Lieve kleine [jouw naam], ik zie je daar..."</p>
                      <p>• Beschrijf wat je ziet in de ogen van dit kind</p>
                      <p>• Erken zijn gevoelens</p>
                      <p>• Vertel wat je nu weet</p>
                      <p>• Geef de troost, erkenning of veiligheid die toen ontbrak</p>
                      <p>• Sluit af met een belofte: Wat beloof je dit kind in jezelf vanaf nu?</p>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      💡 Lees de brief hardop voor aan jezelf, met je hand op je hart. Laat de woorden binnenkomen.
                    </p>
                    <div className="mt-6">
                      <h5 className="font-semibold text-foreground mb-3">Je brief aan je jongere zelf</h5>
                      <AnswerField workshopId="workshop1" questionId="q5-brief" placeholder="Lieve kleine [jouw naam], ik zie je daar..." rows={12} />
            <AIHelper questionTitle="Brief aan je jongere zelf" questionId="q5-brief" workshopId="workshop1" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </section>

          {/* Navigation */}
          <div className="flex justify-between pt-8 border-t">
            <Link href="/">
              <Button variant="outline">← Terug naar overzicht</Button>
            </Link>
            <Link href="/workshop/2">
              <Button>Volgende workshop →</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
