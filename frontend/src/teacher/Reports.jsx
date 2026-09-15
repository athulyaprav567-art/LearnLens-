import { useState } from 'react';
import { Download, Eye, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { reportsData, teacherData } from '../data/mockData';

export default function Reports() {
  const [downloaded, setDownloaded] = useState(null);
  const handleDownload = (id) => {
    setDownloaded(id);
    setTimeout(() => setDownloaded(null), 2500);
  };
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <p className="text-xs font-body font-medium text-coffee uppercase tracking-widest mb-1">{teacherData.class}</p>
        <h1 className="font-display text-4xl font-semibold text-espresso mb-2">Reports</h1>
        <p className="text-sm font-body text-coffee max-w-lg">Session and weekly summaries of your class&apos;s learning patterns.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in-delay">
        {reportsData.map((r) => (
          <div key={r.id} className="bg-cream border border-border rounded-xl p-6 card-hover flex flex-col gap-4">
            <div>
              <span className="text-[11px] font-body font-semibold uppercase tracking-widest text-coffee">{r.label}</span>
              <h2 className="font-display text-xl font-semibold text-espresso mt-0.5">{r.dateRange}</h2>
            </div>
            <div className="flex-1 border border-border rounded-lg overflow-hidden">
              {[
                { label: 'Class',             val: r.class,            cls: 'text-espresso' },
                { label: 'Students analysed', val: r.studentsAnalyzed, cls: 'text-espresso' },
                { label: 'Top confusion',     val: r.topConfusion,     cls: 'text-maroon'   },
              ].map(({ label, val, cls }) => (
                <div key={label} className="flex justify-between items-center px-4 py-2.5 border-b border-border last:border-0">
                  <span className="text-xs font-body text-coffee">{label}</span>
                  <span className={'text-xs font-body font-semibold ' + cls}>{val}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 px-4 py-2.5">
                {r.trendDirection === 'down' ? <TrendingDown size={12} className="text-forest" /> : <TrendingUp size={12} className="text-maroon" />}
                <span className={'text-xs font-body font-medium ' + (r.trendDirection === 'down' ? 'text-forest' : 'text-maroon')}>{r.trend}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-body font-semibold px-3 py-2 bg-espresso text-cream rounded-lg hover:bg-coffee transition-colors">
                <Eye size={12} /> View
              </button>
              <button onClick={() => handleDownload(r.id)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-body font-semibold px-3 py-2 bg-cream border border-border text-coffee rounded-lg hover:bg-beige transition-colors">
                {downloaded === r.id ? <><CheckCircle2 size={12} className="text-forest" /> Saved</> : <><Download size={12} /> Download</>}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border border-border rounded-xl p-4 bg-cream/60">
        <p className="text-xs font-body text-coffee">
          <span className="font-semibold text-espresso">Privacy:</span>{' '}
          Reports contain only aggregated class-level data. No individual student information is included.
        </p>
      </div>
    </div>
  );
}
