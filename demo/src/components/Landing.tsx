interface LandingProps {
  onEnter(): void;
}

export default function Landing({ onEnter }: LandingProps) {
  return (
    <section className="landing screen-enter" aria-labelledby="landing-title">
      <div className="edge-label edge-label--top-left">LL // 26.04.01</div>
      <div className="edge-label edge-label--top-right">
        <span className="live-dot" />
        State feed // live
      </div>
      <div className="landing__content">
        <p className="eyebrow">An interactive incident simulator</p>
        <h1 id="landing-title" className="display-title">
          <span>Leonida</span>
          <span>Life</span>
        </h1>
        <p className="landing__tagline">
          Create the chaos.
          <br />
          Watch Leonida react.
        </p>
        <p className="landing__supporting-copy">
          One photo. One bad decision. An entire state reacts.
        </p>
        <button className="primary-cta" type="button" onClick={onEnter}>
          <span>Enter Leonida</span>
          <span className="primary-cta__arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </div>
      <div className="landing__footer" aria-label="Experience details">
        <span>Interactive experience</span>
        <span>Built with React Image Editor</span>
        <span>Channel 06 // Open</span>
      </div>
    </section>
  );
}
