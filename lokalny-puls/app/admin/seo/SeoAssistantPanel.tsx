"use client";

import { useEffect, useState } from "react";

const MODES = [
  { value: "topics", label: "Nowe tematy artykułów" },
  { value: "title", label: "Warianty tytułu SEO" },
  { value: "meta_description", label: "Warianty meta description" },
  { value: "faq", label: "Propozycje FAQ" },
  { value: "internal_links", label: "Linkowanie wewnętrzne" },
  { value: "content_update", label: "Aktualizacja starej treści" },
  { value: "new_landing_page", label: "Nowe landing page" },
  { value: "topic_cluster", label: "Nowy klaster tematyczny" },
  { value: "content_gap", label: "Luki treści vs konkurencja" },
] as const;

type Suggestion = {
  id: string;
  type: string;
  target_url: string | null;
  suggestion: { title: string; detail: string; reasoning: string };
  status: string;
  created_at: string;
};

export default function SeoAssistantPanel() {
  const [mode, setMode] = useState<(typeof MODES)[number]["value"]>("topics");
  const [context, setContext] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const loadSuggestions = async () => {
    const res = await fetch("/api/admin/seo-assistant");
    const data = await res.json();
    setSuggestions(data.suggestions ?? []);
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const generate = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/seo-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, context, targetUrl: targetUrl || null }),
      });
      await loadSuggestions();
    } catch (err) {
      console.error(err);
      alert("Nie udało się wygenerować sugestii.");
    } finally {
      setLoading(false);
    }
  };

  const review = async (id: string, status: "approved" | "rejected") => {
    await fetch("/api/admin/seo-assistant", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const pending = suggestions.filter((s) => s.status === "pending");
  const reviewed = suggestions.filter((s) => s.status !== "pending");

  return (
    <div>
      {/* FORMULARZ GENEROWANIA */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "30px", marginBottom: "40px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "10px", color: "rgba(255,255,255,0.6)" }}>
          Typ sugestii
        </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as typeof mode)}
          style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.1)", color: "#fff", marginBottom: "18px" }}
        >
          {MODES.map((m) => (
            <option key={m.value} value={m.value} style={{ background: "#0B1120" }}>
              {m.label}
            </option>
          ))}
        </select>

        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "10px", color: "rgba(255,255,255,0.6)" }}>
          Adres URL, którego dotyczy sugestia (opcjonalnie)
        </label>
        <input
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="np. /mechanik-oswiecim-google-maps"
          style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.1)", color: "#fff", marginBottom: "18px" }}
        />

        <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "10px", color: "rgba(255,255,255,0.6)" }}>
          Kontekst (istniejąca treść, lista podstron, tekst konkurencji...)
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={5}
          placeholder="Wklej tu kontekst potrzebny AI do sensownej sugestii..."
          style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.1)", color: "#fff", marginBottom: "18px", resize: "vertical" }}
        />

        <button
          onClick={generate}
          disabled={loading}
          style={{ padding: "14px 32px", borderRadius: "12px", background: "linear-gradient(135deg,#3B82F6,#6366F1)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", opacity: loading ? 0.5 : 1 }}
        >
          {loading ? "Generuję..." : "🤖 Generuj sugestie"}
        </button>
      </div>

      {/* DO PRZEJRZENIA */}
      <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "16px" }}>
        Do przejrzenia ({pending.length})
      </p>
      <div style={{ marginBottom: "40px" }}>
        {pending.length === 0 && <p style={{ color: "rgba(255,255,255,0.4)" }}>Brak nowych sugestii.</p>}
        {pending.map((s) => (
          <div key={s.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "20px", marginBottom: "12px" }}>
            <p style={{ fontSize: "11px", color: "#60A5FA", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>{s.type}</p>
            <p style={{ fontWeight: 700, marginBottom: "6px" }}>{s.suggestion.title}</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginBottom: "8px" }}>{s.suggestion.detail}</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontStyle: "italic", marginBottom: "16px" }}>{s.suggestion.reasoning}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => review(s.id, "approved")}
                style={{ padding: "8px 20px", borderRadius: "8px", background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)", fontWeight: 600, cursor: "pointer" }}
              >
                ✅ Zatwierdź
              </button>
              <button
                onClick={() => review(s.id, "rejected")}
                style={{ padding: "8px 20px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)", fontWeight: 600, cursor: "pointer" }}
              >
                ❌ Odrzuć
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* HISTORIA */}
      {reviewed.length > 0 && (
        <>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "16px" }}>
            Przejrzane ({reviewed.length})
          </p>
          {reviewed.map((s) => (
            <div key={s.id} style={{ opacity: 0.5, padding: "12px 20px", fontSize: "14px" }}>
              {s.status === "approved" ? "✅" : "❌"} {s.suggestion.title}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
