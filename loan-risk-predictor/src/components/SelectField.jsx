// options are [label, value] pairs: the label is shown, the value is sent to the API.
// variant="segmented" renders a two-option toggle instead of a dropdown.
export default function SelectField({ label, name, value, onChange, options, error, variant = "select" }) {
  const errId = error ? `${name}-err` : undefined;
  return (
    <div>
      <label htmlFor={name} id={`${name}-label`} className="mb-2 block text-sm font-medium text-muted">{label}</label>
      {variant === "segmented" ? (
        <div role="radiogroup" aria-labelledby={`${name}-label`} aria-describedby={errId} className={`clay-inset flex gap-2 p-1.5 ${error ? "ring-2 ring-bad/70" : ""}`}>
          {options.map(([text, val]) => (
            <button key={val} type="button" role="radio" aria-checked={value === val}
              onClick={() => onChange({ target: { name, value: val } })}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-accent/60 ${value === val ? "bg-accent text-[#0D0F12] shadow-[3px_3px_8px_rgba(0,0,0,.45)]" : "text-muted hover:text-white"}`}>
              {text}
            </button>
          ))}
        </div>
      ) : (
        <select id={name} name={name} value={value} onChange={onChange} aria-invalid={!!error} aria-describedby={errId}
          className={`clay-inset w-full appearance-none px-4 py-3 outline-none transition focus:ring-2 ${error ? "ring-2 ring-bad/70" : "focus:ring-accent/60"} ${value === "" ? "text-[#5b626d]" : "text-white"}`}>
          <option value="" disabled>Select an option</option>
          {options.map(([text, val]) => <option key={val} value={val} className="bg-surface text-white">{text}</option>)}
        </select>
      )}
      {error && <p id={errId} className="mt-1.5 text-xs text-bad">{error}</p>}
    </div>
  );
}
