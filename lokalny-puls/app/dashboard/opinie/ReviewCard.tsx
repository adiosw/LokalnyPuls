"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Review = {
  id: string;
  author_name: string | null;
  rating: number;
  comment: string | null;
  reviewed_at: string | null;
  reply_text: string | null;
  reply_status: string;
};

export default function ReviewCard({
  review,
  businessName,
}: {
  review: Review;
  businessName: string;
}) {
  const [reply, setReply] = useState(review.reply_text ?? "");
  const [status, setStatus] = useState(review.reply_status);
  const [loading, setLoading] = useState(false);

  const generateReply = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId: review.id,
          businessName,
          rating: review.rating,
          reviewText: review.comment ?? "",
        }),
      });
      const data = await res.json();
      setReply(data.reply);
      setStatus("ai_suggested");
    } catch (err) {
      console.error(err);
      alert("Nie udało się wygenerować odpowiedzi. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const publishReply = async () => {
    const supabase = createClient();
    await supabase
      .from("reviews")
      .update({ reply_text: reply, reply_status: "published" })
      .eq("id", review.id);
    setStatus("published");
    // Uwaga: to zapisuje odpowiedź w naszej bazie. Faktyczna publikacja
    // do Google odbywa się przez Google Business Profile API (Etap 3).
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold">{review.author_name ?? "Anonimowy"}</p>
          <p className="text-highlight text-sm">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
            status === "published"
              ? "bg-green-500/15 text-green-400"
              : status === "ai_suggested"
              ? "bg-highlight/15 text-highlight"
              : "bg-white/10 text-white/50"
          }`}
        >
          {status === "published" ? "Odpowiedziano" : status === "ai_suggested" ? "Sugestia gotowa" : "Oczekuje"}
        </span>
      </div>

      <p className="text-white/80 mb-4">{review.comment}</p>

      {reply && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <p className="text-xs text-white/40 mb-2 uppercase font-bold">Twoja odpowiedź</p>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            className="w-full bg-transparent text-white/90 text-sm resize-none focus:outline-none"
          />
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={generateReply}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl btn-primary font-semibold text-sm disabled:opacity-50"
        >
          {loading ? "Generuję..." : reply ? "🤖 Wygeneruj ponownie" : "🤖 Generuj odpowiedź AI"}
        </button>
        {reply && status !== "published" && (
          <button
            onClick={publishReply}
            className="px-5 py-2.5 rounded-xl border-2 border-primary font-semibold text-sm"
          >
            ✅ Zatwierdź i opublikuj
          </button>
        )}
      </div>
    </div>
  );
}
