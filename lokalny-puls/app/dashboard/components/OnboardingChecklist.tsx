type OnboardingSteps = {
  connected_google: boolean;
  added_photos: boolean;
  replied_first_review: boolean;
  generated_first_post: boolean;
};

const STEPS: { key: keyof OnboardingSteps; label: string; href: string }[] = [
  { key: "connected_google", label: "Połącz wizytówkę Google", href: "/dashboard/ustawienia" },
  { key: "added_photos", label: "Dodaj pierwsze zdjęcia", href: "/dashboard/ustawienia" },
  { key: "replied_first_review", label: "Odpowiedz na pierwszą opinię", href: "/dashboard" },
  { key: "generated_first_post", label: "Wygeneruj pierwszy post", href: "/dashboard/posty" },
];

export default function OnboardingChecklist({ steps }: { steps: OnboardingSteps }) {
  const done = STEPS.filter((s) => steps[s.key]).length;
  const total = STEPS.length;

  if (done === total) return null; // Znika, gdy klient skończy - nie zaśmieca dashboardu na stałe

  return (
    <div className="rounded-2xl border border-highlight/30 bg-highlight/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-sm">
          Ustawienia konta ({done}/{total})
        </p>
        <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
      </div>
      <div className="space-y-2">
        {STEPS.map((step) => (
          <a
            key={step.key}
            href={step.href}
            className={`flex items-center gap-3 text-sm py-1 ${
              steps[step.key] ? "text-white/40 line-through" : "text-white/85 hover:text-highlight"
            }`}
          >
            <span>{steps[step.key] ? "✅" : "⬜"}</span>
            {step.label}
          </a>
        ))}
      </div>
    </div>
  );
}
