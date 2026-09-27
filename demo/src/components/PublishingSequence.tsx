import { useEffect, useState } from 'react';

interface PublishingSequenceProps {
  onComplete(): void;
}

const steps = [
  'Uploading evidence...',
  'Post live.',
  'Engagement spike detected.',
  'Local feeds picking up signal.',
  'Authorities notified.',
];

export default function PublishingSequence({
  onComplete,
}: PublishingSequenceProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const delay = reducedMotion ? 180 : 560;
    if (activeStep === steps.length - 1) {
      const finish = window.setTimeout(onComplete, delay);
      return () => window.clearTimeout(finish);
    }
    const timer = window.setTimeout(
      () => setActiveStep((step) => step + 1),
      delay
    );
    return () => window.clearTimeout(timer);
  }, [activeStep, onComplete]);

  return (
    <section
      className="publishing-screen screen-enter"
      aria-labelledby="publishing-title"
    >
      <div className="publishing-screen__signal" aria-hidden="true" />
      <div className="publishing-screen__content">
        <p className="eyebrow">Leonida network // distribution</p>
        <h1 id="publishing-title">Publishing evidence</h1>
        <ol className="publishing-steps" aria-live="polite">
          {steps.map((step, index) => (
            <li key={step} className={index <= activeStep ? 'is-active' : ''}>
              <span>{index < activeStep ? '✓' : `0${index + 1}`}</span>
              {step}
            </li>
          ))}
        </ol>
        <button className="secondary-button" type="button" onClick={onComplete}>
          Continue to live feed
        </button>
      </div>
    </section>
  );
}
