import type { Metadata } from "next";
import { SERVICES } from "@/lib/seo/services";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Usługi - Marketing Lokalny i Google Maps | Lokalny Puls",
  description: "Pełna oferta usług Lokalny Puls: optymalizacja wizytówki Google, zarządzanie opiniami, AI, zdjęcia, audyt, monitoring i więcej.",
  alternates: { canonical: "https://lokalnypuls.pl/uslugi" },
};

export default function UslugiPage() {
  return (
    <>
      <link rel="stylesheet" href="/styles/home.css" />
      <Breadcrumbs items={[{ label: "Start", href: "/" }, { label: "Usługi", href: "/uslugi" }]} />

      <section className="hero" style={{ minHeight: "auto", padding: "60px 20px 60px" }}>
        <div className="hero-content">
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "20px" }}>
            Wszystko, co potrzebne do widoczności w Google Maps
          </h1>
          <p className="hero-description">
            11 usług, jedna agencja. Każda rozwiązuje konkretny problem - od zera po pełny system utrzymania widoczności.
          </p>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <div className="pricing-grid">
            {SERVICES.map((service) => (
              <a
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className="pricing-card glass"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "12px", color: "#60A5FA" }}>
                  {service.name}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: ".9rem", lineHeight: 1.6 }}>
                  {service.intro.slice(0, 120)}...
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
