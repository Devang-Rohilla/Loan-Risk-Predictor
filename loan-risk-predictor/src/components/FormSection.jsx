export default function FormSection({ title, children }) {
  return (
    <fieldset className="mt-8 first:mt-0">
      <legend className="mb-4 text-lg font-semibold">{title}</legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
