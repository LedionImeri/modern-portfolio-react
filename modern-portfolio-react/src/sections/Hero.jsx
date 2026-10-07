import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { personal, skillGroups, education } from '../data/config.js';
import { cvAction, has } from '../utils/content.js';
import { trackEvent } from '../utils/analytics.js';

const S = ({ c, children }) => <span className={`tk-${c}`}>{children}</span>;

/** Decorative "code" card generated from the real profile data. */
function CodeWindow() {
  const stack = skillGroups.flatMap((g) => g.items.map((i) => i.name)).filter((n) => n !== 'GitHub' && n !== 'Git');
  const degrees = education.map((e) => `${e.degree.replace(/’s Degree/, '')}: ${e.current ? 'in progress' : 'completed'}`);
  const chunks = [];
  for (let i = 0; i < stack.length; i += 3) chunks.push(stack.slice(i, i + 3));
  const lines = [
    <><S c="kw">const</S> <S c="var">developer</S> <S c="op">=</S> {'{'}</>,
    <>  <S c="key">name</S>: <S c="str">"{personal.name}"</S>,</>,
    <>  <S c="key">role</S>: <S c="str">"Software Developer"</S>,</>,
    <>  <S c="key">education</S>: [</>,
    ...degrees.map((d, i) => <>    <S c="str">"{d}"</S>{i < degrees.length - 1 ? ',' : ''}</>),
    <>  ],</>,
    <>  <S c="key">stack</S>: [</>,
    ...chunks.map((row, r) => (
      <>
        {'    '}
        {row.map((s, i) => (
          <span key={s}>
            <S c="str">"{s}"</S>
            {i < row.length - 1 || r < chunks.length - 1 ? ', ' : ''}
          </span>
        ))}
      </>
    )),
    <>  ],</>,
    <>  <S c="key">focus</S>: [<S c="str">"algorithms"</S>, <S c="str">"databases"</S>, <S c="str">"web"</S>],</>,
    <>  <S c="key">learning</S>: <S c="bool">true</S>,</>,
    <>{'};'}</>,
  ];
  return (
    <div className="code" aria-hidden="true">
      <div className="code__bar">
        <span className="code__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="code__file">
          <Icon name="code" size={13} /> developer.js
        </span>
      </div>
      <pre className="code__body">
        {lines.map((l, i) => (
          <span className="code__line" key={i} style={{ '--i': i }}>
            <span className="code__ln">{i + 1}</span>
            <code>{l}</code>
          </span>
        ))}
        <span className="code__line" style={{ '--i': lines.length }}>
          <span className="code__ln">{lines.length + 1}</span>
          <code>
            <S c="var">developer</S>.<S c="fn">build</S>(<S c="str">"something great"</S>)<span className="code__caret" />
          </code>
        </span>
      </pre>
    </div>
  );
}

export default function Hero() {
  const cv = cvAction();
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="orb orb--a" />
        <div className="orb orb--b" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          {has(personal.availability) && (
            <p className="hero__status hero-in" style={{ '--d': '0ms' }}>
              <span className="pulse" aria-hidden="true" />
              {personal.availability}
            </p>
          )}

          <h1 className="hero__title hero-in" id="hero-title" style={{ '--d': '80ms' }}>
            {personal.name}
          </h1>
          <p className="hero__role hero-in" style={{ '--d': '160ms' }}>
            {personal.title}
          </p>
          <p className="hero__tagline hero-in" style={{ '--d': '240ms' }}>
            {personal.tagline}
          </p>

          <div className="hero__actions hero-in" style={{ '--d': '320ms' }}>
            <Button href="#projects" icon="arrowRight">
              View Projects
            </Button>
            <Button href="#contact" variant="secondary" icon="mail" iconPosition="start">
              Get In Touch
            </Button>
            <Button
              href={cv.href}
              variant="ghost"
              icon={cv.icon}
              iconPosition="start"
              external={false}
              {...(cv.download ? { download: cv.download } : {})}
              onClick={() => trackEvent(cv.available ? 'cv_download' : 'cv_request', { location: 'hero' })}
              title={cv.available ? undefined : 'My CV will be available here soon — request a copy by email'}
            >
              {cv.label}
            </Button>
          </div>

          <div className="hero__socials hero-in" style={{ '--d': '400ms' }}>
            <SocialLinks ids={['github', 'linkedin', 'email', 'youtube']} />
          </div>
        </div>

        <div className="hero__visual hero-in" style={{ '--d': '260ms' }}>
          <CodeWindow />
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to About section">
        <span className="hero__scroll-line" aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
