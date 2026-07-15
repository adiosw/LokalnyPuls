"use client";

import { useState } from "react";

export default function PostyPage() {
  const [topic, setTopic] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/reviews/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "post", topic }),
      });
      const data = await res.json();
      setGenerated(data.reply);
    } catch (err) {
      console.error(err);
      alert("Nie udało się wygenerować posta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-2">Generator postów</h1>
      <p className="text-white/50 mb-8">
        Opisz temat lub okazję — AI napisze gotowy post na Twoją wizytówkę Google.
      </p>

      <div className="glass rounded-2xl p-8 max-w-2xl">
        <label className="block text-sm font-semibold mb-3">
          Temat / okazja posta
        </label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="np. Promocja weekendowa -20% na wszystkie usługi"
          className="w-full px-5 py-4 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none text-white mb-5"
        />
        <button
          onClick={generate}
          disabled={loading}
          className="px-6 py-3 rounded-xl btn-primary font-semibold disabled:opacity-50"
        >
          {loading ? "Generuję..." : "🤖 Generuj post"}
        </button>

        {generated && (
          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs text-white/40 mb-2 uppercase font-bold">
              Gotowy post
            </p>
            <p className="text-white/90 whitespace-pre-wrap">{generated}</p>
            <p className="text-xs text-white/30 mt-4">
              Publikacja bezpośrednio na Google Business Profile — dostępna w Etapie 3
              (integracja Google Business Profile API).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
