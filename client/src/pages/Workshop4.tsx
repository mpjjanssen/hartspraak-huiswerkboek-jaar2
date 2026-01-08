import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Heart } from "lucide-react";

export default function Workshop4() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/">
                <span className="hover:text-primary cursor-pointer">Home</span>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Workshop 4</span>
            </div>
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                21-22 november 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Integratie en Afronding
              </h1>
              <p className="text-xl text-muted-foreground">
                Welke structuur met welke structuur wel of niet kan, jaarafsluiting en integratie
              </p>
            </div>
          </div>

          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-primary" />
                De Reis van het Tweede Jaar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                In deze laatste workshop van het tweede jaar brengen we alle draden bij elkaar. We hebben de diepte van de zes karakterstructuren verkend en hun maskers leren herkennen.
              </p>
              <div className="bg-accent/20 p-6 rounded-lg space-y-4">
                <h3 className="font-bold text-xl">Thema's van dit weekend:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Interactie:</strong> Hoe reageren de verschillende structuren op elkaar? Waar liggen de kansen en waar de valkuilen in contact?</li>
                  <li><strong>Jaarafsluiting:</strong> Terugblikken op de persoonlijke groei en de beweging van 'masker' naar 'wezen'.</li>
                  <li><strong>Integratie:</strong> Hoe neem je de geleerde lessen mee in je dagelijks leven en relaties?</li>
                </ul>
              </div>
              <p className="italic text-muted-foreground">
                "De reis eindigt niet hier, maar krijgt een nieuwe vorm in je dagelijks bestaan."
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-8">
            <Link href="/">
              <Button size="lg" className="px-8">Terug naar het Overzicht</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
