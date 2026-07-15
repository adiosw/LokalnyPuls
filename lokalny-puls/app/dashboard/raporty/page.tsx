import { createClient } from "@/lib/supabase/server";

export default async function RaportyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("owner_id", user!.id)
    .single();

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("business_id", business?.id)
    .order("period", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-black mb-2">Raporty</h1>
      <p className="text-white/50 mb-8">
        Automatyczny raport PDF generowany co miesiąc z Twoimi statystykami.
      </p>

      {!reports || reports.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-4xl mb-4">📄</p>
          <p className="font-semibold mb-2">Pierwszy raport pojawi się po zakończeniu miesiąca</p>
          <p className="text-white/50 text-sm">
            Generowanie raportów miesięcznych — Etap 6 planu rozwoju.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="glass rounded-2xl p-5 flex justify-between items-center">
              <span className="font-semibold">Raport {r.period}</span>
              {r.pdf_url ? (
                <a href={r.pdf_url} className="text-highlight font-semibold text-sm">
                  Pobierz PDF →
                </a>
              ) : (
                <span className="text-white/30 text-sm">W przygotowaniu</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
