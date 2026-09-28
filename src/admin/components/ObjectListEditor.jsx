import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from 'lucide-react';
import { allIconNames } from '../../utils/icons';
import ListEditor from './ListEditor';

function IconSelect({ value, onChange }) {
  return (
    <select
      className="a-listitem__input a-listitem__icon"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">— icon —</option>
      {allIconNames.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );
}

/* Generic editor for arrays of small objects, e.g. [{title, icon}]. */
export default function ObjectListEditor({
  items,
  onChange,
  fields = [],
  createBlank,
  addLabel = 'Add item',
  keyOf = (item, i) => String(i),
}) {
  const update = (i, key, value) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };

  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const add = () => onChange([...items, createBlank()]);

  return (
    <div>
      {(items || []).map((item, i) => (
        <div className="a-listitem a-listitem--obj" key={keyOf(item, i)}>
          <span className="a-listitem__drag">
            <GripVertical aria-hidden="true" />
          </span>
          {items.length > 1 ? (
            <>
              <button type="button" className="a-listitem__up" onClick={() => move(i, -1)} aria-label="Move up">
                <ArrowUp aria-hidden="true" />
              </button>
              <button type="button" className="a-listitem__down" onClick={() => move(i, 1)} aria-label="Move down">
                <ArrowDown aria-hidden="true" />
              </button>
            </>
          ) : null}
          <div className="a-listitem__inputs">
            {fields.map((field) =>
              field.type === 'icon' ? (
                <IconSelect key={field.key} value={item[field.key]} onChange={(v) => update(i, field.key, v)} />
              ) : field.type === 'textarea' ? (
                <textarea
                  key={field.key}
                  className="a-listitem__input"
                  rows={field.rows || 2}
                  placeholder={field.placeholder || field.label}
                  value={item[field.key] || ''}
                  onChange={(e) => update(i, field.key, e.target.value)}
                />
              ) : field.type === 'list' ? (
                <ListEditor
                  key={field.key}
                  items={item[field.key] || []}
                  onChange={(v) => update(i, field.key, v)}
                  placeholder={field.placeholder || field.label}
                />
              ) : (
                <input
                  key={field.key}
                  type={field.type === 'number' ? 'number' : 'text'}
                  className="a-listitem__input"
                  placeholder={field.placeholder || field.label}
                  value={item[field.key] || ''}
                  onChange={(e) => update(i, field.key, e.target.value)}
                />
              )
            )}
          </div>
          <button
            type="button"
            className="a-listitem__remove"
            onClick={() => remove(i)}
            aria-label="Remove"
            title="Remove"
          >
            <Trash2 aria-hidden="true" />
          </button>
        </div>
      ))}
      <button type="button" className="a-btn a-btn--secondary a-btn--sm" onClick={add}>
        <Plus aria-hidden="true" /> {addLabel}
      </button>
    </div>
  );
}