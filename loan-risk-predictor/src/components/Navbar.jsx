import { useEffect, useState } from "react";
import { checkServer } from "../services/api";

export default function Navbar() {
  const [online, setOnline] = useState(null);
  useEffect(() => { checkServer().then(setOnline); }, []);
  const links = [["Home", "#top"], ["Predict", "#predict"], ["How It Works", "#how"], ["Model", "#model"]];
  return (
    <header className="sticky top-0 z-20 px-3 pt-3">
      <nav aria-label="Main" className="clay mx-auto flex max-w-6xl items-center justify-between gap-3 !rounded-2xl px-4 py-3">
        <a href="#top" className="flex items-center gap-2 font-extrabold">
          <span className="clay-inset flex h-9 w-9 items-center justify-center text-accent" aria-hidden="true">◆</span>
          <span className="hidden sm:inline">Loan Risk Predictor</span>
        </a>
        <ul className="hidden gap-6 text-sm text-muted md:flex">
          {links.map(([label, href]) => (
            <li key={href}><a href={href} className="transition hover:text-white focus-visible:text-white">{label}</a></li>
          ))}
        </ul>
        <div className="clay-inset flex items-center gap-2 px-3 py-1.5 text-xs text-muted" role="status">
          <span className={`h-2 w-2 rounded-full ${online === false ? "bg-bad" : "bg-good"}`} aria-hidden="true" />
          {online === false ? "ML Model Offline" : "ML Model Online"}
        </div>
      </nav>
    </header>
  );
}
