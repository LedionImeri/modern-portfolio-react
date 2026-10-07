import Icon from './Icon.jsx';
import Tag from './Tag.jsx';
import { has } from '../utils/content.js';

/**
 * Generic timeline entry used by Education and Experience.
 * { title, subtitle, org, orgUrl, status, current, period, meta, description, highlights, tech, icon }
 */
export default function TimelineItem({ item, delay = 0 }) {
  const { title, subtitle, org, orgUrl, status, current, period, meta, description, highlights, tech, icon } = item;
  return (
    <li className={`timeline__item ${current ? 'is-current' : ''}`} data-reveal style={{ '--d': `${delay}ms` }}>
      <span className="timeline__node" aria-hidden="true">
        <Icon name={icon || 'graduation'} size={16} />
      </span>
      <article className="timeline__card card" data-spotlight>
        <div className="timeline__head">
          <div>
            {has(subtitle) && <p className="timeline__kicker">{subtitle}</p>}
            <h3 className="timeline__title">{title}</h3>
            {has(org) && (
              <p className="timeline__org">
                {has(orgUrl) ? (
                  <a href={orgUrl} target="_blank" rel="noopener noreferrer">
                    {org}
                  </a>
                ) : (
                  org
                )}
                {has(meta) && <span className="timeline__meta"> · {meta}</span>}
              </p>
            )}
          </div>
          <div className="timeline__badges">
            {has(status) && <Tag tone={current ? 'live' : 'done'}>{status}</Tag>}
            {has(period) && <span className="timeline__period">{period}</span>}
          </div>
        </div>
        {has(description) && <p className="timeline__text">{description}</p>}
        {has(highlights) && (
          <ul className="bullets" role="list">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        {has(tech) && (
          <ul className="tags" role="list" aria-label="Technologies">
            {tech.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}
