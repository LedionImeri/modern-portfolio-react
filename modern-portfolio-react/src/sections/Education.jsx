import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import TimelineItem from '../components/TimelineItem.jsx';
import { education } from '../data/config.js';

export default function Education({ index }) {
  if (!education.length) return null;
  return (
    <Section id="education" className="education">
      <SectionHeader index={index} eyebrow="Education" title="Academic path" lead="Computer Science at AAB College — from professional programming to a broader master’s focus." id="education-title" />
      <ol className="timeline" role="list">
        {education.map((e, i) => (
          <TimelineItem
            key={e.degree}
            delay={i * 110}
            item={{
              title: e.field,
              subtitle: e.degree,
              org: e.institution,
              status: e.status,
              current: e.current,
              period: e.period,
              description: e.description,
              icon: e.current ? 'book' : 'graduation',
            }}
          />
        ))}
      </ol>
    </Section>
  );
}
