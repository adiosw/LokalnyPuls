import type { MetadataRoute } from "next";
import { ALL_COMBOS } from "@/lib/seo/combos";
import { SERVICES } from "@/lib/seo/services";

const BASE_URL = "https://lokalnypuls.pl";

/**
 * Jeden plik sitemap wystarcza do dziesiątek tysięcy URLi (limit Google to 50 000
 * adresów / plik). Przy realnym skalowaniu (np. 5000+ kombinacji miasto+branża)
 * należy przejść na sitemap index: /sitemap.xml wskazujący na /sitemap-0.xml,
 * /sitemap-1.xml itd. - Next.js wspiera to przez generateSitemaps(). Na obecną
 * skalę (110 kombinacji + 11 usług + strony statyczne) jeden plik jest optymalny.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kalkulator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/uslugi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE_URL}/uslugi/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comboPages: MetadataRoute.Sitemap = ALL_COMBOS.map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...comboPages];
}
