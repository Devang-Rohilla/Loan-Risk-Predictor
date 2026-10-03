export default function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <div className="animate-rise">
        <span className="clay-inset inline-block px-4 py-1.5 text-xs text-muted">Machine Learning • FastAPI • React</span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">Loan Risk Predictor</h1>
        <p className="mt-3 text-xl font-semibold text-accent">Machine Learning powered credit risk assessment</p>
        <p className="mt-4 max-w-md text-muted">
          Evaluate loan applications and estimate the probability of default using a trained machine learning model.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#predict" className="clay-btn">Analyze Loan Risk</a>
          <a href="#how" className="clay-btn clay-btn-soft">How It Works</a>
        </div>
      </div>

      {/* Decorative clay composition: no data is shown here. */}
      <div className="animate-rise relative mx-auto h-72 w-full max-w-md sm:h-80" aria-hidden="true">
        <div className="clay absolute left-0 top-4 flex h-52 w-52 items-center justify-center !rounded-[44px] sm:h-60 sm:w-60">
          <svg viewBox="0 0 120 120" className="h-36 w-36 sm:h-44 sm:w-44">
            <circle cx="60" cy="60" r="48" fill="none" stroke="#0D0F12" strokeWidth="14" strokeOpacity=".7" />
            <circle cx="60" cy="60" r="48" fill="none" stroke="#8B93E8" strokeWidth="14" strokeLinecap="round"
              strokeDasharray="190 302" transform="rotate(135 60 60)" />
            <circle cx="60" cy="60" r="18" fill="#20242A" />
          </svg>
        </div>
        <div className="clay absolute right-0 top-0 flex h-28 w-36 items-end gap-2 !rounded-[32px] p-5 sm:w-40">
          {[40, 65, 50, 85].map((h, i) => <span key={i} className="clay-inset w-full !rounded-lg bg-surface2" style={{ height: `${h}%` }} />)}
        </div>
        <div className="clay absolute bottom-0 right-4 grid h-36 w-44 place-items-center !rounded-[36px] sm:right-0">
          <svg viewBox="0 0 120 70" className="w-32">
            {[[10,50],[45,20],[80,45],[110,12]].map(([x, y], i, a) => (
              <g key={i}>
                {i > 0 && <line x1={a[i-1][0]} y1={a[i-1][1]} x2={x} y2={y} stroke="#8B93E8" strokeOpacity=".4" strokeWidth="2" />}
                <circle cx={x} cy={y} r="6" fill="#20242A" stroke="#8B93E8" strokeOpacity=".7" strokeWidth="2" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
