import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import NotificationBell from "./components/NotificationBell";

const PLAN_LABELS = {
  trial: "Okres próbny",
  start: "Widoczność",
  standard: "Wzrost",
  premium: "Dominacja",
};

async function logout() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  const navItems = [
    { href: "/dashboard", label: "Opinie", icon: "💬" },
    { href: "/dashboard/posty", label: "Generator postów", icon: "📝" },
    { href: "/dashboard/raporty", label: "Raporty", icon: "📊" },
    { href: "/dashboard/ustawienia", label: "Ustawienia", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <aside className="w-64 glass border-r border-white/10 flex flex-col p-6 fixed h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            📍
          </div>
          <span className="font-black text-lg">LOKALNY PULS</span>
        </div>

        {business && (
          <div className="mb-8 px-3">
            <p className="text-sm font-semibold truncate">{business.name}</p>
            <p className="text-xs text-white/40">{business.city}</p>
            <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-highlight/15 text-highlight font-bold uppercase">
              Plan: {PLAN_LABELS[business.plan as keyof typeof PLAN_LABELS] ?? "Okres próbny"}
            </span>
          </div>
        )}

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <form action={logout}>
          <button className="w-full text-left px-4 py-3 rounded-xl text-white/50 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium text-sm">
            🚪 Wyloguj się
          </button>
        </form>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 ml-64">
        <div className="flex justify-end px-10 pt-6">
          {business && <NotificationBell businessId={business.id} />}
        </div>
        <div className="px-10 pb-10 pt-2">{children}</div>
      </main>
    </div>
  );
}
