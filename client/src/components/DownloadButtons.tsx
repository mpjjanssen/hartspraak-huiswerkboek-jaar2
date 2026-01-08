import { Button } from "@/components/ui/button";
import { Download, FileText, Share2, Loader2, CheckCircle2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  title: string;
}

interface DownloadButtonsProps {
  workshopId: string;
  workshopTitle: string;
  workshopDate: string;
  questions: Question[];
  allWorkshops?: boolean;
}

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AnswerWithAI {
  question: string;
  answer: string;
  aiConversation?: Message[];
}

export function DownloadButtons({ 
  workshopId, 
  workshopTitle, 
  workshopDate,
  questions,
  allWorkshops = false 
}: DownloadButtonsProps) {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const [hasShared, setHasShared] = useState(false);

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
          answer: answer,
          aiConversation: aiConversation
        });
      }
    });
    
    return answers;
  };

  const generatePDFBlob = (): Blob => {
    const doc = new jsPDF();
    const answers = getAnswersWithAI();
    
    doc.setFontSize(20);
    doc.text(workshopTitle, 20, 20);
    doc.setFontSize(12);
    doc.text(workshopDate, 20, 30);
    
    let yPosition = 45;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;
    
    answers.forEach((item, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const questionLines = doc.splitTextToSize(`${index + 1}. ${item.question}`, maxWidth);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 7 + 5;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const answerLines = doc.splitTextToSize(item.answer, maxWidth);
      doc.text(answerLines, margin, yPosition);
      yPosition += answerLines.length * 6 + 10;
      
      if (item.aiConversation && item.aiConversation.length > 0) {
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text("💬 AI Coaching Gesprek", margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        item.aiConversation.forEach((msg) => {
          if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFont('helvetica', 'bold');
          const roleLabel = msg.role === "user" ? "Jij:" : "AI Coach:";
          doc.text(roleLabel, margin, yPosition);
          yPosition += 6;
          
          doc.setFont('helvetica', 'normal');
          const messageLines = doc.splitTextToSize(msg.content, maxWidth - 5);
          doc.text(messageLines, margin + 5, yPosition);
          yPosition += messageLines.length * 5 + 8;
        });
        yPosition += 5;
      }
      yPosition += 10;
    });
    
    return doc.output('blob');
  };

  const downloadPDF = () => {
    const blob = generatePDFBlob();
    const filename = `${workshopTitle.replace(/\s+/g, '_')}_Antwoorden.pdf`;
    saveAs(blob, filename);
  };

  const downloadWord = async () => {
    const answers = getAnswersWithAI();
    const children: Paragraph[] = [
      new Paragraph({ text: workshopTitle, heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
      new Paragraph({ text: workshopDate, spacing: { after: 400 } })
    ];
    
    answers.forEach((item, index) => {
      children.push(new Paragraph({
        children: [new TextRun({ text: `${index + 1}. ${item.question}`, bold: true, size: 28 })],
        spacing: { before: 300, after: 200 }
      }));
      children.push(new Paragraph({ text: item.answer, spacing: { after: 300 } }));
      
      if (item.aiConversation && item.aiConversation.length > 0) {
        children.push(new Paragraph({
          children: [new TextRun({ text: "💬 AI Coaching Gesprek", bold: true, size: 24 })],
          spacing: { before: 200, after: 150 }
        }));
        
        item.aiConversation.forEach((msg) => {
          const roleLabel = msg.role === "user" ? "Jij:" : "AI Coach:";
          children.push(new Paragraph({
            children: [new TextRun({ text: roleLabel, bold: true, size: 22 })],
            spacing: { before: 100, after: 50 }
          }));
          children.push(new Paragraph({ text: msg.content, spacing: { after: 150 } }));
        });
      }
      children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
    });
    
    const doc = new Document({ sections: [{ properties: {}, children: children }] });
    const blob = await Packer.toBlob(doc);
    const filename = `${workshopTitle.replace(/\s+/g, '_')}_Antwoorden.docx`;
    saveAs(blob, filename);
  };

  const shareWithTeam = async () => {
    try {
      setIsSharing(true);
      const pdfBlob = generatePDFBlob();
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const fileName = `${workshopTitle.replace(/\s+/g, '_')}_Antwoorden.pdf`;

        const response = await fetch("/api/shared-homework", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`
          },
          body: JSON.stringify({
            workshopId,
            workshopNumber: parseInt(workshopId.replace(/\D/g, '')) || 0,
            workshopTitle,
            workshopDate,
            pdfData: base64data,
            fileName
          })
        });

        if (!response.ok) throw new Error("Failed to share homework");

        setHasShared(true);
        toast({
          title: "Succesvol gedeeld",
          description: "Je huiswerk is gedeeld met het Hartspraak-team.",
        });
      };
    } catch (error) {
      console.error("Error sharing homework:", error);
      toast({
        title: "Fout bij delen",
        description: "Er is iets misgegaan bij het delen van je huiswerk. Probeer het later opnieuw.",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  const hasAnswers = getAnswersWithAI().length > 0;

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={downloadPDF}
        disabled={!hasAnswers}
        variant="outline"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </Button>
      <Button
        onClick={downloadWord}
        disabled={!hasAnswers}
        variant="outline"
        className="gap-2"
      >
        <FileText className="h-4 w-4" />
        Download Word
      </Button>
      <Button
        onClick={shareWithTeam}
        disabled={!hasAnswers || isSharing || hasShared}
        variant={hasShared ? "secondary" : "default"}
        className="gap-2 bg-primary hover:bg-primary/90"
      >
        {isSharing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : hasShared ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        {hasShared ? "Gedeeld met team" : "Deel met het team"}
      </Button>
    </div>
  );
}
