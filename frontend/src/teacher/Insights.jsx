import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Lightbulb } from 'lucide-react';
import { insightsData, teacherData, dashboardData } from '../data/mockData';

function getStyle(s) {
  if (s === 'high') return { border: 'border-maroon/25', badge: 'bg-maroon/10 text-maroon', Icon: TrendingUp, iconCls: 'text-maroon bg-maroon/5' };
  if (s === 'low')  return { border: 'border-forest/25', badge: 'bg-forest/10 text-forest',  Icon: TrendingDown, iconCls: 'text-forest bg-forest/5' };
  return              { border: 'border-border',          badge: 'bg-beige text-coffee',       Icon: Lightbulb,    iconCls: 'text-coffee bg-beige' };
}

export default function Insights() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <p className="text-xs font-body font-medium text-coffee uppercase tracking-widest mb-1">
          {dashboardData.date}&nbsp;&middot;&nbsp;{teacherData.class}
        </p>
        <h1 className="font-display text-4xl font-semibold text-espresso mb-2">Insights</h1>
        <p className="text-sm font-body text-coffee max-w-lg">Higher-level observations about your class&apos;s learning patterns.</p>
      </div>
      <div className="space-y-4 animate-fade-in-delay">
        {insightsData.map((ins) => {
          const s = getStyle(ins.severity);
          const Icon = s.Icon;
          return (
            <div key={ins.id} className={'bg-cream border rounded-xl p-6 card-hover ' + s.border}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={'text-[11px] font-body font-semibold px-2 py-0.5 rounded ' + s.badge}>{ins.tag}</span>
                    <span className="font-display text-2xl font-semibold text-espresso">{ins.value}</span>
                  </div>
                  <h3 className="font-body font-semibold text-espresso text-base mb-1">{ins.title}</h3>
                  <p className="text-sm font-body text-coffee leading-relaxed">{ins.explanation}</p>
                  {ins.action && (
                    <div className="mt-3">
                      <button onClick={() => navigate('/teacher/analysis')}
                        className="flex items-center gap-1.5 text-xs font-body font-semibold text-espresso bg-beige hover:bg-border/50 px-3 py-1.5 rounded-lg transition-colors">
                        {ins.action} <ArrowRight size={11} />
                      </button>
                    </div>
                  )}
                </div>
                <div className={'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ' + s.iconCls}>
                  <Icon size={18} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border border-border rounded-xl p-4 bg-cream/60">
        <p className="text-xs font-body text-coffee">
          <span className="font-semibold text-espresso">Privacy:</span>{' '}
          All insights are derived from aggregated, anonymised class patterns. No individual student data is shown.
        </p>
      </div>
    </div>
  );
}
