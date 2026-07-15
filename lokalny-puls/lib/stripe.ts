import Stripe from "stripe";

// Jeden współdzielony klient Stripe używany we wszystkich Route Handlers
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Mapowanie planu SaaS na Stripe Price ID (skonfigurowane w .env.local)
export const PLAN_PRICE_IDS: Record<"start" | "standard" | "premium", string> = {
  start: process.env.STRIPE_PRICE_START!,
  standard: process.env.STRIPE_PRICE_STANDARD!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
};
