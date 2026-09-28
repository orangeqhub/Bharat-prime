import useSectionForm from '../components/useSectionForm';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ImageUpload from '../components/ImageUpload';
import ListEditor from '../components/ListEditor';

export default function AboutSettings() {
  const { draft, set, isDirty, save, reset } = useSectionForm('about');
  const about = draft;

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">About Section</h2>
          <p className="admin-section__hint">Company story, mission list, highlight & stats.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Heading & Story</h3>
        <div className="a-grid">
          <Field label="Eyebrow" value={about.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
          <Field label="Heading" value={about.heading} onChange={(e) => set('heading', e.target.value)} />
        </div>
        <Field
          label="Story"
          value={about.story}
          onChange={(e) => set('story', e.target.value)}
          as="textarea"
          rows={3}
        />
        <Field
          label="Mission intro"
          value={about.missionIntro}
          onChange={(e) => set('missionIntro', e.target.value)}
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">“What customers can do”</h3>
        <ListEditor
          items={about.list || []}
          onChange={(v) => set('list', v)}
          placeholder="e.g. Sell their scrap"
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Highlight & Visual</h3>
        <Field
          label="Highlight statement"
          value={about.highlight}
          onChange={(e) => set('highlight', e.target.value)}
        />
        <ImageUpload
          label="About image"
          value={about.image}
          onChange={(v) => set('image', v)}
          preset="/assets/about-1.jpg"
        />
        <Field
          label="Image alt text"
          value={about.imageAlt}
          onChange={(e) => set('imageAlt', e.target.value)}
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Statistics Cards</h3>
        {(about.stats || []).map((stat, i) => (
          <div className="a-grid" key={i} style={{ borderBottom: '1px dashed #eee9df', paddingBottom: 10 }}>
            <Field
              label={`Value ${i + 1}`}
              type="number"
              value={stat.value}
              onChange={(e) => {
                const stats = [...about.stats];
                stats[i] = { ...stat, value: Number(e.target.value) || 0 };
                set('stats', stats);
              }}
            />
            <Field
              label={`Suffix ${i + 1}`}
              value={stat.suffix || ''}
              onChange={(e) => {
                const stats = [...about.stats];
                stats[i] = { ...stat, suffix: e.target.value };
                set('stats', stats);
              }}
              placeholder="e.g. +"
            />
            <Field
              label={`Label ${i + 1}`}
              value={stat.label}
              onChange={(e) => {
                const stats = [...about.stats];
                stats[i] = { ...stat, label: e.target.value };
                set('stats', stats);
              }}
              className="a-grid--full"
            />
          </div>
        ))}
      </div>

      <SaveBar isDirty={isDirty} onSave={() => save('About section saved')} onReset={reset} />
    </div>
  );
}