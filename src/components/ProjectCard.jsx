import Button from './Button.jsx';
import Tag from './Tag.jsx';
import Icon from './Icon.jsx';
import ProjectPreview from './ProjectPreview.jsx';
import { has } from '../utils/content.js';
import { trackEvent } from '../utils/analytics.js';

/** Buttons are generated only for links that exist. */
const LINKS = [
  { key: 'live', label: 'Live Demo', icon: 'arrowUpRight', variant: 'primary' },
  { key: 'youtube', label: 'Watch Demo', icon: 'play', variant: 'primary' },
  { key: 'github', label: 'GitHub', icon: 'github', variant: 'secondary' },
  { key: 'docs', label: 'Project Reference', icon: 'file', variant: 'ghost' },
];

export default function ProjectCard({ project, layout = 'featured' }) {
  const { id, title, featured, badge, summary, description, highlights, tech, links = {} } = project;
  const buttons = LINKS.filter((l) => has(links[l.key]));
  // Only one primary button: the first available gets primary, the rest secondary.
  let primaryUsed = false;

  return (
    <article className={`project project--${layout} card`} data-reveal data-spotlight aria-labelledby={`project-${id}`}>
      <div className="project__media">
        <ProjectPreview project={project} />
      </div>

      <div className="project__body">
        <div className="project__badges">
          {featured && (
            <Tag tone="accent">
              <Icon name="sparkles" size={12} /> Featured
            </Tag>
          )}
          {has(badge) && <Tag>{badge}</Tag>}
        </div>

        <h3 className="project__title" id={`project-${id}`}>
          {title}
        </h3>
        <p className="project__summary">{summary}</p>
        {has(description) && <p className="project__text">{description}</p>}

        {has(highlights) && (
          <ul className="project__highlights" role="list">
            {highlights.map((h) => (
              <li key={h}>
                <Icon name="check" size={16} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {has(tech) && (
          <ul className="tags" role="list" aria-label={`Technologies used in ${title}`}>
            {tech.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        )}

        {buttons.length > 0 && (
          <div className="project__actions">
            {buttons.map((b) => {
              let variant = b.variant;
              if (variant === 'primary') {
                variant = primaryUsed ? 'secondary' : 'primary';
                primaryUsed = true;
              }
              return (
                <Button
                  key={b.key}
                  href={links[b.key]}
                  variant={variant}
                  size="sm"
                  icon={b.icon}
                  iconPosition="start"
                  aria-label={`${b.label}: ${title} (opens in a new tab)`}
                  onClick={() => trackEvent('project_link', { project: id, link: b.key })}
                >
                  {b.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
