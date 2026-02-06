import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, CheckCircle2, XCircle, Shield } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Register() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const validatePassword = (pwd: string) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[@$!%*?&]/.test(pwd);
    const isLongEnough = pwd.length >= 8;

    return {
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isLongEnough,
      isValid: hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough,
    };
  };

  const passwordValidation = validatePassword(password);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.verified) {
        toast.error(data.message || "E-mail niet geautoriseerd om te registreren");
        return;
      }

      if (data.alreadyRegistered) {
        toast.error(data.message || "E-mail al geregistreerd");
        return;
      }

      setStep("password");
      toast.success("E-mail geverifieerd! Maak je wachtwoord aan.");
    } catch (error) {
      toast.error("Er is een fout opgetreden. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordValidation.isValid) {
      toast.error("Voldoe aan alle wachtwoordeisen");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Wachtwoorden komen niet overeen");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Registratie mislukt");
        return;
      }

      login(data.token, data.user);
      toast.success("Account succesvol aangemaakt!");
      setLocation("/");
    } catch (error) {
      toast.error("Er is een fout opgetreden. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-16" />
          </div>
          <CardTitle className="text-2xl text-center">Account aanmaken</CardTitle>
          <CardDescription className="text-center">
            {step === "email"
              ? "Voer je e-mailadres in om te beginnen"
              : "Maak een veilig wachtwoord aan"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
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
                <p className="text-sm text-muted-foreground">
                  Alleen geverifieerde leden kunnen registreren. Neem contact op met Hartspraak als je niet geverifieerd bent.
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Controleren...
                  </>
                ) : (
                  "Doorgaan"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Wachtwoord</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Password requirements */}
              <div className="space-y-2 text-sm">
                <p className="font-medium">Wachtwoord moet bevatten:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {passwordValidation.isLongEnough ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={passwordValidation.isLongEnough ? "text-green-600" : "text-muted-foreground"}>
                      Minimaal 8 tekens
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasUpperCase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={passwordValidation.hasUpperCase ? "text-green-600" : "text-muted-foreground"}>
                      Eén hoofdletter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasLowerCase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={passwordValidation.hasLowerCase ? "text-green-600" : "text-muted-foreground"}>
                      Eén kleine letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasNumber ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={passwordValidation.hasNumber ? "text-green-600" : "text-muted-foreground"}>
                      Eén cijfer
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasSpecialChar ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-muted-foreground"}>
                      Eén speciaal teken (@$!%*?&)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep("email")}
                  disabled={isLoading}
                >
                  Terug
                </Button>
                <Button type="submit" className="w-full" disabled={isLoading || !passwordValidation.isValid}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Aanmaken...
                    </>
                  ) : (
                    "Account aanmaken"
                  )}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-800">
                Je antwoorden zijn <strong>end-to-end versleuteld</strong> en veilig opgeslagen in de cloud. Werk overal: laptop, tablet of smartphone.{" "}
                <Link href="/privacy" className="underline font-medium">
                  Lees meer
                </Link>
              </p>
            </div>
            <div className="text-center text-sm">
              Heb je al een account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Inloggen
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
