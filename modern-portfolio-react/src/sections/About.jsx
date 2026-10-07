import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import Icon from '../components/Icon.jsx';
import { personal } from '../data/config.js';
import { aboutStats, has } from '../utils/content.js';

export default function About({ index }) {
  const stats = aboutStats();
  return (
    <Section id="about" className="about">
      <div className="about__grid">
        <div>
          <SectionHeader index={index} eyebrow="About" title="Software developer in the making — building on solid foundations." id="about-title" />
          <div className="about__text" data-reveal>
            {personal.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="about__facts" role="list" data-reveal>
            <li>
              <Icon name="graduation" size={16} /> AAB College
            </li>
            <li>
              <Icon name="code" size={16} /> Full-stack web &amp; software development
            </li>
            {has(personal.location) && (
              <li>
                <Icon name="mapPin" size={16} /> {personal.location}
              </li>
            )}
          </ul>
        </div>
        <div className="about__stats">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 70} />
          ))}
        </div>
      </div>
    </Section>
  );
}
