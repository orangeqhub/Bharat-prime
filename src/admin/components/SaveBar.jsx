import { RotateCcw, Save, XCircle } from 'lucide-react';

export default function SaveBar({ isDirty, onSave, onReset, saveLabel = 'Save Changes', saving = false }) {
  return (
    <div className="a-savebar">
      <span className={`a-savebar__state ${isDirty ? 'a-savebar__state--dirty' : ''}`}>
        {isDirty ? 'You have unsaved changes' : 'All changes saved'}
      </span>
      {isDirty ? (
        <button type="button" className="a-btn a-btn--ghost a-btn--sm" onClick={onReset} disabled={saving}>
          <XCircle aria-hidden="true" /> Discard
        </button>
      ) : null}
      <button
        type="button"
        className="a-btn a-btn--primary a-btn--sm"
        onClick={onSave}
        disabled={!isDirty || saving}
        title={isDirty ? 'Save changes to the CMS' : 'No changes to save'}
      >
        <Save aria-hidden="true" /> {saveLabel}
      </button>
      {!isDirty ? (
        <button type="button" className="a-btn a-btn--ghost a-btn--sm" onClick={onReset} title="Reset this section to site defaults">
          <RotateCcw aria-hidden="true" /> Reset section
        </button>
      ) : null}
    </div>
  );
}