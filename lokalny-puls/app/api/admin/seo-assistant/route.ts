import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateSeoSuggestions } from "@/lib/ai";

/**
 * POST: generuje nowe propozycje AI i zapisuje je ze statusem 'pending'.
 * GET: zwraca listę propozycji (do wyświetlenia w /admin/seo).
 * PATCH: zmienia status propozycji (approved/rejected) - NIE publikuje niczego,
 * tylko oznacza że przejrzałeś sugestię i zdecydowałeś co z nią zrobić dalej ręcznie.
 */

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const { mode, context, targetUrl } = await req.json();
  const result = await generateSeoSuggestions({ mode, context });

  const supabase = createAdminClient();
  const rows = result.suggestions.map((s) => ({
    type: mode,
    target_url: targetUrl ?? null,
    suggestion: s,
    reasoning: s.reasoning,
    status: "pending",
  }));

  if (rows.length > 0) {
    await supabase.from("seo_suggestions").insert(rows);
  }

  return NextResponse.json({ generated: rows.length, suggestions: result.suggestions });
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("seo_suggestions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return NextResponse.json({ suggestions: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const { id, status } = await req.json();
  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Nieprawidłowy status" }, { status: 400 });
  }

  const supabase = createAdminClient();
  await supabase
    .from("seo_suggestions")
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ ok: true });
}
