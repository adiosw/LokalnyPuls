import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Wysyła cotygodniowe podsumowanie firmy - główny mechanizm retencji
 * (przypomina o istnieniu narzędzia niezależnie od tego czy klient sam zajrzał).
 */
export async function sendWeeklySummaryEmail({
  to,
  businessName,
  newReviews,
  avgRating,
  ratingChange,
  postsPublished,
  streakWeeks,
}: {
  to: string;
  businessName: string;
  newReviews: number;
  avgRating: number | null;
  ratingChange: number;
  postsPublished: number;
  streakWeeks: number;
}) {
  const ratingChangeText =
    ratingChange > 0
      ? `📈 +${ratingChange.toFixed(1)}`
      : ratingChange < 0
      ? `📉 ${ratingChange.toFixed(1)}`
      : "bez zmian";

  await resend.emails.send({
    from: "Lokalny Puls <raporty@lokalnypuls.pl>",
    to,
    subject: `Twój tydzień: ${businessName} (${newReviews} nowych opinii)`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #050816; color: #fff; border-radius: 20px;">
        <h2 style="color: #60A5FA;">Twój tydzień w skrócie</h2>
        <p style="color: rgba(255,255,255,0.7);">${businessName}</p>

        <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; margin: 20px 0;">
          <p style="margin: 8px 0;">⭐ Ocena: <b>${avgRating ?? "—"}</b> (${ratingChangeText})</p>
          <p style="margin: 8px 0;">💬 Nowe opinie: <b>${newReviews}</b></p>
          <p style="margin: 8px 0;">📝 Opublikowane posty: <b>${postsPublished}</b></p>
          ${streakWeeks > 1 ? `<p style="margin: 8px 0;">🔥 Seria aktywności: <b>${streakWeeks} tygodni</b></p>` : ""}
        </div>

        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
           style="display: inline-block; background: linear-gradient(135deg,#3B82F6,#6366F1); color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: bold;">
          Zobacz pełny panel →
        </a>
      </div>
    `,
  });
}
