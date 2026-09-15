import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Zap, BookOpen, CheckCircle2 } from 'lucide-react';
import { conceptsData } from '../data/mockData';

const PIE_COLORS = { confident: '#2C4A3B', someDifficulty: '#C4972F', confused: '#6E2A3A' };

const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const R = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * R);
  const y = cy + r * Math.sin(-midAngle * R);
  return (
    <text x={x} y={y} fill="#FFFBF5" textAnchor="middle" dominantBaseline="central"
      style={{ fontFamily: 'DM Sans', fontSize: 12, fontWeight: 600 }}>
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const TrendTip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-cream border border-border rounded-lg px-3 py-2 shadow-sm">
      <p className="text-xs font-body text-coffee">{label}</p>
      <p className="text-sm font-body font-semibold text-espresso">{payload[0].value}% confusion</p>
    </div>
  );
};

export default function ConceptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [generated, setGenerated] = useState(false);

  const concept = conceptsData.find((c) => c.id === id);
  if (!concept) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <p className="font-display text-2xl text-espresso">Concept not found</p>
        <button onClick={() => navigate('/teacher/analysis')}
          className="flex items-center gap-2 text-sm font-body text-coffee hover:text-espresso transition-colors">
          <ArrowLeft size={14} /> Back to Analysis
        </button>
      </div>
    );
  }

  const pieData = [
    { name: 'Confident',       value: concept.confidenceDistribution.confident,      fill: PIE_COLORS.confident      },
    { name: 'Some difficulty', value: concept.confidenceDistribution.someDifficulty, fill: PIE_COLORS.someDifficulty },
    { name: 'Confused',        value: concept.confidenceDistribution.confused,       fill: PIE_COLORS.confused       },
  ];

  const isHigh      = concept.confusionPercentage >= 60;
  const isMid       = concept.confusionPercentage >= 40;
  const accentColor = isHigh ? 'text-maroon' : isMid ? 'text-mustard' : 'text-forest';
  const badgeCls    = isHigh
    ? 'bg-maroon/10 text-maroon border-maroon/20'
    : isMid ? 'bg-mustard/10 text-mustard border-mustard/20'
    : 'bg-forest/10 text-forest border-forest/20';

  return (
    <div className="animate-fade-in space-y-8 max-w-4xl">
      <button onClick={() => navigate('/teacher/analysis')}
        className="flex items-center gap-2 text-sm font-body text-coffee hover:text-espresso transition-colors">
        <ArrowLeft size={14} /> Back to Analysis
      </button>

      <div className="bg-cream border border-border rounded-xl p-6 md:p-8">
        <p className="text-xs font-body font-medium text-coffee uppercase tracking-widest mb-3">Concept Analysis</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-espresso mb-6">{concept.name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div>
            <p className={'font-display text-4xl font-semibold ' + accentColor}>{concept.confusionPercentage}%</p>
            <p className="text-xs font-body text-coffee mt-1">Students showing confusion</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-coffee" />
              <p className="font-display text-4xl font-semibold text-espresso">{concept.affectedStudents}</p>
            </div>
            <p className="text-xs font-body text-coffee mt-1">Students affected</p>
          </div>
          <div>
            <p className={'font-display text-4xl font-semibold ' + accentColor}>{concept.trend.previous}%</p>
            <p className="text-xs font-body text-coffee mt-1">Previous session</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              {concept.improving ? <TrendingDown size={18} className="text-forest" /> : <TrendingUp size={18} className="text-maroon" />}
              <p className={'font-display text-4xl font-semibold ' + (concept.improving ? 'text-forest' : 'text-maroon')}>{concept.change}</p>
            </div>
            <p className="text-xs font-body text-coffee mt-1">Change this session</p>
          </div>
        </div>
        <div className="mt-4">
          <span className={'text-xs font-body font-semibold px-2.5 py-1 rounded border ' + badgeCls}>Severity: {concept.severity}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-delay">
        <div className="bg-cream border border-border rounded-xl p-6">
          <p className="text-[11px] font-body font-semibold text-coffee uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-espresso text-cream text-[10px] flex items-center justify-center font-bold">D</span>
            What We Found
          </p>
          <p className="text-sm font-body text-espresso leading-relaxed">{concept.whatWeFound}</p>
        </div>
        <div className="bg-maroon/5 border border-maroon/20 rounded-xl p-6">
          <p className="text-[11px] font-body font-semibold text-coffee uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-maroon text-cream text-[10px] flex items-center justify-center font-bold">!</span>
            Common Misconception
          </p>
          <p className="text-sm font-body text-espresso leading-relaxed italic">&ldquo;{concept.misconception}&rdquo;</p>
        </div>
        <div className="bg-cream border border-border rounded-xl p-6">
          <p className="text-[11px] font-body font-semibold text-coffee uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-mustard text-cream text-[10px] flex items-center justify-center font-bold">E</span>
            Pattern Detected
          </p>
          <p className="text-sm font-body text-espresso leading-relaxed">{concept.patternDetected}</p>
        </div>
        <div className="bg-cream border border-border rounded-xl p-6">
          <p className="text-[11px] font-body font-semibold text-coffee uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-terra text-cream text-[10px] flex items-center justify-center font-bold">W</span>
            Why This Matters
          </p>
          <p className="text-sm font-body text-espresso leading-relaxed">{concept.whyItMatters}</p>
        </div>
      </div>

      <div className="bg-cream border border-border rounded-xl p-6 animate-fade-in-delay-2">
        <h2 className="font-display text-xl font-semibold text-espresso mb-1">Confidence &amp; Confusion Distribution</h2>
        <p className="text-xs font-body text-coffee mb-6">Based on responses from 42 students in {concept.name.toLowerCase()} questions.</p>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-72 h-64 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value"
                  labelLine={false} label={<PieLabel />} animationBegin={100} animationDuration={900}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} stroke="none" />)}
                </Pie>
                <Tooltip formatter={(val) => [val + '%', '']}
                  contentStyle={{ fontFamily: 'DM Sans', fontSize: 12, background: '#FFFBF5', border: '1px solid #C7AE8F', borderRadius: 8 }} />
                <Legend iconType="circle" iconSize={8}
                  formatter={(val) => <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#7A5C46' }}>{val}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-3">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.fill }} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-body text-espresso">{d.name}</span>
                    <span className="text-sm font-body font-semibold text-espresso">{d.value}%</span>
                  </div>
                  <div className="h-1.5 bg-beige rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: d.value + '%', background: d.fill }} />
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs font-body text-coffee mt-4 leading-relaxed pt-3 border-t border-border">
              {concept.confidenceDistribution.confused}% of students are showing clear confusion signals.{' '}
              {concept.confidenceDistribution.someDifficulty}% show partial understanding and would benefit from reinforcement.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-cream border border-border rounded-xl p-6 animate-fade-in-delay-2">
        <h2 className="font-display text-xl font-semibold text-espresso mb-1">Confusion Trend</h2>
        <p className="text-xs font-body text-coffee mb-5">{concept.trend.previous}% &rarr; {concept.confusionPercentage}% this week</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={concept.weeklyTrend} margin={{ top: 4, right: 4, bottom: 0, left: -30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAD9C3" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#7A5C46', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#7A5C46', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<TrendTip />} />
            <Line type="monotone" dataKey="confusion" stroke="#6E2A3A" strokeWidth={2}
              dot={{ r: 4, fill: '#6E2A3A', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#6E2A3A', strokeWidth: 0 }} animationDuration={900} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-espresso text-cream rounded-xl p-6 md:p-8 animate-fade-in-delay-3">
        <div className="flex items-start gap-3 mb-4">
          <Zap size={18} className="text-mustard mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-body font-semibold text-cream/60 uppercase tracking-widest mb-1">Recommended Intervention</p>
            <h2 className="font-display text-2xl font-semibold text-cream mb-2">{concept.intervention.title}</h2>
            <p className="text-sm font-body text-cream/75">+ {concept.intervention.extra}</p>
          </div>
        </div>
        <button onClick={() => setGenerated(true)}
          className="flex items-center gap-2 bg-cream text-espresso text-sm font-body font-semibold px-5 py-2.5 rounded-lg hover:bg-beige transition-colors duration-200">
          {generated ? <><CheckCircle2 size={14} className="text-forest" /> Activity Generated!</> : <><BookOpen size={14} /> Generate Revision Activity</>}
        </button>
        {generated && <p className="text-xs font-body text-cream/60 mt-2">Activity ready. Backend integration coming soon.</p>}
      </div>

      <div className="animate-fade-in-delay-3">
        <h2 className="font-display text-xl font-semibold text-espresso mb-4">Teaching Tips</h2>
        <div className="space-y-3">
          {concept.tips.map((tip, i) => (
            <div key={i} className="bg-cream border border-border rounded-xl p-5 flex gap-4">
              <span className="font-display text-2xl font-semibold text-border flex-shrink-0 leading-none mt-0.5">{i + 1}</span>
              <p className="text-sm font-body text-espresso leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border rounded-xl p-4 bg-cream/60">
        <p className="text-xs font-body text-coffee">
          <span className="font-semibold text-espresso">Privacy:</span>{' '}
          Student conversations remain private. Insights shown are aggregated patterns only.
        </p>
      </div>
    </div>
  );
}
