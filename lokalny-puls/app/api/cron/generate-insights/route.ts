import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateDailyInsights } from "@/lib/ai";

/**
 * Wywoływane raz dziennie przez Vercel Cron (konfiguracja w vercel.json).
 * Chronione CRON_SECRET, żeby nikt z zewnątrz nie mógł odpalić generowania na koszt Twojego API.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name")
    .in("subscription_status", ["trialing", "active"]);

  let generated = 0;

  for (const business of businesses ?? []) {
    const { data: reviews } = await supabase
      .from("reviews")
      .select("rating, reply_status")
      .eq("business_id", business.id);

    const { data: lastPost } = await supabase
      .from("posts")
      .select("published_at")
      .eq("business_id", business.id)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    const { data: snapshot } = await supabase
      .from("profile_snapshots")
      .select("photos_count")
      .eq("business_id", business.id)
      .order("snapshot_date", { ascending: false })
      .limit(1)
      .single();

    const reviewsCount = reviews?.length ?? 0;
    const avgRating = reviewsCount
      ? reviews!.reduce((s, r) => s + r.rating, 0) / reviewsCount
      : null;
    const pendingRepliesCount =
      reviews?.filter((r) => r.reply_status === "pending").length ?? 0;
    const daysSinceLastPost = lastPost?.published_at
      ? Math.floor(
          (Date.now() - new Date(lastPost.published_at).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    const insights = await generateDailyInsights({
      businessName: business.name,
      avgRating,
      reviewsCount,
      pendingRepliesCount,
      photosCount: snapshot?.photos_count ?? 0,
      daysSinceLastPost,
    });

    if (insights.length > 0) {
      await supabase.from("ai_insights").insert(
        insights.map((i) => ({
          business_id: business.id,
          message: i.message,
          action_label: i.action_label,
          action_href: i.action_href,
        }))
      );
      generated += insights.length;
    }
  }

  return NextResponse.json({ businesses: businesses?.length ?? 0, insights_generated: generated });
}
