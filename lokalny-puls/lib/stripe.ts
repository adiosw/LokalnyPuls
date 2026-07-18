import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

/**
 * Leniwa inicjalizacja klienta Stripe - tworzona dopiero przy pierwszym
 * realnym wywołaniu (w środku Route Handlera), NIE na poziomie modułu.
 *
 * To jest krytyczne dla działania builda: jeśli STRIPE_SECRET_KEY nie jest
 * ustawiony w zmiennych środowiskowych (np. przy pierwszym deployu na Vercel
 * zanim skonfigurujesz sekrety), konstruktor `new Stripe(undefined, ...)`
 * rzuca wyjątkiem. Gdyby to działo się na poziomie modułu (`export const
 * stripe = new Stripe(...)`), Next.js napotyka ten błąd podczas fazy
 * "Collecting page data" i CAŁY build się wywala - nie tylko ten jeden route,
 * tylko WSZYSTKIE strony w aplikacji, łącznie ze stroną główną.
 */
export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "Brak STRIPE_SECRET_KEY w zmiennych środowiskowych. Ustaw go w Vercel: Project Settings -> Environment Variables."
      );
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return stripeInstance;
}

// Mapowanie planu SaaS na Stripe Price ID (skonfigurowane w .env.local)
export const PLAN_PRICE_IDS: Record<"start" | "standard" | "premium", string> = {
  start: process.env.STRIPE_PRICE_START ?? "",
  standard: process.env.STRIPE_PRICE_STANDARD ?? "",
  premium: process.env.STRIPE_PRICE_PREMIUM ?? "",
};
