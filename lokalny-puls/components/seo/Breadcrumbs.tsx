type Crumb = { label: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://lokalnypuls.pl${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb" style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", padding: "100px 20px 0", maxWidth: "1200px", margin: "0 auto" }}>
        {items.map((item, index) => (
          <span key={item.href}>
            {index > 0 && " / "}
            {index === items.length - 1 ? (
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
            ) : (
              <a href={item.href} style={{ color: "#60A5FA", textDecoration: "none" }}>
                {item.label}
              </a>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
