import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_COMBOS, getComboBySlug, buildComboContent, getRelatedCombos } from "@/lib/seo/combos";
import { getServiceBySlug } from "@/lib/seo/services";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";

// Przy setkach kombinacji pre-renderujemy wszystkie na buildzie (SSG) - przy
// tysiącach (kolejne miasta/branże dopisane do danych) warto przełączyć na
// `dynamicParams = true` + `export const revalidate = 86400` i renderować
// resztę on-demand z cache'owaniem (ISR), żeby nie wydłużać czasu builda.
export async function generateStaticParams() {
  return ALL_COMBOS.map((combo) => ({ slug: combo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const combo = getComboBySlug(slug);
  if (!combo) return {};

  const content = buildComboContent(combo);

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical: `https://lokalnypuls.pl/${slug}` },
  };
}

export default async function ComboPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const combo = getComboBySlug(slug);
  if (!combo) notFound();

  const content = buildComboContent(combo);
  const related = getRelatedCombos(combo);
  const relatedService = getServiceBySlug(combo.industry.relatedServiceSlug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Optymalizacja Google Maps dla branży: ${combo.industry.name}`,
    provider: { "@type": "Organization", name: "Lokalny Puls", url: "https://lokalnypuls.pl" },
    areaServed: { "@type": "City", name: combo.city.name },
    description: content.metaDescription,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
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
          { label: `${capitalize(combo.industry.name)} - ${combo.city.name}`, href: `/${slug}` },
        ]}
      />

      <section className="hero" style={{ minHeight: "auto", padding: "60px 20px 80px" }}>
        <div className="hero-content">
          <div className="hero-badge">📍 {combo.city.name}, {combo.city.region}</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "25px" }}>
            {content.h1}
          </h1>
          <p className="hero-description">{content.heroOpening}</p>
          <a href="/#audyt" className="hero-cta" style={{ fontSize: "1.1rem", padding: "18px 40px" }}>
            Sprawdź swoją wizytówkę - Darmowy Audyt 🚀
          </a>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Z czym mierzą się {combo.industry.namePlural} {combo.city.nameGenitive}
            </h2>
          </div>
          <div className="pricing-grid">
            {combo.industry.painPoints.map((point) => (
              <div key={point.title} className="pricing-card glass">
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "12px" }}>{point.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: ".95rem", lineHeight: 1.6 }}>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tools">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Co zyskujesz</h2>
          </div>
          <div className="tools-grid">
            {combo.industry.benefits.map((benefit) => (
              <div key={benefit.title} className="tool-card glass">
                <div className="tool-title">{benefit.title}</div>
                <div className="tool-text">{benefit.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Pytania od {combo.industry.namePlural} {combo.city.nameGenitive}
            </h2>
          </div>
          <div className="faq-list">
            {content.faq.map((item) => (
              <div key={item.q} className="glass" style={{ padding: "24px 28px", borderRadius: "16px", marginBottom: "14px" }}>
                <p style={{ fontWeight: 700, marginBottom: "10px" }}>{item.q}</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: ".95rem", lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedService && (
        <section style={{ padding: "0 20px 60px", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="cta-box" style={{ background: "linear-gradient(135deg,#3B82F6,#6366F1)", padding: "40px", borderRadius: "24px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>{relatedService.name}</h3>
            <p style={{ marginBottom: "22px" }}>Zobacz dokładnie jak wygląda ta usługa i co konkretnie robimy.</p>
            <a
              href={`/uslugi/${relatedService.slug}`}
              style={{ background: "#fff", color: "#050816", padding: "14px 32px", borderRadius: "50px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}
            >
              Zobacz usługę →
            </a>
          </div>
        </section>
      )}

      <RelatedLinks
        title="Zobacz też"
        items={related.map((c) => ({
          label: `${capitalize(c.industry.name)} ${c.city.name}`,
          href: `/${c.slug}`,
          description: `Google Maps dla ${c.industry.namePlural} w ${c.city.nameGenitive}`,
        }))}
      />
    </>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
