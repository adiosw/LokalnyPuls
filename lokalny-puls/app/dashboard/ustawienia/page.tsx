import { createClient } from "@/lib/supabase/server";
import UpgradeButton from "./UpgradeButton";

const PLANS = [
  {
    id: "start",
    name: "Widoczność",
    price: "99 zł/mc",
    tagline: "Wiesz o wszystkim pierwszy — zero wysiłku",
  },
  {
    id: "standard",
    name: "Wzrost",
    price: "199 zł/mc",
    tagline: "Nowy post co tydzień, żadna opinia bez odpowiedzi",
  },
  {
    id: "premium",
    name: "Dominacja",
    price: "399 zł/mc",
    tagline: "Ty prowadzisz firmę, my dbamy o Google",
  },
] as const;

export default async function UstawieniaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user!.id)
    .single();

  return (
    <div>
      <h1 className="text-3xl font-black mb-2">Ustawienia</h1>
      <p className="text-white/50 mb-8">Zarządzaj kontem, planem i połączeniem z Google.</p>

      <div className="glass rounded-2xl p-8 mb-6 max-w-2xl">
        <h2 className="font-bold text-lg mb-4">Połączenie z Google Business Profile</h2>
        {business?.google_place_id ? (
          <p className="text-green-400 font-semibold">✅ Połączono: {business.google_place_id}</p>
        ) : (
          <div>
            <p className="text-white/50 text-sm mb-4">
              Nie połączono jeszcze wizytówki Google. Integracja OAuth — Etap 3 planu rozwoju.
            </p>
            <button
              disabled
              className="px-5 py-2.5 rounded-xl border-2 border-white/20 text-white/40 font-semibold text-sm cursor-not-allowed"
            >
              🔗 Połącz Google (wkrótce)
            </button>
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-8 max-w-2xl">
        <h2 className="font-bold text-lg mb-1">Twój plan</h2>
        <p className="text-white/50 text-sm mb-6">
          Aktualny: <span className="text-highlight font-bold">
            {PLANS.find((p) => p.id === business?.plan)?.name ?? "Okres próbny"}
          </span>
          {business?.subscription_status === "trialing" && (
            <span className="ml-2 text-white/40">(okres próbny)</span>
          )}
        </p>

        <div className="grid grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <div key={plan.id} className="border-2 border-white/10 rounded-xl p-5 text-center">
              <p className="font-bold mb-1">{plan.name}</p>
              <p className="text-highlight font-black text-xl mb-2">{plan.price}</p>
              <p className="text-white/40 text-xs mb-4 leading-snug">{plan.tagline}</p>
              <UpgradeButton planId={plan.id} disabled={business?.plan === plan.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
