import { useState } from 'react';

import ImageEditor from '@unlayer/react-image-editor';
import type { ImageEditorSaveResult } from '@unlayer/react-image-editor';

import type { Scenario } from '../types/app';

const EDITOR_OPTIONS = { theme: 'dark' as const };

interface ChaosEditorProps {
  caseId: string;
  scenario: Scenario;
  image: string;
  onSave(result: ImageEditorSaveResult): void;
  onCancel(): void;
}

export default function ChaosEditor({
  caseId,
  scenario,
  image,
  onSave,
  onCancel,
}: ChaosEditorProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section
      className="editor-screen screen-enter"
      aria-label="Leonida Life evidence lab"
    >
      <header className="editor-bar">
        <div>
          <span className="wordmark">
            Leonida Life<span aria-hidden="true">.</span>
          </span>
          <strong>Evidence lab</strong>
        </div>
        <dl className="editor-bar__metadata">
          <div>
            <dt>Case</dt>
            <dd>{caseId}</dd>
          </div>
          <div>
            <dt>Incident</dt>
            <dd>{scenario.shortTitle}</dd>
          </div>
          <div>
            <dt>District</dt>
            <dd>{scenario.location}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Editing</dd>
          </div>
        </dl>
      </header>
      <div className="editor-context">
        <p>Alter the evidence. The state will handle the consequences.</p>
        <button className="text-button" type="button" onClick={onCancel}>
          Cancel edit
        </button>
      </div>
      <div className="editor-frame">
        {!isReady && !error && (
          <div className="editor-loading" role="status">
            <span className="loading-mark" aria-hidden="true" />
            <strong>Initializing evidence lab...</strong>
            <span>Connecting to image system.</span>
          </div>
        )}
        {error ? (
          <div className="editor-failure" role="alert">
            <p className="eyebrow">Evidence corrupted</p>
            <h1>Lab connection failed.</h1>
            <p>{error}</p>
            <button
              className="secondary-button"
              type="button"
              onClick={onCancel}
            >
              Return to evidence
            </button>
          </div>
        ) : (
          <ImageEditor
            image={image}
            options={EDITOR_OPTIONS}
            minHeight="min(72svh, 900px)"
            ariaLabel="Evidence editor"
            onLoad={() => setIsReady(true)}
            onSave={onSave}
            onCancel={onCancel}
            onLoadError={() =>
              setError(
                'We could not load this image into the evidence lab. Try another file.'
              )
            }
            onError={(editorError) => {
              console.error('[leonida-life] editor error', editorError);
              setError(
                'The image system could not start. Check your connection and try again.'
              );
            }}
          />
        )}
      </div>
    </section>
  );
}
