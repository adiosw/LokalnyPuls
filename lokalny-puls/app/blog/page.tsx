import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog - Lokalny Puls | Wiedza o Google Maps i SEO",
  description: "Baza wiedzy o marketingu lokalnym, Google Maps i SEO dla firm z Oświęcimia",
};

export default function BlogPage() {
  return <BlogContent />;
}
