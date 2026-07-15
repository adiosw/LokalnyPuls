import { createClient } from "@/lib/supabase/server";

export default async function InsightsPanel({ businessId }: { businessId: string }) {
  const supabase = await createClient();
  const { data: insights } = await supabase
    .from("ai_insights")
    .select("*")
    .eq("business_id", businessId)
    .eq("dismissed", false)
    .order("created_at", { ascending: false })
    .limit(3);

  if (!insights || insights.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 p-6">
        <p className="text-sm font-bold text-white/40 uppercase tracking-wide mb-2">
          💡 Twój doradca
        </p>
        <p className="text-white/50 text-sm">
          Wskazówki pojawią się tu w ciągu 24h od pierwszej aktywności na koncie.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <p className="text-sm font-bold text-white/40 uppercase tracking-wide mb-4">
        💡 Twój doradca — dziś dla Ciebie
      </p>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-center justify-between gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
          >
            <p className="text-white/85 text-sm flex-1">{insight.message}</p>
            {insight.action_href && (
              <a
                href={insight.action_href}
                className="whitespace-nowrap text-highlight font-semibold text-sm px-4 py-2 rounded-full border border-highlight/30 hover:bg-highlight/10 transition-colors"
              >
                {insight.action_label ?? "Zobacz →"}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
