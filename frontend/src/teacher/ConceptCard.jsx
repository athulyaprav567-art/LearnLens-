import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

function severityColor(pct) {
  if (pct >= 60) return { bg: "bg-maroon/10", border: "border-maroon/30", text: "text-maroon", bar: "bg-maroon" };
  if (pct >= 40) return { bg: "bg-mustard/10", border: "border-mustard/30", text: "text-mustard", bar: "bg-mustard" };
  return { bg: "bg-forest/10", border: "border-forest/30", text: "text-forest", bar: "bg-forest" };
}

export default function ConceptCard({ concept }) {
  const navigate = useNavigate();
  const colors = severityColor(concept.confusionPercentage);

  return (
    <button
      onClick={() => navigate(`/teacher/analysis/${concept.id}`)}
      className={`w-full text-left bg-cream border ${colors.border} rounded-xl p-5 card-hover focus:outline-none focus:ring-2 focus:ring-espresso/20 group`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-lg font-semibold text-espresso group-hover:text-maroon transition-colors">
          {concept.name}
        </h3>
        <div className="flex items-center gap-1">
          {concept.improving ? (
            <TrendingDown size={14} className="text-forest" />
          ) : (
            <TrendingUp size={14} className="text-maroon" />
          )}
          <span className={`text-xs font-body font-medium ${concept.improving ? "text-forest" : "text-maroon"}`}>
            {concept.change}
          </span>
        </div>
      </div>

      {/* Confusion bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-body text-coffee">Confusion</span>
          <span className={`text-sm font-body font-semibold ${colors.text}`}>
            {concept.confusionPercentage}%
          </span>
        </div>
        <div className="h-1.5 bg-beige rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
            style={{ width: `${concept.confusionPercentage}%` }}
          />
        </div>
      </div>

      <p className="text-xs font-body text-coffee mb-3 leading-relaxed">
        {concept.shortInsight}
      </p>

      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-body font-semibold px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
          {concept.severity}
        </span>
        <span className="flex items-center gap-1 text-xs font-body text-coffee group-hover:text-espresso transition-colors">
          View details <ArrowRight size={12} />
        </span>
      </div>
    </button>
  );
}