import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

async function login(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-10 w-full max-w-md">
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            📍
          </div>
          <span className="font-black text-xl">LOKALNY PULS</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">Zaloguj się</h1>
        <p className="text-white/50 text-center text-sm mb-8">
          Panel klienta Lokalny Puls
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form action={login} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none text-white"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Hasło"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none text-white"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold btn-primary shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] transition-shadow"
          >
            Zaloguj się
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-6">
          Nie masz jeszcze konta?{" "}
          <Link href="/register" className="text-highlight font-semibold">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </main>
  );
}
