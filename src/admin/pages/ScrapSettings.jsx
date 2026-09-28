import useSectionForm from '../components/useSectionForm';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ImageUpload from '../components/ImageUpload';
import ListEditor from '../components/ListEditor';
import { allIconNames } from '../../utils/icons';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

const PRESETS = {
  ferrous: '/assets/ferrous-scrap.jpg',
  'non-ferrous': '/assets/non-ferrous.jpg',
  others: '/assets/recyclables.jpg',
};

const SECONDARY_PRESETS = {
  ferrous: {
    image: '/assets/ferrous-2.jpg',
    imageAlt: 'Sorted ferrous scrap materials ready for trading and recycling',
  },
  'non-ferrous': {
    image: '/assets/non-ferrous-2.jpg',
    imageAlt: 'Separated non-ferrous metals ready for recycling',
  },
  others: {
    image: '/assets/about-1.jpg',
    imageAlt: 'Sorted recyclable materials collected at the Bharat Prime Enterprises yard',
  },
};

function createBlank() {
  return {
    id: `division-${Date.now().toString(36)}`,
    title: 'New Division',
    icon: 'layers',
    description: '',
    materials: [],
    process: ['Collect', 'Sort', 'Trade', 'Recycle'],
    highlights: [],
    focus: '',
    image: '',
    imageAlt: '',
    secondaryImage: '',
    secondaryImageAlt: '',
  };
}

export default function ScrapSettings() {
  const { draft, set, isDirty, save, reset } = useSectionForm('scrap');
  const scrap = draft;
  const divisions = scrap.divisions || [];
  const [openKeys, setOpenKeys] = useState(() => new Set(divisions.map((d) => d.id)));

  const updateDivision = (i, patch) => {
    const next = [...divisions];
    next[i] = { ...next[i], ...patch };
    set('divisions', next);
  };

  const toggle = (id) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Scrap CMS</h2>
          <p className="admin-section__hint">
            Manage the Ferrous, Non-Ferrous and Other Recyclable divisions.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="a-grid">
          <Field label="Eyebrow" value={scrap.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
          <Field label="Heading" value={scrap.heading} onChange={(e) => set('heading', e.target.value)} />
        </div>
        <Field
          label="Subheading"
          value={scrap.subheading}
          onChange={(e) => set('subheading', e.target.value)}
        />
        <Field
          label="Intro"
          value={scrap.intro}
          onChange={(e) => set('intro', e.target.value)}
          as="textarea"
          rows={2}
        />
      </div>

      <div className="admin-section__head" style={{ marginTop: 26 }}>
        <div>
          <h2 className="admin-section__title">Scrap Divisions</h2>
          <p className="admin-section__hint">Add, edit, reorder and delete divisions.</p>
        </div>
        <button
          type="button"
          className="a-btn a-btn--secondary a-btn--sm"
          onClick={() => {
            const div = createBlank();
            set('divisions', [...divisions, div]);
          }}
        >
          <Plus aria-hidden="true" /> Add division
        </button>
      </div>

      {divisions.map((division, i) => (
        <div className="admin-card" key={division.id}>
          <div className="a-row" style={{ marginBottom: 10 }}>
            <button
              type="button"
              className="a-btn a-btn--ghost a-btn--sm"
              onClick={() => toggle(division.id)}
              aria-label="Collapse / expand"
            >
              {openKeys.has(division.id) ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
            </button>
            <strong style={{ flex: 1 }}>{division.title || 'Untitled division'}</strong>
            <button
              type="button"
              className="a-btn a-btn--danger a-btn--sm"
              onClick={() => set('divisions', divisions.filter((_, idx) => idx !== i))}
            >
              <Trash2 aria-hidden="true" /> Delete
            </button>
          </div>

          {openKeys.has(division.id) ? (
            <>
              <div className="a-grid">
                <Field
                  label="Title"
                  value={division.title}
                  onChange={(e) => updateDivision(i, { title: e.target.value })}
                />
                <Field
                  label="Icon"
                  as="select"
                  value={division.icon}
                  onChange={(e) => updateDivision(i, { icon: e.target.value })}
                  options={['', ...allIconNames]}
                />
              </div>
              <Field
                label="Description"
                value={division.description}
                onChange={(e) => updateDivision(i, { description: e.target.value })}
                as="textarea"
                rows={3}
              />

              <div className="a-grid">
                <div>
                  <span className="a-field__label">Materials</span>
                  <ListEditor
                    items={division.materials || []}
                    onChange={(v) => updateDivision(i, { materials: v })}
                    placeholder="Material name"
                  />
                </div>
                <div>
                  <span className="a-field__label">Process steps</span>
                  <ListEditor
                    items={division.process || []}
                    onChange={(v) => updateDivision(i, { process: v })}
                    placeholder="Step"
                  />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <span className="a-field__label">Highlights (non-ferrous)</span>
                <ListEditor
                  items={division.highlights || []}
                  onChange={(v) => updateDivision(i, { highlights: v })}
                  placeholder="Highlight point"
                />
              </div>

              <div style={{ marginTop: 12 }}>
                <Field
                  label="Focus statement (other recyclables)"
                  value={division.focus || ''}
                  onChange={(e) => updateDivision(i, { focus: e.target.value })}
                  placeholder="e.g. Collection → Sorting → Responsible Recycling"
                />
              </div>

              <div className="a-grid">
                <ImageUpload
                  label="Primary division image"
                  value={division.image}
                  onChange={(v) => updateDivision(i, { image: v })}
                  preset={PRESETS[division.id] || '/assets/ferrous-scrap.jpg'}
                />
                <ImageUpload
                  label="Secondary division image (optional)"
                  value={division.secondaryImage ?? SECONDARY_PRESETS[division.id]?.image ?? ''}
                  onChange={(v) => updateDivision(i, { secondaryImage: v })}
                  preset={SECONDARY_PRESETS[division.id]?.image || ''}
                />
              </div>
              <div className="a-grid">
                <Field
                  label="Primary image alt text"
                  value={division.imageAlt || ''}
                  onChange={(e) => updateDivision(i, { imageAlt: e.target.value })}
                />
                <Field
                  label="Secondary image alt text"
                  value={division.secondaryImageAlt ?? SECONDARY_PRESETS[division.id]?.imageAlt ?? ''}
                  onChange={(e) => updateDivision(i, { secondaryImageAlt: e.target.value })}
                />
              </div>
            </>
          ) : null}
        </div>
      ))}

      <SaveBar isDirty={isDirty} onSave={() => save('Scrap content saved')} onReset={reset} />
    </div>
  );
}