import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo en Link */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a 
              href="https://www.hartspraak.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/hartspraak-logo.png" 
                alt="Hartspraak Logo" 
                className="h-16 w-auto"
              />
            </a>
            <a 
              href="https://www.hartspraak.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              www.hartspraak.com
            </a>
          </div>

          {/* Contactinformatie */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-semibold text-foreground mb-2">Contact</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href="tel:+4917696511086" className="hover:text-primary transition-colors">
                +49 176 9651 1086
              </a>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5" />
              <div>
                <p>Merkurstrasse 18</p>
                <p>44329 Dortmund</p>
              </div>
            </div>
          </div>

          {/* Oprichter */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-semibold text-foreground mb-2">Team</h3>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Martien Janssen</p>
              <p className="text-xs">Oprichter</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Lonneke van Houten</p>
              <p className="text-xs">Co-therapeute</p>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="font-semibold text-foreground mb-4 text-center">Locatie</h3>
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8635!2d7.4683!3d51.5135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b919c5e7c5c5c5%3A0x0!2sMerkurstrasse%2018%2C%2044329%20Dortmund!5e0!3m2!1sen!2sde!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hartspraak Locatie - Merkurstrasse 18, 44329 Dortmund"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center space-y-2">
          <div className="flex justify-center gap-4 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy & Beveiliging
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hartspraak. Met liefde gemaakt voor je innerlijke reis.
          </p>
        </div>
      </div>
    </footer>
  );
}
