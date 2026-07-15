import { createClient } from "@/lib/supabase/server";
import ReviewCard from "./opinie/ReviewCard";
import StatTile from "./components/StatTile";
import InsightsPanel from "./components/InsightsPanel";
import QuickActions from "./components/QuickActions";
import OnboardingChecklist from "./components/OnboardingChecklist";
import RoadmapWidget from "./components/RoadmapWidget";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user!.id)
    .single();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("business_id", business?.id)
    .order("reviewed_at", { ascending: false });

  const { data: draftPosts } = await supabase
    .from("posts")
    .select("id")
    .eq("business_id", business?.id)
    .eq("status", "draft");

  const total = reviews?.length ?? 0;
  const avgRating = total
    ? (reviews!.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
    : "—";
  const newThisWeek =
    reviews?.filter(
      (r) =>
        r.reviewed_at &&
        Date.now() - new Date(r.reviewed_at).getTime() < 7 * 24 * 60 * 60 * 1000
    ).length ?? 0;
  const pending = reviews?.filter((r) => r.reply_status === "pending").length ?? 0;
  const pendingReviews = reviews?.filter((r) => r.reply_status === "pending") ?? [];
  const otherReviews = reviews?.filter((r) => r.reply_status !== "pending") ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-1">
          Cześć, {business?.name ?? "Twoja firma"} 👋
        </h1>
        <p className="text-white/50">Oto co dzieje się z Twoją widocznością w Google.</p>
      </div>

      {/* SEKCJA: Checklist onboardingowy (znika po ukończeniu) */}
      {business?.onboarding_steps && (
        <OnboardingChecklist steps={business.onboarding_steps} />
      )}

      {/* SEKCJA 1: Przegląd firmy */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile icon="⭐" value={`${avgRating}`} label="Średnia ocen" />
        <StatTile icon="💬" value={newThisWeek} label="Nowe opinie (7 dni)" />
        <StatTile
          icon="⚠️"
          value={pending}
          label="Wymagają odpowiedzi"
          alert={pending > 0}
          href="#opinie-do-odpowiedzi"
        />
        <StatTile
          icon="📝"
          value={draftPosts?.length ?? 0}
          label="Posty do publikacji"
          href="/dashboard/posty"
        />
      </div>

      {/* SEKCJA 2: AI Insights */}
      {business?.id && <InsightsPanel businessId={business.id} />}

      {/* SEKCJA 4: Szybkie akcje */}
      <QuickActions />

      {/* Opinie wymagające odpowiedzi - priorytet na górze */}
      {pendingReviews.length > 0 && (
        <div id="opinie-do-odpowiedzi">
          <p className="text-sm font-bold text-white/40 uppercase tracking-wide mb-4">
            Wymagają Twojej odpowiedzi
          </p>
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <ReviewCard key={review.id} review={review} businessName={business?.name ?? ""} />
            ))}
          </div>
        </div>
      )}

      {/* Pozostałe opinie */}
      {otherReviews.length > 0 && (
        <div>
          <p className="text-sm font-bold text-white/40 uppercase tracking-wide mb-4">
            Pozostałe opinie
          </p>
          <div className="space-y-4">
            {otherReviews.map((review) => (
              <ReviewCard key={review.id} review={review} businessName={business?.name ?? ""} />
            ))}
          </div>
        </div>
      )}

      {(!reviews || reviews.length === 0) && (
        <div className="rounded-2xl border border-white/10 p-12 text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="font-semibold mb-2">Brak opinii do wyświetlenia</p>
          <p className="text-white/50 text-sm">
            Połącz swoją wizytówkę Google w Ustawieniach, żeby zacząć pobierać opinie automatycznie.
          </p>
        </div>
      )}

      {/* SEKCJA 5: Roadmap */}
      <RoadmapWidget />
    </div>
  );
}
