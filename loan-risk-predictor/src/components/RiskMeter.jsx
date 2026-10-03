import { useEffect, useState } from "react";

// The dot position is the API's default_probability; the white tick is the model threshold.
export default function RiskMeter({ probability, threshold, high }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setShown(probability), 80); // animate from 0
    return () => clearTimeout(t);
  }, [probability]);
  const clamp = (v) => Math.min(Math.max(v, 0), 1) * 100;
  const color = high ? "bg-bad" : "bg-good";
  return (
    <div>
      <div className="relative py-2">
        <div className="clay-inset h-4 overflow-hidden rounded-full" role="meter" aria-label="Default probability"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(probability * 100)}>
          <div className={`h-full rounded-full opacity-60 transition-all duration-1000 ease-out ${color}`} style={{ width: `${clamp(shown)}%` }} />
        </div>
        <div className="absolute top-0 h-8 w-0.5 -translate-x-1/2 bg-white/50" style={{ left: `${clamp(threshold)}%` }} title="Model threshold" />
        <div className={`absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-surface transition-all duration-1000 ease-out ${color}`}
          style={{ left: `${clamp(shown)}%`, boxShadow: "3px 3px 8px rgba(0,0,0,.6)" }} />
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted"><span>0%</span><span>100%</span></div>
    </div>
  );
}
