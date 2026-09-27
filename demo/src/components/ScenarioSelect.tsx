import type { Scenario } from '../types/app';

interface ScenarioSelectProps {
  scenarios: Scenario[];
  selectedScenarioId: string | null;
  onSelect(scenario: Scenario): void;
  onContinue(): void;
}

export default function ScenarioSelect({
  scenarios,
  selectedScenarioId,
  onSelect,
  onContinue,
}: ScenarioSelectProps) {
  const selectedScenario = scenarios.find(
    (scenario) => scenario.id === selectedScenarioId
  );
  return (
    <section
      className="scenario-screen screen-enter"
      aria-labelledby="scenario-title"
    >
      <header className="screen-header">
        <span className="wordmark">
          Leonida Life<span aria-hidden="true">.</span>
        </span>
        <p className="screen-header__status">
          <span className="live-dot" />
          Incident archive // open
        </p>
      </header>
      <div className="scenario-screen__intro">
        <p className="eyebrow">Select an incident file</p>
        <h1 id="scenario-title">How does tonight go wrong?</h1>
        <p>Pick the incident. We&apos;ll handle the consequences.</p>
      </div>
      <div className="scenario-grid" aria-label="Available incidents">
        {scenarios.map((scenario) => {
          const isSelected = scenario.id === selectedScenarioId;
          return (
            <button
              className={`scenario-card scenario-card--${scenario.accent}${isSelected ? ' is-selected' : ''}`}
              type="button"
              aria-pressed={isSelected}
              key={scenario.id}
              onClick={() => onSelect(scenario)}
            >
              <span className="scenario-card__topline">
                <span>Incident {scenario.number}</span>
                <span>{isSelected ? 'Selected' : 'Unconfirmed'}</span>
              </span>
              <span
                className={`scenario-symbol scenario-symbol--${scenario.category}`}
                aria-hidden="true"
              >
                <span />
              </span>
              <span className="scenario-card__title">{scenario.title}</span>
              <span className="scenario-card__description">
                {scenario.description}
              </span>
              <span className="scenario-card__meta">
                <span>
                  <b>District</b>
                  {scenario.location}
                </span>
                <span>
                  <b>Risk</b>
                  {scenario.risk}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="scenario-action-bar">
        <p aria-live="polite">
          {selectedScenario
            ? `Incident ${selectedScenario.number}: ${selectedScenario.title} selected.`
            : 'Choose an incident to begin the evidence intake.'}
        </p>
        <button
          className="primary-cta primary-cta--compact"
          type="button"
          disabled={!selectedScenario}
          onClick={onContinue}
        >
          <span>Create the evidence</span>
          <span className="primary-cta__arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </div>
    </section>
  );
}
