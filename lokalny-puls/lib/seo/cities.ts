export type City = {
  slug: string;
  name: string;
  nameGenitive: string; // odmiana "w [mieście]" np. "Krakowie", "Oświęcimiu" - potrzebne do naturalnych zdań
  region: string;
  populationBand: "mała" | "średnia" | "duża"; // wpływa na dobór wariantu zdania (patrz industries.ts)
};

/**
 * Lista miast - system skaluje się przez dopisywanie kolejnych obiektów tutaj,
 * bez zmiany w kodzie stron. 10 miast x 11 branż = 110 podstron już teraz;
 * dodanie 40 kolejnych miast (wszystkie miasta powiatowe w Małopolsce/Śląsku)
 * da ~550 podstron bez dotykania szablonu.
 */
export const CITIES: City[] = [
  { slug: "oswiecim", name: "Oświęcim", nameGenitive: "Oświęcimiu", region: "Małopolska", populationBand: "mała" },
  { slug: "krakow", name: "Kraków", nameGenitive: "Krakowie", region: "Małopolska", populationBand: "duża" },
  { slug: "katowice", name: "Katowice", nameGenitive: "Katowicach", region: "Śląsk", populationBand: "duża" },
  { slug: "bielsko-biala", name: "Bielsko-Biała", nameGenitive: "Bielsku-Białej", region: "Śląsk", populationBand: "średnia" },
  { slug: "poznan", name: "Poznań", nameGenitive: "Poznaniu", region: "Wielkopolska", populationBand: "duża" },
  { slug: "zakopane", name: "Zakopane", nameGenitive: "Zakopanem", region: "Małopolska", populationBand: "mała" },
  { slug: "wroclaw", name: "Wrocław", nameGenitive: "Wrocławiu", region: "Dolny Śląsk", populationBand: "duża" },
  { slug: "warszawa", name: "Warszawa", nameGenitive: "Warszawie", region: "Mazowsze", populationBand: "duża" },
  { slug: "rzeszow", name: "Rzeszów", nameGenitive: "Rzeszowie", region: "Podkarpacie", populationBand: "średnia" },
  { slug: "gdansk", name: "Gdańsk", nameGenitive: "Gdańsku", region: "Pomorze", populationBand: "duża" },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
