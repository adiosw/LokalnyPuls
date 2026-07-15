import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, PLAN_PRICE_IDS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { planId } = (await req.json()) as {
    planId: keyof typeof PLAN_PRICE_IDS;
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!business) {
    return NextResponse.json({ error: "Brak firmy przypisanej do konta" }, { status: 400 });
  }

  const priceId = PLAN_PRICE_IDS[planId];
  if (!priceId) {
    return NextResponse.json({ error: "Nieznany plan" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: business.stripe_customer_id ? undefined : user.email,
    customer: business.stripe_customer_id ?? undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      metadata: { business_id: business.id, plan: planId },
    },
    metadata: { business_id: business.id, plan: planId },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/ustawienia?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/ustawienia?canceled=1`,
  });

  return NextResponse.json({ url: session.url });
}
