export default function MetricCard({ label, value, sub, accent }) {
  const accentClasses = {
    maroon: "border-l-maroon",
    forest: "border-l-forest",
    mustard: "border-l-mustard",
    terra: "border-l-terra",
    default: "border-l-border",
  };

  return (
    <div
      className={`bg-cream rounded-xl border border-border border-l-4 ${
        accentClasses[accent] || accentClasses.default
      } p-5 card-hover`}
    >
      <p className="text-xs font-body font-medium text-coffee uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="font-display text-4xl font-semibold text-espresso leading-none mb-1">
        {value}
      </p>
      {sub && (
        <p className="text-xs font-body text-coffee mt-1">{sub}</p>
      )}
    </div>
  );
}