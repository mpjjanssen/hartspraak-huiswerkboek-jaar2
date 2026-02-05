import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ChevronLeft, Download, RotateCcw, Trophy } from "lucide-react";
import { useTest } from "@/contexts/TestContext";
import { useAuth } from "@/contexts/AuthContext";
import { calculateResults, part1Questions, part2Questions, TestResult } from "@/data/testData";
import { jsPDF } from "jspdf";

export default function TestResults() {
  const [, navigate] = useLocation();
  const { part1Answers, part2Answers, resetTest } = useTest();
  const { user } = useAuth();
  const [results, setResults] = useState<TestResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [saved, setSaved] = useState(false);

  const part1Complete = Object.keys(part1Answers).length === part1Questions.length;
  const part2Complete = Object.keys(part2Answers).length === part2Questions.length;
  const isComplete = part1Complete && part2Complete;

  useEffect(() => {
    if (!isComplete) {
      navigate("/test");
      return;
    }
    const r = calculateResults(part1Answers, part2Answers);
    setResults(r);
    setTotalScore(r.reduce((sum, item) => sum + item.score, 0));
  }, [part1Answers, part2Answers, isComplete, navigate]);

  // Save results to server
  useEffect(() => {
    if (!isComplete || saved || !user?.id || results.length === 0) return;

    const saveResults = async () => {
      try {
        const authToken = sessionStorage.getItem("auth_token");
        if (!authToken) return;

        const resultData = JSON.stringify({
          results: results.map((r) => ({
            code: r.code,
            name: r.name,
            score: r.score,
            percentage: r.percentage,
          })),
          totalScore,
          completedAt: new Date().toISOString(),
        });

        // Save as a special "answer" entry
        await fetch(`/api/user-data/answers/karaktertest/results`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            answerPlaintext: resultData,
            answerEncrypted: "",
            encryptionIv: "",
          }),
        });

        // Also save to localStorage
        const key = `hartspraak-${user.id}-karaktertest-results`;
        localStorage.setItem(key, resultData);

        setSaved(true);
      } catch (e) {
        console.error("Failed to save results:", e);
      }
    };

    saveResults();
  }, [isComplete, saved, user, results, totalScore]);

  const highestScore = Math.max(...results.map((r) => r.score));

  const handleReset = () => {
    if (window.confirm("Weet je zeker dat je de test opnieuw wilt doen? Alle antwoorden worden gewist.")) {
      resetTest();
      navigate("/test");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;
    let y = 20;

    // Title
    doc.setFontSize(22);
    doc.text("Karakterstructuren Test - Resultaten", margin, y);
    y += 12;

    doc.setFontSize(12);
    doc.text(`Totaal aantal punten: ${totalScore}`, margin, y);
    y += 8;
    doc.text(`Datum: ${new Date().toLocaleDateString("nl-NL")}`, margin, y);
    y += 15;

    // Results
    results.forEach((r) => {
      const isHighest = r.score === highestScore && r.score > 0;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`${isHighest ? "🏆 " : ""}${r.name}`, margin, y);
      y += 7;

      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.text(`"${r.theme}"`, margin, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.text(`Score: ${r.score} punten (${r.percentage}%)`, margin, y);
      y += 6;

      const descLines = doc.splitTextToSize(r.description, maxWidth);
      doc.text(descLines, margin, y);
      y += descLines.length * 5 + 10;

      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });

    // Interpretation
    y += 5;
    if (y > 220) { doc.addPage(); y = 20; }
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Interpretatie", margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const interp = [
      "Het lichaamstype met het hoogste puntenaantal staat het meest op de voorgrond. Vaak kunnen het ook twee of zelfs drie lichaamstypen zijn, bij wie meer punten behaald worden als bij de overige.",
      "Hoe meer zich het aantal punten onderscheidt, hoe sterker (of zwakker) dit type bij jouw voorhanden is. Verschilt een type acht of meer punten van de anderen, dan is dit type overduidelijk aanwezig.",
      "Verschillen de afzonderlijke typen maar vier of minder punten, dan ben je een uitgesproken mengtype.",
      "Let op: Deze test is bedoeld als hulpmiddel voor zelfreflectie en oriëntatie. Het is geen diagnostisch instrument en vervangt geen professionele begeleiding."
    ];
    interp.forEach((text) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 4;
    });

    doc.save("Karakterstructuren_Test_Resultaten.pdf");
  };

  if (!isComplete || results.length === 0) return null;

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Jouw Resultaten</h1>
            <p className="text-lg text-muted-foreground">Totaal aantal punten: {totalScore}</p>
          </div>

          {/* Result cards */}
          <div className="space-y-6">
            {results.map((r) => {
              const isHighest = r.score === highestScore && r.score > 0;
              return (
                <Card key={r.code} className={isHighest ? "border-2 border-primary" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {isHighest && <Trophy className="h-5 w-5 text-amber-500" />}
                          {r.name}
                        </CardTitle>
                        <CardDescription className="text-base italic">
                          "{r.theme}"
                        </CardDescription>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-3xl font-bold" style={{ color: r.color }}>
                          {r.percentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {r.score} punten
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${r.percentage}%`,
                            backgroundColor: r.color,
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80">{r.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Interpretation */}
          <Card>
            <CardHeader>
              <CardTitle>Interpretatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/90">
              <p>
                Het lichaamstype met het hoogste puntenaantal staat het meest op de voorgrond.
                Vaak kunnen het ook twee of zelfs drie lichaamstypen zijn, bij wie meer punten
                behaald worden als bij de overige. In dit geval zijn al deze lichaamstypen
                dominant bij jou.
              </p>
              <p>
                Hoe meer zich het aantal punten onderscheidt, hoe sterker (of zwakker) dit type
                bij jouw voorhanden is. Verschilt een type acht of meer punten van de anderen,
                dan is dit type bij jou overduidelijk ofwel extreem zwak voorhanden en moet je je
                op de eerste plaats met dit deel van je persoonlijkheid bezighouden.
              </p>
              <p>
                Verschillen de afzonderlijke typen maar vier of minder punten, dan ben je een
                uitgesproken mengtype.
              </p>
              <p className="text-muted-foreground italic mt-4">
                Let op: Deze test is bedoeld als hulpmiddel voor zelfreflectie en oriëntatie.
                Het is geen diagnostisch instrument en vervangt geen professionele begeleiding.
                De lichaamstypen zijn niet statisch - ze kunnen veranderen naarmate je aan jezelf
                werkt.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={downloadPDF} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Test Opnieuw Doen
            </Button>
          </div>

          {/* Back to home */}
          <div className="flex justify-center pt-4">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Terug naar Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
