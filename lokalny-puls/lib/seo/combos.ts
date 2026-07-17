import { CITIES, City } from "./cities";
import { INDUSTRIES, Industry, pickVariant } from "./industries";

export type Combo = {
  slug: string;
  city: City;
  industry: Industry;
};

/** Buduje slug dokładnie w formacie z briefu: {branża}-{miasto}-{suffix} */
function buildSlug(industry: Industry, city: City): string {
  return `${industry.slug}-${city.slug}-${industry.suffix}`;
}

/**
 * Wszystkie kombinacje miasto x branża. To jest serce systemu programmatic SEO -
 * dodanie miasta w cities.ts lub branży w industries.ts automatycznie generuje
 * N nowych podstron, bez zmiany tego pliku ani szablonu strony.
 */
export const ALL_COMBOS: Combo[] = CITIES.flatMap((city) =>
  INDUSTRIES.map((industry) => ({
    slug: buildSlug(industry, city),
    city,
    industry,
  }))
);

const COMBO_BY_SLUG = new Map(ALL_COMBOS.map((c) => [c.slug, c]));

export function getComboBySlug(slug: string): Combo | undefined {
  return COMBO_BY_SLUG.get(slug);
}

/** Podmienia {city_loc} (odmiana "w [mieście]") w szablonach tekstu */
function interpolate(text: string, city: City): string {
  return text.replace(/\{city_loc\}/g, city.nameGenitive);
}

/**
 * Generuje kompletną, unikalną treść strony dla danej kombinacji.
 * Wariant hero jest wybierany deterministycznie (hash slugu) - ta sama strona
 * zawsze renderuje ten sam wariant, ale różne kombinacje dostają różne otwarcia,
 * co zapobiega efektowi "każda strona brzmi identycznie".
 */
export function buildComboContent(combo: Combo) {
  const { city, industry } = combo;
  const heroOpening = interpolate(pickVariant(industry.heroOpenings, combo.slug), city);

  const title = `${capitalize(industry.name)} ${city.name} - Optymalizacja Google Maps | Lokalny Puls`;
  const metaDescription = `Zwiększ widoczność swojego biznesu jako ${industry.name} w ${city.nameGenitive}. Audyt wizytówki Google, więcej opinii, więcej klientów. Realizacja w 48h.`;
  const h1 = `${capitalize(industry.name)} w ${city.nameGenitive} - jak zdobyć więcej klientów z Google Maps`;

  const faq = industry.faq.map((item) => ({
    q: interpolate(item.q, city),
    a: interpolate(item.a, city),
  }));

  return { title, metaDescription, h1, heroOpening, faq };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Linkowanie wewnętrzne: dla danej kombinacji zwraca 3 powiązane strony -
 * ta sama branża w innym mieście (buduje autorytet tematyczny branży) oraz
 * to samo miasto w innej branży (buduje autorytet lokalny miasta).
 */
export function getRelatedCombos(combo: Combo, count = 3): Combo[] {
  const sameIndustryOtherCity = ALL_COMBOS.filter(
    (c) => c.industry.slug === combo.industry.slug && c.city.slug !== combo.city.slug
  ).slice(0, 2);

  const sameCityOtherIndustry = ALL_COMBOS.filter(
    (c) => c.city.slug === combo.city.slug && c.industry.slug !== combo.industry.slug
  ).slice(0, count - sameIndustryOtherCity.length);

  return [...sameIndustryOtherCity, ...sameCityOtherIndustry].slice(0, count);
}
