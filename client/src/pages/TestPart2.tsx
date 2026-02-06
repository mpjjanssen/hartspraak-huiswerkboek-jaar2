import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ChevronRight, ChevronLeft, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTest } from "@/contexts/TestContext";
import { part1Questions, part2Questions } from "@/data/testData";

const QUESTIONS_PER_PAGE = 20;

export default function TestPart2() {
  const [, navigate] = useLocation();
  const { part1Answers, part2Answers, setPart2Answer } = useTest();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(part2Questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = part2Questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const answeredCount = Object.keys(part2Answers).length;
  const progress = (answeredCount / part2Questions.length) * 100;

  const part1Complete = Object.keys(part1Answers).length === part1Questions.length;
  const allComplete = part1Complete && answeredCount === part2Questions.length;

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
      window.scrollTo(0, 0);
    } else if (allComplete) {
      navigate("/test/resultaten");
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/test/deel1");
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Navigation tabs */}
          <div className="flex space-x-2 bg-muted p-1 rounded-lg overflow-x-auto">
            <Link href="/test">
              <Button variant="ghost" size="sm" className="shrink-0">Inleiding</Button>
            </Link>
            <Link href="/test/deel1">
              <Button variant="ghost" size="sm" className="shrink-0">Deel I: Multiple choice</Button>
            </Link>
            <Button size="sm" className="shrink-0">Deel II: Ja/nee vragen</Button>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Deel II: Ja/nee stellingen
            </h1>
            <p className="text-muted-foreground">
              Beantwoord elke stelling met 'Ja' of 'Nee'. Ga af op je eerste gevoel – denk er niet te lang over na.
            </p>
          </div>

          {/* Part 1 warning */}
          {!part1Complete && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm">
              Je hebt nog niet alle vragen van Deel I beantwoord. Vul deze eerst in om je resultaten te zien.
            </div>
          )}

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{answeredCount} van {part2Questions.length} beantwoord</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Page selector */}
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageStart = i * QUESTIONS_PER_PAGE;
              const pageEnd = Math.min(pageStart + QUESTIONS_PER_PAGE, part2Questions.length);
              const pageAnswered = part2Questions
                .slice(pageStart, pageEnd)
                .filter((q) => part2Answers[q.id] !== undefined).length;
              const allPageAnswered = pageAnswered === (pageEnd - pageStart);
              
              return (
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setCurrentPage(i); window.scrollTo(0, 0); }}
                  className={allPageAnswered && currentPage !== i ? "border-green-500 text-green-700 dark:text-green-400" : ""}
                >
                  {pageStart + 1}-{pageEnd}
                </Button>
              );
            })}
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {pageQuestions.map((q) => {
              const answered = part2Answers[q.id] !== undefined;
              const isYes = part2Answers[q.id] === true;
              const isNo = part2Answers[q.id] === false;

              return (
                <div
                  key={q.id}
                  className={`flex items-center justify-between gap-4 p-4 rounded-lg border-2 transition-all ${
                    answered ? "border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20" : "border-border"
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-primary font-semibold mr-2">{q.id}.</span>
                    <span className="text-foreground/90">{q.question}</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant={isYes ? "default" : "outline"}
                      onClick={() => setPart2Answer(q.id, true)}
                      className={`gap-1 min-w-[70px] ${isYes ? "bg-green-600 hover:bg-green-700" : ""}`}
                    >
                      <Check className="h-4 w-4" />
                      Ja
                    </Button>
                    <Button
                      size="sm"
                      variant={isNo ? "default" : "outline"}
                      onClick={() => setPart2Answer(q.id, false)}
                      className={`gap-1 min-w-[70px] ${isNo ? "bg-red-500 hover:bg-red-600" : ""}`}
                    >
                      <X className="h-4 w-4" />
                      Nee
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={goPrev} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              {currentPage === 0 ? "Terug naar deel I" : "Vorige pagina"}
            </Button>
            {currentPage === totalPages - 1 ? (
              allComplete ? (
                <Link href="/test/resultaten">
                  <Button className="gap-2">
                    Bekijk resultaten
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button disabled className="gap-2">
                  Beantwoord alle vragen
                </Button>
              )
            ) : (
              <Button onClick={goNext} className="gap-2">
                Volgende pagina
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
