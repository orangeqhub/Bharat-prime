export default function Field({
  label,
  hint,
  as = 'input',
  type = 'text',
  value,
  onChange,
  placeholder,
  rows = 4,
  options = [],
  className = '',
  ...rest
}) {
  const id = useIdish(label);
  return (
    <div className={`a-field ${className}`}>
      {label ? (
        <label className="a-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      {as === 'textarea' ? (
        <textarea
          id={id}
          className="a-input"
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
      ) : as === 'select' ? (
        <select id={id} className="a-input" value={value} onChange={onChange} {...rest}>
          {options.map((opt) => {
            if (typeof opt === 'string') {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              );
            }
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id={id}
          className="a-input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
      )}
      {hint ? <span className="a-field__hint">{hint}</span> : null}
    </div>
  );
}

let counter = 0;
function useIdish(label) {
  return `af-${(label ? String(label).replace(/[^a-z0-9]+/gi, '-') : 'f')}-${++counter}`;
}