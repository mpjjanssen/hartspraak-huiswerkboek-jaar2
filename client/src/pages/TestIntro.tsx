import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft, Brain, AlertCircle } from "lucide-react";
import { useTest } from "@/contexts/TestContext";
import { part1Questions, part2Questions } from "@/data/testData";

export default function TestIntro() {
  const { part1Answers, part2Answers, resetTest } = useTest();
  const hasProgress = Object.keys(part1Answers).length > 0 || Object.keys(part2Answers).length > 0;
  const isComplete = Object.keys(part1Answers).length === part1Questions.length 
    && Object.keys(part2Answers).length === part2Questions.length;

  const handleReset = () => {
    if (window.confirm("Weet je zeker dat je alle opgeslagen antwoorden wilt wissen en opnieuw wilt beginnen?")) {
      resetTest();
    }
  };

  const structureInfo = [
    {
      title: "1. De schizoïde structuur",
      question: "Mag ik er zijn?",
      description: "Dit is de structuur van de zwerver, het kind dat de wereld als te overweldigend ervoer om volledig te landen. De existentiële angst – het gevoel niet welkom te zijn op deze aarde – drijft naar binnen, naar de veiligheid van het denken, weg van het lichaam.",
      mask: "de buitenstaander, die observeert maar niet echt deelneemt.",
      quality: "de dromer, die vanuit die afstand visioenen ziet die anderen ontgaan."
    },
    {
      title: "2. De orale structuur",
      question: "Mag ik behoeftig zijn?",
      description: "Het kind dat te vroeg te veel moest missen – voeding, warmte, aanwezigheid. Niet per se fysiek, maar emotioneel. Er ontstaat een diepe honger, een verlangen dat nooit helemaal gestild lijkt te worden.",
      mask: "de innerlijke verliezer, die het tekort al verwacht voordat het er is.",
      quality: "de voedster, die vanuit doorleefde honger anderen kan voeden."
    },
    {
      title: "3. De symbiotische structuur",
      question: "Wie ben ik, los van jou?",
      description: "Dit is de verwarring op de grens tussen zelf en ander. Het kind dat nooit veilig kon ontdekken waar het zelf begon en de ander ophield. Autonomie voelt als verlating; verbinding als versmelting.",
      mask: "de kameleon, die zichzelf verliest in de ander.",
      quality: "de mediator, die grenzen kan bewaken én verbinding kan maken."
    },
    {
      title: "4. De masochistische structuur",
      question: "Mag ik vrij zijn?",
      description: "Het kind dat leerde dat eigenheid gevaarlijk was. Elke beweging naar buiten werd afgeremd, elke uitdrukking van kracht werd onderdrukt. Wat rest is een diepe overtuiging: ik mag er zijn, maar alleen als ik me klein maak.",
      mask: "de drager, die het lijden van de hele wereld op zich neemt.",
      quality: "de bevrijder, die vanuit doorleefde onderdrukking anderen helpt hun stem te vinden."
    },
    {
      title: "5. De psychopathische structuur",
      question: "Kan ik je vertrouwen?",
      description: "Het kind dat verraden werd door degene die het moest beschermen. Het leerde vroeg: de wereld is verdeeld in roofdieren en prooi, en ik zal nooit meer prooi zijn. Controle werd de enige veiligheid.",
      mask: "de manipulator, die charme inzet als wapen.",
      quality: "de krijger van het hart, die kracht inzet voor bescherming in plaats van dominantie."
    },
    {
      title: "6. De rigide structuur",
      question: "Mag ik voelen?",
      description: "Het kind dat leerde dat spontaniteit niet welkom was. Dat vitaliteit, wildheid en het open hart afgeremd moesten worden. Het antwoord: perfectie. Als ik alles goed doe, kan niemand me pijn doen.",
      mask: "de perfectionist, die controle houdt over elke emotie.",
      quality: "de edelman/jonkvrouw, die vanuit een open hart voluit kan liefhebben."
    }
  ];

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">
              <span className="hover:text-primary cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Karakterstructurentest</span>
          </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Brain className="h-4 w-4" />
              Zelfreflectie
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Karakterstructurentest
            </h1>
            <p className="text-xl text-muted-foreground">
              De taal van onze vroege wonden
            </p>
          </div>

          {/* Resume / Start buttons */}
          {hasProgress && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Je hebt al voortgang opgeslagen</p>
                    <p className="text-sm text-muted-foreground">
                      Deel I: {Object.keys(part1Answers).length}/{part1Questions.length} • Deel II: {Object.keys(part2Answers).length}/{part2Questions.length}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {isComplete ? (
                      <Link href="/test/resultaten">
                        <Button>Bekijk resultaten</Button>
                      </Link>
                    ) : (
                      <Link href={Object.keys(part1Answers).length < part1Questions.length ? "/test/deel1" : "/test/deel2"}>
                        <Button>Verder gaan</Button>
                      </Link>
                    )}
                    <Button variant="outline" onClick={handleReset}>Opnieuw beginnen</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Intro */}
          <Card>
            <CardHeader>
              <CardTitle>Wat zijn karakterstructuren eigenlijk?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Stel je voor: een kind dat leert overleven. Niet door te vechten of te vluchten, maar door zichzelf te vormen naar wat de omgeving van hem vraagt. Of juist door zich terug te trekken wanneer die omgeving te overweldigend wordt.
              </p>
              <p>
                Karakterstructuren zijn de verstilde echo's van die vroege aanpassingen. Ze ontstaan wanneer een kind, geconfronteerd met pijn of tekort, een manier vindt om zichzelf te beschermen. Deze bescherming zet zich vast – in de manier waarop we ademen, hoe we onze schouders dragen, hoe we contact maken of juist vermijden.
              </p>
              <p>
                Het Griekse woord <em>charassein</em> betekent 'inkrassen'. En dat is precies wat er gebeurt: het leven krast zijn sporen in onze ziel, en wij vormen ons naar die krassen.
              </p>
              <p>
                Wat ooit een briljante overlevingsstrategie was van een kwetsbaar kind, wordt in de volwassenheid vaak een keurslijf. De muren die ons beschermden, houden nu ook de liefde buiten. De flexibiliteit verdwijnt; de speelruimte krimpt.
              </p>
              <p>
                Bij elke karakterstructuur hoort een masker – het gezicht dat we de wereld tonen om de oorspronkelijke pijn niet te hoeven voelen. Maar hier schuilt een paradox: datzelfde masker wijst ook naar de wond. Het is tegelijk een schild én een stille vraag om gezien te worden.
              </p>
            </CardContent>
          </Card>

          {/* The 6 structures */}
          <Card>
            <CardHeader>
              <CardTitle>De zes karakterstructuren</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {structureInfo.map((s, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>De kernvraag:</strong> <em>{s.question}</em>
                  </p>
                  <p className="text-sm text-foreground/80">{s.description}</p>
                  <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                    <li><strong>Het masker:</strong> {s.mask}</li>
                    <li><strong>De getransformeerde kwaliteit:</strong> {s.quality}</li>
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* About the test */}
          <Card>
            <CardHeader>
              <CardTitle>Over deze test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <p>De test bestaat uit twee delen:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-accent/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-1">Deel I: Multiple choice</h4>
                  <p className="text-sm text-muted-foreground">
                    25 scenariovragen met 6 antwoordmogelijkheden. Kies het antwoord dat het beste bij je past.
                  </p>
                </div>
                <div className="bg-accent/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-1">Deel II: Ja/nee stellingen</h4>
                  <p className="text-sm text-muted-foreground">
                    100 stellingen die je met ja of nee beantwoordt. Ga af op je eerste gevoel.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <p className="text-sm">
                  Een belangrijke kanttekening: Deze test is een spiegel, geen diagnose. Een uitnodiging tot zelfreflectie, geen definitief oordeel. Karakterstructuren zijn geen levenslange vonnissen – ze kunnen verschuiven naarmate we groeien, helen, en onszelf met meer mildheid leren kennen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Start button */}
          <div className="flex justify-between items-center pt-4">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Terug naar home
              </Button>
            </Link>
            <Link href="/test/deel1">
              <Button size="lg" className="gap-2">
                Start de test
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
