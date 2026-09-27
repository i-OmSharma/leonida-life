import type { Scenario, ScenarioReaction } from '../types/app';

interface PoliceEvidenceProps {
  caseId: string;
  scenario: Scenario;
  reaction: ScenarioReaction;
  image: string;
  onReport(): void;
}

export default function PoliceEvidence({
  caseId,
  scenario,
  reaction,
  image,
  onReport,
}: PoliceEvidenceProps) {
  const { police } = reaction;
  return (
    <section
      className="police-screen screen-enter"
      aria-labelledby="police-title"
    >
      <header className="police-header">
        <div>
          <p>Leonida Public Safety</p>
          <strong>State Incident Network</strong>
        </div>
        <span>
          Case escalated <i />
        </span>
      </header>
      <div className="police-screen__content">
        <div className="police-intro">
          <p className="eyebrow">Public media capture // verified</p>
          <h1 id="police-title">Incident file</h1>
          <dl className="police-meta">
            <div>
              <dt>Case ID</dt>
              <dd>{caseId}</dd>
            </div>
            <div>
              <dt>Incident</dt>
              <dd>{scenario.title}</dd>
            </div>
            <div>
              <dt>District</dt>
              <dd>{scenario.location}</dd>
            </div>
            <div>
              <dt>Classification</dt>
              <dd>{police.classification}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{police.status}</dd>
            </div>
            <div>
              <dt>Threat level</dt>
              <dd>{police.threatLevel}</dd>
            </div>
            <div>
              <dt>Units dispatched</dt>
              <dd>{police.unitsDispatched}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>Public media capture</dd>
            </div>
          </dl>
        </div>
        <figure className="police-evidence">
          <img
            src={image}
            alt={`Official evidence record for ${scenario.title}`}
          />
          <figcaption>
            <span>Evidence // 01</span>
            <span>Chain status // intact</span>
          </figcaption>
        </figure>
      </div>
      <div className="police-footer">
        <div className="response-level">
          <span>State response</span>
          <strong aria-label={`Response level ${police.responseLevel} of 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <i
                key={index}
                className={index < police.responseLevel ? 'is-filled' : ''}
              >
                ★
              </i>
            ))}
          </strong>
        </div>
        <div className="incident-flags">
          <span>Incident flags</span>
          <div>
            {police.flags.map((flag) => (
              <b key={flag}>{flag}</b>
            ))}
          </div>
        </div>
        <button
          className="primary-cta primary-cta--compact"
          type="button"
          onClick={onReport}
        >
          <span>Generate chaos report</span>
          <span className="primary-cta__arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </div>
    </section>
  );
}
