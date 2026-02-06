import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AnswerField } from "@/components/AnswerField";
import { AIHelper } from "@/components/AIHelper";
import { DownloadButtons } from "@/components/DownloadButtons";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Sparkles, Users, Eye, Compass, PenLine } from "lucide-react";
import { Link } from "wouter";

const workshopId = "workshop4";

export default function Workshop4() {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);

  const sections = [
    { id: "intro", title: "Inleiding", icon: Heart },
    { id: "terugblik", title: "Terugblik op je reis", icon: Eye },
    { id: "relaties", title: "Wie met wie kan", icon: Users },
    { id: "integratie", title: "Integratie", icon: Sparkles },
    { id: "groep", title: "De groep als spiegel", icon: Users },
    { id: "vooruit", title: "Vooruitblik", icon: Compass },
    { id: "ritueel", title: "Rituele afsluiting", icon: PenLine },
  ];

  useEffect(() => {
    const calculateProgress = () => {
      const totalQuestions = 20;
      let answered = 0;
      for (let i = 1; i <= totalQuestions; i++) {
        const key = `hartspraak-${workshopId}-q${i}`;
        if (localStorage.getItem(key)) answered++;
      }
      setProgress((answered / totalQuestions) * 100);
    };
    calculateProgress();
    window.addEventListener("answerSaved", calculateProgress);
    return () => window.removeEventListener("answerSaved", calculateProgress);
  }, []);

  const scrollToSection = (index: number) => {
    setCurrentSection(index);
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Terug naar home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Workshop 4: Van wond naar wonder
          </h1>
          <p className="text-lg text-muted-foreground">
            Integratie en afsluiting van jaar 2
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Voortgang</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <DownloadButtons workshopId="workshop4" />

        {/* Navigation */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <Button
                  key={section.id}
                  variant={currentSection === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => scrollToSection(index)}
                  className="flex items-center gap-2"
                >
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inleiding */}
        <section id="intro" className="mb-12 scroll-mt-8">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Welkom bij de afsluiting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <p>
                Dit is de laatste workshop van ons tweede jaar samen. Een jaar waarin we dieper zijn gegaan 
                dan ooit — in de zes karakterstructuren, in de dynamiek tussen structuren, en in de vraag 
                hoe onze oudste overlevingsstrategieën onze relaties vormgeven.
              </p>
              <p>
                Nu is het tijd om samen te brengen wat je hebt geleerd. Niet als een eindpunt, maar als 
                een rustpunt — een moment om te erkennen waar je staat en waar je naartoe groeit.
              </p>
              <p className="font-medium text-primary">
                Dit huiswerk vraagt je om terug te kijken, te integreren, en vooruit te blikken. 
                Neem er de tijd voor. Dit is je oogst.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Deel 1: Terugblik */}
        <section id="terugblik" className="mb-12 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Deel 1: Terugblik op je reis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 1.1 De Structuren in Mij */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  1.1 De structuren in mij
                </h3>
                <p className="text-muted-foreground">
                  Aan het begin van dit jaar deed je de lichaamstypentest. Nu, na een jaar van verdieping:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Welke karakterstructuur(en) herken je nu het sterkst in jezelf? Is dit veranderd 
                      ten opzichte van het begin van het jaar?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q1"
                      placeholder="Beschrijf welke structuur(en) je nu het sterkst herkent..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q1"
                      questionTitle="Herkenning van karakterstructuren na een jaar verdieping"
                      context="De deelnemer reflecteert op welke karakterstructuur(en) nu het meest herkenbaar zijn na een jaar werken met dit materiaal."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Beschrijf een concreet moment uit het afgelopen jaar waarin je een oude 
                      structuurrespons bij jezelf 'betrapte'. Wat gebeurde er? Hoe reageerde je?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q2"
                      placeholder="Beschrijf een specifiek moment waarop je je patroon herkende..."
                      rows={6}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q2"
                      questionTitle="Moment van herkenning van structuurrespons"
                      context="De deelnemer beschrijft een concreet moment waarop zij/hij een oude overlevingsstrategie bij zichzelf opmerkte."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Welke structuur voelt nog het meest 'actief' — als een automatische piloot die het 
                      soms overneemt? En welke structuur heb je meer leren begrijpen en daardoor kunnen verzachten?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q3"
                      placeholder="Welke structuur is nog actief? Welke heb je kunnen verzachten?"
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q3"
                      questionTitle="Actieve vs. verzachte structuren"
                      context="Reflectie op welke overlevingsstrategieën nog automatisch aanslaan en welke meer bewust zijn geworden."
                    />
                  </div>
                </div>
              </div>

              {/* 1.2 De Wijsheid van je Verdediging */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  1.2 De wijsheid van je verdediging
                </h3>
                <p className="text-muted-foreground">
                  Reich en Lowen spraken over karakterstructuren als 'pantser'. Maar in dit jaar hebben 
                  we geleerd ze ook te zien als overlevingswijsheid — creatieve aanpassingen aan 
                  onmogelijke situaties.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Schrijf een brief aan je jongere zelf — het kind dat deze structuur(en) ontwikkelde. 
                      Wat wil je tegen dit kind zeggen over waarom het deed wat het deed?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q4"
                      placeholder="Lief kind van toen..."
                      rows={8}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q4"
                      questionTitle="Brief aan je jongere zelf over je overlevingsstrategie"
                      context="De deelnemer schrijft een compassievolle brief aan het kind dat zij/hij ooit was, dat de karakterstructuur ontwikkelde als overleving."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Wat heeft je primaire karakterstructuur je gebracht? Welke gaven of kwaliteiten 
                      zijn eruit voortgekomen, naast de beperkingen?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q5"
                      placeholder="De gaven die mijn structuur me heeft gebracht zijn..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q5"
                      questionTitle="Gaven van je karakterstructuur"
                      context="Reflectie op de positieve kwaliteiten die zijn voortgekomen uit de karakterstructuur, naast de beperkingen."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Deel 2: Wie met Wie Kan */}
        <section id="relaties" className="mb-12 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Deel 2: Wie met wie kan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-muted-foreground">
                Een groot deel van dit jaar ging over de dans tussen structuren in relaties.
              </p>

              {/* 2.1 Jouw Relationele Patronen */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  2.1 Jouw relationele patronen
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Met welk type partner(s) heb je in je leven de meeste relaties gehad? 
                      Kun je daar nu een structuur-patroon in herkennen?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q6"
                      placeholder="Wanneer ik terugkijk op mijn relaties, zie ik een patroon van..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q6"
                      questionTitle="Patronen in partnerkeuze"
                      context="De deelnemer onderzoekt welke karakterstructuren hun partners hadden en wat dit patroon onthult."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Beschrijf een relatiedynamiek (huidige of verleden) vanuit het perspectief van 
                      twee dansende structuren. Welke structuur bracht jij? Welke de ander? 
                      Waar botsten jullie? Waar vulden jullie elkaar aan?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q7"
                      placeholder="In deze relatie danste mijn [structuur] met zijn/haar [structuur]..."
                      rows={7}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q7"
                      questionTitle="De dans tussen twee structuren in een relatie"
                      context="De deelnemer analyseert een relatie vanuit het perspectief van twee karakterstructuren die samen dansen."
                    />
                  </div>
                </div>
              </div>

              {/* 2.2 De Moeilijke Dans */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  2.2 De moeilijke dans
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Met welke karakterstructuur bij een ander heb jij het moeilijkst? 
                      Waarom denk je dat dit zo is? Wat raakt dit in jou?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q8"
                      placeholder="Ik vind het het moeilijkst om te zijn met mensen die... omdat dit in mij..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q8"
                      questionTitle="Moeilijkste structuur om mee om te gaan"
                      context="De deelnemer onderzoekt welke karakterstructuur bij anderen het meest uitdagend is en waarom dit hen raakt."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Is er een relationeel patroon dat je nu, met de kennis van dit jaar, 
                      anders zou willen doen? Wat zou je concreet kunnen veranderen?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q9"
                      placeholder="Een patroon dat ik anders zou willen doen is... Concreet zou ik..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q9"
                      questionTitle="Relationeel patroon veranderen"
                      context="De deelnemer formuleert concrete veranderingen die zij/hij wil maken in relationele patronen."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Deel 3: Integratie */}
        <section id="integratie" className="mb-12 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Deel 3: Integratie — het masker en het gezicht
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 3.1 Voorbij het Masker */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  3.1 Voorbij het masker
                </h3>
                <p className="text-muted-foreground">
                  In "De Maskermaker" lazen we dat het masker niet het probleem is — het probleem is 
                  dat we vergeten dat we het dragen.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Wanneer in het afgelopen jaar heb je je masker bewust kunnen afzetten? 
                      Wat gebeurde er toen? Hoe voelde dat?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q10"
                      placeholder="Een moment waarop ik mijn masker afzette was..."
                      rows={6}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q10"
                      questionTitle="Moment van authenticiteit - masker afzetten"
                      context="De deelnemer beschrijft een moment waarop zij/hij bewust het karaktermasker kon afleggen."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Zijn er situaties waarin je je masker nog nodig hebt? 
                      Kun je dit accepteren zonder jezelf te veroordelen?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q11"
                      placeholder="Situaties waarin ik mijn masker nog nodig heb zijn..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q11"
                      questionTitle="Het masker accepteren waar nodig"
                      context="Reflectie op situaties waarin het masker nog functioneel is, met zelfacceptatie."
                    />
                  </div>
                </div>
              </div>

              {/* 3.2 Het Lichaam Herinnert */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  3.2 Het lichaam herinnert
                </h3>
                <p className="text-muted-foreground">
                  Dit werk gaat niet alleen over inzicht, maar over belichaming.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Waar in je lichaam voel je je karakterstructuur het sterkst? 
                      Beschrijf dit zo concreet mogelijk — spanning, houding, ademhaling.
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q12"
                      placeholder="In mijn lichaam voel ik mijn structuur het meest in..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q12"
                      questionTitle="Lichamelijke manifestatie van karakterstructuur"
                      context="De deelnemer onderzoekt waar in het lichaam de karakterstructuur zich manifesteert."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Is er iets veranderd in hoe je je lichaam ervaart sinds het begin van dit jaar? 
                      Wat merk je?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q13"
                      placeholder="Wat ik merk in mijn lichaamservaring is..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q13"
                      questionTitle="Veranderingen in lichaamsbewustzijn"
                      context="Reflectie op verschuivingen in de relatie met het eigen lichaam gedurende het jaar."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Deel 4: De Groep als Spiegel */}
        <section id="groep" className="mb-12 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Deel 4: De groep als spiegel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 4.1 Gezien Worden */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  4.1 Gezien worden
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Welk moment met de groep heeft je dit jaar het meest geraakt? 
                      Wat maakte dit zo betekenisvol?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q14"
                      placeholder="Een moment met de groep dat me raakte was..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q14"
                      questionTitle="Meest betekenisvolle groepsmoment"
                      context="De deelnemer reflecteert op het meest impactvolle moment met de groep dit jaar."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Van wie in de groep heb je iets geleerd over jezelf — misschien juist 
                      omdat jullie zo verschillend zijn?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q15"
                      placeholder="Ik heb iets over mezelf geleerd door..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q15"
                      questionTitle="Leren van anderen in de groep"
                      context="Reflectie op wat de deelnemer heeft geleerd door de spiegel van anderen in de groep."
                    />
                  </div>
                </div>
              </div>

              {/* 4.2 Jouw Bijdrage */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  4.2 Jouw bijdrage
                </h3>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium mb-3">
                    Wat denk je dat jij hebt bijgedragen aan de groep dit jaar? 
                    Dit mag klein zijn — aanwezigheid telt ook.
                  </p>
                  <AnswerField
                    workshopId={workshopId}
                    questionId="q16"
                    placeholder="Ik denk dat mijn bijdrage aan de groep was..."
                    rows={5}
                  />
                  <AIHelper
                    workshopId={workshopId}
                    questionId="q16"
                    questionTitle="Eigen bijdrage aan de groep"
                    context="De deelnemer erkent wat zij/hij heeft bijgedragen aan het groepsproces."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Deel 5: Vooruitblik */}
        <section id="vooruit" className="mb-12 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-6 w-6 text-primary" />
                Deel 5: Vooruitblik — van wond naar wonder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 5.1 Wat Nog Niet Af Is */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  5.1 Wat nog niet af is
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Welk thema of welke wond is dit jaar aangeraakt maar nog niet 'klaar'? 
                      Wat vraagt nog aandacht?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q17"
                      placeholder="Een thema dat nog aandacht vraagt is..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q17"
                      questionTitle="Wat nog niet af is"
                      context="De deelnemer benoemt thema's of wonden die nog verdere aandacht nodig hebben."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Welke volgende stap zou je willen zetten in je helingsproces? 
                      Dit hoeft niet groots te zijn.
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q18"
                      placeholder="Een volgende stap die ik zou willen zetten is..."
                      rows={4}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q18"
                      questionTitle="Volgende stap in heling"
                      context="De deelnemer formuleert een concrete volgende stap in hun helingsproces."
                    />
                  </div>
                </div>
              </div>

              {/* 5.2 Intentie voor de Toekomst */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  5.2 Intentie voor de toekomst
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Als je één ding zou mogen meenemen uit dit jaar — één inzicht, één vaardigheid, 
                      één herinnering — wat zou dat zijn?
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q19"
                      placeholder="Het belangrijkste dat ik meeneem uit dit jaar is..."
                      rows={4}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q19"
                      questionTitle="Belangrijkste les van dit jaar"
                      context="De deelnemer kiest één essentieel element om mee te nemen uit het afgelopen jaar."
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-3">
                      Formuleer een intentie voor het komende jaar. Niet als een voornemen dat je 
                      'moet' halen, maar als een richting die je hart wil volgen.
                    </p>
                    <AnswerField
                      workshopId={workshopId}
                      questionId="q20"
                      placeholder="Mijn intentie voor het komende jaar is..."
                      rows={5}
                    />
                    <AIHelper
                      workshopId={workshopId}
                      questionId="q20"
                      questionTitle="Intentie voor het komende jaar"
                      context="De deelnemer formuleert een hartsintentie voor de toekomst."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Deel 6: Rituele Afsluiting */}
        <section id="ritueel" className="mb-12 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenLine className="h-6 w-6 text-primary" />
                Deel 6: Rituele afsluiting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 6.1 Dankbaarheid */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  6.1 Dankbaarheid
                </h3>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium mb-3">
                    Noem drie dingen waarvoor je dankbaar bent na dit jaar. 
                    Dit mogen grote of kleine dingen zijn.
                  </p>
                  <AnswerField
                    workshopId={workshopId}
                    questionId="q21"
                    placeholder="1. Ik ben dankbaar voor...
2. Ik ben dankbaar voor...
3. Ik ben dankbaar voor..."
                    rows={6}
                  />
                </div>
              </div>

              {/* 6.2 Loslaten */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  6.2 Loslaten
                </h3>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium mb-3">
                    Is er iets dat je wilt loslaten? Een overtuiging, een patroon, een verwachting 
                    van jezelf? Schrijf het hier op — tijdens de workshop zullen we hier een ritueel 
                    omheen creëren.
                  </p>
                  <AnswerField
                    workshopId={workshopId}
                    questionId="q22"
                    placeholder="Wat ik wil loslaten is..."
                    rows={5}
                  />
                </div>
              </div>

              {/* 6.3 Brief aan Jezelf */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  6.3 Brief aan jezelf
                </h3>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium mb-3">
                    Schrijf een korte brief aan jezelf, te openen over één jaar. 
                    Wat wil je dat je toekomstige zelf onthoudt over waar je nu staat?
                  </p>
                  <AnswerField
                    workshopId={workshopId}
                    questionId="q23"
                    placeholder="Lieve toekomstige ik,

Over een jaar lees je dit. Dit wil ik dat je onthoudt..."
                    rows={10}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Afsluiting */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <p className="text-lg text-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Dit huiswerk is geen examen. Er zijn geen goede of foute antwoorden. 
              Het is een uitnodiging om stil te staan, te voelen, en te erkennen hoeveel er 
              in een jaar kan verschuiven — zelfs wanneer die verschuivingen subtiel zijn.
            </p>
            <p className="text-foreground/90">
              We kijken ernaar uit om deze reis samen met je af te sluiten.
            </p>
            <div className="pt-4 text-muted-foreground italic">
              <p>Met warmte,</p>
              <p className="font-semibold text-foreground">Martien en Lonneke</p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link href="/workshop/3">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Workshop 3
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              Terug naar home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

