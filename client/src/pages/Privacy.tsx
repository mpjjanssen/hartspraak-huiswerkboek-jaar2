import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, EyeOff, Server, Key } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Privacy & Beveiliging</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jouw privacy is heilig. Hier leggen we uit hoe we je persoonlijke data beschermen.
          </p>
        </div>

        {/* End-to-End Encryption */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              End-to-End Encryptie
            </CardTitle>
            <CardDescription>
              Je antwoorden en AI conversaties zijn volledig versleuteld
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Alle persoonlijke data die je invoert (antwoorden op reflectievragen en AI conversaties) 
              worden <strong>versleuteld</strong> voordat ze naar de server worden gestuurd.
            </p>
            
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Key className="w-4 h-4" />
                Hoe werkt het?
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Je logt in met je email en wachtwoord</li>
                <li>Een unieke encryptie-sleutel wordt gegenereerd voor jouw sessie</li>
                <li>Al je antwoorden en conversaties worden versleuteld met deze sleutel</li>
                <li>Alleen versleutelde data wordt opgeslagen op de server</li>
                <li>Alleen jij kunt je data ontsleutelen (met je inlog)</li>
              </ol>
            </div>

            <p className="text-sm text-muted-foreground">
              <strong>Technisch:</strong> We gebruiken AES-256 encryptie met een unieke initialization vector (IV) 
              per data item. De encryptie-sleutel wordt afgeleid van je sessie token met PBKDF2.
            </p>
          </CardContent>
        </Card>

        {/* What Admins Can/Cannot See */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Wat Beheerders Wel en Niet Kunnen Zien
            </CardTitle>
            <CardDescription>
              Transparantie over toegang tot je data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Can See */}
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Wel Zichtbaar
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Je email adres</li>
                  <li>Wanneer je voor het laatst actief was</li>
                  <li>Hoeveel vragen je hebt beantwoord</li>
                  <li>Hoeveel AI conversaties je hebt gevoerd</li>
                  <li>Algemene gebruiksstatistieken</li>
                </ul>
              </div>

              {/* Cannot See */}
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 flex items-center gap-2">
                  <EyeOff className="w-4 h-4" />
                  Niet Zichtbaar
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>De inhoud van je antwoorden</li>
                  <li>De inhoud van je AI conversaties</li>
                  <li>Je persoonlijke reflecties</li>
                  <li>Je gevoelens en gedachten</li>
                  <li>Enige versleutelde data</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Waarom?</strong> Beheerders kunnen alleen metadata zien om de service te onderhouden 
                en te verbeteren. Ze hebben <strong>geen toegang</strong> tot je versleutelde content omdat 
                ze je encryptie-sleutel niet hebben.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Storage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Data Opslag
            </CardTitle>
            <CardDescription>
              Waar en hoe je data wordt bewaard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Je versleutelde data wordt opgeslagen in een beveiligde database. Elke keer dat je inlogt, 
              wordt je data opgehaald en ontsleuteld in je browser - nooit op de server.
            </p>
            
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Waarom cloud opslag?</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Door je antwoorden veilig in de cloud op te slaan, kun je <strong>overal werken</strong>: 
                op je laptop, een andere computer, smartphone of tablet. Je hoeft je geen zorgen te maken 
                over verloren data als je apparaat kapot gaat. Je werk is altijd beschikbaar, waar je ook bent.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Backup & Herstel</h4>
              <p className="text-sm">
                We maken regelmatig backups van de database. Deze backups bevatten ook alleen versleutelde data. 
                Als je je wachtwoord vergeet, kunnen we je data <strong>niet herstellen</strong> omdat we je 
                encryptie-sleutel niet hebben.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Data Verwijdering</h4>
              <p className="text-sm">
                Je kunt op elk moment je account en alle bijbehorende data verwijderen. Dit is onomkeerbaar.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Veelgestelde Vragen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Kan Hartspraak mijn antwoorden lezen?</h4>
              <p className="text-sm text-muted-foreground">
                Nee. Je antwoorden zijn versleuteld met een sleutel die alleen jij hebt (afgeleid van je sessie). 
                Hartspraak beheerders kunnen alleen zien dat je antwoorden hebt gegeven, maar niet wat je hebt geschreven.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Wat gebeurt er als ik mijn wachtwoord vergeet?</h4>
              <p className="text-sm text-muted-foreground">
                Je kunt je wachtwoord resetten via de "Wachtwoord vergeten" link. Let op: als je een nieuw wachtwoord 
                instelt, wordt een nieuwe encryptie-sleutel gegenereerd. Oude versleutelde data kan dan mogelijk niet 
                meer worden ontsleuteld.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Wordt mijn data gedeeld met derden?</h4>
              <p className="text-sm text-muted-foreground">
                Nee, nooit. Je versleutelde data blijft binnen het Hartspraak systeem. We delen geen persoonlijke 
                informatie met derden, behalve waar wettelijk verplicht.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Hoe veilig is AES-256 encryptie?</h4>
              <p className="text-sm text-muted-foreground">
                AES-256 is een militaire-grade encryptie standaard die wereldwijd wordt gebruikt door banken, 
                overheden en beveiligingsdiensten. Het is praktisch onmogelijk om te kraken met huidige technologie.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Kan de AI mijn eerdere antwoorden zien?</h4>
              <p className="text-sm text-muted-foreground">
                De AI krijgt alleen toegang tot de conversatie binnen de specifieke vraag waar je mee bezig bent. 
                Je antwoorden op andere vragen zijn niet zichtbaar voor de AI, tenzij je ze expliciet deelt in de conversatie.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <p className="text-center text-sm">
              Heb je nog vragen over privacy en beveiliging?<br />
              Neem contact op via <a href="mailto:info@hartspraak.com" className="text-primary hover:underline">info@hartspraak.com</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
