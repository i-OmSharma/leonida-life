import type { Scenario, ScenarioReaction } from '../types/app';

interface BreakingNewsProps {
  scenario: Scenario;
  reaction: ScenarioReaction;
  image: string;
  onNext(): void;
}

export default function BreakingNews({
  scenario,
  reaction,
  image,
  onNext,
}: BreakingNewsProps) {
  const { news } = reaction;
  return (
    <section className="news-screen screen-enter" aria-labelledby="news-title">
      <header className="news-header">
        <div className="news-network">
          <b>LCN</b>
          <span>Leonida Cable Network</span>
        </div>
        <div className="news-breaking">Breaking news</div>
        <div className="news-live">
          <span className="live-dot" />
          Live
        </div>
      </header>
      <div className="news-broadcast">
        <div className="news-footage">
          <img
            src={image}
            alt={`Edited evidence shown in an LCN report about ${scenario.title}`}
          />
          <span className="news-footage__live">
            <i className="live-dot" />
            Live // {scenario.location}
          </span>
        </div>
        <div className="news-copy">
          <p>Developing story</p>
          <h1 id="news-title">{news.headline}</h1>
          <span className="news-rule" />
          <h2>{news.subheadline}</h2>
          <button
            className="primary-cta primary-cta--compact"
            type="button"
            onClick={onNext}
          >
            <span>Authorities respond</span>
            <span className="primary-cta__arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </div>
      </div>
      <div className="news-ticker" aria-label="Developing story ticker">
        <b>LCN // Developing story</b>
        <div>
          {news.ticker.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
