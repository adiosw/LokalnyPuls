type LinkItem = { label: string; href: string; description?: string };

export default function RelatedLinks({
  title,
  items,
}: {
  title: string;
  items: LinkItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "20px",
        }}
      >
        {title}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              display: "block",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
              color: "#60A5FA",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {item.label} →
            {item.description && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, fontSize: "13px", marginTop: "6px" }}>
                {item.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
