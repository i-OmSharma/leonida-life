import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

import type { EvidenceMetadata, Scenario } from '../types/app';

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

interface UploadEvidenceProps {
  scenario: Scenario;
  sourceImageDataUrl: string | null;
  sourceImageMetadata: EvidenceMetadata | null;
  onEvidenceReady(dataUrl: string, metadata: EvidenceMetadata): void;
  onChooseAnother(): void;
  onEdit(): void;
  onBack(): void;
}

const formatBytes = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.ceil(bytes / 1024)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export default function UploadEvidence({
  scenario,
  sourceImageDataUrl,
  sourceImageMetadata,
  onEvidenceReady,
  onChooseAnother,
  onEdit,
  onBack,
}: UploadEvidenceProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const readTokenRef = useRef(0);
  const readerRef = useRef<FileReader | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(
    () => () => {
      readTokenRef.current++;
      readerRef.current?.abort();
    },
    []
  );

  const readFile = (file: File | undefined) => {
    if (!file) return;
    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
      setError('That is not an image file. Select a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError('That evidence file is over 20 MB. Choose a smaller image.');
      return;
    }

    const token = ++readTokenRef.current;
    readerRef.current?.abort();
    const reader = new FileReader();
    readerRef.current = reader;
    setError(null);
    reader.onload = () => {
      if (token !== readTokenRef.current || typeof reader.result !== 'string') {
        return;
      }
      onEvidenceReady(reader.result, {
        name: file.name,
        size: file.size,
        type: file.type,
      });
      if (readerRef.current === reader) readerRef.current = null;
    };
    reader.onerror = () => {
      if (token !== readTokenRef.current) return;
      console.error('[leonida-life] evidence file read failed', reader.error);
      setError('We could not read that evidence file. Try another image.');
      if (readerRef.current === reader) readerRef.current = null;
    };
    reader.readAsDataURL(file);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    readFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const discardEvidence = () => {
    readTokenRef.current++;
    readerRef.current?.abort();
    readerRef.current = null;
    setError(null);
    onChooseAnother();
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    readFile(event.dataTransfer.files?.[0]);
  };

  return (
    <section
      className="intake-screen screen-enter"
      aria-labelledby="intake-title"
    >
      <header className="screen-header">
        <span className="wordmark">
          Leonida Life<span aria-hidden="true">.</span>
        </span>
        <p className="screen-header__status">
          <span className="live-dot" />
          Evidence intake // secure
        </p>
      </header>
      <div className="intake-screen__intro">
        <p className="eyebrow">Case file // {scenario.number}</p>
        <h1 id="intake-title">Create the evidence</h1>
        <p>Every headline starts with a photo.</p>
      </div>

      <div className="intake-layout">
        <aside className="incident-brief" aria-label="Selected incident">
          <span
            className={`scenario-symbol scenario-symbol--${scenario.category}`}
            aria-hidden="true"
          >
            <span />
          </span>
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
              <dt>Risk</dt>
              <dd>{scenario.risk}</dd>
            </div>
          </dl>
        </aside>

        {sourceImageDataUrl && sourceImageMetadata ? (
          <div className="evidence-preview">
            <div className="evidence-preview__image-wrap">
              <img
                src={sourceImageDataUrl}
                alt={`Selected evidence: ${sourceImageMetadata.name}`}
              />
            </div>
            <div className="evidence-preview__details">
              <p className="eyebrow">Evidence acquired</p>
              <h2>{sourceImageMetadata.name}</h2>
              <p>
                {formatBytes(sourceImageMetadata.size)}{' '}
                <span aria-hidden="true">//</span>{' '}
                {sourceImageMetadata.type.replace('image/', '').toUpperCase()}
              </p>
            </div>
            <div className="evidence-preview__actions">
              <button
                className="primary-cta primary-cta--compact"
                type="button"
                onClick={onEdit}
              >
                <span>Edit evidence</span>
                <span className="primary-cta__arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={discardEvidence}
              >
                Choose another
              </button>
            </div>
          </div>
        ) : (
          <label
            className={`drop-zone${isDragging ? ' is-dragging' : ''}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInput}
            />
            <span className="drop-zone__mark" aria-hidden="true">
              <span>+</span>
            </span>
            <strong>Evidence intake</strong>
            <span>Drop image here</span>
            <em>or select from device</em>
            <small>
              JPG, PNG, WEBP <span aria-hidden="true">//</span> Max 20 MB
            </small>
          </label>
        )}
      </div>
      {error && (
        <p className="intake-error" role="alert">
          <b>Evidence corrupted.</b> {error}
        </p>
      )}
      <button
        className="text-button intake-screen__back"
        type="button"
        onClick={() => {
          readTokenRef.current++;
          readerRef.current?.abort();
          readerRef.current = null;
          onBack();
        }}
      >
        <span aria-hidden="true">←</span> Back to incidents
      </button>
    </section>
  );
}
