/**
 * PortraitSection.tsx
 * Component dat na de testresultaten een persoonlijk portret genereert via Claude.
 *
 * Voeg dit toe aan client/src/components/PortraitSection.tsx
 * en importeer het in DeMaskermaker.tsx (zie instructies).
 */

import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// Dezelfde stijl-constanten als DeMaskermaker
const S = {
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody: "'Lora', Georgia, serif",
  bg: "#faf8f4",
  text: "#3d3629",
  muted: "#8a8578",
  subtle: "#a09888",
  accent: "#9b8e7a",
  border: "#e0dbd2",
  hover: "#5a5347",
  card: "#f5f1ea",
};

interface PortraitSectionProps {
  normI: Record<string, number>;
  normII: Record<string, number>;
  normIII: Record<string, number>;
}

/**
 * Converteert markdown-achtige opmaak naar React-elementen.
 * Ondersteunt: **bold**, *italic*, > blockquotes, • • • scheiders, headings
 */
function renderPortraitText(text: string): JSX.Element[] {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Sectie-scheider
    if (line === "• • •" || line === "···" || line === "---") {
      elements.push(
        <div
          key={key++}
          style={{
            textAlign: "center",
            padding: "24px 0",
            fontSize: 14,
            color: S.subtle,
            letterSpacing: 8,
          }}
        >
          • • •
        </div>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteText = line.replace(/^>\s*/, "");
      elements.push(
        <blockquote
          key={key++}
          style={{
            borderLeft: `3px solid ${S.accent}`,
            paddingLeft: 20,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 20,
            marginBottom: 20,
            fontStyle: "italic",
            color: S.muted,
            fontFamily: S.fontBody,
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          {renderInlineFormatting(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Heading (## of **)
    if (line.startsWith("## ") || line.startsWith("**") && line.endsWith("**") && line.length < 80) {
      const headingText = line.replace(/^##\s*/, "").replace(/^\*\*/, "").replace(/\*\*$/, "");
      elements.push(
        <h3
          key={key++}
          style={{
            fontFamily: S.fontDisplay,
            fontSize: 22,
            fontWeight: 400,
            color: S.text,
            marginTop: 32,
            marginBottom: 12,
          }}
        >
          {headingText}
        </h3>
      );
      continue;
    }

    // Score-overzicht (bold items met •)
    if (line.match(/^\*\*.*\d+%\*\*/)) {
      elements.push(
        <p
          key={key++}
          style={{
            fontFamily: S.fontBody,
            fontSize: 14,
            color: S.text,
            lineHeight: 1.8,
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          {renderInlineFormatting(line)}
        </p>
      );
      continue;
    }

    // Gewone paragraaf
    elements.push(
      <p
        key={key++}
        style={{
          fontFamily: S.fontBody,
          fontSize: 15,
          color: S.text,
          lineHeight: 1.85,
          marginBottom: 16,
        }}
      >
        {renderInlineFormatting(line)}
      </p>
    );
  }

  return elements;
}

/**
 * Rendert inline opmaak: **bold** en *italic*
 */
function renderInlineFormatting(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let partKey = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic: *text* (maar niet **)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

    // Vind de eerste match
    let firstMatch: { type: "bold" | "italic"; match: RegExpMatchArray } | null = null;

    if (boldMatch && italicMatch) {
      firstMatch = (boldMatch.index! <= italicMatch.index!)
        ? { type: "bold", match: boldMatch }
        : { type: "italic", match: italicMatch };
    } else if (boldMatch) {
      firstMatch = { type: "bold", match: boldMatch };
    } else if (italicMatch) {
      firstMatch = { type: "italic", match: italicMatch };
    }

    if (!firstMatch) {
      parts.push(remaining);
      break;
    }

    const { type, match } = firstMatch;
    const index = match.index!;

    // Tekst vóór de match
    if (index > 0) {
      parts.push(remaining.substring(0, index));
    }

    // De geformatteerde tekst
    if (type === "bold") {
      parts.push(
        <strong key={`fmt-${partKey++}`} style={{ fontWeight: 600 }}>
          {match[1]}
        </strong>
      );
    } else {
      parts.push(
        <em key={`fmt-${partKey++}`} style={{ fontStyle: "italic" }}>
          {match[1]}
        </em>
      );
    }

    remaining = remaining.substring(index + match[0].length);
  }

  return parts;
}

export default function PortraitSection({ normI, normII, normIII }: PortraitSectionProps) {
  const [portrait, setPortrait] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();

  async function generatePortrait() {
    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch("/api/spiegelwerk/portrait", {
        method: "POST",
        headers,
        body: JSON.stringify({ normI, normII, normIII }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Er ging iets mis.");
      }

      const data = await response.json();
      setPortrait(data.portrait);

      // Scroll naar het portret
      setTimeout(() => {
        portraitRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);

    } catch (err: any) {
      setError(err.message || "Er ging iets mis bij het genereren van je portret.");
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    if (!portraitRef.current) return;
    const content = portraitRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mijn Spiegelwerk-portret</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Lora', Georgia, serif;
            color: #3d3629;
            max-width: 640px;
            margin: 40px auto;
            padding: 0 20px;
            line-height: 1.8;
          }
          h2, h3 { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; }
          blockquote {
            border-left: 3px solid #9b8e7a;
            padding-left: 20px;
            margin-left: 0;
            font-style: italic;
            color: #8a8578;
          }
          @media print {
            body { margin: 0; padding: 20px; }
          }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <div style={{ maxWidth: 640, width: "100%", margin: "40px auto 0" }}>
      {/* Genereer-knop */}
      {!portrait && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 24px",
            backgroundColor: S.card,
            borderRadius: 12,
            border: `1px solid ${S.border}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: S.subtle,
              marginBottom: 12,
              fontFamily: S.fontBody,
            }}
          >
            Persoonlijk portret
          </div>
          <h3
            style={{
              fontFamily: S.fontDisplay,
              fontSize: 24,
              fontWeight: 400,
              color: S.text,
              marginBottom: 12,
            }}
          >
            Wil je je profiel tot leven zien komen?
          </h3>
          <p
            style={{
              fontFamily: S.fontBody,
              fontSize: 14,
              color: S.muted,
              marginBottom: 24,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            Op basis van jouw unieke scorecombinatie schrijft onze AI een
            persoonlijk portret — niet als diagnose, maar als spiegel. Het
            beschrijft hoe jouw patronen samenwerken, waar je kracht zit, en
            waar je groeiruimte ligt.
          </p>
          <button
            onClick={generatePortrait}
            style={{
              padding: "14px 32px",
              fontSize: 14,
              fontFamily: S.fontBody,
              color: "#f0ebe3",
              backgroundColor: S.text,
              border: "none",
              borderRadius: 24,
              cursor: "pointer",
              fontWeight: 600,
              letterSpacing: 0.5,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.backgroundColor = S.hover;
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.backgroundColor = S.text;
            }}
          >
            Genereer mijn portret
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 24px",
            backgroundColor: S.card,
            borderRadius: 12,
            border: `1px solid ${S.border}`,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: `3px solid ${S.border}`,
              borderTopColor: S.accent,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p
            style={{
              fontFamily: S.fontBody,
              fontSize: 15,
              color: S.text,
              marginBottom: 8,
            }}
          >
            Je portret wordt geschreven...
          </p>
          <p
            style={{
              fontFamily: S.fontBody,
              fontSize: 13,
              color: S.muted,
              fontStyle: "italic",
            }}
          >
            Dit duurt ongeveer 15–30 seconden
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            textAlign: "center",
            padding: "32px 24px",
            backgroundColor: "#fef2f0",
            borderRadius: 12,
            border: "1px solid #f0d4cf",
          }}
        >
          <p style={{ fontFamily: S.fontBody, fontSize: 14, color: "#8b4513", marginBottom: 16 }}>
            {error}
          </p>
          <button
            onClick={generatePortrait}
            style={{
              padding: "10px 24px",
              fontSize: 13,
              fontFamily: S.fontBody,
              color: S.text,
              backgroundColor: "transparent",
              border: `1px solid ${S.border}`,
              borderRadius: 20,
              cursor: "pointer",
            }}
          >
            Opnieuw proberen
          </button>
        </div>
      )}

      {/* Het portret */}
      {portrait && (
        <div ref={portraitRef}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 32,
              paddingTop: 20,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: S.subtle,
                marginBottom: 16,
                fontFamily: S.fontBody,
              }}
            >
              Persoonlijk portret
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            {renderPortraitText(portrait)}
          </div>

          {/* Acties */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handlePrint}
              style={{
                padding: "10px 24px",
                fontSize: 13,
                fontFamily: S.fontBody,
                color: S.hover,
                backgroundColor: "transparent",
                border: `1px solid ${S.border}`,
                borderRadius: 20,
                cursor: "pointer",
              }}
            >
              Afdrukken / opslaan als PDF
            </button>
            <button
              onClick={() => {
                setPortrait(null);
                setError(null);
              }}
              style={{
                padding: "10px 24px",
                fontSize: 13,
                fontFamily: S.fontBody,
                color: S.muted,
                backgroundColor: "transparent",
                border: `1px solid ${S.border}`,
                borderRadius: 20,
                cursor: "pointer",
              }}
            >
              Opnieuw genereren
            </button>
          </div>

          <p
            style={{
              fontSize: 12,
              color: S.subtle,
              fontFamily: S.fontBody,
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Dit portret is gegenereerd met AI op basis van je testresultaten.
            Het is bedoeld als startpunt voor zelfonderzoek en gesprek met je
            therapeut, niet als definitief oordeel.
          </p>
        </div>
      )}
    </div>
  );
}



