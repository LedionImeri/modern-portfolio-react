import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import TimelineItem from '../components/TimelineItem.jsx';
import { experience } from '../data/config.js';

/** Rendered only when `experience` in config.js has entries. */
export default function Experience({ index }) {
  if (!experience.length) return null;
  return (
    <Section id="experience" className="experience">
      <SectionHeader index={index} eyebrow="Experience" title="Work & internships" id="experience-title" />
      <ol className="timeline" role="list">
        {experience.map((e, i) => (
          <TimelineItem
            key={`${e.company}-${e.role}`}
            delay={i * 90}
            item={{
              title: e.role,
              subtitle: e.type,
              org: e.company,
              orgUrl: e.companyUrl,
              meta: e.location,
              period: e.period,
              current: /present/i.test(e.period || ''),
              description: e.description,
              highlights: e.highlights,
              tech: e.tech,
              icon: 'briefcase',
            }}
          />
        ))}
      </ol>
    </Section>
  );
}
