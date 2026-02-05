import { useEffect, useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProgressBarProps {
  workshopId: string;
  totalQuestions: number;
}

export function ProgressBar({ workshopId, totalQuestions }: ProgressBarProps) {
  const [answeredCount, setAnsweredCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const { user } = useAuth();
  const userId = user?.id;

  const countAnswered = useCallback(() => {
    if (!userId) return;
    
    // Must match AnswerField's storageKey: hartspraak-${userId}-${workshopId}-${questionId}
    const prefix = `hartspraak-${userId}-${workshopId}-`;
    
    const count = Object.keys(localStorage).filter(key => {
      if (!key.startsWith(prefix)) return false;
      // Exclude non-answer keys (AI conversations, consent, etc.)
      const suffix = key.replace(prefix, "");
      if (suffix.includes("-ai-") || suffix.includes("-consent")) return false;
      const value = localStorage.getItem(key);
      return value && value.trim() !== "";
    }).length;

    setAnsweredCount(count);
    setPercentage(totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0);
  }, [userId, workshopId, totalQuestions]);

  useEffect(() => {
    countAnswered();
  }, [countAnswered]);

  useEffect(() => {
    window.addEventListener("storage", countAnswered);
    window.addEventListener("answerSaved", countAnswered);

    return () => {
      window.removeEventListener("storage", countAnswered);
      window.removeEventListener("answerSaved", countAnswered);
    };
  }, [countAnswered]);

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
