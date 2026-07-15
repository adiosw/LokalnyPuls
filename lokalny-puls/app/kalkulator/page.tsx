import type { Metadata } from "next";
import KalkulatorContent from "./KalkulatorContent";

export const metadata: Metadata = {
  title: "Kalkulator Utraconych Zysków - Lokalny Puls",
  description: "",
};

export default function KalkulatorPage() {
  return <KalkulatorContent />;
}
