import Icon from '../components/Icon.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { personal } from '../data/config.js';

export default function Footer({ items }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="nav__brand" aria-label="Back to top">
              <span className="nav__mark" aria-hidden="true">
                {personal.initials}
              </span>
              <span className="nav__name">{personal.name}</span>
            </a>
            <p className="footer__tagline">{personal.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer__nav" role="list">
              {items.map((i) => (
                <li key={i.id}>
                  <a href={`#${i.id}`}>{i.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks ids={['github', 'linkedin', 'email', 'youtube']} />
        </div>
        <div className="footer__bottom">
          <p>
            © {year} {personal.name}. All rights reserved.
          </p>
          <a href="#home" className="footer__top-link">
            Back to top <Icon name="arrowUp" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
