export default function InputField({ label, name, value, onChange, error, hint, ...rest }) {
  const describedBy = error ? `${name}-err` : hint ? `${name}-hint` : undefined;
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-muted">{label}</label>
      <input id={name} name={name} type="number" inputMode="decimal" value={value} onChange={onChange}
        aria-invalid={!!error} aria-describedby={describedBy}
        className={`clay-inset w-full px-4 py-3 text-white outline-none transition placeholder:text-[#5b626d] focus:ring-2 ${error ? "ring-2 ring-bad/70" : "focus:ring-accent/60"}`}
        {...rest} />
      {error
        ? <p id={`${name}-err`} className="mt-1.5 text-xs text-bad">{error}</p>
        : hint && <p id={`${name}-hint`} className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
