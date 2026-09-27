import type { EvidenceMetadata, Scenario } from '../types/app';

interface EvidenceLockedProps {
  caseId: string;
  scenario: Scenario;
  image: string;
  sourceMetadata: EvidenceMetadata | null;
  onEditAgain(): void;
  onNewImage(): void;
  onBack(): void;
  onPublish(): void;
}

export default function EvidenceLocked({
  caseId,
  scenario,
  image,
  sourceMetadata,
  onEditAgain,
  onNewImage,
  onBack,
  onPublish,
}: EvidenceLockedProps) {
  return (
    <section
      className="locked-screen screen-enter"
      aria-labelledby="locked-title"
    >
      <header className="screen-header">
        <span className="wordmark">
          Leonida Life<span aria-hidden="true">.</span>
        </span>
        <p className="screen-header__status">
          <span className="live-dot" />
          Evidence vault // sealed
        </p>
      </header>
      <div className="locked-screen__content">
        <div className="locked-screen__intro">
          <p className="eyebrow">Evidence vault</p>
          <h1 id="locked-title">Evidence locked</h1>
          <p>
            Your altered evidence is secured and ready for the Leonida network.
          </p>
          <dl className="locked-meta">
            <div>
              <dt>Case</dt>
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
              <dt>Status</dt>
              <dd>Ready to publish</dd>
            </div>
          </dl>
        </div>
        <figure className="locked-image">
          <img src={image} alt={`Edited evidence for ${scenario.title}`} />
          <figcaption>
            {sourceMetadata?.name ?? 'Edited local evidence'}{' '}
            <span aria-hidden="true">//</span> Edited in Evidence Lab
          </figcaption>
        </figure>
      </div>
      <div className="locked-actions">
        <button
          className="primary-cta primary-cta--compact"
          type="button"
          onClick={onPublish}
        >
          <span>Publish to Leonida</span>
          <span className="primary-cta__arrow" aria-hidden="true">
            ↗
          </span>
        </button>
        <span className="phase-boundary">
          Leonida Reaction Network // ready
        </span>
        <button
          className="secondary-button"
          type="button"
          onClick={onEditAgain}
        >
          Edit again
        </button>
        <button className="secondary-button" type="button" onClick={onNewImage}>
          New image
        </button>
        <button className="text-button" type="button" onClick={onBack}>
          Back to incidents
        </button>
      </div>
    </section>
  );
}
