import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface ProgressBarProps {
  workshopId: string;
  totalQuestions: number;
}

export function ProgressBar({ workshopId, totalQuestions }: ProgressBarProps) {
  const [answeredCount, setAnsweredCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Count how many questions have been answered
    let count = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(`hartspraak-${workshopId}`)
      );
      
      for (const key of keys) {
        const value = localStorage.getItem(key);
        if (value && value.trim() !== "") {
          count++;
        }
      }
      break; // We only need to count once
    }
    
    // Actually count properly
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(`hartspraak-${workshopId}`)
    );
    
    count = keys.filter(key => {
      const value = localStorage.getItem(key);
      return value && value.trim() !== "";
    }).length;
    
    setAnsweredCount(count);
    setPercentage(Math.round((count / totalQuestions) * 100));
  }, [workshopId, totalQuestions]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(`hartspraak-${workshopId}`)
      );
      
      const count = keys.filter(key => {
        const value = localStorage.getItem(key);
        return value && value.trim() !== "";
      }).length;
      
      setAnsweredCount(count);
      setPercentage(Math.round((count / totalQuestions) * 100));
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event when answer is saved
    window.addEventListener('answerSaved', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('answerSaved', handleStorageChange);
    };
  }, [workshopId, totalQuestions]);

  return (
    <div className="bg-accent/20 border border-primary/20 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Je voortgang</h3>
            <p className="text-sm text-muted-foreground">
              {answeredCount} van {totalQuestions} vragen beantwoord
            </p>
          </div>
        </div>
        <div className="text-3xl font-bold text-primary">
          {percentage}%
        </div>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
}
