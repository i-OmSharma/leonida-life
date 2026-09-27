import { useState } from 'react';

import type { Scenario, ScenarioReaction } from '../types/app';

interface ChaosReportProps {
  caseId: string;
  scenario: Scenario;
  reaction: ScenarioReaction;
  image: string;
  blob: Blob | null;
  generatedAt: string;
  onEditAgain(): void;
  onNewChaos(): void;
  onBackToIncident(): void;
}

const extensionFor = (blob: Blob | null) => {
  if (blob?.type === 'image/jpeg') return 'jpg';
  if (blob?.type === 'image/webp') return 'webp';
  return 'png';
};

export default function ChaosReport({
  caseId,
  scenario,
  reaction,
  image,
  blob,
  generatedAt,
  onEditAgain,
  onNewChaos,
  onBackToIncident,
}: ChaosReportProps) {
  const [feedback, setFeedback] = useState('');
  const { report, police, social } = reaction;
  const filename = `leonida-life-${caseId.toLowerCase()}.${extensionFor(blob)}`;
  const shareText = `I caused ${report.chaosScore}/100 chaos in Leonida. ${report.publicSentiment}.`;

  const downloadEvidence = () => {
    const link = document.createElement('a');
    link.download = filename;
    if (blob) {
      const url = URL.createObjectURL(blob);
      link.href = url;
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      link.href = image;
    }
    document.body.appendChild(link);
    link.click();
    link.remove();
    setFeedback('Evidence download started.');
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setFeedback('Copied to clipboard.');
    } catch (error) {
      console.warn('[leonida-life] clipboard unavailable', error);
      setFeedback('Sharing is not supported — evidence ready to download.');
    }
  };

  const shareChaos = async () => {
    if (!navigator.share) {
      await copyMessage();
      return;
    }
    try {
      const shareData: ShareData = {
        title: 'Leonida Life Chaos Report',
        text: shareText,
      };
      if (blob && typeof File !== 'undefined') {
        const file = new File([blob], filename, {
          type: blob.type || 'image/png',
        });
        if (!navigator.canShare || navigator.canShare({ files: [file] }))
          shareData.files = [file];
      }
      await navigator.share(shareData);
      setFeedback('Share sheet opened.');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setFeedback('Sharing cancelled. Evidence remains ready.');
      } else {
        console.warn('[leonida-life] share unavailable', error);
        await copyMessage();
      }
    }
  };

  return (
    <section
      className="chaos-report screen-enter"
      aria-labelledby="chaos-report-title"
    >
      <header className="chaos-report__header">
        <span className="wordmark">
          Leonida Life<span aria-hidden="true">.</span>
        </span>
        <div>
          <span>Final incident analysis</span>
          <b>Case closed / internet open</b>
        </div>
      </header>
      <div className="chaos-report__hero">
        <figure className="chaos-report__image">
          <img
            src={image}
            alt={`Final edited evidence for ${scenario.title}`}
          />
          <figcaption>
            <span>Case // {caseId}</span>
            <span>Archived // {generatedAt}</span>
          </figcaption>
        </figure>
        <div className="chaos-report__score">
          <p className="eyebrow">Final incident analysis</p>
          <h1 id="chaos-report-title">
            Chaos
            <br />
            report
          </h1>
          <div className="score-lockup">
            <span>Chaos score</span>
            <strong>
              {report.chaosScore}
              <i>/100</i>
            </strong>
            <b>
              {report.chaosScore >= 95
                ? 'Legendary'
                : report.chaosScore >= 85
                  ? 'Severe'
                  : 'Messy'}
            </b>
          </div>
          <dl>
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
              <dd>{report.finalStatus}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="chaos-outcomes">
        <div className="response-meter">
          <span>State response</span>
          <strong aria-label={`State response ${police.responseLevel} of 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <i
                className={index < police.responseLevel ? 'is-filled' : ''}
                key={index}
              />
            ))}
          </strong>
          <b>Level {police.responseLevel} / 5</b>
        </div>
        <div>
          <span>Viral reach</span>
          <strong>{social.views}</strong>
          <small>
            {social.likes} reactions // {social.reposts} reposts
          </small>
        </div>
        <div>
          <span>Units dispatched</span>
          <strong>{police.unitsDispatched}</strong>
          <small>State Incident Network</small>
        </div>
        <div>
          <span>Property damage</span>
          <strong>{report.propertyDamage}</strong>
          <small>Fictional estimate</small>
        </div>
        <div className="sentiment">
          <span>Public sentiment</span>
          <strong>“{report.publicSentiment}”</strong>
        </div>
      </div>
      <div className="chaos-report__summary">
        <p>{report.summary}</p>
        <span>Generated once for this case // {generatedAt}</span>
      </div>
      <div className="chaos-report__actions">
        <button
          className="primary-cta primary-cta--compact"
          type="button"
          onClick={downloadEvidence}
        >
          <span>Download evidence</span>
          <span className="primary-cta__arrow" aria-hidden="true">
            ↓
          </span>
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={() => void shareChaos()}
        >
          Share chaos
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick={onEditAgain}
        >
          Edit again
        </button>
        <button className="secondary-button" type="button" onClick={onNewChaos}>
          New chaos
        </button>
        <button
          className="text-button"
          type="button"
          onClick={onBackToIncident}
        >
          Back to incident file
        </button>
        <p className="chaos-feedback" aria-live="polite">
          {feedback}
        </p>
      </div>
    </section>
  );
}
