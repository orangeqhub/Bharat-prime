import { useState } from 'react';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ListEditor from '../components/ListEditor';
import ObjectListEditor from '../components/ObjectListEditor';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../components/Toast';

export default function GrowthSettings() {
  const { content, update } = useContent();
  const { push } = useToast();

  const [plan, setPlan] = useState(() => JSON.parse(JSON.stringify(content.growthPlan || {})));
  const [cycle, setCycle] = useState(() => JSON.parse(JSON.stringify(content.businessCycle || {})));

  const isDirty =
    JSON.stringify(plan) !== JSON.stringify(content.growthPlan) ||
    JSON.stringify(cycle) !== JSON.stringify(content.businessCycle);

  const save = () => {
    const ok = update({ growthPlan: plan, businessCycle: cycle });
    if (ok) push('Growth plan saved');
    else push('Could not save — storage may be full.', 'error');
  };

  const reset = () => {
    setPlan(JSON.parse(JSON.stringify(content.growthPlan || {})));
    setCycle(JSON.parse(JSON.stringify(content.businessCycle || {})));
    push('Reverted to last saved content');
  };

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Growth Plan & Business Cycle</h2>
          <p className="admin-section__hint">The 90-day plan and business cycle shown on the homepage.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">90-Day Growth Plan</h3>
        <div className="a-grid">
          <Field label="Eyebrow" value={plan.eyebrow} onChange={(e) => setPlan({ ...plan, eyebrow: e.target.value })} />
          <Field label="Heading" value={plan.heading} onChange={(e) => setPlan({ ...plan, heading: e.target.value })} />
        </div>
        <Field
          label="Intro"
          value={plan.intro}
          onChange={(e) => setPlan({ ...plan, intro: e.target.value })}
          as="textarea"
          rows={2}
        />
        <p className="admin-section__hint" style={{ marginTop: 8, marginBottom: 10 }}>
          Three phases. Each phase has a day range, title and points list — the points from the business
          brief must stay intact (120+ customers, top 5 products, top 10 loyal customers).
        </p>
        <ObjectListEditor
          items={plan.phases || []}
          onChange={(v) => setPlan({ ...plan, phases: v })}
          createBlank={() => ({ id: `phase-${Date.now().toString(36)}`, days: '', title: '', icon: 'chart', points: [] })}
          keyOf={(item, i) => item.id || String(i)}
          fields={[
            { key: 'days', type: 'text', label: 'Days', placeholder: 'e.g. DAY 1–30' },
            { key: 'title', type: 'text', label: 'Title', placeholder: 'e.g. Customer Development' },
            {
              key: 'points',
              type: 'list',
              label: 'Points',
              placeholder: 'e.g. Meet 120+ potential customers',
            },
          ]}
          addLabel="Add phase"
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Business Cycle</h3>
        <div className="a-grid">
          <Field label="Eyebrow" value={cycle.eyebrow} onChange={(e) => setCycle({ ...cycle, eyebrow: e.target.value })} />
          <Field label="Heading" value={cycle.heading} onChange={(e) => setCycle({ ...cycle, heading: e.target.value })} />
        </div>
        <Field
          label="Intro"
          value={cycle.intro}
          onChange={(e) => setCycle({ ...cycle, intro: e.target.value })}
          as="textarea"
          rows={2}
        />
        <ListEditor
          items={cycle.steps?.map((s) => s.label) || []}
          onChange={(v) => setCycle({ ...cycle, steps: v.map((label, i) => ({ ...(cycle.steps?.[i] || {}), label })) })}
          placeholder="Cycle step label"
        />
      </div>

      <SaveBar isDirty={isDirty} onSave={save} onReset={reset} />
    </div>
  );
}