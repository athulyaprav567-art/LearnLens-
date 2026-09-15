import { useState } from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { settingsData } from '../data/mockData';

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)}
      className={'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ' + (checked ? 'bg-espresso' : 'bg-beige')}>
      <span className={'inline-block h-4 w-4 transform rounded-full bg-cream shadow transition duration-200 ' + (checked ? 'translate-x-4' : 'translate-x-0')} />
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-cream border border-border rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="font-body font-semibold text-espresso text-sm">{title}</h2>
      </div>
      <div className="px-6 py-2">{children}</div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-border last:border-0">
      <span className="text-sm font-body font-medium text-espresso">{label}</span>
      {children}
    </div>
  );
}

export default function Settings() {
  const [notifs, setNotifs] = useState(settingsData.notifications);
  const [threshold, setThreshold] = useState(settingsData.preferences.confusionThreshold);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="animate-fade-in space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-4xl font-semibold text-espresso mb-2">Settings</h1>
        <p className="text-sm font-body text-coffee">Manage your profile, class and preferences.</p>
      </div>

      <Section title="Profile">
        <Row label="Teacher name"><span className="text-sm font-body text-coffee">{settingsData.teacher.name}</span></Row>
        <Row label="Institution"><span className="text-sm font-body text-coffee">{settingsData.teacher.institution}</span></Row>
      </Section>

      <Section title="Class">
        <Row label="Class"><span className="text-sm font-body text-coffee">{settingsData.teacher.class}</span></Row>
        <Row label="Subject"><span className="text-sm font-body text-coffee">{settingsData.teacher.subject}</span></Row>
      </Section>

      <Section title="Notifications">
        <Row label="Learning alerts">
          <Toggle checked={notifs.learningAlerts} onChange={(v) => setNotifs({ ...notifs, learningAlerts: v })} />
        </Row>
        <Row label="Weekly summaries">
          <Toggle checked={notifs.weeklySummaries} onChange={(v) => setNotifs({ ...notifs, weeklySummaries: v })} />
        </Row>
      </Section>

      <Section title="Analysis Preferences">
        <div className="py-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body font-medium text-espresso">Confusion threshold</span>
            <span className="text-sm font-body font-semibold text-maroon">{threshold}%</span>
          </div>
          <p className="text-xs font-body text-coffee mb-3">Concepts above this threshold are flagged as High priority.</p>
          <input type="range" min={20} max={80} value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))} className="w-full accent-espresso" />
          <div className="flex justify-between text-[10px] font-body text-coffee mt-1"><span>20%</span><span>80%</span></div>
        </div>
        <Row label="Insight frequency"><span className="text-sm font-body text-coffee">{settingsData.preferences.insightFrequency}</span></Row>
      </Section>

      <div className="bg-forest/5 border border-forest/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-forest mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="font-body font-semibold text-espresso mb-2">Student Privacy</h2>
            <p className="text-sm font-body text-espresso/80 leading-relaxed mb-3">
              LearnLens is designed with student privacy as a core principle. Individual student
              conversations, messages and personal interactions are <strong>never shown</strong> to teachers.
            </p>
            <p className="text-sm font-body text-espresso/80 leading-relaxed">
              Everything visible on this dashboard is derived from aggregated, anonymised class-level patterns.
              No individual student is identifiable.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave}
          className="flex items-center gap-2 bg-espresso text-cream text-sm font-body font-semibold px-6 py-2.5 rounded-lg hover:bg-coffee transition-colors duration-200">
          {saved ? <><CheckCircle2 size={14} /> Saved!</> : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
