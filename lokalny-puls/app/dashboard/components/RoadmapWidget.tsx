const ROADMAP = [
  { status: "done", label: "AI odpowiedzi na opinie" },
  { status: "done", label: "Generator postów" },
  { status: "progress", label: "Monitoring konkurencji" },
  { status: "progress", label: "Google Business API" },
  { status: "planned", label: "Chatbot" },
  { status: "planned", label: "WhatsApp" },
  { status: "planned", label: "Rezerwacje" },
] as const;

const ICONS = { done: "✅", progress: "🟡", planned: "🟡" };

export default function RoadmapWidget() {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <p className="text-sm font-bold text-white/40 uppercase tracking-wide mb-4">
        Lokalny Puls się rozwija
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ROADMAP.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-white/70">
            <span>{ICONS[item.status]}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
