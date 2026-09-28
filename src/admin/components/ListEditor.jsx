import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from 'lucide-react';

/* String-list editor with add, remove and reorder controls. */
export default function ListEditor({
  items,
  onChange,
  placeholder = 'Enter item…',
  itemIcon,
  addLabel = 'Add',
}) {
  const update = (i, value) => {
    const next = [...items];
    next[i] = value;
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

  const add = () => onChange([...items, '']);

  return (
    <div>
      {(items || []).map((item, i) => (
        <div className="a-listitem" key={`${i}-${item.slice(0, 12)}`}>
          <span className="a-listitem__drag" title="Drag to reorder">
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
          {itemIcon ? <span className="a-listitem__badge">{itemIcon}</span> : null}
          <input
            type="text"
            className="a-listitem__input"
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
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