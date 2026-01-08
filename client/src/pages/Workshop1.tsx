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
  const workshop1Questions = [
    { 
      id: "w1-q1-welkom", 
      title: "Het Eerste Welkom",
      fullText: "Als je stilstaat bij je eigen begin (zwangerschap, geboorte), wat is dan het verhaal dat je lichaam je vertelt? Voelde je je welkom, of was er een sensatie van kou, stress of 'verkeerd' zijn? Als je lichaam zou kunnen spreken over het allereerste moment dat het 'besloot' om zich terug te trekken of te beschermen, wat zou het dan zeggen? En wat had het nodig gehad om die beslissing niet te hoeven nemen?"
    },
    { 
      id: "w1-q2-ladder", 
      title: "De Ladder naar de Hemel",
      fullText: "Herken jij bij jezelf de neiging om een 'ladder naar de hemel' uit te zetten? Heb je het gevoel dat je hier op aarde 'te gast' bent, of dat je eigenlijk ergens anders thuishoort? Wat zou er veranderen als je die ladder niet meer nodig had? Wat zou je moeten voelen, ervaren of onder ogen zien als je volledig op aarde zou landen?"
    },
    { 
      id: "w1-q3-systemisch", 
      title: "De Systemische Blik",
      fullText: "Is er in jouw familiesysteem sprake van 'dubbele werkelijkheid' (geheimen, verzwegen familieleden of onverwerkte rouw) waardoor jouw aandacht onbewust naar 'de andere kant' wordt getrokken? Als je zou ontdekken dat je onbewust trouw bent aan iemand die niet meer leeft of die uit het systeem is gestoten, wat zou je tegen die persoon willen zeggen? En wat zou je nodig hebben om je blik volledig naar het leven te kunnen richten?"
    },
    { 
      id: "w1-q4-muur", 
      title: "De Glazen Muur",
      fullText: "Herken je het patroon dat je relaties kiest die 'veilig' zijn omdat ze niet écht dichtbij komen (lange afstand, emotioneel onbereikbaar)? Of dat je zelf een onzichtbare muur optrekt zodra iemand te dichtbij komt? Wat is de ergste angst die je hebt over wat er zou gebeuren als iemand je werkelijk zou zien en kennen? En wat zou je kunnen winnen als je dat risico toch zou nemen?"
    },
    { 
      id: "w1-q5-afhaken", 
      title: "Contactbreuk en Terugtrekking",
      fullText: "Wanneer in een contact haak jij af? Wat doe je precies als je afhaakt? (Bijvoorbeeld: oogcontact verbreken, intellectueel gaan praten, of fysiek de kamer verlaten). Kun je het exacte moment herkennen waarop de 'schakelaar' omgaat? Wat voelde je net vóór dat moment, en wat probeer je te ontwijken door weg te gaan?"
    },
    { 
      id: "w1-q6-versmelting", 
      title: "Angst voor Versmelting",
      fullText: "Heb je wel eens ervaren dat liefde of intimiteit voelde alsof je zou verdwijnen, of alsof je 'opgeslokt' zou worden? Als liefde niet zou betekenen dat je verdwijnt, maar dat je juist méér jezelf zou kunnen zijn, hoe zou dat er dan uitzien? Wat zou de eerste kleine stap zijn om dat te onderzoeken?"
    },
    { 
      id: "w1-q7-tekort", 
      title: "Het Eerste Tekort (Oraal)",
      fullText: "Als je terugvoelt naar je vroege kindertijd: was er sprake van fysieke of emotionele schaarste? Was je moeder (of vader) écht beschikbaar, of was ze er wel fysiek maar niet emotioneel? Als je je voorstelt dat je als baby volledig gevoed en gezien was, hoe zou je leven er dan nu anders uitzien? Welk deel van jezelf zou dan meer ruimte hebben gekregen om te groeien?"
    },
    { 
      id: "w1-q8-leegte", 
      title: "Systemische Leegte",
      fullText: "Is er in jouw familiesysteem sprake van onverwerkt verlies of een generatielange 'tekortkoming' (armoede, oorlog, jong gestorven ouders)? Heb jij onbewust geprobeerd de leegte van je ouders te vullen? Als je de honger van eerdere generaties zou kunnen teruggeven aan wie het toebehoort, wat zou je dan tegen hen zeggen? En wat zou er in jou vrijkomen als je die last neerlegt?"
    },
    { 
      id: "w1-q9-nietgenoeg", 
      title: "Het Gevoel van 'Niet Genoeg'",
      fullText: "Op welke gebieden in je huidige leven voel je de pijnlijke overtuiging dat je tekortkomt, of dat je moet vechten voor kruimels? (Denk aan aandacht, geld, liefde). Welke innerlijke stem herhaalt dit verhaal van tekort? Van wie heb je die stem geleerd, en wat zou je tegen die stem willen zeggen vanuit het deel van jou dat wél weet dat je genoeg bent?"
    },
    { 
      id: "w1-q10-vampier", 
      title: "De Emotionele Vampier",
      fullText: "Herken je bij jezelf (of je partner) het patroon dat hoeveel aandacht er ook wordt gegeven, het nooit genoeg voelt? Dat er na een fijn moment direct weer een gevoel van leegte of claim ontstaat? Wat zou er gebeuren als je na een moment van ontvangen even zou pauzeren en het werkelijk zou laten binnenkomen? Wat maakt het zo moeilijk om te geloven dat het genoeg is?"
    },
    { 
      id: "w1-q11-ruilhandel", 
      title: "Ruilhandel in Aandacht",
      fullText: "Geef jij vaak aan anderen wat je eigenlijk zélf zo graag zou willen ontvangen? En voel je wrok als dit niet 'terugbetaald' wordt? Stel je voor dat je zou kunnen geven zonder iets terug te verwachten. Wat zou er dan veranderen in hoe je geeft? En durf je ook te ontvangen zonder daar iets voor 'terug te hoeven doen'?"
    },
    { 
      id: "w1-q12-recht", 
      title: "Destructief Recht",
      fullText: "Herken je momenten waarop je vindt dat je recht hebt op compensatie voor wat je hebt gemist? Uit zich dit in eisen, claimen, of boos worden als de ander niet levert? Als je het kleine kind in jou dat tekort is gekomen zou kunnen troosten, wat zou je tegen dat kind zeggen? En wat zou het werkelijk nodig hebben – niet van de ander, maar van jou?"
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
                18-19 april 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Fundament en Bestaansrecht
              </h1>
              <p className="text-xl text-muted-foreground">
                De schizoïde en orale structuur: Op aarde komen en de innerlijke bron voeden
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar workshopId="workshop1_jaar2" totalQuestions={workshop1Questions.length} />

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
            <DownloadButtons 
              workshopId="workshop1_jaar2"
              workshopTitle="Workshop 1: Fundament en Bestaansrecht"
              workshopDate="18-19 april 2026"
              questions={workshop1Questions}
            />
          </div>

          {/* Introduction */}
          <Card className="bg-gradient-to-br from-accent/30 to-background border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                We beginnen onze reis bij het absolute fundament: het bestaansrecht. De schizoïde structuur is de eerste verdediging die we als mens ontwikkelen, vaak al in de baarmoeder of vlak na de geboorte. Het is de reactie op de oervraag: Is het veilig voor mij om hier te zijn?
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Daarnaast onderzoeken we de orale structuur, die gaat over het recht om nodig te hebben. Het raakt aan onze diepste herinnering van afhankelijkheid en de angst dat er niet genoeg is: niet genoeg liefde, niet genoeg tijd, niet genoeg aandacht.
              </p>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-8">
            {workshop1Questions.map((q, index) => (
              <Card key={q.id} className="border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">
                      {index + 1}
                    </span>
                    {q.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground/80 leading-relaxed italic">
                    {q.fullText}
                  </p>
                  <AnswerField 
                    workshopId="workshop1_jaar2" 
                    questionId={q.id} 
                    placeholder="Schrijf hier je reflectie..."
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Helper */}
          <AIHelper 
            workshopId="workshop1_jaar2"
            workshopTitle="Fundament en Bestaansrecht"
            context="Deze workshop behandelt de schizoïde en orale karakterstructuren. De focus ligt op bestaansrecht, veiligheid, aarding en het recht om behoeften te hebben."
          />

          {/* Footer Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link href="/">
              <Button variant="ghost">Terug naar Home</Button>
            </Link>
            <Link href="/workshop/2">
              <Button className="gap-2">
                Volgende Workshop <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
