import useSectionForm from '../components/useSectionForm';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ImageUpload from '../components/ImageUpload';
import ObjectListEditor from '../components/ObjectListEditor';
import { allIconNames } from '../../utils/icons';

export default function SteelSettings() {
  const { draft, set, isDirty, save, reset } = useSectionForm('steel');
  const steel = draft;

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Steel Trading CMS</h2>
          <p className="admin-section__hint">“We buy scrap — we also sell steel.”</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Heading & Copy</h3>
        <div className="a-grid">
          <Field label="Eyebrow" value={steel.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
          <Field label="Heading" value={steel.heading} onChange={(e) => set('heading', e.target.value)} />
          <Field label="Subheading" value={steel.subheading} onChange={(e) => set('subheading', e.target.value)} />
          <Field label="Intro" value={steel.intro} onChange={(e) => set('intro', e.target.value)} />
        </div>
        <Field
          label="Business strategy"
          value={steel.strategy}
          onChange={(e) => set('strategy', e.target.value)}
          as="textarea"
          rows={2}
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Priority Products</h3>
        <ObjectListEditor
          items={steel.products || []}
          onChange={(v) => set('products', v)}
          createBlank={() => ({ title: '', icon: 'bars', image: '/assets/steel-trading.jpg' })}
          fields={[
            { key: 'title', type: 'text', label: 'Product', placeholder: 'e.g. MS / TMT Rods' },
            { key: 'image', type: 'text', label: 'Image', placeholder: '/assets/steel-trading.jpg' },
            { key: 'icon', type: 'icon', label: 'Icon' },
          ]}
          addLabel="Add product"
        />
        <p className="admin-section__hint">
          Icons available: {''}
          {allIconNames.join(', ')}
        </p>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Image</h3>
        <ImageUpload
          label="Steel trading image"
          value={steel.image}
          onChange={(v) => set('image', v)}
          preset="/assets/steel-trading.jpg"
        />
        <Field
          label="Image alt text"
          value={steel.imageAlt}
          onChange={(e) => set('imageAlt', e.target.value)}
        />
      </div>

      <SaveBar isDirty={isDirty} onSave={() => save('Steel trading content saved')} onReset={reset} />
    </div>
  );
}