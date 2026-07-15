import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReviewReply, generateGooglePost } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nie zalogowano" }, { status: 401 });
  }

  const body = await req.json();

  // Tryb 1: generator postów Google (wywoływany z /dashboard/posty)
  if (body.mode === "post") {
    const { data: business } = await supabase
      .from("businesses")
      .select("name, industry")
      .eq("owner_id", user.id)
      .single();

    const reply = await generateGooglePost({
      businessName: business?.name ?? "Twoja firma",
      industry: business?.industry ?? "usługi lokalne",
      topic: body.topic,
    });

    return NextResponse.json({ reply });
  }

  // Tryb 2 (domyślny): sugestia odpowiedzi na opinię (wywoływany z ReviewCard)
  const { reviewId, businessName, rating, reviewText } = body;

  const reply = await generateReviewReply({
    businessName,
    rating,
    reviewText,
  });

  // Zapisujemy sugestię od razu, żeby nie przepadła przy odświeżeniu strony
  if (reviewId) {
    await supabase
      .from("reviews")
      .update({ reply_text: reply, reply_status: "ai_suggested" })
      .eq("id", reviewId);
  }

  return NextResponse.json({ reply });
}
