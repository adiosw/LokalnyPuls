import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

/**
 * Generuje sugerowaną odpowiedź na opinię Google po polsku.
 * Model: llama-3.3-70b-versatile (darmowy tier Groq - console.groq.com)
 */
export async function generateReviewReply({
  businessName,
  rating,
  reviewText,
}: {
  businessName: string;
  rating: number;
  reviewText: string;
}) {
  const tone =
    rating <= 2
      ? "przepraszający, empatyczny, oferujący realne rozwiązanie problemu"
      : rating === 3
      ? "rzeczowy, dziękujący za feedback, delikatnie zachęcający do powrotu"
      : "entuzjastyczny, ciepły, krótko dziękujący";

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    max_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "Jesteś asystentem właściciela lokalnej firmy w Polsce. Piszesz krótkie, naturalne odpowiedzi na opinie Google w języku polskim. Nigdy nie brzmisz jak bot ani korporacyjny szablon. Maksymalnie 4-5 zdań.",
      },
      {
        role: "user",
        content: `Firma: ${businessName}\nOcena klienta: ${rating}/5\nTreść opinii: "${reviewText}"\n\nTon odpowiedzi: ${tone}.\nNapisz gotową odpowiedź do opublikowania pod opinią.`,
      },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() ?? "";
}

/**
 * Generuje 1-3 krótkie wskazówki dnia na podstawie stanu firmy.
 * Wywoływane raz dziennie (cron) dla każdej aktywnej firmy.
 */
export async function generateDailyInsights(context: {
  businessName: string;
  avgRating: number | null;
  reviewsCount: number;
  pendingRepliesCount: number;
  photosCount: number;
  daysSinceLastPost: number | null;
}) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    max_tokens: 350,
    messages: [
      {
        role: "system",
        content:
          "Jesteś osobistym doradcą właściciela lokalnej firmy w Polsce ds. widoczności w Google. " +
          "Piszesz maksymalnie 3 krótkie, konkretne wskazówki (1 zdanie każda), bez lania wody, " +
          "z konkretną liczbą lub faktem jeśli to możliwe. Odpowiedz WYŁĄCZNIE w formacie JSON: " +
          '[{"message":"...", "action_label":"...", "action_href":"/dashboard/..."}]. ' +
          "Możliwe action_href: /dashboard (opinie), /dashboard/posty (generator postów), " +
          "/dashboard/ustawienia (zdjęcia/połączenie Google). Nie dodawaj nic poza tablicą JSON.",
      },
      {
        role: "user",
        content: `Dane firmy "${context.businessName}":
- Średnia ocena: ${context.avgRating ?? "brak danych"}
- Liczba opinii: ${context.reviewsCount}
- Opinie czekające na odpowiedź: ${context.pendingRepliesCount}
- Liczba zdjęć na wizytówce: ${context.photosCount}
- Dni od ostatniego posta: ${context.daysSinceLastPost ?? "nigdy nie publikowano"}

Wygeneruj wskazówki na dziś.`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content?.trim() ?? "[]";
  try {
    return JSON.parse(raw) as {
      message: string;
      action_label: string;
      action_href: string;
    }[];
  } catch {
    // Jeśli model nie zwrócił czystego JSON, nie wysypujemy crona - zwracamy pustą listę
    return [];
  }
}

export async function generateGooglePost({
  businessName,
  industry,
  topic,
}: {
  businessName: string;
  industry: string;
  topic: string;
}) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 250,
    messages: [
      {
        role: "system",
        content:
          "Piszesz krótkie posty na Google Business Profile dla lokalnych firm w Polsce. Max 400 znaków, konkretny, z jasnym CTA na końcu.",
      },
      {
        role: "user",
        content: `Firma: ${businessName} (branża: ${industry})\nTemat/okazja posta: ${topic}\n\nNapisz gotowy post + zaproponuj (jednym zdaniem) jakie zdjęcie do niego dodać.`,
      },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() ?? "";
}
