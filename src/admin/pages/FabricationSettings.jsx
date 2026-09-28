import useSectionForm from '../components/useSectionForm';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';
import ImageUpload from '../components/ImageUpload';
import ObjectListEditor from '../components/ObjectListEditor';
import ListEditor from '../components/ListEditor';

export default function FabricationSettings() {
  const { draft, set, isDirty, save, reset } = useSectionForm('fabrication');
  const fab = draft;

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Fabrication CMS</h2>
          <p className="admin-section__hint">Services offered, workflow steps & images.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Heading & Copy</h3>
        <div className="a-grid">
          <Field label="Eyebrow" value={fab.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
          <Field label="Heading" value={fab.heading} onChange={(e) => set('heading', e.target.value)} />
          <Field label="Subheading" value={fab.subheading} onChange={(e) => set('subheading', e.target.value)} />
          <Field label="Intro" value={fab.intro} onChange={(e) => set('intro', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Products / Services Offered</h3>
        <p className="admin-section__hint" style={{ marginBottom: 10 }}>
          Add, edit or delete fabrication services.
        </p>
        <ObjectListEditor
          items={fab.products || []}
          onChange={(v) => set('products', v)}
          createBlank={() => ({ title: '', icon: 'grid', image: '/assets/fabrication.jpg' })}
          fields={[
            { key: 'title', type: 'text', label: 'Service', placeholder: 'e.g. Window & Balcony Grills' },
            { key: 'image', type: 'text', label: 'Image', placeholder: '/assets/fabrication.jpg' },
            { key: 'icon', type: 'icon', label: 'Icon' },
          ]}
          addLabel="Add service"
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Workflow</h3>
        <p className="admin-section__hint" style={{ marginBottom: 10 }}>
          The process timeline shown on the website.
        </p>
        <ListEditor
          items={fab.workflow || []}
          onChange={(v) => set('workflow', v)}
          placeholder="Step name"
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Image</h3>
        <ImageUpload
          label="Fabrication image"
          value={fab.image}
          onChange={(v) => set('image', v)}
          preset="/assets/fabrication.jpg"
        />
        <Field
          label="Image alt text"
          value={fab.imageAlt}
          onChange={(e) => set('imageAlt', e.target.value)}
        />
      </div>

      <SaveBar isDirty={isDirty} onSave={() => save('Fabrication content saved')} onReset={reset} />
    </div>
  );
}