import { createClient } from "@/lib/supabase/server";

/**
 * Panel /admin/seo jest przeznaczony WYŁĄCZNIE dla Ciebie (właściciela Lokalny Puls),
 * nie dla klientów SaaS. Dostęp sprawdzamy po adresie email z ADMIN_EMAIL w .env -
 * to celowo prosty mechanizm, bo to narzędzie wewnętrzne, nie funkcja produktu.
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return false;
  return user.email === process.env.ADMIN_EMAIL;
}
