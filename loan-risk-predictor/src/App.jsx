import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LoanForm from "./components/LoanForm";
import PredictionResult from "./components/PredictionResult";
import HowItWorks from "./components/HowItWorks";
import ModelInfo from "./components/ModelInfo";
import Architecture from "./components/Architecture";
import Footer from "./components/Footer";

export default function App() {
  const [result, setResult] = useState(null);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="predict" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
          <LoanForm onResult={setResult} />
          {result && <PredictionResult result={result} />}
        </section>
        <HowItWorks />
        <ModelInfo />
        <Architecture />
      </main>
      <Footer />
    </>
  );
}
