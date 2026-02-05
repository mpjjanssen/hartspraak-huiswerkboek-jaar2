import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { useAuth } from "@/contexts/AuthContext";

interface DownloadButtonsProps {
  workshopId: string;
  workshopTitle?: string;
  workshopDate?: string;
}

interface AnswerEntry {
  questionId: string;
  answer: string;
}

const defaultTitles: Record<string, string> = {
  "ws1": "Workshop 1: De Zes Karakterstructuren",
  "workshop1": "Workshop 1: De Zes Karakterstructuren",
  "workshop1-dag2": "Workshop 1 Dag 2: Verdieping",
  "ws2": "Workshop 2: Jouw Structuur in Detail",
  "workshop2": "Workshop 2: Jouw Structuur in Detail",
  "ws3": "Workshop 3: Wie met Wie Kan",
  "workshop3": "Workshop 3: Wie met Wie Kan",
  "ws4": "Workshop 4: Van Wond naar Wonder",
  "workshop4": "Workshop 4: Van Wond naar Wonder",
};

export function DownloadButtons({ 
  workshopId, 
  workshopTitle,
  workshopDate,
}: DownloadButtonsProps) {
  const { user } = useAuth();
  const userId = user?.id;

  const title = workshopTitle || defaultTitles[workshopId] || `Workshop ${workshopId}`;
  const date = workshopDate || new Date().toLocaleDateString('nl-NL');

  const getAnswers = (): AnswerEntry[] => {
    if (!userId) return [];
    const answers: AnswerEntry[] = [];
    const prefix = `hartspraak-${userId}-${workshopId}-`;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const value = localStorage.getItem(key);
        if (value && value.trim()) {
          const questionId = key.replace(prefix, "");
          answers.push({
            questionId,
            answer: value,
          });
        }
      }
    }
    
    // Sort by questionId for consistent ordering
    answers.sort((a, b) => a.questionId.localeCompare(b.questionId));
    return answers;
  };

  const formatQuestionId = (id: string): string => {
    return id
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const answers = getAnswers();
    
    doc.setFontSize(20);
    doc.text(title, 20, 20);
    
    doc.setFontSize(12);
    doc.text(date, 20, 30);
    
    let yPosition = 45;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;
    
    answers.forEach((item, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      const questionLines = doc.splitTextToSize(`${index + 1}. ${formatQuestionId(item.questionId)}`, maxWidth);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 7 + 5;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const answerLines = doc.splitTextToSize(item.answer, maxWidth);
      
      const answerHeight = answerLines.length * 6;
      if (yPosition + answerHeight > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(answerLines, margin, yPosition);
      yPosition += answerHeight + 15;
    });
    
    const filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Antwoorden.pdf`;
    doc.save(filename);
  };

  const downloadWord = async () => {
    const answers = getAnswers();
    
    const children: Paragraph[] = [
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 }
      }),
      new Paragraph({
        text: date,
        spacing: { after: 400 }
      })
    ];
    
    answers.forEach((item, index) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${index + 1}. ${formatQuestionId(item.questionId)}`,
              bold: true,
              size: 28
            })
          ],
          spacing: { before: 300, after: 200 }
        })
      );
      
      const lines = item.answer.split('\n');
      lines.forEach(line => {
        children.push(
          new Paragraph({
            text: line,
            spacing: { after: 100 }
          })
        );
      });
      
      children.push(
        new Paragraph({
          text: "",
          spacing: { after: 200 }
        })
      );
    });
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: children
      }]
    });
    
    const blob = await Packer.toBlob(doc);
    const filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Antwoorden.docx`;
    saveAs(blob, filename);
  };

  const hasAnswers = getAnswers().length > 0;

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
    </div>
  );
}
