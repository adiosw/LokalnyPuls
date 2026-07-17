import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/seo/services";
import { ALL_COMBOS } from "@/lib/seo/combos";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ usluga: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ usluga: string }>;
}): Promise<Metadata> {
  const { usluga } = await params;
  const service = getServiceBySlug(usluga);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `https://lokalnypuls.pl/uslugi/${usluga}` },
  };
}

export default async function UslugaPage({
  params,
}: {
  params: Promise<{ usluga: string }>;
}) {
  const { usluga } = await params;
  const service = getServiceBySlug(usluga);
  if (!service) notFound();

  // Przykłady zastosowania - 3 losowe (deterministyczne) kombinacje miasto+branża,
  // powiązane z tą konkretną usługą przez industry.relatedServiceSlug
  const exampleCombos = ALL_COMBOS.filter((c) => c.industry.relatedServiceSlug === usluga).slice(0, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    provider: { "@type": "Organization", name: "Lokalny Puls", url: "https://lokalnypuls.pl" },
    description: service.metaDescription,
    areaServed: { "@type": "Country", name: "Polska" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <link rel="stylesheet" href="/styles/home.css" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Breadcrumbs
        items={[
          { label: "Start", href: "/" },
          { label: "Usługi", href: "/uslugi" },
          { label: service.name, href: `/uslugi/${usluga}` },
        ]}
      />

      <section className="hero" style={{ minHeight: "auto", padding: "60px 20px 60px" }}>
        <div className="hero-content">
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 900, marginBottom: "20px" }}>{service.h1}</h1>
          <p className="hero-description">{service.intro}</p>
          <a href="/#audyt" className="hero-cta" style={{ fontSize: "1.1rem", padding: "18px 40px" }}>
            Sprawdź swoją wizytówkę - Darmowy Audyt 🚀
          </a>
        </div>
      </section>

      <section className="tools">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Co konkretnie zyskujesz</h2>
          </div>
          <div className="tools-grid">
            {service.benefits.map((b) => (
              <div key={b.title} className="tool-card glass">
                <div className="tool-title">{b.title}</div>
                <div className="tool-text">{b.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Najczęstsze pytania</h2>
          </div>
          <div className="faq-list">
            {service.faq.map((item) => (
              <div key={item.q} className="glass" style={{ padding: "24px 28px", borderRadius: "16px", marginBottom: "14px" }}>
                <p style={{ fontWeight: 700, marginBottom: "10px" }}>{item.q}</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: ".95rem", lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        title="Zobacz jak to działa w praktyce"
        items={exampleCombos.map((c) => ({
          label: `${c.industry.name} - ${c.city.name}`,
          href: `/${c.slug}`,
        }))}
      />

      <RelatedLinks
        title="Pozostałe usługi"
        items={SERVICES.filter((s) => s.slug !== usluga)
          .slice(0, 3)
          .map((s) => ({ label: s.name, href: `/uslugi/${s.slug}` }))}
      />
    </>
  );
}
