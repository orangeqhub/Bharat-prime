import useSectionForm from '../components/useSectionForm';
import Field from '../components/Field';
import SaveBar from '../components/SaveBar';

export default function ContactSettings() {
  const { draft, set, isDirty, save, reset } = useSectionForm('contact');
  const contact = draft;
  const labels = contact.formLabels || {};

  return (
    <div>
      <div className="admin-section__head">
        <div>
          <h2 className="admin-section__title">Contact Section</h2>
          <p className="admin-section__hint">Heading and the enquiry form labels.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Heading & Copy</h3>
        <div className="a-grid">
          <Field label="Eyebrow" value={contact.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
          <Field label="Heading" value={contact.heading} onChange={(e) => set('heading', e.target.value)} />
        </div>
        <Field
          label="Subheading"
          value={contact.subheading}
          onChange={(e) => set('subheading', e.target.value)}
          as="textarea"
          rows={2}
        />
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Enquiry Form Labels</h3>
        <div className="a-grid a-grid--3">
          <Field label="Name" value={labels.name} onChange={(e) => set('formLabels', { ...labels, name: e.target.value })} />
          <Field label="Phone" value={labels.phone} onChange={(e) => set('formLabels', { ...labels, phone: e.target.value })} />
          <Field label="Company" value={labels.company} onChange={(e) => set('formLabels', { ...labels, company: e.target.value })} />
          <Field
            label="Requirement Type"
            value={labels.requirementType}
            onChange={(e) => set('formLabels', { ...labels, requirementType: e.target.value })}
          />
          <Field
            label="Material / Service"
            value={labels.material}
            onChange={(e) => set('formLabels', { ...labels, material: e.target.value })}
          />
          <Field label="Message" value={labels.message} onChange={(e) => set('formLabels', { ...labels, message: e.target.value })} />
          <Field label="Submit button" value={labels.submit} onChange={(e) => set('formLabels', { ...labels, submit: e.target.value })} />
          <Field
            label="Thank-you heading"
            value={labels.submitted}
            onChange={(e) => set('formLabels', { ...labels, submitted: e.target.value })}
          />
          <Field
            label="Thank-you note"
            value={labels.submittedNote}
            onChange={(e) => set('formLabels', { ...labels, submittedNote: e.target.value })}
          />
        </div>
      </div>

      <SaveBar isDirty={isDirty} onSave={() => save('Contact content saved')} onReset={reset} />
    </div>
  );
}