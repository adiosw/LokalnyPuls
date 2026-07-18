import Groq from "groq-sdk";

let groqInstance: Groq | null = null;

/**
 * Leniwa inicjalizacja - patrz komentarz w lib/stripe.ts. Ten sam problem
 * dotyczył Groq: brak GROQ_API_KEY wywalał budowanie CAŁEJ aplikacji,
 * nie tylko funkcji, które go używają.
 */
function getGroq(): Groq {
  if (!groqInstance) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error(
        "Brak GROQ_API_KEY w zmiennych środowiskowych. Ustaw go w Vercel: Project Settings -> Environment Variables."
      );
    }
    groqInstance = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqInstance;
}

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

  const completion = await getGroq().chat.completions.create({
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
  const completion = await getGroq().chat.completions.create({
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
  const completion = await getGroq().chat.completions.create({
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

/**
 * Generuje propozycje SEO (tematy, tytuły, meta description, FAQ, linkowanie,
 * aktualizacje, nowe landing page, klastry tematyczne, analiza luk vs konkurencja).
 * WYŁĄCZNIE propozycje - nic z tego nie jest publikowane automatycznie.
 */
export async function generateSeoSuggestions(params: {
  mode:
    | "topics"
    | "title"
    | "meta_description"
    | "faq"
    | "internal_links"
    | "content_update"
    | "new_landing_page"
    | "topic_cluster"
    | "content_gap";
  context: string; // np. istniejąca treść artykułu, lista obecnych podstron, tekst konkurencji
}) {
  const modeInstructions: Record<typeof params.mode, string> = {
    topics: "Zaproponuj 5 nowych tematów artykułów blogowych o marketingu lokalnym i Google Maps, które jeszcze nie zostały poruszone.",
    title: "Zaproponuj 3 warianty tytułu SEO (max 60 znaków) dla podanej treści.",
    meta_description: "Zaproponuj 3 warianty meta description (max 155 znaków) dla podanej treści.",
    faq: "Zaproponuj 5 pytań FAQ z odpowiedziami, które realnie mogliby zadać właściciele lokalnych firm na ten temat.",
    internal_links: "Zaproponuj 5 miejsc, gdzie warto dodać link wewnętrzny do podanej treści, z krótkim uzasadnieniem.",
    content_update: "Przeanalizuj podaną treść i zaproponuj konkretne aktualizacje - co jest nieaktualne, czego brakuje, co warto rozbudować.",
    new_landing_page: "Na podstawie podanego kontekstu zaproponuj 3 nowe landing page (branża/usługa/miasto), które warto stworzyć.",
    topic_cluster: "Zaproponuj nowy klaster tematyczny (grupę powiązanych artykułów wokół jednego tematu głównego) wraz z listą 5-8 podtematów.",
    content_gap: "Porównaj podaną treść konkurencji z tym co już mamy i wskaż konkretne luki tematyczne, które warto uzupełnić.",
  };

  const completion = await getGroq().chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    max_tokens: 1200,
    messages: [
      {
        role: "system",
        content:
          "Jesteś ekspertem SEO (technical, content, programmatic) dla polskiego startupu SaaS z branży marketingu lokalnego. " +
          "Odpowiadasz WYŁĄCZNIE w formacie JSON: " +
          '{"suggestions": [{"title": "...", "detail": "...", "reasoning": "..."}]}. ' +
          "Bez treści poza tym obiektem JSON. Pisz po polsku, konkretnie, bez lania wody.",
      },
      {
        role: "user",
        content: `${modeInstructions[params.mode]}\n\nKontekst:\n${params.context}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content?.trim() ?? '{"suggestions":[]}';
  try {
    return JSON.parse(raw) as {
      suggestions: { title: string; detail: string; reasoning: string }[];
    };
  } catch {
    return { suggestions: [] };
  }
}
