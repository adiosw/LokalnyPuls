import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

async function register(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const businessName = formData.get("businessName") as string;
  const city = formData.get("city") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) {
    redirect(`/register?error=${encodeURIComponent(error?.message ?? "Błąd rejestracji")}`);
  }

  // Tworzymy rekord firmy powiązany z nowym użytkownikiem (14 dni trial domyślnie z schema.sql)
  const { error: insertError } = await supabase.from("businesses").insert({
    owner_id: data.user!.id,
    name: businessName,
    city,
  });

  if (insertError) {
    redirect(`/register?error=${encodeURIComponent(insertError.message)}`);
  }

  redirect("/dashboard");
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="glass rounded-3xl p-10 w-full max-w-md">
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            📍
          </div>
          <span className="font-black text-xl">LOKALNY PULS</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">Załóż konto</h1>
        <p className="text-white/50 text-center text-sm mb-8">
          14 dni gratis, bez karty płatniczej
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form action={register} className="space-y-4">
          <input
            type="text"
            name="businessName"
            required
            placeholder="Nazwa firmy"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none text-white"
          />
          <input
            type="text"
            name="city"
            required
            placeholder="Miasto"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none text-white"
          />
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
            minLength={6}
            placeholder="Hasło (min. 6 znaków)"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none text-white"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold btn-primary shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] transition-shadow"
          >
            Załóż konto
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-6">
          Masz już konto?{" "}
          <Link href="/login" className="text-highlight font-semibold">
            Zaloguj się
          </Link>
        </p>
      </div>
    </main>
  );
}
