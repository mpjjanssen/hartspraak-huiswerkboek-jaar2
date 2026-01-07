import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { APP_LOGO } from "@/const";

export default function ResetPassword() {
  const [location] = useLocation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location]);

  const validatePassword = (pwd: string) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is verplicht");
      return;
    }

    if (!token) {
      toast.error("Reset code is verplicht");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Wachtwoorden komen niet overeen");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Wachtwoord voldoet niet aan de eisen");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setResetSuccess(true);
        toast.success("Wachtwoord succesvol gereset!");
      } else {
        toast.error(data.error || "Wachtwoord resetten mislukt");
      }
    } catch (error) {
      toast.error("Er is een fout opgetreden. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {APP_LOGO && (
              <div className="flex justify-center mb-4">
                <img src={APP_LOGO} alt="Logo" className="h-16 w-16" />
              </div>
            )}
            <CardTitle className="text-2xl">Wachtwoord Reset Voltooid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-muted-foreground">
                Je wachtwoord is succesvol gereset. Je kunt nu inloggen met je nieuwe wachtwoord.
              </p>
              <div className="pt-4">
                <Link href="/login">
                  <Button className="w-full">Ga naar Inloggen</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const passwordRequirements = [
    { label: "Minimaal 8 tekens", met: password.length >= 8 },
    { label: "Eén hoofdletter", met: /[A-Z]/.test(password) },
    { label: "Eén kleine letter", met: /[a-z]/.test(password) },
    { label: "Eén cijfer", met: /[0-9]/.test(password) },
    { label: "Eén speciaal teken (@$!%*?&)", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {APP_LOGO && (
            <div className="flex justify-center mb-4">
              <img src={APP_LOGO} alt="Logo" className="h-16 w-16" />
            </div>
          )}
          <CardTitle className="text-2xl">Maak Nieuw Wachtwoord</CardTitle>
          <p className="text-muted-foreground mt-2">
            Vul je email, reset code en nieuwe wachtwoord in
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
            <div>
              <Label htmlFor="token">Reset Code</Label>
              <Input
                id="token"
                type="text"
                placeholder="Plak je reset code hier"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                disabled={isLoading}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Kopieer de code die je kreeg na het aanvragen van een wachtwoord reset
              </p>
            </div>
            <div>
              <Label htmlFor="password">Nieuw Wachtwoord</Label>
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
            <div>
              <Label htmlFor="confirmPassword">Bevestig Wachtwoord</Label>
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
            {password && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Wachtwoord moet bevatten:</p>
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {req.met && <CheckCircle2 className="h-3 w-3 text-green-600" />}
                    </div>
                    <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetten...
                </>
              ) : (
                "Reset Wachtwoord"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link href="/forgot-password" className="text-primary font-medium hover:underline">
              Nieuwe reset code aanvragen
            </Link>
            {" · "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Inloggen
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
