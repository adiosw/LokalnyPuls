import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import SeoAssistantPanel from "./SeoAssistantPanel";

export default async function AdminSeoPage() {
  // Podwójna warstwa ochrony: middleware wymaga zalogowania, tu sprawdzamy
  // czy to konkretnie Twój email (ADMIN_EMAIL) - klienci SaaS nigdy tu nie wejdą.
  if (!(await isAdmin())) {
    redirect("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050816", color: "#fff", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>AI Asystent SEO</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "30px" }}>
          Wyłącznie propozycje. Nic z tego nie publikuje się samo — Ty zatwierdzasz każdą sugestię i sam decydujesz jak ją wdrożyć.
        </p>
        <SeoAssistantPanel />
      </div>
    </div>
  );
}
