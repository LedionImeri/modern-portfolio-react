import { useState } from 'react';
import Icon from './Icon.jsx';
import { youtubeId } from '../utils/content.js';
import { trackEvent } from '../utils/analytics.js';

/** Illustrated fallback preview — a stylised app window, purely decorative. */
function MockWindow({ title, theme }) {
  return (
    <div className={`mock mock--${theme || 'default'}`} aria-hidden="true">
      <div className="mock__bar">
        <span />
        <span />
        <span />
        <div className="mock__url">{title.toLowerCase().replace(/\s+/g, '')}</div>
      </div>
      <div className="mock__body">
        <div className="mock__nav">
          <span className="mock__logo">{title}</span>
          <span className="mock__pill" />
          <span className="mock__pill" />
          <span className="mock__btn" />
        </div>
        <div className="mock__search">
          <span className="mock__input">
            <Icon name="target" size={12} />
          </span>
          <span className="mock__go" />
        </div>
        <div className="mock__grid">
          {[0, 1, 2, 3].map((i) => (
            <div className="mock__row" key={i} style={{ '--i': i }}>
              <span className="mock__avatar" />
              <span className="mock__lines">
                <span />
                <span />
              </span>
              <span className="mock__chip" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Project visual. Priority: first screenshot → YouTube thumbnail (click to play) → illustrated mock.
 * The YouTube player is only loaded after an explicit click (keeps the page fast & private).
 */
export default function ProjectPreview({ project }) {
  const { title, images = [], links = {}, preview = {} } = project;
  const image = images[0];
  const vid = youtubeId(links.youtube);
  const [thumbOk, setThumbOk] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  if (playing && vid) {
    return (
      <div className="preview preview--video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`}
          title={`${title} — demo video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="preview">
      <MockWindow title={title} theme={preview.theme} />
      {image && !imgFailed && (
        <img
          className="preview__img is-loaded"
          src={image.src}
          alt={image.alt || `${title} screenshot`}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      )}
      {!image && vid && (
        <img
          className={`preview__img ${thumbOk ? 'is-loaded' : ''}`}
          src={`https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={(e) => setThumbOk(e.currentTarget.naturalWidth > 120)}
          onError={() => setThumbOk(false)}
        />
      )}
      {vid && (
        <button
          type="button"
          className="preview__play"
          onClick={() => {
            setPlaying(true);
            trackEvent('project_video_play', { project: project.id });
          }}
          aria-label={`Play ${title} demo video`}
        >
          <span className="preview__play-icon">
            <Icon name="play" size={22} />
          </span>
          <span className="preview__play-label">Watch demo</span>
        </button>
      )}
    </div>
  );
}
