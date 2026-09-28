import useSectionForm from '../components/useSectionForm';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ImageUpload from '../components/ImageUpload';

export default function HeroSettings() {
  const { draft, set, isDirty, save, reset } = useSectionForm('hero');
  const hero = draft;

  const setLine = (i, value) => {
    const lines = [...(hero.headingLines || [])];
    lines[i] = value;
    set('headingLines', lines);
  };

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Hero Section</h2>
          <p className="admin-section__hint">The opening section of the homepage.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Heading</h3>
        <div className="a-grid a-grid--3">
          <Field label="Line 1" value={hero.headingLines?.[0]} onChange={(e) => setLine(0, e.target.value)} />
          <Field label="Line 2" value={hero.headingLines?.[1]} onChange={(e) => setLine(1, e.target.value)} />
          <Field label="Line 3" value={hero.headingLines?.[2]} onChange={(e) => setLine(2, e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Content</h3>
        <div className="a-grid">
          <Field
            label="Location / eyebrow text"
            value={hero.eyebrow}
            onChange={(e) => set('eyebrow', e.target.value)}
          />
          <Field
            label="Supporting text"
            value={hero.subtitle}
            onChange={(e) => set('subtitle', e.target.value)}
            className="a-grid--full"
          />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Images</h3>
        <div className="a-grid">
          <ImageUpload
            label="Hero background / main image"
            value={hero.image}
            onChange={(v) => set('image', v)}
            preset="/assets/ferrous-scrap.jpg"
            hint="Large industrial photo. Appears as hero background and card image."
          />
          <ImageUpload
            label="Brand badge image"
            value={hero.badgeImage}
            onChange={(v) => set('badgeImage', v)}
            preset="/assets/brand-card-front.jpg"
            hint="The round badge in the hero visual (business card art)."
          />
        </div>
        <Field
          label="Hero image alt text"
          value={hero.imageAlt}
          onChange={(e) => set('imageAlt', e.target.value)}
          className="a-grid--full"
        />
      </div>

      <SaveBar isDirty={isDirty} onSave={() => save('Hero saved')} onReset={reset} />
    </div>
  );
}