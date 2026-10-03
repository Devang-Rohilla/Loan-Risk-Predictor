const cards = [
  ["Machine Learning", "A trained model assesses each application."],
  ["Probability Prediction", "Returns the probability that a loan defaults."],
  ["Decision Threshold", "A configured cut-off turns the probability into High Risk or Low Risk."],
  ["FastAPI Backend", "The model runs behind a FastAPI /predict endpoint."],
];

export default function ModelInfo() {
  return (
    <section id="model" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <h2 className="mb-8 text-3xl font-extrabold">About the Model</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([title, text]) => (
          <div key={title} className="clay clay-hover p-6">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
