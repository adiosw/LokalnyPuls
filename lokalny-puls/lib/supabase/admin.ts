import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Klient z uprawnieniami service_role - omija Row Level Security.
 * UŻYWAĆ WYŁĄCZNIE w Route Handlers / cronach, NIGDY w kodzie klienckim.
 * Potrzebny bo webhook Stripe i cron Google Business Profile nie mają
 * sesji zalogowanego użytkownika - działają "w imieniu systemu".
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
