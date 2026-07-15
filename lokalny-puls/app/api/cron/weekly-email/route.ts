import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWeeklySummaryEmail } from "@/lib/email";

/**
 * Wywoływane raz w tygodniu (poniedziałek rano) przez Vercel Cron.
 * Liczy streak: jeśli firma miała jakąkolwiek aktywność (nowa opinia/post)
 * w danym tygodniu, streak rośnie; jeśli nie - resetuje się do 0.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, owner_id, activity_streak_weeks")
    .in("subscription_status", ["trialing", "active"]);

  let sent = 0;

  for (const business of businesses ?? []) {
    const { data: owner } = await supabase.auth.admin.getUserById(business.owner_id);
    const email = owner?.user?.email;
    if (!email) continue;

    const { data: recentReviews } = await supabase
      .from("reviews")
      .select("rating")
      .eq("business_id", business.id)
      .gte("reviewed_at", weekAgo);

    const { data: recentPosts } = await supabase
      .from("posts")
      .select("id")
      .eq("business_id", business.id)
      .eq("status", "published")
      .gte("published_at", weekAgo);

    const { data: allReviews } = await supabase
      .from("reviews")
      .select("rating")
      .eq("business_id", business.id);

    const avgRating = allReviews?.length
      ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
      : null;

    const hadActivity = (recentReviews?.length ?? 0) > 0 || (recentPosts?.length ?? 0) > 0;
    const newStreak = hadActivity ? (business.activity_streak_weeks ?? 0) + 1 : 0;

    await supabase
      .from("businesses")
      .update({ activity_streak_weeks: newStreak, last_active_week: new Date().toISOString().slice(0, 10) })
      .eq("id", business.id);

    await sendWeeklySummaryEmail({
      to: email,
      businessName: business.name,
      newReviews: recentReviews?.length ?? 0,
      avgRating,
      ratingChange: 0, // uproszczenie MVP - porównanie tydzień-do-tygodnia dodamy gdy będzie więcej danych historycznych
      postsPublished: recentPosts?.length ?? 0,
      streakWeeks: newStreak,
    });

    sent++;
  }

  return NextResponse.json({ emails_sent: sent });
}
