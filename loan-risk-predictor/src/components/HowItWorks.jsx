const icons = {
  form: "M9 3h6a2 2 0 012 2H7a2 2 0 012-2zM7 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1M8 12h8M8 16h5",
  chip: "M6 6h12v12H6zM10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  gauge: "M12 21a9 9 0 110-18 9 9 0 010 18zM12 12l4-3",
};
const steps = [
  ["form", "Enter Details", "Enter applicant, employment, loan and credit information."],
  ["chip", "ML Prediction", "The application sends the information to the FastAPI backend, where the trained ML model calculates the default probability."],
  ["gauge", "Risk Assessment", "The model's probability and configured threshold are used to return the final risk classification."],
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <h2 className="mb-8 text-3xl font-extrabold">How It Works</h2>
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map(([icon, title, text], i) => (
          <li key={title} className="clay clay-hover p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="clay-inset flex h-11 w-11 items-center justify-center text-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[icon]} /></svg>
              </span>
              <span className="text-sm font-bold text-muted">0{i + 1}</span>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
