import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { ProgressBar } from "@/components/ProgressBar";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AnswerField } from "@/components/AnswerField";
import { AIHelper } from "@/components/AIHelper";

export default function Workshop5() {
  const [showOptional, setShowOptional] = useState(false);
  
  const workshopId = "workshop5";
  const workshopTitle = "Workshop 5: Authentieke Verbinding & Autonomie";
  const workshopDate = "30.01.2027 - 31.01.2027";
  const workshopSubtitle = "Tweedaagse verdieping in intimiteit en authenticiteit";
  
  // Alle vraag IDs voor progress tracking
  const questionIds = [
    // DAG 1: Autonomie
    "w5_d1_kindertijd_boos", "w5_d1_kindertijd_nee", "w5_d1_kindertijd_anders",
    "w5_d1_overtuigingen",
    "w5_d1_relaties_prettig", "w5_d1_relaties_initiatief", "w5_d1_relaties_nee",
    // DAG 1: Drie waarnemingsposities
    "w5_d1_positie1", "w5_d1_positie2", "w5_d1_positie3",
    // DAG 1: Brief aan schaduwkind
    "w5_d1_brief",
    // DAG 2: De taal van je lichaam - Deel 1
    "w5_d2_moment1", "w5_d2_moment2", "w5_d2_moment3",
    // DAG 2: De taal van je lichaam - Deel 2
    "w5_d2_brief_lichaam",
    // DAG 2: De taal van je lichaam - Deel 3
    "w5_d2_creatief",
    // DAG 2: Jane reflectie
    "w5_d2_jane_zin", "w5_d2_jane_herkenning", "w5_d2_jane_seizoen"
  ];

  const questions = questionIds.map((id, index) => ({
    id,
    title: `Vraag ${index + 1}`
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">{workshopTitle}</h1>
            <p className="text-lg text-muted-foreground italic mb-1">{workshopSubtitle}</p>
            <p className="text-muted-foreground">{workshopDate}</p>
          </div>

          <ProgressBar workshopId={workshopId} totalQuestions={questionIds.length} />
          <DownloadButtons workshopId={workshopId} workshopTitle={workshopTitle} workshopDate={workshopDate}
            questions={questions} />

          {/* Introductie */}
          <Card className="bg-gradient-to-br from-rose-50 to-background border-rose-200">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Beste deelnemers,
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Wat een reis hebben we samen al afgelegd! In de komende tweedaagse workshop gaan we dieper in op de thema's die jullie allemaal raken: de balans tussen hechting en autonomie, tussen aanpassing en authentiek zijn, en hoe dit doorwerkt in onze meest intieme relaties.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Jullie hebben allemaal het boek van Stefanie Stahl <strong>"Het innerlijke kind en de liefde"</strong> ontvangen. Dit weekend gaan we de theorie verbinden met jullie persoonlijke ervaring, met speciale aandacht voor hoe ons schaduwkind onze intimiteit beïnvloedt.
              </p>
            </CardContent>
          </Card>

          {/* Uitgebreide Inleiding */}
          <Card className="mt-8 bg-gradient-to-br from-purple-50 via-rose-50 to-background border-purple-200">
            <CardContent className="pt-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Heart className="h-6 w-6" />
                  De Universele Taal van Het Lichaam
                </h2>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    In onze lichamen dragen we verhalen. Niet alleen onze eigen verhalen, maar soms ook die van generaties voor ons. Ons lichaam onthoudt wat ons bewustzijn vergeet of verdringt. Het bewaart de vreugde van een eerste kus, maar ook de schrik van een ongewenste aanraking. Het kent het verschil tussen een hand die veiligheid biedt en één waarvan we terugdeinzen, zelfs als we niet begrijpen waarom.
                  </p>
                  <p>
                    Deze workshop nodigt je uit om de subtiele taal van je eigen lichaam te gaan ontdekken en eren. We gaan luisteren naar die kleine stemmetjes die fluisteren in de marge van ons bewustzijn. Sommigen van jullie zullen misschien voor het eerst die zachte, bijna onhoorbare stem horen die zegt: "Dit wil ik" of juist "Dit niet meer."
                  </p>
                  <p>
                    Er is moed voor nodig om die stemmen te erkennen. Nog meer moed om ze ruimte te geven. En de grootste moed van allemaal? Om te onderzoeken waar die stemmen vandaan komen.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-primary mb-3">De Balans tussen Hechting en Autonomie</h3>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    In intieme relaties bewegen we voortdurend tussen twee fundamentele behoeften: de behoefte aan verbinding (hechting) en de behoefte aan eigenheid (autonomie). Voor veel van ons is deze dans uit balans geraakt. Misschien leerden we als kind dat onze eigen wil gevaarlijk was, dat "nee" zeggen tot afwijzing leidde, of dat de ander gelukkig maken belangrijker was dan onze eigen behoeften.
                  </p>
                  <p>
                    Deze patronen werken door in onze meest intieme relaties. We kunnen ons lichaam als een instrument zien dat de ander moet pleasen, in plaats van als een bron van eigen verlangen en genot. We kunnen seks ervaren als een verplichting in plaats van als een geschenk aan onszelf én de ander.
                  </p>
                  <p>
                    Stefanie Stahl beschrijft in haar boek hoe overaangepaste mensen het contact met zichzelf verliezen zodra anderen in hun buurt zijn. Ze voelen zich voor 100% verantwoordelijk voor het succes van de relatie. Hun eigen lustgevoelens kunnen verdwijnen omdat ze zich zo sterk identificeren met de verlangens van hun partner.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Wat Deze Workshop Jou Biedt</h3>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
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
                          We verbinden de theorie van Stefanie Stahl met je persoonlijke geschiedenis. <strong>Waar komen je patronen vandaan?</strong>
                        </p>
                        <p className="leading-relaxed">
                          Je verkent vragen als: <em>"Mocht ik als kind boos zijn? Hoe gingen mijn ouders om met mijn 'nee'?"</em> Deze inzichten helpen je begrijpen waarom je nu reageert zoals je doet.
                        </p>
                        <p className="leading-relaxed italic text-rose-800">
                          "Het contact met jezelf verliezen zodra anderen in je buurt zijn" - herken je dit?
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
                          Door oefeningen en reflectie leer je <strong>de taal van je lichaam verstaan.</strong> Wat zegt het je eigenlijk?
                        </p>
                        <p className="leading-relaxed">
                          Je observeert: <em>"Wat voelde ik bij die aanraking? Was ik bij mezelf of vooral bezig met de ander?"</em> Je lichaam spreekt - leer het te horen.
                        </p>
                        <p className="leading-relaxed italic text-purple-800">
                          Dat kleine stemmetje dat fluistert: "Dit wil ik" of "Dit niet meer" - daar gaan we naar luisteren.
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
                          Je krijgt <strong>concrete tools</strong> om nieuwe patronen te ontwikkelen die meer ruimte geven aan je authentieke zelf.
                        </p>
                        <p className="leading-relaxed">
                          Van <em>"Ik moet de ander gelukkig maken"</em> naar <em>"Ik mag 'nee' zeggen zonder schuldgevoel."</em> Van aanpassing naar autonomie.
                        </p>
                        <p className="leading-relaxed italic text-amber-800">
                          Nieuwe permissies geven aan je schaduwkind: "Jouw lichaam en verlangens zijn belangrijk."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Een Verhaal van Moed en Healing</h3>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    Op dag 2 zullen we kennismaken met het verhaal van Jane Steckbeck. Jane begreep zeventien jaar lang niet waarom haar lichaam een taal sprak die ze zelf niet kon vertalen. Zeventien jaar van terugtrekking, van wegduwen, van een stem die zei "ga weg" tegen de man van wie ze hield.
                  </p>
                  <p>
                    Haar verhaal laat zien dat trauma zich kan verstoppen in de gewoonste gebaren, dat genezing mogelijk is zelfs na decennia, en dat de weg naar intimiteit soms door de donkerste kamers van ons verleden loopt. Maar vooral laat ze zien dat aan de andere kant van de schaamte niet nog meer schaamte wacht, maar vrijheid.
                  </p>
                  <p className="italic text-primary font-medium">
                    "Want dat is misschien wel Jane's grootste geschenk: ze laat zien dat de weg naar intimiteit begint bij het eerlijk zijn tegen jezelf."
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Veiligheid en Zelfcompassie</h3>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    Deze workshop raakt aan gevoelige thema's. Het is belangrijk dat je weet:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-1">•</span>
                      <span><strong>Je veiligheid staat voorop:</strong> Emotioneel, mentaal en spiritueel. Je mag pauzeren, stoppen, of aanpassen wat nodig is.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-1">•</span>
                      <span><strong>Er is geen goed of fout:</strong> Dit gaat over luisteren naar jezelf, niet over presteren of het "juiste" antwoord geven.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-1">•</span>
                      <span><strong>Privacy wordt gerespecteerd:</strong> Je deelt alleen wat voelt als een geschenk aan jezelf en de groep.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 mt-1">•</span>
                      <span><strong>Zelfcompassie is essentieel:</strong> Behandel wat opkomt zoals je een dierbare vriend zou behandelen.</span>
                    </li>
                  </ul>
                  <p className="mt-4 p-4 bg-rose-100 rounded-lg border border-rose-300 text-rose-900">
                    <strong>⚠️ Belangrijke opmerking:</strong> Als er heftige gevoelens of herinneringen opkomen tijdens deze workshop, adem dan diep, pauzeer indien nodig, en zoek steun. Je hoeft dit niet alleen te doen.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Jouw Reis Begint Nu</h3>
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    De komende twee dagen zijn een uitnodiging tot zelfontdekking. We gaan niet alleen Jane's verhaal beluisteren, maar vooral onderzoeken wat haar verhaal in ons wakker maakt. Welke deuren het opent. Welke muren het afbreekt. En vooral: welke permissie het ons geeft om onze eigen waarheid onder ogen te zien.
                  </p>
                  <p>
                    Je lichaam en je tempo zijn heilig. Pas aan wat nodig is. Neem de ruimte die je nodig hebt. En onthoud: aan de andere kant van deze ervaring wacht niet meer pijn, maar een dieper begrip van jezelf en je vermogen tot authentieke verbinding.
                  </p>
                  <p className="text-center italic text-primary font-semibold text-lg mt-6">
                    Draag zorg voor jezelf deze week. We zien elkaar aan de andere kant van deze ervaring.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leeswerk */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-primary">Leeswerk</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Uit het boek "Het innerlijke kind en de liefde":</h3>
                  <p className="text-foreground/90 leading-relaxed">
                    Lees voor dag 1 het hoofdstuk <strong>"Het onderdrukken van de eigen gevoelens" (blz. 70)</strong>. Dit deel is bijzonder relevant omdat het beschrijft hoe overaangepaste mensen:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 text-foreground/80">
                    <li>Het contact met zichzelf verliezen als anderen in hun buurt zijn</li>
                    <li>Zich voor 100% verantwoordelijk voelen voor het succes van de relatie</li>
                    <li>Seks meer als verplichting dan als plezier kunnen ervaren</li>
                    <li>Zich identificeren met de verlangens van hun partner, waardoor eigen lustgevoelens kunnen verdwijnen</li>
                  </ul>
                </div>
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="font-semibold text-amber-900 mb-2">📝 Belangrijkste opdracht uit het werkboek:</p>
                  <p className="text-sm text-amber-800">
                    <strong>Autonomie in relaties (blz. 53):</strong> Je verkent hoe autonoom je bent in relaties. Mocht je als kind een eigen wil hebben? Hoe ga je nu om met grenzen stellen? Dit vormt de basis voor de diepere opdrachten in deze workshop.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opdrachten: Autonomie en intimiteit */}
          <Card className="mt-8 border-2 border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-primary">De dans tussen aanpassing en autonomie</h2>
              </div>

              {/* Huiswerkopdracht 1: Hoe autonoom ben jij? */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Huiswerkopdracht 1: Hoe autonoom ben jij?</h3>
                  <p className="text-sm text-muted-foreground mb-4">(Gebaseerd op blz. 53 van het boek)</p>
                  <p className="text-foreground/90 mb-4">
                    Reflecteer thuis op de volgende vragen en schrijf je antwoorden op:
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">A. Je kindertijd:</h4>
                      <div className="space-y-4">
                        <div>
                        <p className="font-medium text-foreground mb-2">Mocht je als kind boos zijn en een eigen wil hebben?</p>
                        <AnswerField
                          questionId="w5_d1_kindertijd_boos"
                          workshopId={workshopId}
                        />
                      </div>
                        <div>
                        <p className="font-medium text-foreground mb-2">Hoe gingen je ouders om met jouw 'nee'?</p>
                        <AnswerField
                          questionId="w5_d1_kindertijd_nee"
                          workshopId={workshopId}
                        />
                      </div>
                        <div>
                        <p className="font-medium text-foreground mb-2">Wat gebeurde er als je iets anders wilde dan zij?</p>
                        <AnswerField
                          questionId="w5_d1_kindertijd_anders"
                          workshopId={workshopId}
                        />
                      </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">B. Je overtuigingen:</h4>
                      <p className="text-foreground/80 mb-3">Welke overtuigingen heb je hieruit ontwikkeld? Bijvoorbeeld:</p>
                      <ul className="list-disc list-inside space-y-1 text-foreground/70 text-sm mb-4">
                        <li>"Ik mag geen eigen wil hebben"</li>
                        <li>"Ik moet de ander gelukkig maken"</li>
                        <li>"Mijn behoeften zijn niet belangrijk"</li>
                        <li>"Ik mag niet teleurstellen"</li>
                      </ul>
                      <div>
                        <p className="font-medium text-foreground mb-2">Welke overtuigingen heb je ontwikkeld over je eigen wil en behoeften?</p>
                        <AnswerField
                          questionId="w5_d1_overtuigingen"
                          workshopId={workshopId}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">C. In je huidige relaties:</h4>
                      <div className="space-y-4">
                        <div>
                        <p className="font-medium text-foreground mb-2">Durf je te zeggen wat je wel/niet prettig vindt?</p>
                        <AnswerField
                          questionId="w5_d1_relaties_prettig"
                          workshopId={workshopId}
                        />
                      </div>
                        <div>
                        <p className="font-medium text-foreground mb-2">Voel je je vrij om initiatief te nemen?</p>
                        <AnswerField
                          questionId="w5_d1_relaties_initiatief"
                          workshopId={workshopId}
                        />
                      </div>
                        <div>
                        <p className="font-medium text-foreground mb-2">Kun je 'nee' zeggen zonder schuldgevoel?</p>
                        <AnswerField
                          questionId="w5_d1_relaties_nee"
                          workshopId={workshopId}
                        />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Huiswerkopdracht 2: De drie waarnemingsposities */}
                <div className="pt-6 border-t">
                  <h3 className="text-xl font-semibold text-primary mb-3">Huiswerkopdracht 2: De drie waarnemingsposities</h3>
                  <p className="text-sm text-muted-foreground mb-4">(Gebaseerd op blz. 112)</p>
                  <p className="text-foreground/90 mb-4">
                    Denk aan een recent moment van fysieke intimiteit (dit hoeft niet seksueel te zijn - het kan ook gaan om knuffelen, zoenen, aanraken):
                  </p>

                  <div className="space-y-4">
                    <div>
                        <p className="font-medium text-foreground mb-2">Positie 1 - Jouw perspectief: Wat voelde je? Was je bij jezelf of vooral bezig met de ander?</p>
                        <AnswerField
                          questionId="w5_d1_positie1"
                          workshopId={workshopId}
                        />
                      </div>
                    <div>
                        <p className="font-medium text-foreground mb-2">Positie 2 - Partner's perspectief: Hoe denk je dat jouw partner dit moment ervaarde?</p>
                        <AnswerField
                          questionId="w5_d1_positie2"
                          workshopId={workshopId}
                        />
                      </div>
                    <div>
                        <p className="font-medium text-foreground mb-2">Positie 3 - De neutrale observator: Bekijk de situatie van een afstand. Is er balans tussen geven en nemen? Zijn beide personen authentiek aanwezig?</p>
                        <AnswerField
                          questionId="w5_d1_positie3"
                          workshopId={workshopId}
                        />
                      </div>
                  </div>
                </div>

                {/* Brief aan schaduwkind */}
                <div className="pt-6 border-t">
                  <h3 className="text-xl font-semibold text-primary mb-3">Voor de workshop dag 1:</h3>
                  <p className="text-foreground/90 mb-4">
                    Schrijf een brief aan je schaduwkind over intimiteit. Begin met: <em>"Lieve [je naam als kind], ik wil je iets belangrijks vertellen over jouw lichaam en jouw verlangens..."</em>
                  </p>
                  <p className="text-foreground/80 mb-4">
                    Wees mild en liefdevol. Erken wat het kind heeft meegemaakt, maar geef het ook nieuwe permissie.
                  </p>
                  <div>
                        <p className="font-medium text-foreground mb-2">Brief aan je schaduwkind over intimiteit</p>
                        <AnswerField
                          questionId="w5_d1_brief"
                          workshopId={workshopId}
                          rows={8}
                        />
                      </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jane's verhaal en reflectie */}
          <Card className="mt-8 border-2 border-rose-300">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="h-6 w-6 text-rose-600" />
                <h2 className="text-2xl font-bold text-rose-600">Het terugvinden van jezelf - Jane's verhaal</h2>
              </div>

              {/* Introductie Jane's verhaal */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-primary">Het moment van stilte voor de storm</h3>
                <p className="text-foreground/90 leading-relaxed">
                  We hebben in de vorige oefening naar onze lichamen geluisterd. Naar die kleine stemmetjes die fluisteren in de marge van ons bewustzijn. Sommigen van jullie hebben misschien voor het eerst die zachte, bijna onhoorbare stem gehoord die zegt: "Dit wil ik" of juist "Dit niet meer."
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  Er is moed voor nodig om die stemmen te erkennen. Nog meer moed om ze ruimte te geven. En de grootste moed van allemaal? Om te onderzoeken waar die stemmen vandaan komen.
                </p>
              </div>

              {/* Jane's verhaal - kort excerpt */}
              <div className="bg-rose-50 p-6 rounded-lg border border-rose-200 mb-6">
                <h3 className="text-xl font-semibold text-rose-900 mb-4">Het terugvinden van mezelf</h3>
                <p className="text-sm text-rose-800 italic mb-4">Het verhaal van Jane die haar seksualiteit terugvindt</p>
                
                <div className="space-y-4 text-foreground/90">
                  <p className="leading-relaxed">
                    <em>"Tien jaar geleden stond ik in mijn keuken toen een gedachte me overviel die alles zou veranderen: ik zou de rest van mijn leven zonder seks kunnen leven en dat zou prima zijn. De schok van die gedachte - en het besef hoe gestoord dit eigenlijk was - dwong me eindelijk onder ogen te zien wat er al zeventien jaar speelde in mijn huwelijk..."</em>
                  </p>
                  <p className="leading-relaxed">
                    Jane Steckbeck begreep zeventien jaar lang niet waarom haar lichaam een taal sprak die ze zelf niet kon vertalen. Zeventien jaar van terugtrekking, van wegduwen, van een stem die zei "ga weg" tegen de man van wie ze hield.
                  </p>
                  <p className="leading-relaxed">
                    Haar verhaal laat zien dat trauma zich kan verstoppen in de gewoonste gebaren, dat genezing mogelijk is zelfs na decennia, en dat de weg naar intimiteit soms door de donkerste kamers van ons verleden loopt.
                  </p>
                </div>

                {/* Video link */}
                <div className="mt-6 p-4 bg-white rounded-lg border-2 border-rose-300">
                  <p className="font-semibold text-rose-900 mb-3">🎥 Bekijk Jane's volledige presentatie:</p>
                  <a 
                    href="https://www.youtube.com/watch?v=fFUpbOSCFxQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Jane's presentatie bekijken
                  </a>
                  <p className="text-sm text-muted-foreground mt-3">
                    Neem de tijd. Geef jezelf de ruimte om te voelen wat er opkomt. Dit is geen entertainment - dit is een vrouw die haar ziel blootlegt opdat anderen kunnen helen.
                  </p>
                </div>

                {/* Waarschuwing */}
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-300">
                  <p className="font-semibold text-amber-900 mb-2">⚠️ Zachte waarschuwing</p>
                  <p className="text-sm text-amber-800">
                    Jane's verhaal bevat expliciete beschrijvingen van seksueel trauma. Als je eigen geschiedenis hierdoor getriggerd kan worden, wees dan extra lief voor jezelf. Je mag pauzeren. Je mag stoppen. Je mag het samen met iemand bekijken. Je mag het overslaan en alleen het geschreven verhaal lezen.
                  </p>
                  <p className="text-sm text-amber-800 mt-2 font-medium">
                    Je veiligheid - emotioneel, mentaal, spiritueel - staat voorop.
                  </p>
                </div>
              </div>

              {/* Voorbereiding voor het kijken */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Voorbereiding voordat je kijkt:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                  <li>Zorg dat je ongestoord bent</li>
                  <li>Heb tissues bij de hand (niet omdat je moet huilen, maar voor als het gebeurt)</li>
                  <li>Zet een glas water naast je</li>
                  <li>Leg pen en papier klaar voor wat er opborrelt</li>
                </ul>
                <h4 className="font-semibold text-blue-900 mt-4 mb-3">Na het kijken:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                  <li>Geef jezelf minstens 10 minuten stilte</li>
                  <li>Schrijf één zin op die in je blijft resoneren</li>
                  <li>Vraag je af: Wat in Jane's verhaal herken ik? Wat niet? En wat roept weerstand op?</li>
                </ul>
              </div>

              {/* Huiswerkopdracht: De taal van je lichaam */}
              <div className="pt-6 border-t">
                <h3 className="text-xl font-semibold text-primary mb-4">Huiswerkopdracht: De taal van je lichaam</h3>
                <p className="text-foreground/90 mb-6">
                  Het verhaal dat we gelezen hebben laat zien hoe ons lichaam wijsheid draagt - soms in de vorm van bescherming, soms als een kompas naar healing. Deze workshop nodigen we je uit om de subtiele taal van je eigen lichaam te gaan ontdekken en eren.
                </p>

                {/* Deel 1: Observeren zonder oordeel */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Deel 1: Observeren zonder oordeel (dag 1-3)</h4>
                    <p className="text-foreground/80 mb-4">
                      Kies drie alledaagse momenten deze week waarin je fysiek contact hebt met een ander - dit kan zo simpel zijn als:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-foreground/70 text-sm mb-4">
                      <li>Een hand op je schouder in de supermarkt</li>
                      <li>Een omhelzing bij een begroeting</li>
                      <li>Het aanreiken van een voorwerp waarbij handen elkaar kort raken</li>
                    </ul>
                    <p className="text-foreground/80 mb-4">
                      Schrijf voor elk moment op: Wat zei je lichaam? (spanning, openheid, terugtrekking, warmte?) Welke stem hoorde je innerlijk? Was er verschil tussen wat je lichaam voelde en wat je deed?
                    </p>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-foreground mb-2">Moment 1: Beschrijf de situatie en wat je lichaam je vertelde</p>
                        <AnswerField
                          questionId="w5_d2_moment1"
                          workshopId={workshopId}
                          rows={8}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-2">Moment 2: Beschrijf de situatie en wat je lichaam je vertelde</p>
                        <AnswerField
                          questionId="w5_d2_moment2"
                          workshopId={workshopId}
                          rows={8}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-2">Moment 3: Beschrijf de situatie en wat je lichaam je vertelde</p>
                        <AnswerField
                          questionId="w5_d2_moment3"
                          workshopId={workshopId}
                          rows={8}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deel 2: De brief van je lichaam */}
                  <div className="pt-6 border-t">
                    <h4 className="font-semibold text-lg mb-3">Deel 2: De brief van je lichaam (dag 4-5)</h4>
                    <p className="text-foreground/80 mb-4">
                      Stel je voor dat je lichaam je een brief kan schrijven. Begin met: <em>"Lieve [je naam], er is iets wat ik je al heel lang wil vertellen..."</em>
                    </p>
                    <p className="text-foreground/80 mb-4">
                      Laat je lichaam het woord nemen. Wat zou het zeggen over:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-foreground/70 text-sm mb-4">
                      <li>Momenten waarop het je heeft beschermd</li>
                      <li>Wat het nodig heeft om zich veilig te voelen</li>
                      <li>Een herinnering aan een moment van pure vreugde in verbinding</li>
                    </ul>
                    <div>
                      <p className="font-medium text-foreground mb-2">De brief van je lichaam</p>
                      <AnswerField
                        questionId="w5_d2_brief_lichaam"
                        workshopId={workshopId}
                        rows={8}
                      />
                    </div>
                  </div>

                  {/* Deel 3: Het kleine stemmetje */}
                  <div className="pt-6 border-t">
                    <h4 className="font-semibold text-lg mb-3">Deel 3: Het kleine stemmetje (dag 6-7)</h4>
                    <p className="text-foreground/80 mb-4">
                      In het verhaal hoorden we over "dat kleine stemmetje" dat fluisterde: "Ik wil dit."
                    </p>
                    <p className="text-foreground/80 mb-4">
                      <strong>Creatieve expressie - kies één:</strong>
                    </p>
                    <div className="space-y-3 mb-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-medium mb-1">Optie A: Collage</p>
                        <p className="text-foreground/70">Maak een collage van twee kanten: Links wat je kleine stemmetje vroeger fluisterde, rechts wat het nu fluistert, in het midden de brug ertussen.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-medium mb-1">Optie B: Beweging</p>
                        <p className="text-foreground/70">Zet muziek op en beweeg 5 minuten: begin met bewegingen van bescherming, eindig met bewegingen van vrijheid. Schrijf daarna een kort gedicht over de overgang.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-medium mb-1">Optie C: Dialoog</p>
                        <p className="text-foreground/70">Schrijf een dialoog tussen het deel van jou dat beschermt en het deel dat wil openen. Laat ze elkaar echt horen.</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Beschrijf je creatieve expressie (welke optie koos je en wat kwam eruit voort?)</p>
                      <AnswerField
                        questionId="w5_d2_creatief"
                        workshopId={workshopId}
                        rows={8}
                      />
                    </div>
                  </div>
                </div>

                {/* Belangrijke notities */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Belangrijke notities:</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>🌟 <strong>Veiligheid eerst:</strong> Als er heftige gevoelens opkomen, pauzeer. Adem. Zoek steun als nodig.</li>
                    <li>🌟 <strong>Geen goed of fout:</strong> Dit gaat over luisteren, niet over presteren.</li>
                    <li>🌟 <strong>Privacy:</strong> Je deelt alleen wat voelt als een geschenk aan jezelf en de groep.</li>
                    <li>🌟 <strong>Zelfcompassie:</strong> Behandel wat opkomt zoals je een dierbare vriend zou behandelen.</li>
                  </ul>
                </div>
              </div>

              {/* Reflectievragen na Jane's verhaal */}
              <div className="pt-6 border-t">
                <h3 className="text-xl font-semibold text-primary mb-4">Reflectie na Jane's verhaal</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground mb-2">Schrijf één zin op die in je blijft resoneren uit Jane's verhaal</p>
                    <AnswerField
                      questionId="w5_d2_jane_zin"
                      workshopId={workshopId}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Wat in Jane's verhaal herken je? Wat niet? En wat roept weerstand op?</p>
                    <AnswerField
                      questionId="w5_d2_jane_herkenning"
                      workshopId={workshopId}
                      rows={8}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Reflectievraag: Als mijn vermogen tot intimiteit een seizoen was, welk seizoen is het nu? En naar welk seizoen beweegt het zich toe?</p>
                    <AnswerField
                      questionId="w5_d2_jane_seizoen"
                      workshopId={workshopId}
                      rows={8}
                    />
                  </div>
                </div>
              </div>

              {/* Tot slot */}
              <div className="mt-8 p-6 bg-gradient-to-br from-rose-100 to-purple-100 rounded-lg border-2 border-rose-300">
                <h4 className="font-semibold text-rose-900 mb-3">Tot slot</h4>
                <p className="text-foreground/90 leading-relaxed mb-3">
                  In de workshop gaan we niet Jane's verhaal analyseren. We gaan onderzoeken wat haar verhaal in ons wakker maakt. Welke deuren het opent. Welke muren het afbreekt. En vooral: welke permissie het ons geeft om onze eigen waarheid onder ogen te zien.
                </p>
                <p className="text-foreground/90 leading-relaxed mb-3">
                  Want dat is misschien wel Jane's grootste geschenk: ze laat zien dat aan de andere kant van de schaamte niet nog meer schaamte wacht, maar vrijheid. Een vrijheid die fluistert, en later vreedzaam zegt:
                </p>
                <p className="text-rose-900 font-semibold text-lg italic text-center">
                  "Ja, dit."
                </p>
                <p className="text-foreground/80 text-sm mt-4 text-center">
                  Draag zorg voor jezelf deze week. We zien elkaar aan de andere kant van deze ervaring.
                </p>
              </div>
            </CardContent>
          </Card>



          {/* Navigatie */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t">
            <Link href="/workshop/4">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Workshop 4
              </Button>
            </Link>
            <Link href="/workshop/6">
              <Button className="gap-2">
                Workshop 6
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
