import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Lokalny Puls - Więcej klientów z Google Maps | Oświęcim",
  description: "Optymalizujemy Twoją wizytówkę Google w 48h. Panel klienta, AI-odpowiedzi na opinie, raporty. Agencja + narzędzie w jednym.",
};

export default function HomePage() {
  return <HomeContent />;
}
