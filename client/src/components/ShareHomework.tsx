import { useState } from "react";
import { Share2, Loader2 } from "lucide-react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  title: string;
  fullText?: string;
}

interface ShareHomeworkProps {
  workshopId: string;
  workshopTitle: string;
  workshopDate: string;
  questions: Question[];
}

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AnswerWithAI {
  question: string;
  fullText?: string;
  answer: string;
  aiConversation?: Message[];
}

export function ShareHomework({ workshopId, workshopTitle, workshopDate, questions }: ShareHomeworkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const getAnswersWithAI = (): AnswerWithAI[] => {
    const answers: AnswerWithAI[] = [];
    
    questions.forEach(q => {
      const answerKey = `hartspraak-${workshopId}-${q.id}`;
      const aiKey = `hartspraak-ai-${workshopId}-${q.id}`;
      
      const answer = localStorage.getItem(answerKey) || "";
      const aiDataRaw = localStorage.getItem(aiKey);
      
      if (answer.trim()) {
        let aiConversation: Message[] | undefined;
        
        if (aiDataRaw) {
          try {
            const aiData = JSON.parse(aiDataRaw);
            if (Array.isArray(aiData)) {
              aiConversation = aiData.filter(
                (msg: Message) => msg.role === "user" || msg.role === "assistant"
              );
            }
          } catch (e) {
            console.error("Failed to parse AI data:", e);
          }
        }
        
        answers.push({
          question: q.title,
          fullText: q.fullText,
          answer: answer,
          aiConversation: aiConversation
        });
      }
    });
    
    return answers;
  };

  const generateWordDocument = async (): Promise<string> => {
    const answers = getAnswersWithAI();
    
    const children: Paragraph[] = [
      new Paragraph({
        text: workshopTitle,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 }
      }),
      new Paragraph({
        text: workshopDate,
        spacing: { after: 400 }
      })
    ];
    
    answers.forEach((item, index) => {
      // Question title
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${index + 1}. ${item.question}`,
              bold: true,
              size: 28
            })
          ],
          spacing: { before: 300, after: 100 }
        })
      );
      
      // Full question text (if available)
      if (item.fullText) {
        children.push(
          new Paragraph({
            text: item.fullText,
            spacing: { after: 200 }
          })
        );
      }
      
      children.push(
        new Paragraph({
          text: item.answer,
          spacing: { after: 300 }
        })
      );
      
      if (item.aiConversation && item.aiConversation.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "💬 AI Coaching Gesprek",
                bold: true,
                size: 24
              })
            ],
            spacing: { before: 200, after: 150 }
          })
        );
        
        item.aiConversation.forEach((msg) => {
          const roleLabel = msg.role === "user" ? "Jij:" : "AI Coach:";
          
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: roleLabel,
                  bold: true,
                  size: 22
                })
              ],
              spacing: { before: 100, after: 50 }
            })
          );
          
          children.push(
            new Paragraph({
              text: msg.content,
              spacing: { after: 150 }
            })
          );
        });
      }
    });
    
    const doc = new Document({
      sections: [{ children }]
    });
    
    const blob = await Packer.toBlob(doc);
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    
    return base64;
  };

  const handleShare = async () => {
    setIsSharing(true);

    try {
      // Generate Word document
      const wordDocumentBase64 = await generateWordDocument();
      
      const response = await fetch("/api/share-homework", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          workshopId,
          workshopTitle,
          wordDocumentBase64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Er ging iets mis bij het delen");
      }

      toast({
        title: "Huiswerk gedeeld!",
        description: "Je huiswerk is succesvol verstuurd naar Martien en Lonneke.",
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Share error:", error);
      toast({
        title: "Delen mislukt",
        description: error instanceof Error ? error.message : "Er ging iets mis. Probeer het later opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Deel met het team
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Huiswerk delen</DialogTitle>
            <DialogDescription>
              Je staat op het punt om je huiswerk van <strong>{workshopTitle}</strong> te delen met Martien en Lonneke.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">Wat wordt er gedeeld?</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Al je antwoorden op de reflectieopdrachten</li>
                <li>Je voortgang in deze workshop</li>
                <li>Datum en tijd van delen</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 text-sm">
              <p className="font-medium mb-2 text-blue-900 dark:text-blue-100">
                📧 Email wordt verstuurd naar:
              </p>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li>• Martien: info@hartspraak.com</li>
                <li>• Lonneke: lonnekevanhouten@gmail.com</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSharing}
            >
              Annuleren
            </Button>
            <Button
              onClick={handleShare}
              disabled={isSharing}
              className="gap-2"
            >
              {isSharing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Delen...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Ja, Deel Huiswerk
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
