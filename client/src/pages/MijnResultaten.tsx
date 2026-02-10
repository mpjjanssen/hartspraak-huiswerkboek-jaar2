import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "wouter";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

// ═══════════════════════════════════════════════════════════
// TYPES & CONSTANTS (shared with DeMaskermaker)
// ═══════════════════════════════════════════════════════════

type StructureKey = "A" | "B" | "S" | "C" | "D" | "E";

const STRUCTURE_INFO: Record<StructureKey, { name: string; color: string; fullName: string }> = {
  A: { name: "De Ontwijker", color: "#5B7B9A", fullName: "Ontwijkende structuur" },
  B: { name: "De zoeker", color: "#C4836A", fullName: "Zoekende structuur" },
  S: { name: "De versmelter", color: "#8B6F8E", fullName: "Versmeltende structuur" },
  C: { name: "De strateeg", color: "#6A8E6B", fullName: "Strategische structuur" },
  D: { name: "De drager", color: "#A68B5B", fullName: "Dragende structuur" },
  E: { name: "De Presteerder", color: "#7A8BA0", fullName: "Presterende structuur" },
};

const STRUCTURE_ORDER: StructureKey[] = ["A", "B", "S", "C", "D", "E"];

const INTERPRETATION = [
  { min: 70, max: 100, label: "Dominante structuur", desc: "Dit patroon is sterk aanwezig en waarschijnlijk zichtbaar in je dagelijks leven." },
  { min: 40, max: 69, label: "Aanwezige structuur", desc: "Dit patroon speelt een rol, vooral onder stress of in intieme relaties." },
  { min: 15, max: 39, label: "Achtergrondstructuur", desc: "Dit patroon is niet dominant maar kan in specifieke situaties een rol spelen." },
  { min: 0, max: 14, label: "Nauwelijks aanwezig", desc: "Dit patroon speelt geen wezenlijke rol in het huidige functioneren." },
];

function getInterpretation(score: number) {
  return INTERPRETATION.find(i => score >= i.min && score <= i.max) || INTERPRETATION[3];
}

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

interface ResultRecord {
  id: number;
  scoreA: number;
  scoreB: number;
  scoreS: number;
  scoreC: number;
  scoreD: number;
  scoreE: number;
  scoresNormI: string;
  scoresNormII: string;
  scoresNormIII: string;
  profileType: string;
  topStructures: string;
  portraitText: string | null;
  completedAt: string;
}

// ═══════════════════════════════════════════════════════════
// HELPER: format date
// ═══════════════════════════════════════════════════════════

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

// ═══════════════════════════════════════════════════════════
// SINGLE RESULT CARD
// ═══════════════════════════════════════════════════════════

function ResultCard({ result, index, total }: { result: ResultRecord; index: number; total: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [showPortrait, setShowPortrait] = useState(false);

  const combined: Record<StructureKey, number> = {
    A: result.scoreA, B: result.scoreB, S: result.scoreS,
    C: result.scoreC, D: result.scoreD, E: result.scoreE,
  };

  const chartData = STRUCTURE_ORDER.map(s => ({
    structure: STRUCTURE_INFO[s].name,
    score: combined[s],
    fullMark: 100,
  }));

  const sorted = [...STRUCTURE_ORDER].sort((a, b) => combined[b] - combined[a]);
  const top3 = sorted.slice(0, 3);
  const label = total === 1 ? "Jouw resultaat" : index === 0 ? "Meest recent" : `Afname ${total - index}`;

  // Parse sub-scores
  let normI: Record<string, number> = {};
  let normII: Record<string, number> = {};
  let normIII: Record<string, number> = {};
  try { normI = JSON.parse(result.scoresNormI); } catch {}
  try { normII = JSON.parse(result.scoresNormII); } catch {}
  try { normIII = JSON.parse(result.scoresNormIII); } catch {}

  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: 16,
      border: `1px solid ${index === 0 ? S.accent : S.border}`,
      overflow: "hidden",
      marginBottom: 24,
      boxShadow: index === 0 ? "0 2px 12px rgba(155,142,122,0.12)" : "none",
    }}>
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: index === 0 ? S.accent : S.subtle,
            fontFamily: S.fontBody,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}>{label}</div>
          <div style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody }}>{formatDate(result.completedAt)}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <span style={{
            fontSize: 12,
            padding: "3px 10px",
            borderRadius: 20,
            backgroundColor: S.card,
            color: S.muted,
            fontFamily: S.fontBody,
          }}>{result.profileType}</span>
          <span style={{
            fontSize: 18,
            color: S.subtle,
            transition: "transform 0.2s",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}>▾</span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: "0 24px 28px" }}>
          {/* Radar chart */}
          <div style={{ width: "100%", height: 300, marginBottom: 28 }}>
            <ResponsiveContainer>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="72%">
                <PolarGrid stroke={S.border} />
                <PolarAngleAxis dataKey="structure" tick={{ fontSize: 12, fill: S.hover, fontFamily: S.fontBody }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="score" stroke={S.accent} fill={S.accent} fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 3 */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: S.subtle, marginBottom: 12, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              Je drie sterkste structuren
            </p>
            {top3.map((s, i) => {
              const interp = getInterpretation(combined[s]);
              return (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: i < 2 ? "1px solid #f0ebe3" : "none" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    backgroundColor: STRUCTURE_INFO[s].color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: S.fontBody, flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                      <span style={{ fontSize: 15, color: S.text, fontFamily: S.fontBody, fontWeight: 600 }}>{STRUCTURE_INFO[s].name}</span>
                      <span style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody }}>{combined[s]}%</span>
                    </div>
                    <p style={{ fontSize: 12, color: S.muted, fontFamily: S.fontBody, fontStyle: "italic" }}>{interp.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full profile */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: S.subtle, marginBottom: 10, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              Volledig profiel
            </p>
            {sorted.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 5 ? "1px solid #f0ebe3" : "none" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  backgroundColor: STRUCTURE_INFO[s].color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 11, fontWeight: 600, fontFamily: S.fontBody,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, color: S.text, fontFamily: S.fontBody }}>{STRUCTURE_INFO[s].name}</span>
                  <span style={{ fontSize: 11, color: S.muted, fontFamily: S.fontBody, marginLeft: 6 }}>({STRUCTURE_INFO[s].fullName})</span>
                </div>
                <div style={{ fontSize: 13, color: S.muted, fontFamily: S.fontBody }}>{combined[s]}%</div>
              </div>
            ))}
          </div>

          {/* Score per method table */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: S.subtle, marginBottom: 10, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              Score per meetmethode
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: S.fontBody, fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${S.border}` }}>
                    <th style={{ textAlign: "left", padding: "8px", color: S.muted, fontWeight: 600 }}>Structuur</th>
                    <th style={{ textAlign: "center", padding: "8px", color: S.muted, fontWeight: 600 }}>I</th>
                    <th style={{ textAlign: "center", padding: "8px", color: S.muted, fontWeight: 600 }}>II</th>
                    <th style={{ textAlign: "center", padding: "8px", color: S.muted, fontWeight: 600 }}>III</th>
                    <th style={{ textAlign: "center", padding: "8px", color: S.text, fontWeight: 600 }}>Totaal</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(s => (
                    <tr key={s} style={{ borderBottom: "1px solid #f0ebe3" }}>
                      <td style={{ padding: "8px", color: S.text }}>{STRUCTURE_INFO[s].name}</td>
                      <td style={{ textAlign: "center", padding: "8px", color: S.muted }}>{Math.round(normI[s] || 0)}%</td>
                      <td style={{ textAlign: "center", padding: "8px", color: S.muted }}>{Math.round(normII[s] || 0)}%</td>
                      <td style={{ textAlign: "center", padding: "8px", color: S.muted }}>{Math.round(normIII[s] || 0)}%</td>
                      <td style={{ textAlign: "center", padding: "8px", color: S.text, fontWeight: 600 }}>{combined[s]}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Portrait */}
          {result.portraitText && (
            <div>
              <button
                onClick={() => setShowPortrait(!showPortrait)}
                style={{
                  background: "none", border: `1px solid ${S.border}`, borderRadius: 8,
                  padding: "10px 18px", cursor: "pointer", fontFamily: S.fontBody,
                  fontSize: 13, color: S.accent, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                {showPortrait ? "Verberg portret" : "Bekijk portret"} ✦
              </button>
              {showPortrait && (
                <div style={{
                  marginTop: 16, padding: "24px",
                  backgroundColor: S.card, borderRadius: 12,
                  border: `1px solid ${S.border}`,
                  fontFamily: S.fontDisplay, fontSize: 15,
                  lineHeight: 1.8, color: S.text, whiteSpace: "pre-wrap",
                }}>
                  {result.portraitText}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// COMPARISON VIEW (2 results side by side)
// ═══════════════════════════════════════════════════════════

function ComparisonView({ results, idxA, idxB }: { results: ResultRecord[]; idxA: number; idxB: number }) {
  const rA = results[idxA];
  const rB = results[idxB];

  const scoresA: Record<StructureKey, number> = { A: rA.scoreA, B: rA.scoreB, S: rA.scoreS, C: rA.scoreC, D: rA.scoreD, E: rA.scoreE };
  const scoresB: Record<StructureKey, number> = { A: rB.scoreA, B: rB.scoreB, S: rB.scoreS, C: rB.scoreC, D: rB.scoreD, E: rB.scoreE };

  const chartData = STRUCTURE_ORDER.map(s => ({
    structure: STRUCTURE_INFO[s].name,
    [formatDateShort(rA.completedAt)]: scoresA[s],
    [formatDateShort(rB.completedAt)]: scoresB[s],
    fullMark: 100,
  }));

  const labelA = formatDateShort(rA.completedAt);
  const labelB = formatDateShort(rB.completedAt);
  const sortedA = [...STRUCTURE_ORDER].sort((a, b) => scoresA[b] - scoresA[a]);

  return (
    <div style={{
      backgroundColor: "#fff", borderRadius: 16,
      border: `1px solid ${S.accent}`,
      padding: "28px 24px", marginBottom: 24,
      boxShadow: "0 2px 12px rgba(155,142,122,0.12)",
    }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <p style={{ fontSize: 13, color: S.subtle, fontFamily: S.fontBody, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
          Vergelijking
        </p>
        <p style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody }}>
          <span style={{ color: S.accent, fontWeight: 600 }}>{labelA}</span> vs <span style={{ color: "#7a6f62", fontWeight: 600 }}>{labelB}</span>
        </p>
      </div>

      {/* Overlapping radar */}
      <div style={{ width: "100%", height: 340, marginBottom: 24 }}>
        <ResponsiveContainer>
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="72%">
            <PolarGrid stroke={S.border} />
            <PolarAngleAxis dataKey="structure" tick={{ fontSize: 12, fill: S.hover, fontFamily: S.fontBody }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name={labelA} dataKey={labelA} stroke={S.accent} fill={S.accent} fillOpacity={0.15} strokeWidth={2} />
            <Radar name={labelB} dataKey={labelB} stroke="#7a6f62" fill="#7a6f62" fillOpacity={0.1} strokeWidth={2} strokeDasharray="6 3" />
            <Legend wrapperStyle={{ fontFamily: S.fontBody, fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Difference table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: S.fontBody, fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${S.border}` }}>
              <th style={{ textAlign: "left", padding: "8px", color: S.muted, fontWeight: 600 }}>Structuur</th>
              <th style={{ textAlign: "center", padding: "8px", color: S.accent, fontWeight: 600 }}>{labelA}</th>
              <th style={{ textAlign: "center", padding: "8px", color: "#7a6f62", fontWeight: 600 }}>{labelB}</th>
              <th style={{ textAlign: "center", padding: "8px", color: S.text, fontWeight: 600 }}>Verschil</th>
            </tr>
          </thead>
          <tbody>
            {sortedA.map(s => {
              const diff = scoresA[s] - scoresB[s];
              const diffColor = diff > 0 ? "#6A8E6B" : diff < 0 ? "#C4836A" : S.muted;
              const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
              return (
                <tr key={s} style={{ borderBottom: "1px solid #f0ebe3" }}>
                  <td style={{ padding: "8px", color: S.text }}>
                    <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", backgroundColor: STRUCTURE_INFO[s].color, marginRight: 8 }} />
                    {STRUCTURE_INFO[s].name}
                  </td>
                  <td style={{ textAlign: "center", padding: "8px", color: S.text, fontWeight: 600 }}>{scoresA[s]}%</td>
                  <td style={{ textAlign: "center", padding: "8px", color: S.muted }}>{scoresB[s]}%</td>
                  <td style={{ textAlign: "center", padding: "8px", color: diffColor, fontWeight: 600 }}>
                    {diff === 0 ? "—" : diffStr}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

export default function MijnResultaten() {
  const { token } = useAuth();
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareA, setCompareA] = useState(0);
  const [compareB, setCompareB] = useState(1);

  useEffect(() => {
    if (!token) return;
    fetch("/api/spiegelwerk-results/mine", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Kon resultaten niet ophalen");
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: S.bg }}>
        <p style={{ fontFamily: S.fontBody, color: S.muted, fontSize: 15 }}>Laden...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: S.bg }}>
        <p style={{ fontFamily: S.fontBody, color: "#b44", fontSize: 15 }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: S.bg, minHeight: "100vh", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: S.subtle, marginBottom: 16, fontFamily: S.fontBody }}>
            Spiegelwerk
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 400, color: S.text, marginBottom: 8, fontFamily: S.fontDisplay }}>
            Mijn resultaten
          </h1>
          <p style={{ fontSize: 14, color: S.muted, fontFamily: S.fontBody, fontStyle: "italic" }}>
            {results.length === 0
              ? "Je hebt de test nog niet gemaakt."
              : results.length === 1
                ? "Je hebt de test één keer gemaakt."
                : `Je hebt de test ${results.length} keer gemaakt — vergelijk je ontwikkeling.`
            }
          </p>
        </div>

        {results.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Link href="/test">
              <button style={{
                background: S.accent, color: "#fff", border: "none", borderRadius: 8,
                padding: "14px 32px", fontSize: 15, fontFamily: S.fontBody,
                cursor: "pointer", fontWeight: 600,
              }}>
                Doe de test
              </button>
            </Link>
          </div>
        )}

        {/* Compare toggle (only if 2+ results) */}
        {results.length >= 2 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 28 }}>
            <button
              onClick={() => setCompareMode(false)}
              style={{
                padding: "8px 20px", borderRadius: 8, border: `1px solid ${S.border}`,
                backgroundColor: !compareMode ? S.accent : "#fff",
                color: !compareMode ? "#fff" : S.muted,
                fontFamily: S.fontBody, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              Individueel
            </button>
            <button
              onClick={() => setCompareMode(true)}
              style={{
                padding: "8px 20px", borderRadius: 8, border: `1px solid ${S.border}`,
                backgroundColor: compareMode ? S.accent : "#fff",
                color: compareMode ? "#fff" : S.muted,
                fontFamily: S.fontBody, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              Vergelijken
            </button>
          </div>
        )}

        {/* Compare mode */}
        {compareMode && results.length >= 2 && (
          <>
            <div style={{
              display: "flex", justifyContent: "center", gap: 16, marginBottom: 24,
              flexWrap: "wrap", alignItems: "center",
            }}>
              <select
                value={compareA}
                onChange={e => setCompareA(Number(e.target.value))}
                style={{
                  padding: "8px 14px", borderRadius: 8, border: `1px solid ${S.border}`,
                  fontFamily: S.fontBody, fontSize: 13, color: S.text, backgroundColor: "#fff",
                }}
              >
                {results.map((r, i) => (
                  <option key={i} value={i}>{formatDateShort(r.completedAt)}</option>
                ))}
              </select>
              <span style={{ fontSize: 13, color: S.muted, fontFamily: S.fontBody }}>vs</span>
              <select
                value={compareB}
                onChange={e => setCompareB(Number(e.target.value))}
                style={{
                  padding: "8px 14px", borderRadius: 8, border: `1px solid ${S.border}`,
                  fontFamily: S.fontBody, fontSize: 13, color: S.text, backgroundColor: "#fff",
                }}
              >
                {results.map((r, i) => (
                  <option key={i} value={i}>{formatDateShort(r.completedAt)}</option>
                ))}
              </select>
            </div>
            {compareA !== compareB ? (
              <ComparisonView results={results} idxA={compareA} idxB={compareB} />
            ) : (
              <p style={{ textAlign: "center", fontSize: 13, color: S.muted, fontFamily: S.fontBody, marginBottom: 24 }}>
                Kies twee verschillende afnames om te vergelijken.
              </p>
            )}
          </>
        )}

        {/* Individual results */}
        {!compareMode && results.map((r, i) => (
          <ResultCard key={r.id} result={r} index={i} total={results.length} />
        ))}

        {/* Link to retake test */}
        {results.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Link href="/test">
              <button style={{
                background: "none", color: S.accent, border: `1px solid ${S.border}`,
                borderRadius: 8, padding: "12px 28px", fontSize: 14,
                fontFamily: S.fontBody, cursor: "pointer", fontWeight: 600,
              }}>
                Test opnieuw doen
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
