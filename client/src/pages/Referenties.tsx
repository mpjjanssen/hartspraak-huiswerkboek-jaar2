import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Heart, Quote, Users, Shield, Sparkles, TrendingUp, Baby, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TestimonialMap from "@/components/TestimonialMap";

export default function Referenties() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    story: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.title || !formData.story) {
      toast.error("Vul alle velden in");
      return;
    }

    try {
      // Send to API
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.error || "Er ging iets mis. Probeer het later opnieuw.");
        return;
      }

      // Show success message
      toast.success("Bedankt voor het delen van je ervaring! We nemen contact met je op.");
      
      // Reset form and close dialog
      setFormData({ name: "", email: "", title: "", story: "" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Er ging iets mis. Controleer je internetverbinding en probeer het opnieuw.");
    }
  };

  const testimonials = [
  {
    id: 1,
    name: "Suzanne Mol",
    date: "Apr 18, 2025",
    rating: 5,
    title: "Geen quick fix",
    content: [
      "Toen ik me twee jaar geleden voor het eerst aanmeldde voor een weekend bij Hartspraak, dacht ik stiekem: \"Ik ga gewoon één keer, voor een soort quick fix.\" Dat bleek natuurlijk een illusie – en gelukkig maar. Wat ik daar aantrof, ging zoveel dieper dan ik ooit had kunnen bedenken.",
      "Vanaf dat allereerste weekend werd ik geraakt door de magie van het groepswerk. Hoe je niet alleen leert van je eigen proces, maar ook van de verhalen, spiegels en ervaringen van anderen. Alles mocht er zijn. Alles wás er.",
      "Onder de liefdevolle, scherpe en integere begeleiding van Martien en Lonneke voelde ik me veilig en gedragen om echt te mogen zakken – in mezelf, in mijn gevoel, in dat wat gezien wilde worden. Wat een zegen om twee jaar lang onderdeel te mogen zijn van een groep waarbinnen kwetsbaarheid kracht werd, en waar ont-moeten ruimte gaf aan wie we werkelijk zijn.",
      "Was ik 'klaar' na dat eerste weekend? Nee. En ben ik na twee jaar dan wél klaar? Ook niet – want persoonlijke ontwikkeling stopt nooit. Maar wat ik in deze twee jaar heb meegenomen is onbetaalbaar: inzichten, handvatten, zachtheid, kracht, én vooral een diepgeworteld besef dat ik er mag zijn. Dat ik goed ben zoals ik ben.",
    ]
  },
  {
    id: 2,
    name: "Sofie Porro",
    date: "Jan 02, 2025",
    rating: 5,
    title: "Een rijkdom en wijsheid die ik meeneem de rest van mijn leven in",
    content: [
      "Hartspraak heeft ervoor gezorgd dat ik op hele cruciale punten in mijn leven weer contact kon krijgen met mezelf, mijn eigen intuïtie en mijn innerlijke kracht, zodat ik belangrijke en moeilijke keuzes kon maken, die mij hielpen op mijn levenspad. Mijn bewustzijn en gevoelslagen die bij Hartspraak zijn geopend, zijn ongekend. Dit traject zou ik ieder mens aanraden, om jezelf en je innerlijk kind tot in de kern te gaan leren kennen om steviger, stabieler en zachter te worden.",
      "Mijn worstelen met klachten van depressie, angst en burn-out kwam uiteindelijk voort uit onverwerkte oude gevoelens die geen veilige bedding vonden om tot uiting te komen. Die bedding heb ik bij Hartspraak wel gevonden. Vooral ook het groepswerk, in zoveel veiligheid en steun mezelf aan anderen laten zien, dat is heel helend geweest. Super spannend, maar het grootste cadeau wat ik mezelf kon geven. En door de veiligheid in de groep, viel de spanning snel weg.",
      "Ik ben er ontzettend dankbaar voor! Momenteel ben ik zelf lichaamsgericht psychotherapeut in opleiding en bouw ik voort op alles wat ik bij Hartspraak heb mogen leren. Een rijkdom en wijsheid die ik meeneem de rest van mijn leven in.",
    ]
  },
  {
    id: 3,
    name: "Angela",
    date: "Dec 29, 2024",
    rating: 5,
    title: "Vier dagen met jezelf!",
    content: [
      "Vier dagen met jezelf, met zo min mogelijk afleiding, geen gsm, pc of tv. Een magische, innerlijke reis onder deskundige begeleiding van Martien. Een cadeautje voor mezelf.",
      "Een aanrader voor iedereen die naar de diepere lagen in zichzelf wil kijken of toe is om onverwerkte trauma's 'aan te kijken'. Deze ervaring heeft mijn leven zoveel rijker gemaakt.",
    ]
  },
  {
    id: 4,
    name: "Elisa Bisschop",
    date: "Dec 21, 2024",
    rating: 5,
    title: "De reis die ik mocht maken met Martien",
    content: [
      "Ik kwam voor de jaar groep. Maar zat zo vast met mezelf dat ik eerst een intensieve heb gedaan. Ik mocht leren woorden te geven aan alles wat ik voelde. Ik leerde geweldloos te communiceren. Maar wat ik vooral leerde is wie ik ben en hoe ik mezelf terug kan vinden als het leven uitdagingen geeft. Of juist bij mezelf te blijven als het leven je uitdaagd. Ik voelde mij gedragen door de groep en door de begeleiders.",
      "Ik gun iedereen een beetje Martien in je leven!",
    ]
  },
  {
    id: 5,
    name: "Hans Korteweg",
    date: "Oct 23, 2024",
    rating: 5,
    title: "De heilige ruimte van het hart",
    content: [
      "Martien en ik kennen elkaar iets meer dan 50 jaar. We ontmoetten elkaar in een commune in Utrecht, die ik zou gaan begeleiden. Daar kwam niet veel van terecht, tenminste niet qua begeleiding, maar we werden wel bijna meteen vrienden. Hij ging al snel met mij mee groepen begeleiden, hij kwam bij mij in de leer, en bleek een uitzonderlijk talent te zijn.",
      "Martien en ik zijn beiden geraakt door de uitspraak van Jezus: 'Laat de kinderkens tot mij komen.' Hij zegt: 'Alle leermeesters, alle ervaringen – van vreugde tot pijn – hebben me naar dit moment geleid. Laat de kinderen bij mij komen is voor mij meer dan een Bijbels citaat, het is een levensfilosofie geworden. Een roep om al onze innerlijke kinderen, van het diepst gewonde tot het meest stralende, toe te staan in de heilige ruimte van ons hart.'",
    ]
  },
  {
    id: 6,
    name: "Anne Hopkins",
    date: "Jun 16, 2023",
    rating: 5,
    title: "I am in my 70s...",
    content: [
      "I am in my 70s and throughout my life, have always had an interest and fascination in 'how the mind works'. But I had never taken any step in be the recipient of these techniques, until a close friend told me about the positive experiences of doing an intensive with Martien.",
      "However it turned out to be 'life changing'. Martien gave me the support, understanding and skills to overcome a recent trauma and for me to make contact, for the first time, with my damaged shadow child, to appreciate the damage that had taken place. And then to know how to care for it.",
      "I left the intensive feeling overwhelmed with positive thoughts, the world seemed a different pleasurable place. Obviously life has had its difficult times and old patterns have dominated now and again. But Martien has been there and his support is amazing. I now feel that my life is about growth, my age is irrelevant...",
    ]
  },
  {
    id: 7,
    name: "Tim Van den Heuvel",
    date: "Jan 07, 2023",
    rating: 5,
    title: "En het voelt een beetje als thuiskomen",
    content: [
      "Na jaren van zoeken, verschillende vormen van therapie, coaching en veel zelfhulpboeken ben ik uiteindelijk door een ongeluk met de MTB letterlijk stil gezet. Ik ben best eigenwijs en wil het liefst alles zelf en het liefst veilig en alleen doen en vind het lastig om hulp te vragen. Daarom heeft het ongeveer twee jaar geduurd voordat via een vriendin en tevens goede coach ik uiteindelijk bij Martien terecht ben gekomen voor een intensive.",
      "Tijdens de intensive bij Martien voelde ik in een sessie diepe oude pijnen loskomen op verschillende plaatsen in mijn lichaam. Oude blokkades die zich uitten in een vorm van pijn. Na de intensive heb ik me op aanraden van Martien aangesloten bij de hartspraak workshop groep. Ik voelde een behoorlijke weerstand om dit te gaan doen en alles in mij wilde er niet aan, dit was voor mij het teken dat ik het misschien juist moest gaan doen.",
      "Eenmaal in de groep heb ik mij keer op keer verbaasd over de kennis en kunde van Martien en Lonneke en de kracht van het werken in een groep. De intensive bij Martien in combinatie met het werk in de hartspraak groep is een van de belangrijkste en beste keuzes geweest die ik in de afgelopen 45 jaar voor mezelf heb gemaakt. Ik heb heel duidelijk het gevoel dat ik op de goede weg ben, en het voelt een beetje als thuiskomen.",
    ]
  },
  {
    id: 8,
    name: "Patrick Wedding",
    date: "Dec 23, 2022",
    rating: 5,
    title: "I can't wait for the next Intensive",
    content: [
      "I can't wait for the next Intensive... Martien is a gifted therapist and I am very grateful that I found him. He has an amazing ability to really see you and to help you see yourself. His insights are sharp, deep and helpful.",
    ]
  },
  {
    id: 9,
    name: "Serge R",
    date: "Dec 23, 2022",
    rating: 5,
    title: "Martien is huisleverancier voor mijn heling",
    content: [
      "Martien is huisleverancier voor mijn heling. Ik heb verschillende therapieën en therapeuten bezocht en niemand komt in de buurt van Martien. Hij is authentiek, eerlijk, scherp en liefdevol. Hij heeft een ongelooflijke gave om je te zien en te voelen. Ik ben hem zeer dankbaar voor alles wat hij voor mij heeft gedaan en nog steeds doet.",
    ]
  },
  {
    id: 10,
    name: "Kim Wedding",
    date: "Dec 21, 2022",
    rating: 5,
    title: "Meest bijzondere ervaring in mijn leven!",
    content: [
      "Meest bijzondere ervaring in mijn leven! Martien is een zeer begaafd therapeut met een groot hart. Hij heeft mij geholpen om mijn schaduwkind te ontmoeten en te helen. Ik ben hem daar zeer dankbaar voor. Ik kan Martien van harte aanbevelen aan iedereen die op zoek is naar diepe healing en transformatie.",
    ]
  },
  {
    id: 11,
    name: "Anke de Bruijn",
    date: "May 03, 2022",
    rating: 5,
    title: "Intensieve dagen",
    content: [
      "Intensieve dagen met Martien hebben mij enorm geholpen. Hij heeft een bijzondere gave om precies te voelen wat er speelt en wat nodig is. Zijn begeleiding is warm, scherp en effectief. Ik ben hem zeer dankbaar voor zijn hulp en kan hem van harte aanbevelen.",
    ]
  },
  {
    id: 12,
    name: "Gary Veerman",
    date: "Jul 05, 2021",
    rating: 5,
    title: "Voor mensen met psychische klachten, maar ook voor iedereen die zichzelf beter wil leren kennen",
    content: [
      "Ik heb bij Martien een intensive gevolgd en dat was een zeer waardevolle ervaring. Hij heeft mij geholpen om dieper in contact te komen met mezelf en mijn emoties. Zijn aanpak is professioneel, liefdevol en effectief. Ik kan Martien van harte aanbevelen aan iedereen die op zoek is naar persoonlijke groei en healing.",
    ]
  },
  {
    id: 13,
    name: "Niels Langedijk",
    date: "Sep 13, 2019",
    rating: 5,
    title: "Dit is de plek om jezelf beter te leren begrijpen",
    content: [
      "Dit is de plek om jezelf beter te leren begrijpen en te helen. Martien is een zeer ervaren therapeut die je helpt om in contact te komen met je innerlijk kind en oude pijn te verwerken.",
    ]
  },
  {
    id: 14,
    name: "Franka van der Linden",
    date: "Mar 12, 2019",
    rating: 5,
    title: "Al 30 jaar zocht ik hulp bij reguliere hulpverleners",
    content: [
      "Al 30 jaar zocht ik hulp bij reguliere hulpverleners, maar niemand kon mij echt helpen. Tot ik Martien ontmoette. Hij heeft mij geholpen om eindelijk de kern van mijn problemen te bereiken en te helen. Zijn aanpak is uniek en zeer effectief. Ik ben hem enorm dankbaar en kan hem van harte aanbevelen.",
    ]
  },
  {
    id: 15,
    name: "Kees de Boer",
    date: "Feb 22, 2019",
    rating: 5,
    title: "Vijfdaagse Intensive en de jaargroep 'Het kind in je'",
    content: [
      "De vijfdaagse intensive en de jaargroep 'Het kind in je' bij Martien waren zeer waardevolle ervaringen. Martien heeft een bijzondere gave om je te helpen om in contact te komen met je innerlijk kind en oude pijn te verwerken. Zijn begeleiding is professioneel, warm en effectief. Ik kan Martien van harte aanbevelen.",
    ]
  },
  {
    id: 16,
    name: "Maria",
    date: "Sep 16, 2018",
    rating: 5,
    title: "Jaargroep Power of the heart",
    content: [
      "De jaargroep 'Power of the heart' bij Martien was een zeer waardevolle ervaring. Ik heb veel geleerd over mezelf en mijn patronen. Martien is een zeer ervaren therapeut die je helpt om dieper in contact te komen met jezelf en je hart. Ik kan hem van harte aanbevelen.",
    ]
  },
  {
    id: 17,
    name: "Marjon",
    date: "Sep 16, 2018",
    rating: 5,
    title: "5 Daagse individuele Intensive",
    content: [
      "De 5 daagse individuele intensive bij Martien was een zeer intense en waardevolle ervaring. Martien heeft mij geholpen om diep in contact te komen met mijn schaduwkind en oude pijn te verwerken. Zijn begeleiding is professioneel, warm en zeer effectief. Ik ben hem enorm dankbaar en kan hem van harte aanbevelen.",
    ]
  },
  {
    id: 18,
    name: "Simon Porro",
    date: "Dec 13, 2017",
    rating: 5,
    title: "Zonder enige terughoudendheid zou ik Martien aanbevelen",
    content: [
      "Ik ken Martien Janssen al ruim 15 jaar. In 2002 nam ik deel aan een jaargroep onder zijn begeleiding. Ik was onder de indruk van de 'tovenarij' die hij bedreef om de deelnemers aan de jaargroep tot inzicht te laten komen, hen nieuwe perspectieven te laten ontdekken, of om zich te openen en lang onderdrukte gevoelens toe te laten en eindelijk te integreren.",
      "Martien's tovenarij baseert naar mijn inschatting op vele, vele jaren therapeutische ervaring en intuïtief weten wat nodig is om zijn cliënt een stap te laten maken richting heling. Dat ik deze weg ben gegaan is absoluut toe te schrijven aan de buitengewoon warme, invoelende, scherpe en intuïtieve therapeutische vaardigheden van Martien. Ik voelde me onder zijn begeleiding gezien en begrepen en ik voelde me veilig genoeg om me over te geven aan het proces.",
      "Zonder enige terughoudendheid zou ik Martien aanbevelen als spiritueel / therapeutisch coach aan eenieder die is vastgelopen of worstelt met een levensthema.",
    ]
  },
];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/holding-heart-stone.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Wat deelnemers zeggen
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Ontdek hoe de Hartspraak workshops anderen hebben geholpen op hun reis naar zelfontdekking, healing en authentieke verbinding.
            </p>
          </div>
        </div>
      </section>

      {/* Key Themes Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Wat deelnemers ervaren
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                De meest voorkomende thema's uit 18 testimonials
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Theme 1: Zelfontdekking */}
              <Card className="bg-background border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Zelfontdekking</h3>
                  <div className="text-3xl font-bold text-primary mb-2">78%</div>
                  <p className="text-sm text-foreground/70">
                    Jezelf leren kennen, inzicht in eigen patronen en bewustzijnsontwikkeling
                  </p>
                </CardContent>
              </Card>

              {/* Theme 2: Begeleiding */}
              <Card className="bg-background border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Begeleiding</h3>
                  <div className="text-3xl font-bold text-primary mb-2">61%</div>
                  <p className="text-sm text-foreground/70">
                    Expertise van Martien en Lonneke, professionele ondersteuning
                  </p>
                </CardContent>
              </Card>

              {/* Theme 3: Groepswerk */}
              <Card className="bg-background border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Groepswerk</h3>
                  <div className="text-3xl font-bold text-primary mb-2">50%</div>
                  <p className="text-sm text-foreground/70">
                    Kracht van de groep, leren van anderen en gedeelde ervaringen
                  </p>
                </CardContent>
              </Card>

              {/* Theme 4: Emoties */}
              <Card className="bg-background border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Emoties</h3>
                  <div className="text-3xl font-bold text-primary mb-2">50%</div>
                  <p className="text-sm text-foreground/70">
                    Oude pijn verwerken, gevoelens toelaten en trauma's helen
                  </p>
                </CardContent>
              </Card>

              {/* Theme 5: Veiligheid */}
              <Card className="bg-background border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Veiligheid</h3>
                  <div className="text-3xl font-bold text-primary mb-2">39%</div>
                  <p className="text-sm text-foreground/70">
                    Veilige ruimte, gedragen voelen en vertrouwen
                  </p>
                </CardContent>
              </Card>

              {/* Theme 6: Innerlijk Kind */}
              <Card className="bg-background border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Baby className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Innerlijk Kind</h3>
                  <div className="text-3xl font-bold text-primary mb-2">39%</div>
                  <p className="text-sm text-foreground/70">
                    Contact met je innerlijk kind en schaduwkind helen
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <TestimonialMap />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 md:p-10">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-6">
                    {testimonial.title}
                  </h3>

                  {/* Content */}
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    {testimonial.content.map((paragraph, index) => (
                      <p key={index} className="text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="font-semibold text-lg text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deel uw ervaring knop */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8 py-6 text-lg">
                  <Send className="mr-2 h-5 w-5" />
                  Deel uw ervaring
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Deel uw ervaring met Hartspraak</DialogTitle>
                  <DialogDescription>
                    Uw ervaring kan anderen inspireren op hun reis naar zelfontdekking en healing.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Naam *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Uw naam"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="uw.email@voorbeeld.nl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Titel van uw ervaring *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Bijvoorbeeld: 'Een levensveranderende ervaring'"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="story">Uw verhaal *</Label>
                    <Textarea
                      id="story"
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      placeholder="Deel uw ervaring met de Hartspraak workshops. Wat heeft het voor u betekend? Hoe heeft het uw leven veranderd?"
                      rows={8}
                      required
                    />
                  </div>

                  <div className="flex gap-3 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Annuleren
                    </Button>
                    <Button type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Verstuur
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Notitie voor meer referenties */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-lg text-foreground/80">
                  💬 <strong>Meer ervaringen van deelnemers</strong> vind je op{" "}
                  <a
                    href="https://www.hartspraak.com/blank-8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Referenties - Hartspraak.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Klaar om je eigen reis te beginnen?
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              De workshops van Hartspraak bieden een veilige ruimte voor persoonlijke groei, healing en authentieke verbinding. 
              Ontdek welke workshop bij jou past.
            </p>
            <div className="pt-4">
              <a href="/" className="inline-block">
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                  Bekijk de workshops
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
