import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { conceptsData, dashboardData, teacherData } from '../data/mockData';

function severityBadge(s) {
  if (s === 'High')     return 'bg-maroon/10 text-maroon border border-maroon/20';
  if (s === 'Moderate') return 'bg-mustard/10 text-mustard border border-mustard/20';
  return 'bg-forest/10 text-forest border border-forest/20';
}

export default function Analysis() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <p className="text-xs font-body font-medium text-coffee uppercase tracking-widest mb-1">
          {dashboardData.date}&nbsp;&middot;&nbsp;{teacherData.class}
        </p>
        <h1 className="font-display text-4xl font-semibold text-espresso mb-2">Analysis</h1>
        <p className="text-sm font-body text-coffee max-w-lg">
          Concept-by-concept breakdown of student confusion patterns from yesterday&apos;s session.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] font-body font-medium">
        {['DETECT', 'EXPLAIN', 'RECOMMEND', 'ACT'].map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-espresso text-cream rounded">{step}</span>
            {i < 3 && <span className="text-border">&#8594;</span>}
          </span>
        ))}
      </div>

      <div className="space-y-3 animate-fade-in-delay">
        {conceptsData.map((c) => {
          const isHigh   = c.confusionPercentage >= 60;
          const isMid    = c.confusionPercentage >= 40;
          const color    = isHigh ? 'text-maroon' : isMid ? 'text-mustard' : 'text-forest';
          const barColor = isHigh ? 'bg-maroon'   : isMid ? 'bg-mustard'   : 'bg-forest';
          return (
            <button key={c.id} onClick={() => navigate('/teacher/analysis/' + c.id)}
              className="w-full bg-cream border border-border rounded-xl p-5 hover:border-espresso/30 hover:shadow-sm card-hover text-left group transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="sm:w-44 flex-shrink-0">
                  <h3 className="font-display text-lg font-semibold text-espresso group-hover:text-maroon transition-colors">{c.name}</h3>
                  <span className={'text-[11px] font-body font-semibold px-2 py-0.5 rounded mt-1 inline-block ' + severityBadge(c.severity)}>{c.severity}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-body text-coffee">Confusion</span>
                    <span className={'text-sm font-body font-semibold ' + color}>{c.confusionPercentage}%</span>
                  </div>
                  <div className="h-2 bg-beige rounded-full overflow-hidden">
                    <div className={'h-full ' + barColor + ' rounded-full'} style={{ width: c.confusionPercentage + '%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:w-24 flex-shrink-0 justify-end">
                  {c.improving ? <TrendingDown size={14} className="text-forest" /> : <TrendingUp size={14} className="text-maroon" />}
                  <span className={'text-xs font-body font-semibold ' + (c.improving ? 'text-forest' : 'text-maroon')}>{c.change}</span>
                  <ArrowRight size={14} className="text-coffee group-hover:text-espresso transition-colors ml-1" />
                </div>
              </div>
              <p className="text-xs font-body text-coffee mt-3 leading-relaxed">{c.shortInsight}</p>
            </button>
          );
        })}
      </div>

      <div className="border border-border rounded-xl p-4 bg-cream/60">
        <p className="text-xs font-body text-coffee">
          <span className="font-semibold text-espresso">Privacy:</span>{' '}
          All data shown represents aggregated class-level patterns. Individual student conversations are private.
        </p>
      </div>
    </div>
  );
}
