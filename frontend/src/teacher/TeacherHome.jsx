import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { teacherData, dashboardData, conceptsData, weeklyData } from '../data/mockData';
import ConceptCard from './ConceptCard';
import MetricCard from './MetricCard';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const WeekTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-cream border border-border rounded-lg px-3 py-2 shadow-sm">
      <p className="text-xs font-body text-coffee">{label}</p>
      <p className="text-sm font-body font-semibold text-espresso">{payload[0].value}% avg confusion</p>
    </div>
  );
};

export default function TeacherHome() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-in space-y-10">
      <div>
        <p className="text-xs font-body font-medium text-coffee uppercase tracking-widest mb-1">
          {dashboardData.date}&nbsp;&middot;&nbsp;{teacherData.class}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-espresso leading-tight mb-2">
          {getGreeting()}, {teacherData.shortName}.
        </h1>
        <p className="text-base font-body text-coffee max-w-xl">
          Here&apos;s a quick look at how your class learned yesterday.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-delay">
        <MetricCard label="Students Analyzed"  value={dashboardData.studentsAnalyzed}  sub="Active learners"      accent="terra"   />
        <MetricCard label="Concepts Monitored" value={dashboardData.conceptsMonitored} sub="Tracked this session" accent="default" />
        <MetricCard label="High Confusion"      value={dashboardData.highConfusion}     sub="Needs attention"      accent="maroon"  />
        <MetricCard label="Improving"           value={dashboardData.improving}         sub="Trending down"        accent="forest"  />
      </div>

      <div className="animate-fade-in-delay-2">
        <div className="mb-5">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-espresso mb-1">
            Yesterday&apos;s Learning Pulse
          </h2>
          <p className="text-sm font-body text-coffee">{dashboardData.pulseHeadline}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {conceptsData.slice(0, 5).map((c) => (
            <ConceptCard key={c.id} concept={c} />
          ))}
        </div>
      </div>

      <div className="animate-fade-in-delay-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-semibold text-espresso">Yesterday&apos;s Analysis</h2>
          <button onClick={() => navigate('/teacher/analysis')}
            className="flex items-center gap-1.5 text-xs font-body font-medium text-coffee hover:text-espresso transition-colors">
            View all <ArrowRight size={13} />
          </button>
        </div>
        <div className="bg-cream border border-border rounded-xl overflow-hidden">
          {conceptsData.slice(0, 5).map((c, i) => {
            const isHigh   = c.confusionPercentage >= 60;
            const isMid    = c.confusionPercentage >= 40;
            const color    = isHigh ? 'text-maroon' : isMid ? 'text-mustard' : 'text-forest';
            const barColor = isHigh ? 'bg-maroon'   : isMid ? 'bg-mustard'   : 'bg-forest';
            return (
              <button key={c.id}
                onClick={() => navigate('/teacher/analysis/' + c.id)}
                className={'w-full flex items-center gap-4 px-6 py-4 hover:bg-beige/50 transition-colors group' + (i !== 0 ? ' border-t border-border' : '')}>
                <span className="w-28 text-left font-body font-medium text-espresso text-sm group-hover:text-maroon transition-colors">{c.name}</span>
                <div className="flex-1 h-1.5 bg-beige rounded-full overflow-hidden">
                  <div className={'h-full ' + barColor + ' rounded-full'} style={{ width: c.confusionPercentage + '%' }} />
                </div>
                <span className={'w-12 text-right font-body font-semibold text-sm ' + color}>{c.confusionPercentage}%</span>
                <span className={'hidden sm:block w-20 text-right text-xs font-body font-medium ' + color}>{c.severity}</span>
                <ArrowRight size={13} className="text-coffee group-hover:text-espresso transition-colors ml-1" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="animate-fade-in-delay-3">
        <div className="mb-4">
          <h2 className="font-display text-2xl font-semibold text-espresso mb-1">Weekly Analysis</h2>
          <p className="text-sm font-body text-coffee">{dashboardData.weeklyInsight}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-cream border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-body font-semibold text-espresso text-sm">Average confusion trend this week</h3>
              <span className="flex items-center gap-1 text-sm font-body font-semibold text-forest">
                <TrendingDown size={14} /> {weeklyData.weeklyChange}%
              </span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={weeklyData.confusionTrend} margin={{ top: 4, right: 4, bottom: 0, left: -30 }}>
                <defs>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6E2A3A" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#6E2A3A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#7A5C46', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7A5C46', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} domain={[30, 65]} />
                <Tooltip content={<WeekTooltip />} />
                <Area type="monotone" dataKey="avg" stroke="#6E2A3A" strokeWidth={2} fill="url(#confGrad)"
                  dot={{ r: 3, fill: '#6E2A3A', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#6E2A3A', strokeWidth: 0 }} animationDuration={900} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="bg-cream border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-forest" />
                <h3 className="font-body font-semibold text-espresso text-sm">Improving</h3>
              </div>
              <ul className="space-y-1.5">
                {weeklyData.improving.map((name) => (
                  <li key={name} className="text-sm font-body text-coffee flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest flex-shrink-0" /> {name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-maroon" />
                <h3 className="font-body font-semibold text-espresso text-sm">Needs Attention</h3>
              </div>
              <ul className="space-y-1.5">
                {weeklyData.needsAttention.map((name) => (
                  <li key={name} className="text-sm font-body text-coffee flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon flex-shrink-0" /> {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-xl p-5 bg-cream/60">
        <p className="text-xs font-body text-coffee leading-relaxed">
          <span className="font-semibold text-espresso">Privacy:</span>{' '}
          Student conversations remain private. LearnLens presents aggregated learning patterns rather than individual conversations.
        </p>
      </div>
    </div>
  );
}
