import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Icon from '../components/Icon.jsx';
import { has } from '../utils/content.js';

/**
 * Generic list section for Certifications, Achievements and Articles.
 * Renders nothing while `items` is empty.
 * item: { title, issuer?, date?, description?, url?, credentialId? }
 */
export default function CardListSection({ id, index, eyebrow, title, lead, items, icon = 'award', linkLabel = 'View' }) {
  if (!has(items)) return null;
  return (
    <Section id={id} className="cardlist">
      <SectionHeader index={index} eyebrow={eyebrow} title={title} lead={lead} id={`${id}-title`} />
      <ul className="cardlist__grid" role="list">
        {items.map((it, i) => (
          <li key={it.title} className="cardlist__item card" data-reveal data-spotlight style={{ '--d': `${i * 60}ms` }}>
            <span className="service__icon">
              <Icon name={icon} size={20} />
            </span>
            <div>
              <h3 className="cardlist__title">{it.title}</h3>
              {(has(it.issuer) || has(it.date)) && (
                <p className="cardlist__meta">{[it.issuer, it.date].filter(has).join(' · ')}</p>
              )}
              {has(it.description) && <p className="cardlist__text">{it.description}</p>}
              {has(it.credentialId) && <p className="cardlist__meta">Credential ID: {it.credentialId}</p>}
              {has(it.url) && (
                <a className="link-arrow" href={it.url} target="_blank" rel="noopener noreferrer">
                  {linkLabel} <Icon name="arrowUpRight" size={14} />
                  <span className="sr-only"> {it.title} (opens in a new tab)</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
