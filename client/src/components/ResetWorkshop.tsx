import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResetWorkshopProps {
  workshopId: string;
  workshopTitle: string;
}

export function ResetWorkshop({ workshopId, workshopTitle }: ResetWorkshopProps) {
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    try {
      // Get all localStorage keys
      const keys = Object.keys(localStorage);
      
      // Filter keys that belong to this workshop
      const workshopKeys = keys.filter(key => 
        key.includes(`workshop${workshopId}`) || 
        key.startsWith(`ai_conversation_${workshopId}_`)
      );
      
      // Remove all workshop-related data
      workshopKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      toast({
        title: "Workshop gereset!",
        description: `Alle antwoorden en AI gesprekken van ${workshopTitle} zijn verwijderd.`,
      });
      
      // Reload page to show empty state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error("Error resetting workshop:", error);
      toast({
        title: "Fout",
        description: "Er ging iets mis bij het resetten. Probeer het opnieuw.",
        variant: "destructive",
      });
    }
    
    setShowDialog(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowDialog(true)}
        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset Deze Workshop
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Weet je het zeker?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Je staat op het punt om <strong>alle antwoorden en AI gesprekken</strong> van{" "}
                <strong>{workshopTitle}</strong> te verwijderen.
              </p>
              <p className="text-red-600 font-semibold">
                ⚠️ Deze actie kan niet ongedaan worden gemaakt!
              </p>
              <p className="text-sm text-muted-foreground">
                Tip: Download eerst een backup via de "Download PDF" of "Download Word" button als je je antwoorden wilt bewaren.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ja, Reset Workshop
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
