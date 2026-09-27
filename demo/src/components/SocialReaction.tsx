import type { ScenarioReaction } from '../types/app';

interface SocialReactionProps {
  reaction: ScenarioReaction;
  image: string;
  onNext(): void;
}

export default function SocialReaction({
  reaction,
  image,
  onNext,
}: SocialReactionProps) {
  const { social } = reaction;
  return (
    <section
      className="social-screen screen-enter"
      aria-labelledby="social-title"
    >
      <header className="social-header">
        <h1 id="social-title">
          Leonida <span>Live</span>
        </h1>
        <p>
          <span className="live-dot" />
          Trending // local
        </p>
      </header>
      <div className="social-rail" aria-hidden="true">
        <span>Local feed // surging</span>
        <span>Post velocity // extreme</span>
      </div>
      <article className="social-post">
        <header className="social-post__profile">
          <span className="social-avatar">LL</span>
          <div>
            <strong>{social.displayName}</strong>
            <span>
              {social.handle} <i>·</i> {social.location}
            </span>
          </div>
          <span className="social-post__more" aria-hidden="true">
            •••
          </span>
        </header>
        <img
          className="social-post__image"
          src={image}
          alt={`Edited evidence shared by ${social.displayName}`}
        />
        <div className="social-post__body">
          <p className="social-post__trend">{social.trend}</p>
          <p className="social-post__caption">
            <b>{social.handle}</b> {social.caption}
          </p>
          <div
            className="social-post__engagement"
            aria-label={`${social.views} views, ${social.likes} likes, ${social.reposts} reposts`}
          >
            <span>◉ {social.views} views</span>
            <span>♥ {social.likes}</span>
            <span>↗ {social.reposts}</span>
          </div>
          <div className="social-comments">
            {social.comments.map((comment) => (
              <p key={comment.handle}>
                <b>{comment.handle}</b> {comment.text}
              </p>
            ))}
          </div>
        </div>
      </article>
      <div className="social-next">
        <span>Statewide reach // escalating</span>
        <button
          className="primary-cta primary-cta--compact"
          type="button"
          onClick={onNext}
        >
          <span>Watch the news</span>
          <span className="primary-cta__arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </div>
    </section>
  );
}
