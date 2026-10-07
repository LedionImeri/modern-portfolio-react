import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects } from '../data/config.js';
import { activeSocials } from '../utils/content.js';
import Button from '../components/Button.jsx';

export default function Projects({ index }) {
  if (!projects.length) return null;
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const github = activeSocials(['github'])[0];

  return (
    <Section id="projects" className="projects">
      <SectionHeader
        index={index}
        eyebrow="Projects"
        title="Selected work"
        lead="Real projects built end to end — from database design to the interface."
        id="projects-title"
      />
      <div className="projects__featured">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} layout="featured" />
        ))}
      </div>
      {others.length > 0 && (
        <div className="projects__grid">
          {others.map((p) => (
            <ProjectCard key={p.id} project={p} layout="compact" />
          ))}
        </div>
      )}
      {github && (
        <div className="projects__more" data-reveal>
          <p>More code and experiments on GitHub.</p>
          <Button href={github.url} variant="ghost" size="sm" icon="github" iconPosition="start">
            View GitHub profile
          </Button>
        </div>
      )}
    </Section>
  );
}
