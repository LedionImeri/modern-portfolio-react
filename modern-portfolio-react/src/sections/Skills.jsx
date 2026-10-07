import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import TechTile from '../components/TechTile.jsx';
import Icon from '../components/Icon.jsx';
import { skillGroups } from '../data/config.js';
import { allSkills } from '../utils/content.js';

export default function Skills({ index }) {
  if (!allSkills.length) return null;
  return (
    <Section id="skills" className="skills">
      <SectionHeader
        index={index}
        eyebrow="Skills"
        title="Tech stack"
        lead="Languages, frameworks and tools I know and have worked with — across back-end, front-end and data."
        id="skills-title"
      />
      <div className="skills__groups">
        {skillGroups.map((g) =>
          g.items.length ? (
            <div className="skills__group" key={g.title} data-reveal>
              <div className="skills__group-head">
                <h3 className="skills__group-title">{g.title}</h3>
                {g.description && <p className="skills__group-desc">{g.description}</p>}
              </div>
              <ul className="skills__grid" role="list">
                {g.items.map((s, i) => (
                  <TechTile key={s.name} {...s} delay={i * 60} />
                ))}
              </ul>
            </div>
          ) : null,
        )}
      </div>

      {/* Decorative marquee of the same stack */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...allSkills, ...allSkills].map((s, i) => (
            <span className="marquee__item" key={`${s.name}-${i}`}>
              <Icon name={s.icon} size={18} /> {s.name}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
