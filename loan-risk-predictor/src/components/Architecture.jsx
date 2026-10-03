const flow = ["React Frontend", "Fetch API", "FastAPI", "Pydantic Validation", "Trained ML Model", "Probability", "Decision Threshold", "High Risk / Low Risk"];

export default function Architecture() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-8 text-3xl font-extrabold">Project Architecture</h2>
      <ol className="mx-auto flex max-w-sm flex-col items-center gap-2">
        {flow.map((step, i) => (
          <li key={step} className="flex w-full flex-col items-center gap-2">
            <div className="clay w-full !rounded-2xl px-5 py-3 text-center text-sm font-semibold">{step}</div>
            {i < flow.length - 1 && <span aria-hidden="true" className="text-accent">↓</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
