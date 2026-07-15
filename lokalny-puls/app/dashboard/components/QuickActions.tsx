const ACTIONS = [
  { icon: "💬", label: "Odpowiedz na opinie", href: "/dashboard" },
  { icon: "📝", label: "Wygeneruj post", href: "/dashboard/posty" },
  { icon: "📸", label: "Dodaj zdjęcia", href: "/dashboard/ustawienia" },
  { icon: "📊", label: "Pobierz raport", href: "/dashboard/raporty" },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {ACTIONS.map((action) => (
        <a
          key={action.href + action.label}
          href={action.href}
          className="flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border border-white/10 hover:border-primary/50 hover:bg-white/[0.03] transition-colors text-center"
        >
          <span className="text-2xl">{action.icon}</span>
          <span className="text-xs font-semibold text-white/70">{action.label}</span>
        </a>
      ))}
    </div>
  );
}
