import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services } from '../data/config.js';

export default function WhatIDo({ index }) {
  if (!services.length) return null;
  return (
    <Section id="services" className="services">
      <SectionHeader
        index={index}
        eyebrow="What I Do"
        title="Software, end to end"
        lead="Web development is one part of it — I work across programming, data and problem solving."
        id="services-title"
      />
      <ul className="services__grid" role="list">
        {services.map((s, i) => (
          <ServiceCard key={s.title} {...s} index={i + 1} delay={i * 70} />
        ))}
      </ul>
    </Section>
  );
}
