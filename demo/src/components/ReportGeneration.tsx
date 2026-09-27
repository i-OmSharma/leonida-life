import { useEffect, useState } from 'react';

interface ReportGenerationProps {
  onComplete(): void;
}

const steps = [
  'Compiling incident data...',
  'Measuring statewide damage...',
  'Indexing public reaction...',
  'Finalizing chaos report...',
];

export default function ReportGeneration({
  onComplete,
}: ReportGenerationProps) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const delay = reducedMotion ? 130 : 360;
    if (step === steps.length - 1) {
      const timer = window.setTimeout(onComplete, delay);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(
      () => setStep((current) => current + 1),
      delay
    );
    return () => window.clearTimeout(timer);
  }, [onComplete, step]);

  return (
    <section
      className="report-generation screen-enter"
      aria-labelledby="report-generation-title"
    >
      <div>
        <p className="eyebrow">Leonida Life // final incident analysis</p>
        <h1 id="report-generation-title">Generating report</h1>
        <ol aria-live="polite">
          {steps.map((item, index) => (
            <li className={index <= step ? 'is-active' : ''} key={item}>
              <span>{index < step ? '✓' : `0${index + 1}`}</span>
              {item}
            </li>
          ))}
        </ol>
        <button className="secondary-button" type="button" onClick={onComplete}>
          View report now
        </button>
      </div>
    </section>
  );
}
