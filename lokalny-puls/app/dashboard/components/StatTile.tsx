export default function StatTile({
  icon,
  value,
  label,
  href,
  alert,
}: {
  icon: string;
  value: string | number;
  label: string;
  href?: string;
  alert?: boolean;
}) {
  const content = (
    <div
      className={`p-6 rounded-2xl border transition-colors ${
        alert
          ? "border-red-500/30 bg-red-500/5 hover:bg-red-500/10"
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
      } ${href ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {alert && <span className="w-2 h-2 rounded-full bg-red-400" />}
      </div>
      <p className="text-3xl font-black">{value}</p>
      <p className="text-white/50 text-sm mt-1">{label}</p>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}
