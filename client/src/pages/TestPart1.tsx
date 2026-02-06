import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTest } from "@/contexts/TestContext";
import { part1Questions } from "@/data/testData";

const QUESTIONS_PER_PAGE = 5;

export default function TestPart1() {
  const [, navigate] = useLocation();
  const { part1Answers, setPart1Answer } = useTest();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(part1Questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = part1Questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const answeredCount = Object.keys(part1Answers).length;
  const progress = (answeredCount / part1Questions.length) * 100;

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/test/deel2");
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/test");
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
            <Button size="sm" className="shrink-0">Deel I: Multiple choice</Button>
            <Link href="/test/deel2">
              <Button variant="ghost" size="sm" className="shrink-0">Deel II: Ja/nee vragen</Button>
            </Link>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Deel I: Multiple choice vragen
            </h1>
            <p className="text-muted-foreground">
              Kies bij elke vraag het antwoord dat het beste bij je past. Er zijn geen goede of foute antwoorden.
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{answeredCount} van {part1Questions.length} beantwoord</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Page selector */}
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageStart = i * QUESTIONS_PER_PAGE;
              const pageEnd = Math.min(pageStart + QUESTIONS_PER_PAGE, part1Questions.length);
              const pageAnswered = part1Questions
                .slice(pageStart, pageEnd)
                .filter((q) => part1Answers[q.id] !== undefined).length;
              const allAnswered = pageAnswered === (pageEnd - pageStart);
              
              return (
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setCurrentPage(i); window.scrollTo(0, 0); }}
                  className={allAnswered && currentPage !== i ? "border-green-500 text-green-700 dark:text-green-400" : ""}
                >
                  {i * QUESTIONS_PER_PAGE + 1}-{pageEnd}
                </Button>
              );
            })}
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {pageQuestions.map((q) => (
              <Card key={q.id} className={`border-primary/10 shadow-sm transition-shadow ${part1Answers[q.id] ? 'border-green-200 dark:border-green-900' : ''}`}>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-semibold text-lg">
                    <span className="text-primary mr-2">{q.id}.</span>
                    {q.question}
                  </h3>
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.letter}
                        onClick={() => setPart1Answer(q.id, opt.letter)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          part1Answers[q.id] === opt.letter
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/40 hover:bg-accent/30"
                        }`}
                      >
                        <span className="font-semibold text-primary mr-2">{opt.letter})</span>
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={goPrev} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              {currentPage === 0 ? "Terug naar inleiding" : "Vorige pagina"}
            </Button>
            <Button onClick={goNext} className="gap-2">
              {currentPage === totalPages - 1 ? "Naar deel II" : "Volgende pagina"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {currentPage === totalPages - 1 && answeredCount < part1Questions.length && (
            <p className="text-center text-sm text-muted-foreground">
              Let op: Je kunt doorgaan, maar je moet alle vragen beantwoorden voordat je de eindresultaten kunt zien.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
