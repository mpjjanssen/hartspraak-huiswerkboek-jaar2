import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ResetAllData() {
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleResetAll = () => {
    try {
      // Get all localStorage keys
      const keys = Object.keys(localStorage);
      
      // Filter keys that are workshop-related (answers and AI conversations)
      const dataKeys = keys.filter(key => 
        key.startsWith('workshop') || 
        key.startsWith('ai_conversation_')
      );
      
      // Remove all workshop data
      dataKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      toast({
        title: "Alle data gereset!",
        description: `${dataKeys.length} items verwijderd. Je begint met een schone lei.`,
      });
      
      // Reload page to show empty state
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
      
    } catch (error) {
      console.error("Error resetting all data:", error);
      toast({
        title: "Fout",
        description: "Er ging iets mis bij het resetten. Probeer het opnieuw.",
        variant: "destructive",
      });
    }
    
    setShowDialog(false);
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setShowDialog(true);
          }}
          className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Alle Antwoorden
        </DropdownMenuItem>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Weet je het absoluut zeker?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Je staat op het punt om <strong className="text-red-600">ALLE antwoorden en AI gesprekken</strong> van{" "}
              <strong className="text-red-600">ALLE 6 workshops</strong> te verwijderen.
            </p>
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 font-semibold text-sm">
                ⚠️ WAARSCHUWING: Deze actie kan NIET ongedaan worden gemaakt!
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Download eerst backups van je workshops via de "Download PDF" of "Download Word" buttons als je je antwoorden wilt bewaren.
            </p>
            <p className="text-sm font-medium">
              Je begint daarna met een volledig schone lei, alsof je net bent begonnen.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuleren</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleResetAll}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Ja, Reset ALLES
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
