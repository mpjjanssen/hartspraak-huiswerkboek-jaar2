import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [, setLocation] = useLocation();
  
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hartspraak Logo & Link */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Heart className="h-10 w-10 text-red-500 fill-red-500" />
                <Heart className="h-4 w-4 text-red-400 fill-red-400 absolute top-0 right-0" />
              </div>
              <span className="text-lg">
                <span className="text-red-500 font-semibold">Hart</span>
                <span className="text-teal-600 font-semibold">spraak</span>
              </span>
            </div>
            <a 
              href="https://www.hartspraak.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
            >
              www.hartspraak.com
            </a>
          </div>

          {/* Martien Janssen */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Martien Janssen</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a 
                href="tel:+491769651086" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +49 176 9651 1086
              </a>
              <a 
                href="mailto:info@hartspraak.com" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@hartspraak.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Merkurstrasse 18<br />
                  44329 Dortmund<br />
                  Duitsland
                </span>
              </div>
            </div>
          </div>

          {/* Lonneke van Houten */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Lonneke van Houten</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a 
                href="tel:+31648817579" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                06 48 81 75 79
              </a>
              <a 
                href="mailto:lonnekevanhouten@gmail.com" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                lonnekevanhouten@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Juliusstraat 21<br />
                  5621 GB Eindhoven<br />
                  Nederland
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Locatie */}
        <div className="mt-12 space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-lg">Workshop Locatie</h3>
            <p className="text-muted-foreground">Contact Boschhoek</p>
            <p className="text-muted-foreground">Papenvoortse Heide 5, 5674 SL Nuenen</p>
          </div>
          <div className="rounded-lg overflow-hidden border shadow-sm max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.5!2d5.5456!3d51.4703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6d90a5c5c5c5c%3A0x1234567890abcdef!2sPapenvoortse%20Heide%205%2C%205674%20SL%20Nuenen%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1699999999999!5m2!1sen!2snl"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Workshop locatie - Contact Boschhoek"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center space-y-2">
          <a
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setLocation("/privacy");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Privacy & Beveiliging
          </a>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Hartspraak. Met liefde gemaakt voor je innerlijke reis.
          </p>
        </div>
      </div>
    </footer>
  );
}
