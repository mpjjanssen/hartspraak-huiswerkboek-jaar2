import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { APP_LOGO } from "@/const";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setResetToken(data.token);
        toast.success("Reset code gegenereerd!");
      } else {
        toast.error(data.error || "Genereren reset code mislukt");
      }
    } catch (error) {
      toast.error("Er is een fout opgetreden. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(resetToken);
    setCopied(true);
    toast.success("Reset code gekopieerd!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (resetToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {APP_LOGO && (
              <div className="flex justify-center mb-4">
                <img src={APP_LOGO} alt="Logo" className="h-16 w-16" />
              </div>
            )}
            <CardTitle className="text-2xl">Je reset code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 font-medium mb-2">
                  ⚠️ Belangrijk: Kopieer deze code nu!
                </p>
                <p className="text-xs text-amber-700">
                  Deze code is 1 uur geldig en wordt maar één keer getoond.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Reset code voor {email}</Label>
                <div className="flex gap-2">
                  <Input
                    value={resetToken}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopyToken}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  📝 Volgende stappen:
                </p>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Kopieer de reset code hierboven</li>
                  <li>Ga naar de "Wachtwoord resetten" pagina</li>
                  <li>Vul je email, de reset code en je nieuwe wachtwoord in</li>
                </ol>
              </div>

              <div className="flex gap-2">
                <Link href="/reset-password" className="flex-1">
                  <Button className="w-full">
                    Ga naar wachtwoord resetten
                  </Button>
                </Link>
              </div>

              <div className="text-center text-sm">
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Terug naar inloggen
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {APP_LOGO && (
            <div className="flex justify-center mb-4">
              <img src={APP_LOGO} alt="Logo" className="h-16 w-16" />
            </div>
          )}
          <CardTitle className="text-2xl">Wachtwoord resetten</CardTitle>
          <p className="text-muted-foreground mt-2">
            Voer je e-mailadres in om een reset code te genereren
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Genereren...
                </>
              ) : (
                "Genereer reset code"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Weet je je wachtwoord weer?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Inloggen
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
