import { Button } from "@/components/ui/button";
import { Download, FileText, Share2, Loader2, CheckCircle2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { decryptData } from "@/lib/encryption";
import { useEncryption } from "@/contexts/EncryptionContext";

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
  timestamp?: string;
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
  const { encryptionKey, isReady } = useEncryption();

  const getAnswersWithAI = async (): Promise<AnswerWithAI[]> => {
    const authToken = sessionStorage.getItem('auth_token');
    
    // Fetch all AI conversations in parallel for better performance and reliability
    const fetchPromises = questions.map(async (q) => {
      const answerKey = `hartspraak-${workshopId}-${q.id}`;
      const aiKey = `hartspraak-ai-${workshopId}-${q.id}`;
      
      const answer = localStorage.getItem(answerKey) || "";
      let aiConversation: Message[] | undefined;
      
      // 1. Try server fetch if possible
      if (isReady && encryptionKey && authToken) {
        try {
          const response = await fetch(`/api/user-data/conversations/${workshopId}/${q.id}`, {
            headers: { 'Authorization': `Bearer ${authToken}` },
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.messagesEncrypted && data.encryptionIv) {
              const decrypted = decryptData(data.messagesEncrypted, data.encryptionIv, encryptionKey);
              if (decrypted) {
                const parsed = JSON.parse(decrypted);
                if (Array.isArray(parsed)) {
                  aiConversation = parsed.filter(m => m.role === "user" || m.role === "assistant");
                }
              }
            }
          }
        } catch (e) {
          console.warn(`[DownloadButtons] Server fetch failed for ${q.id}:`, e);
        }
      }
      
      // 2. Fallback to localStorage
      if (!aiConversation) {
        const aiDataRaw = localStorage.getItem(aiKey);
        if (aiDataRaw) {
          try {
            const aiData = JSON.parse(aiDataRaw);
            if (Array.isArray(aiData)) {
              aiConversation = aiData.filter(m => m.role === "user" || m.role === "assistant");
            }
          } catch (e) {
            console.error(`[DownloadButtons] LocalStorage parse failed for ${q.id}:`, e);
          }
        }
      }
      
      return {
        question: q.title,
        answer: answer,
        aiConversation: aiConversation
      };
    });

    const results = await Promise.all(fetchPromises);
    
    // Filter out items that have neither an answer nor an AI conversation
    return results.filter(item => item.answer.trim() || (item.aiConversation && item.aiConversation.length > 0));
  };

  const generatePDFBlob = async (): Promise<Blob> => {
    const doc = new jsPDF();
    const answers = await getAnswersWithAI();
    
    doc.setFontSize(20);
    doc.text(workshopTitle, 20, 20);
    doc.setFontSize(12);
    doc.text(workshopDate, 20, 30);
    
    let yPosition = 45;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;
    
    if (answers.length === 0) {
      doc.text("Geen antwoorden of AI-gesprekken gevonden voor deze workshop.", margin, yPosition);
      return doc.output('blob');
    }

    answers.forEach((item, index) => {
      // Check for page break before question
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Question
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const questionLines = doc.splitTextToSize(`${index + 1}. ${item.question}`, maxWidth);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 7 + 5;
      
      // Answer
      if (item.answer.trim()) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const answerLines = doc.splitTextToSize(item.answer, maxWidth);
        doc.text(answerLines, margin, yPosition);
        yPosition += answerLines.length * 6 + 10;
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text("(Geen tekstueel antwoord ingevuld)", margin, yPosition);
        yPosition += 10;
      }
      
      // AI Conversation
      if (item.aiConversation && item.aiConversation.length > 0) {
        // Check for page break before AI section
        if (yPosition > pageHeight - 50) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(75, 85, 99); // Gray-600
        doc.text("💬 AI Begeleiding", margin, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 10;
        
        doc.setFontSize(10);
        item.aiConversation.forEach((msg) => {
          // Check for page break before each message
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFont('helvetica', 'bold');
          const roleLabel = msg.role === "user" ? "Jij:" : "AI Begeleider:";
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

  const downloadPDF = async () => {
    try {
      const blob = await generatePDFBlob();
      const filename = `${workshopTitle.replace(/\s+/g, '_')}_Antwoorden.pdf`;
      saveAs(blob, filename);
    } catch (error) {
      console.error("[DownloadButtons] PDF generation failed:", error);
      toast({
        title: "Fout bij PDF genereren",
        description: "Er is iets misgegaan bij het maken van de PDF. Probeer het opnieuw.",
        variant: "destructive"
      });
    }
  };

  const downloadWord = async () => {
    try {
      const answers = await getAnswersWithAI();
      const children: Paragraph[] = [
        new Paragraph({ text: workshopTitle, heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
        new Paragraph({ text: workshopDate, spacing: { after: 400 } })
      ];
      
      if (answers.length === 0) {
        children.push(new Paragraph({ text: "Geen antwoorden of AI-gesprekken gevonden voor deze workshop." }));
      }

      answers.forEach((item, index) => {
        children.push(new Paragraph({
          children: [new TextRun({ text: `${index + 1}. ${item.question}`, bold: true, size: 28 })],
          spacing: { before: 300, after: 200 }
        }));
        
        if (item.answer.trim()) {
          children.push(new Paragraph({ text: item.answer, spacing: { after: 300 } }));
        } else {
          children.push(new Paragraph({ 
            children: [new TextRun({ text: "(Geen tekstueel antwoord ingevuld)", italic: true })],
            spacing: { after: 300 } 
          }));
        }
        
        if (item.aiConversation && item.aiConversation.length > 0) {
          children.push(new Paragraph({
            children: [new TextRun({ text: "💬 AI Begeleiding", bold: true, size: 24, color: "4B5563" })],
            spacing: { before: 200, after: 150 }
          }));
          
          item.aiConversation.forEach((msg) => {
            const roleLabel = msg.role === "user" ? "Jij:" : "AI Begeleider:";
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
    } catch (error) {
      console.error("[DownloadButtons] Word generation failed:", error);
      toast({
        title: "Fout bij Word genereren",
        description: "Er is iets misgegaan bij het maken van het Word-document.",
        variant: "destructive"
      });
    }
  };

  const shareWithTeam = async () => {
    try {
      setIsSharing(true);
      const pdfBlob = await generatePDFBlob();
      
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
          description: "Je huiswerk inclusief álle AI-begeleiding is gedeeld met het Hartspraak-team.",
        });
      };
    } catch (error) {
      console.error("[DownloadButtons] Error sharing homework:", error);
      toast({
        title: "Fout bij delen",
        description: "Er is iets misgegaan bij het delen van je huiswerk. Probeer het later opnieuw.",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={downloadPDF}
        variant="outline"
        className="gap-2"
        disabled={isSharing}
      >
        {isSharing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Download PDF
      </Button>
      <Button
        onClick={downloadWord}
        variant="outline"
        className="gap-2"
        disabled={isSharing}
      >
        {isSharing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        Download Word
      </Button>
      <Button
        onClick={shareWithTeam}
        disabled={isSharing || hasShared}
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
