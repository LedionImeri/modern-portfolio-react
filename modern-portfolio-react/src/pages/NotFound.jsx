import Icon from '../components/Icon.jsx';
import { personal } from '../data/config.js';

export default function NotFound() {
  const home = import.meta.env.BASE_URL || '/';
  return (
    <main className="notfound" id="main">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="orb orb--a" />
        <div className="orb orb--b" />
      </div>
      <div className="notfound__inner">
        <a href={home} className="nav__brand notfound__brand" aria-label={`${personal.name} — home`}>
          <span className="nav__mark" aria-hidden="true">
            {personal.initials}
          </span>
          <span className="nav__name">{personal.name}</span>
        </a>
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1 className="notfound__title">This page doesn’t exist.</h1>
        <p className="notfound__text">The link may be broken or the page may have moved. Let’s get you back on track.</p>
        <div className="notfound__term" aria-hidden="true">
          <span className="tk-op">$</span> cd <span className="tk-str">~/home</span>
          <span className="code__caret" />
        </div>
        <a href={home} className="btn btn--primary">
          <Icon name="house" size={18} className="btn__icon" />
          <span className="btn__label">Back Home</span>
        </a>
      </div>
    </main>
  );
}
