import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Heart, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AnswerField } from "@/components/AnswerField";
import { AIHelper } from "@/components/AIHelper";

export default function Workshop3() {
  const [showOptional, setShowOptional] = useState(false);
  
  const workshopId = "workshop3";
  const workshopTitle = "Workshop 3: Versterk je Eigenwaarde";
  const workshopDate = "29.08.2026 - 30.08.2026";
  
  // Question IDs for this workshop
  const questionIds = [
    "w3_q1_moment",
    "w3_q1_details",
    "w3_q1_gevoel",
    "w3_q1_bron",
    "w3_q2_herkennen",
    "w3_q2_wat_zegt",
    "w3_q2_wiens_stem",
    "w3_q2_impact",
    "w3_q3_situaties",
    "w3_q3_reactie",
    "w3_q3_gedrag",
    "w3_q3_patroon",
    "w3_q4_oefening",
    "w3_q4_weerstand",
    "w3_q4_reflectie",
    "w3_q4_affirmaties",
    "w3_q5_gebieden",
    "w3_q5_prijs",
    "w3_q5_angst",
    "w3_q5_experiment"
  ];

  const questions = [
    { id: "w3_q1_moment", title: "Vraag 1" },
    { id: "w3_q1_details", title: "Vraag 2" },
    { id: "w3_q1_gevoel", title: "Vraag 3" },
    { id: "w3_q1_bron", title: "Vraag 4" },
    { id: "w3_q2_herkennen", title: "Vraag 5" },
    { id: "w3_q2_wat_zegt", title: "Vraag 6" },
    { id: "w3_q2_wiens_stem", title: "Vraag 7" },
    { id: "w3_q2_impact", title: "Vraag 8" },
    { id: "w3_q3_situaties", title: "Vraag 9" },
    { id: "w3_q3_reactie", title: "Vraag 10" },
    { id: "w3_q3_gedrag", title: "Vraag 11" },
    { id: "w3_q3_patroon", title: "Vraag 12" },
    { id: "w3_q4_oefening", title: "Vraag 13" },
    { id: "w3_q4_weerstand", title: "Vraag 14" },
    { id: "w3_q4_reflectie", title: "Vraag 15" },
    { id: "w3_q4_affirmaties", title: "Vraag 16" },
    { id: "w3_q5_gebieden", title: "Vraag 17" },
    { id: "w3_q5_prijs", title: "Vraag 18" },
    { id: "w3_q5_angst", title: "Vraag 19" },
    { id: "w3_q5_experiment", title: "Vraag 20" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              {workshopTitle}
            </h1>
            <p className="text-muted-foreground">{workshopDate}</p>
          </div>

          {/* Progress Bar */}
          <ProgressBar workshopId={workshopId} totalQuestions={20} />

          {/* Download Buttons */}
          <DownloadButtons 
            workshopId={workshopId}
            workshopTitle={workshopTitle}
            workshopDate={workshopDate}
            questions={questions}
          />

          {/* Introduction */}
          <Card className="bg-gradient-to-br from-accent/30 to-background border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Wanneer heb jij voor het laatst in de spiegel gekeken en werkelijk de persoon gezien die daar staat? Niet de lijst met tekortkomingen die automatisch afrolt, niet het masker voor de buitenwereld, maar jij - in al je complexe, wonderlijke menselijkheid.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                We beginnen met een eenvoudige maar diepgaande oefening: een brief schrijven aan je jongere zelf. Wat zou je willen zeggen tegen dat kind dat zo hard zijn best deed om gezien te worden, om "goed genoeg" te zijn?
              </p>
              <p className="text-foreground/90 leading-relaxed">
                De pen aarzelt boven het papier. In die aarzeling gebeurt vaak iets bijzonders - er ontstaat een opening naar dieper begrip van hoe we onszelf zijn gaan zien door andermans ogen.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                "Ik schreef altijd vanuit mijn volwassen, kritische zelf," vertelde Marieke. "Maar toen ik die brief schreef, was het alsof dat kleine meisje in mij eindelijk haar verhaal mocht vertellen. Over hoe ze leerde dat liefde voorwaardelijk was. Hoe ze dacht dat ze haar bestaansrecht moest verdienen door perfect te zijn."
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Deze workshop nodigt je uit de verhalen die je over jezelf vertelt te onderzoeken. Niet om ze te veroordelen, maar om ze te begrijpen. Om te zien hoe ze je hebben beschermd én hoe ze je nu beperken. We werken met schrijven, beweging, dialoog, HeartSong Therapy - maar altijd met het doel een nieuwe, zachtere manier van naar jezelf kijken te ontwikkelen.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Want eigenwaarde is niets wat je kunt "maken" of "verdienen". Het is een thuiskomen bij wie je in essentie al bent. Van jezelf gaan houden wordt mogelijk als je medegevoel voor je schaduwkind voelbaar wordt.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Dit gaat niet over positief denken of affirmaties. Dit is een reis naar de wortels van je zelfbeeld, waar we samen onderzoeken hoe oude overtuigingen nog steeds je keuzes sturen. Waar we ontdekken dat échte eigenwaarde niet gaat over "beter" worden, maar over heel worden.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Om je voor te bereiden nodigen we je uit thuis alvast je zelfbeeld en de bronnen daarvan te onderzoeken. Dit huiswerk helpt je bewuster te worden van de stemmen die je innerlijke waarde bepalen en hoe je een zachtere, liefdevoller stem kunt ontwikkelen.
              </p>
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
                    Je ontdekt <strong>hoe je zelfbeeld</strong> is gevormd door vroege ervaringen en welke stemmen je eigenwaarde nog steeds bepalen.
                  </p>
                  <p className="leading-relaxed italic text-rose-800">
                    "Ik leerde dat liefde voorwaardelijk was. Dat ik mijn bestaansrecht moest verdienen door perfect te zijn."
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
                    Door oefeningen <strong>ontwikkel je medegevoel</strong> voor je schaduwkind en leer je zachter naar jezelf te kijken.
                  </p>
                  <p className="leading-relaxed italic text-purple-800">
                    Wanneer heb jij voor het laatst in de spiegel gekeken en werkelijk de persoon gezien die daar staat?
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
                    Je leert <strong>een nieuwe, liefdevolle stem</strong> ontwikkelen die niet gaat over "beter" worden, maar over heel worden.
                  </p>
                  <p className="leading-relaxed italic text-amber-800">
                    Van "Ik moet perfect zijn" naar "Ik ben waardevol zoals ik ben, met al mijn imperfecties."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Leeswerk */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Leeswerk</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Uit het boek "Wie we zijn":</h3>
                  <p className="text-foreground/90 leading-relaxed mb-2">
                    Lees "Eigenwaarde: het epicentrum van de psyche" (blz. 62-73). Dit hoofdstuk legt uit waarom eigenwaarde zo centraal staat. Je leest hoe onze behoefte aan eigenwaarde samenhangt met hechting en autonomie, en hoe in de eerste levensjaren de basis wordt gelegd. Markeer passages die resoneren én die weerstand oproepen.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Bestudeer de passage over het "schaduwkind" (blz. 195-200). Hier beschrijft Stefanie Stahl hoe negatieve overtuigingen uit de jeugd - het schaduwkind - onze eigenwaarde ondermijnen. Probeer te voelen welke delen bij jou resoneren. Herken je de stem van jouw schaduwkind? Welke boodschappen fluistert het?
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Uit het werkboek "Wie we zijn":</h3>
                  <p className="text-foreground/90 leading-relaxed mb-2">
                    Werk de zelfreflecties door op blz. 19-20 ("Hoe is het met je gevoel van eigenwaarde?"). Neem tijd voor eerlijke antwoorden. Voel je je meestal goed zoals je bent, of betrap je jezelf vaak op zelfkritiek?
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Doe de zelfhelende oefening "Ik ben waardevol" (blz. 20-22). Zoek een rustig moment en spreek de affirmaties zacht en met aandacht uit. Voel bij elke zin even na. Herhaal eventueel meerdere keren deze week.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">📝 Belangrijkste opdracht uit het werkboek:</p>
                  <p className="text-sm text-foreground/80">
                    <strong>Wat geloof jij? - Negatieve overtuigingen (blz. 83):</strong> Deze opdracht helpt je negatieve kernovertuigingen over jezelf identificeren. Je maakt zinnen af zoals "Ik ben pas goed genoeg als..." en onderzoekt waar deze overtuigingen vandaan komen en hoe ze je leven beïnvloeden.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reflectieopdrachten */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Reflectieopdrachten</h2>
              
              <div className="space-y-8">
                {/* Opdracht 1 */}
                <div>
                  <h3 className="text-xl font-bold mb-4">1. Jouw verhaal van eigenwaarde</h3>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Reis terug naar je kindertijd. Sluit je ogen en laat herinneringen opkomen van momenten die je gevoel van eigenwaarde hebben gevormd.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Een bepalend moment:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Kun je een herinnering vinden waarin jouw eigenwaarde sterk werd beïnvloed - positief of negatief? Een situatie waarin je je heel waardevol voelde (bijvoorbeeld door een oprecht compliment, een succeservaring, onverdeelde aandacht), of juist waarin je aan jezelf begon te twijfelen (bijvoorbeeld door kritiek, afwijzing, niet gezien worden).
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q1_moment" />
                      <AIHelper workshopId="workshop3" questionId="w3_q1_moment" questionTitle="Moment" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">De details:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Beschrijf gedetailleerd. Wat gebeurde er precies? Waar was je? Wie waren erbij? Wat werd gezegd of gedaan? Hoe oud was je? Wat droeg je? Welke geuren, geluiden, beelden herinner je?
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q1_details" />
                      <AIHelper workshopId="workshop3" questionId="w3_q1_details" questionTitle="Details" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Het gevoel:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Welk gevoel of welke overtuiging hield je eraan over? Schrijf de exacte woorden op die je toen over jezelf dacht. (Bijvoorbeeld: "Ik ben niet slim genoeg", "Ik ben te veel", "Ik moet perfect zijn om geliefd te worden", "Ik ben waardevol zoals ik ben").
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q1_gevoel" />
                      <AIHelper workshopId="workshop3" questionId="w3_q1_gevoel" questionTitle="Gevoel" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">De bron:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Probeer te benoemen van wie die boodschap afkomstig was. Impliciet of expliciet. Was het de stem van een ouder, leraar, broer/zus, iemand anders die belangrijk was? Hoe resoneert die oude boodschap nu nog? Wanneer hoor je die stem?
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q1_bron" />
                      <AIHelper workshopId="workshop3" questionId="w3_q1_bron" questionTitle="Bron" />
                    </div>
                  </div>
                </div>

                {/* Opdracht 2 */}
                <div>
                  <h3 className="text-xl font-bold mb-4">2. De innerlijke criticus ontmoeten</h3>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    We hebben allemaal een innerlijke criticus - die stem die zegt dat we niet goed genoeg zijn, die ons vergelijkt, die ons klein houdt. Tijd om deze stem bewust te maken.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">De stem herkennen:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Wanneer hoor je je innerlijke criticus het luidst? In welke situaties komt hij naar voren? (Als je een fout maakt, je kwetsbaar voelt, iets nieuws probeert, succes hebt).
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q2_herkennen" />
                      <AIHelper workshopId="workshop3" questionId="w3_q2_herkennen" questionTitle="Herkennen" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Wat zegt hij:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Schrijf letterlijk op wat je innerlijke criticus zegt. Gebruik de exacte woorden. Wees niet bang hard te zijn - dit is niet jouw stem, maar een geïnternaliseerde stem. (Bijvoorbeeld: "Je bent zo dom", "Niemand vindt je aardig", "Je bent te dik/lelijk/saai", "Je doet nooit iets goed").
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q2_wat_zegt" />
                      <AIHelper workshopId="workshop3" questionId="w3_q2_wat_zegt" questionTitle="Zegt" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Wiens stem is het:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Als je goed luistert, wiens stem hoor je eigenlijk? Die van een ouder, leraar, pester, de maatschappij? Herken je de oorsprong?
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q2_wiens_stem" />
                      <AIHelper workshopId="workshop3" questionId="w3_q2_wiens_stem" questionTitle="Stem" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">De impact:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Hoe beïnvloedt deze criticus je leven? Welke keuzes maak je (of maak je juist niet) vanwege deze stem? Welke dromen heb je opgegeven? Welke risico's durf je niet?
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q2_impact" />
                      <AIHelper workshopId="workshop3" questionId="w3_q2_impact" questionTitle="Impact" />
                    </div>
                  </div>
                </div>

                {/* Opdracht 3 */}
                <div>
                  <h3 className="text-xl font-bold mb-4">3. Herkenning in het heden</h3>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Nu je de wortels van je zelfbeeld hebt verkend, is het tijd te kijken hoe je eigenwaarde zich nu manifesteert.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold mb-2">Concrete situaties:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Denk aan twee à drie concrete situaties uit de afgelopen tijd waarin je zelfvertrouwen op de proef werd gesteld. Je kreeg kritiek op je werk, voelde je onzeker in gezelschap, merkte jaloezie in een relatie, durfde je mening niet te geven.
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q3_situaties" />
                      <AIHelper workshopId="workshop3" questionId="w3_q3_situaties" questionTitle="Situaties" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Je reactie:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Beschrijf voor elke situatie wat er gebeurde en wat je interne reactie was. Welke gedachten schoten door je hoofd? Welke emoties voelde je - schaamte, boosheid, angst, minderwaardigheid, verdriet?
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q3_reactie" />
                      <AIHelper workshopId="workshop3" questionId="w3_q3_reactie" questionTitle="Reactie" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Je gedrag:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Hoe ging je ermee om? Trok je terug? Ging je extra je best doen? Zocht je bevestiging? Werd je defensief? Deed je alsof het je niet raakte?
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q3_gedrag" />
                      <AIHelper workshopId="workshop3" questionId="w3_q3_gedrag" questionTitle="Gedrag" />
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Het patroon:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Probeer patronen te herkennen. Zie je overeenkomsten? Kun je zien hoe deze reacties teruggaan naar je schaduwkind - dat deel dat bang is niet goed genoeg te zijn?
                      </p>
                      <AnswerField workshopId="workshop3" questionId="w3_q3_patroon" />
                      <AIHelper workshopId="workshop3" questionId="w3_q3_patroon" questionTitle="Patroon" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verdiepende opdrachten */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">
                  Verdiepende opdrachten (optioneel)
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowOptional(!showOptional)}
                >
                  {showOptional ? "Verberg" : "Toon"}
                </Button>
              </div>
              
              <p className="text-sm italic text-muted-foreground mb-4">
                De volgende opdrachten zijn voor wie nog dieper in het thema wil duiken. Voel je volledig vrij om te kiezen wat je nu aanspreekt.
              </p>

              {showOptional && (
                <div className="space-y-8 mt-6">
                  {/* Opdracht 4 */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">4. Het spiegelbeeld omkeren</h3>
                    <p className="text-foreground/90 leading-relaxed mb-4">
                      Deze opdracht helpt een nieuwe, liefdevoller stem te ontwikkelen - de stem van je zonnekind, het deel dat weet dat je waardevol bent.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold mb-2">De oefening herhalen en reflectie:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Doe opnieuw de oefening "Ik ben waardevol" uit het werkboek (blz. 20-22). Spreek de zinnen hardop uit. Schrijf uitgebreid wat je ervaarde. Welke zin raakte je het meest, waarom? Welke zin voelde het moeilijkst?
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q4_oefening" />
                        <AIHelper workshopId="workshop3" questionId="w3_q4_oefening" questionTitle="Oefening" />
                      </div>

                      <div>
                        <p className="font-semibold mb-2">De weerstand voelen:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Merk op wat dit doet. Komen er stemmetjes van ongeloof? ("Ja, maar...", "Dit is onzin", "Dit geldt niet voor mij"). Voel je verdriet, opluchting, weerstand, warmte? Alles mag er zijn.
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q4_weerstand" />
                        <AIHelper workshopId="workshop3" questionId="w3_q4_weerstand" questionTitle="Weerstand" />
                      </div>

                      <div>
                        <p className="font-semibold mb-2">Reflectie:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Schrijf uitgebreid wat je ervaarde. Welke zin raakte je het meest, waarom? Welke zin voelde het moeilijkst? Voelde iets ongemakkelijk of juist bevrijdend? Probeer woorden te geven aan de emoties die voorbijkwamen.
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q4_reflectie" />
                        <AIHelper workshopId="workshop3" questionId="w3_q4_reflectie" questionTitle="Reflectie" />
                      </div>

                      <div>
                        <p className="font-semibold mb-2">Jouw eigen affirmaties:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Schrijf nu drie eigen affirmaties die specifiek voor jou betekenisvol zijn. Wat zou je graag over jezelf willen geloven? Wat heeft jouw schaduwkind nodig te horen?
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q4_affirmaties" />
                        <AIHelper workshopId="workshop3" questionId="w3_q4_affirmaties" questionTitle="Affirmaties" />
                      </div>
                    </div>
                  </div>

                  {/* Opdracht 5 */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">5. Waar verdien je je eigenwaarde?</h3>
                    <p className="text-foreground/90 leading-relaxed mb-4">
                      Deze opdracht onderzoekt op welke gebieden je probeert je eigenwaarde te "verdienen" in plaats van te voelen dat je inherent waardevol bent.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold mb-2">De gebieden:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Op welke gebieden probeer je misschien je eigenwaarde te "verdienen"? (Prestaties, uiterlijk, zorgen voor anderen, perfect zijn, controle hebben, etc.)
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q5_gebieden" />
                        <AIHelper workshopId="workshop3" questionId="w3_q5_gebieden" questionTitle="Gebieden" />
                      </div>

                      <div>
                        <p className="font-semibold mb-2">De prijs:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Kies het gebied waar je het hardst voor werkt. Wat is de prijs? Wat kost het aan energie, vrijheid, authenticiteit? Wat moet je opgeven om aan deze eisen te voldoen?
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q5_prijs" />
                        <AIHelper workshopId="workshop3" questionId="w3_q5_prijs" questionTitle="Prijs" />
                      </div>

                      <div>
                        <p className="font-semibold mb-2">De angst:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Wat ben je bang dat er gebeurt als je stopt met verdienen? Als je niet meer perfect bent, niet meer zorgt voor iedereen, niet meer presteert? Schrijf je diepste angst op.
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q5_angst" />
                        <AIHelper workshopId="workshop3" questionId="w3_q5_angst" questionTitle="Angst" />
                      </div>

                      <div>
                        <p className="font-semibold mb-2">Een experiment:</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Kies één klein experiment voor deze week. Wat zou er gebeuren als je op één gebied stopt met verdienen? Bijvoorbeeld: één keer nee zeggen, één imperfectie laten zien, één keer niet de beste willen zijn. Beschrijf je experiment en voer het uit. Schrijf daarna wat er gebeurde.
                        </p>
                        <AnswerField workshopId="workshop3" questionId="w3_q5_experiment" />
                        <AIHelper workshopId="workshop3" questionId="w3_q5_experiment" questionTitle="Experiment" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Link href="/workshop2">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Workshop 2
              </Button>
            </Link>
            <Link href="/workshop4">
              <Button className="gap-2">
                Workshop 4
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
