import { useState } from 'react';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ImageUpload from '../components/ImageUpload';
import ObjectListEditor from '../components/ObjectListEditor';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../components/Toast';

export default function RecyclingSettings() {
  const { content, update } = useContent();
  const { push } = useToast();

  const [why, setWhy] = useState(() => JSON.parse(JSON.stringify(content.whyRecycling || {})));
  const [mvr, setMvr] = useState(() => JSON.parse(JSON.stringify(content.miningVsRecycling || {})));

  const isDirty =
    JSON.stringify(why) !== JSON.stringify(content.whyRecycling) ||
    JSON.stringify(mvr) !== JSON.stringify(content.miningVsRecycling);

  const save = () => {
    const ok = update({ whyRecycling: why, miningVsRecycling: mvr });
    if (ok) push('Why Recycling content saved');
    else push('Could not save — storage may be full.', 'error');
  };

  const reset = () => {
    setWhy(JSON.parse(JSON.stringify(content.whyRecycling || {})));
    setMvr(JSON.parse(JSON.stringify(content.miningVsRecycling || {})));
    push('Reverted to last saved content');
  };

  const updatePollutionImage = (i, patch) => {
    const images = [...(why.pollutionImages || [])];
    images[i] = { ...images[i], ...patch };
    setWhy({ ...why, pollutionImages: images });
  };

  const updateGlobalRow = (i, patch) => {
    const rows = [...(mvr.global?.rows || [])];
    rows[i] = { ...rows[i], ...patch };
    setMvr({ ...mvr, global: { ...mvr.global, rows } });
  };

  const updateIndiaRow = (i, patch) => {
    const rows = [...(mvr.india?.rows || [])];
    rows[i] = { ...rows[i], ...patch };
    setMvr({ ...mvr, india: { ...mvr.india, rows } });
  };

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Why Recycling & Mining vs Recycling</h2>
          <p className="admin-section__hint">
            Pollution points, main statement and the educational comparison with provided stats.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Why Recycling</h3>
        <div className="a-grid">
          <Field label="Eyebrow" value={why.eyebrow} onChange={(e) => setWhy({ ...why, eyebrow: e.target.value })} />
          <Field label="Heading" value={why.heading} onChange={(e) => setWhy({ ...why, heading: e.target.value })} />
        </div>
        <Field
          label="Intro"
          value={why.intro}
          onChange={(e) => setWhy({ ...why, intro: e.target.value })}
          as="textarea"
          rows={2}
        />
        <div style={{ marginTop: 8 }}>
          <span className="a-field__label">Pollution points</span>
          <p className="admin-section__hint" style={{ marginBottom: 10 }}>
            Consequences of improper waste disposal.
          </p>
          <ObjectListEditor
            items={why.pollution || []}
            onChange={(v) => setWhy({ ...why, pollution: v })}
            createBlank={() => ({ title: '', icon: 'alert', image: '/assets/pollution-1.jpg' })}
            fields={[
              { key: 'title', type: 'text', label: 'Point', placeholder: 'e.g. Air Pollution' },
              { key: 'image', type: 'text', label: 'Image', placeholder: '/assets/pollution-1.jpg' },
              { key: 'icon', type: 'icon', label: 'Icon' },
            ]}
            addLabel="Add point"
          />
        </div>
        <Field
          label="Main statement"
          value={why.statement}
          onChange={(e) => setWhy({ ...why, statement: e.target.value })}
          style={{ marginTop: 14 }}
        />
        <div className="a-grid" style={{ marginTop: 14 }}>
          {(why.pollutionImages || []).map((item, i) => (
            <div key={item.image || i}>
              <ImageUpload
                label={`Pollution image ${i + 1}`}
                value={item.image || ''}
                onChange={(v) => updatePollutionImage(i, { image: v })}
                preset={i === 0 ? '/assets/pollution-1.jpg' : '/assets/pollution-2.jpg'}
              />
              <Field
                label={`Image ${i + 1} alt text`}
                value={item.imageAlt || ''}
                onChange={(e) => updatePollutionImage(i, { imageAlt: e.target.value })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Mining vs Recycling</h3>
        <Field
          label="Statement"
          value={mvr.statement || ''}
          onChange={(e) => setMvr({ ...mvr, statement: e.target.value })}
          as="textarea"
          rows={2}
        />
        <div className="a-grid">
          <div>
            <span className="a-field__label">Mining points</span>
            <ListPoints
              points={mvr.mining?.points}
              onChange={(v) => setMvr({ ...mvr, mining: { ...mvr.mining, points: v } })}
            />
          </div>
          <div>
            <span className="a-field__label">Recycling points</span>
            <ListPoints
              points={mvr.recycling?.points}
              onChange={(v) => setMvr({ ...mvr, recycling: { ...mvr.recycling, points: v } })}
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">
          Provided Statistics{' '}
          <span style={{ fontWeight: 400, fontSize: 12, color: '#7c746a' }}>
            (shown exactly as provided — Global Material Use & India)
          </span>
        </h3>
        <div className="a-grid">
          <div>
            <span className="a-field__label">{mvr.global?.title || 'Global Material Use'}</span>
            {(mvr.global?.rows || []).map((row, i) => (
              <div className="a-row" key={i} style={{ marginBottom: 8 }}>
                <input
                  className="a-input"
                  style={{ width: 'auto', flex: 1 }}
                  value={row.label || ''}
                  placeholder="Label"
                  onChange={(e) => updateGlobalRow(i, { label: e.target.value })}
                />
                <input
                  className="a-input"
                  style={{ width: 110 }}
                  value={row.value || ''}
                  placeholder="Value"
                  onChange={(e) => updateGlobalRow(i, { value: e.target.value })}
                />
              </div>
            ))}
            <Field
              label="Global caption"
              value={mvr.global?.caption || ''}
              onChange={(e) => setMvr({ ...mvr, global: { ...mvr.global, caption: e.target.value } })}
            />
          </div>
          <div>
            <span className="a-field__label">{mvr.india?.title || 'India'}</span>
            {(mvr.india?.rows || []).map((row, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div className="a-row">
                  <input
                    className="a-input"
                    style={{ width: 'auto', flex: 1 }}
                    value={row.label || ''}
                    placeholder="Label"
                    onChange={(e) => updateIndiaRow(i, { label: e.target.value })}
                  />
                  <input
                    className="a-input"
                    style={{ width: 120 }}
                    value={row.value || ''}
                    placeholder="Value"
                    onChange={(e) => updateIndiaRow(i, { value: e.target.value })}
                  />
                </div>
                <input
                  className="a-input"
                  style={{ marginTop: 6 }}
                  value={row.note || ''}
                  placeholder="Note (optional)"
                  onChange={(e) => updateIndiaRow(i, { note: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SaveBar isDirty={isDirty} onSave={save} onReset={reset} />
    </div>
  );
}

function ListPoints({ points, onChange }) {
  return (
    <div>
      {(points || []).map((point, i) => (
        <div className="a-row" key={i} style={{ marginBottom: 8 }}>
          <input
            className="a-input"
            value={point}
            onChange={(e) => {
              const next = [...points];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            className="a-btn a-btn--ghost a-btn--sm"
            onClick={() => onChange(points.filter((_, idx) => idx !== i))}
            aria-label="Remove"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        className="a-btn a-btn--secondary a-btn--sm"
        onClick={() => onChange([...(points || []), ''])}
      >
        + Add
      </button>
    </div>
  );
}