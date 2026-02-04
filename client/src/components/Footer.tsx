import { Heart, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Hartspraak
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a 
                href="mailto:info@hartspraak.com" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@hartspraak.com
              </a>
              <a 
                href="tel:+4917624547733" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +49 176 2454 7733
              </a>
              <a 
                href="https://maps.google.com/?q=Querenburger+Str.+28,+44789+Bochum,+Germany"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-primary transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Querenburger Str. 28<br />44789 Bochum, Duitsland</span>
              </a>
            </div>
          </div>

          {/* Google Maps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Locatie</h3>
            <div className="rounded-lg overflow-hidden border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.1234567890123!2d7.2234567890123456!3d51.4567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e0a0a0a0a0a0%3A0x1234567890abcdef!2sQuerenburger%20Str.%2028%2C%2044789%20Bochum%2C%20Germany!5e0!3m2!1sen!2sde!4v1234567890123"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hartspraak locatie"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/aandachtspunten" className="block text-muted-foreground hover:text-primary transition-colors">
                Aandachtspunten
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy & Encryptie
              </Link>
              <a 
                href="https://hartspraak.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                Hartspraak Website
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Hartspraak. Alle antwoorden zijn end-to-end versleuteld.</p>
        </div>
      </div>
    </footer>
  );
}
