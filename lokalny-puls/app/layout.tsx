import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panel Klienta - Lokalny Puls",
  description: "Zarządzaj swoją obecnością w Google Maps w jednym miejscu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
