import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Loader2, Copy, Check } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface Workshop {
  id: string;
  number: number;
  title: string;
  date: string;
  totalQuestions: number;
}

interface EmailData {
  to: string;
  fullName: string;
  subject: string;
  body: string;
  progress: number;
  questionsAnswered: number;
  questionsRemaining: number;
}

export function WorkshopReminders() {
  const { token } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("");
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(false);
  const [emailData, setEmailData] = useState<EmailData[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const loadWorkshops = async () => {
    setIsLoadingWorkshops(true);
    try {
      const response = await fetch("/api/admin/workshops", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to load workshops");
      }

      const data = await response.json();
      setWorkshops(data.workshops);
    } catch (error) {
      console.error("Error loading workshops:", error);
      toast.error("Kon workshops niet laden");
    } finally {
      setIsLoadingWorkshops(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && workshops.length === 0) {
      loadWorkshops();
    }
    if (!open) {
      // Reset state when closing
      setEmailData([]);
      setSelectedWorkshop("");
    }
  };

  const generateEmails = async () => {
    if (!selectedWorkshop) {
      toast.error("Selecteer eerst een workshop");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/send-workshop-reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          workshopNumber: parseInt(selectedWorkshop),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to prepare reminders");
      }

      const data = await response.json();
      setEmailData(data.emails);
      
      toast.success(`${data.emails.length} emails klaargezet voor kopiëren`);

    } catch (error) {
      console.error("Error generating emails:", error);
      toast.error("Er ging iets mis bij het voorbereiden van emails");
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmail = async (email: EmailData, index: number) => {
    const fullEmail = `Aan: ${email.to}\nOnderwerp: ${email.subject}\n\n${email.body}`;
    
    try {
      await navigator.clipboard.writeText(fullEmail);
      setCopiedIndex(index);
      toast.success(`Email gekopieerd voor ${email.fullName}`);
      
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Error copying:", error);
      toast.error("Kon email niet kopiëren");
    }
  };

  const selectedWorkshopData = workshops.find(w => w.number.toString() === selectedWorkshop);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Workshop Reminders
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Workshop Reminder Emails</DialogTitle>
          <DialogDescription>
            Genereer emails en kopieer ze om handmatig te versturen via Gmail
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Workshop Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Selecteer Workshop</label>
            <Select value={selectedWorkshop} onValueChange={setSelectedWorkshop} disabled={isLoadingWorkshops || emailData.length > 0}>
              <SelectTrigger>
                <SelectValue placeholder={isLoadingWorkshops ? "Laden..." : "Kies een workshop"} />
              </SelectTrigger>
              <SelectContent>
                {workshops.map((workshop) => (
                  <SelectItem key={workshop.id} value={workshop.number.toString()}>
                    Workshop {workshop.number} - {workshop.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Workshop Details */}
          {selectedWorkshopData && emailData.length === 0 && (
            <div className="rounded-lg border p-4 space-y-2 bg-muted/50">
              <h4 className="font-semibold">Workshop {selectedWorkshopData.number}</h4>
              <p className="text-sm text-muted-foreground">{selectedWorkshopData.title}</p>
              <p className="text-sm font-medium">{selectedWorkshopData.date}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedWorkshopData.totalQuestions} vragen in totaal
              </p>
            </div>
          )}

          {/* Generate Button */}
          {emailData.length === 0 && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                Annuleren
              </Button>
              <Button 
                onClick={generateEmails} 
                disabled={!selectedWorkshop || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Voorbereiden...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Genereer Emails
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Email List */}
          {emailData.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{emailData.length} Emails Klaargezet</h3>
                <Button variant="ghost" size="sm" onClick={() => setEmailData([])}>
                  Opnieuw
                </Button>
              </div>

              <div className="space-y-3">
                {emailData.map((email, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 bg-card">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{email.fullName}</p>
                        <p className="text-sm text-muted-foreground">{email.to}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Voortgang: {email.progress}% ({email.questionsAnswered} van {email.questionsAnswered + email.questionsRemaining} vragen)
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={copiedIndex === index ? "default" : "outline"}
                        onClick={() => copyEmail(email, index)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Gekopieerd!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Kopieer Email
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="text-sm space-y-2 bg-muted/50 p-3 rounded">
                      <p><strong>Onderwerp:</strong> {email.subject}</p>
                      <div className="max-h-32 overflow-y-auto text-xs text-muted-foreground whitespace-pre-wrap">
                        {email.body.substring(0, 200)}...
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Sluiten
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
