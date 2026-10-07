import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { personal } from '../data/config.js';
import { activeSocials, cvAction } from '../utils/content.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useScrolled } from '../hooks/useScrolled.js';
import { trackEvent } from '../utils/analytics.js';

export default function Navbar({ items }) {
  const ids = items.map((i) => i.id);
  const active = useActiveSection(ids);
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });
  const linkRefs = useRef({});
  const listRef = useRef(null);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const cv = cvAction();
  const socials = activeSocials(['github', 'linkedin']);

  // Sliding active-section indicator (desktop)
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active];
      if (!el || !listRef.current) return setIndicator((s) => ({ ...s, visible: false }));
      setIndicator({ x: el.offsetLeft, w: el.offsetWidth, visible: true });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  // Mobile menu: scroll lock, Escape to close, focus management
  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('menu-open');
    const first = panelRef.current?.querySelector('a, button');
    first?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a, button');
        const list = [toggleRef.current, ...f];
        const i = list.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          list[list.length - 1].focus();
        } else if (!e.shiftKey && i === list.length - 1) {
          e.preventDefault();
          list[0].focus();
        }
      }
    };
    const onResize = () => window.innerWidth > 960 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__progress" aria-hidden="true" />
      <div className="container nav__inner">
        <a href="#home" className="nav__brand" aria-label={`${personal.name} — back to top`} onClick={close}>
          <span className="nav__mark" aria-hidden="true">
            {personal.initials}
          </span>
          <span className="nav__name">{personal.name}</span>
        </a>

        <nav className="nav__primary" aria-label="Primary">
          <div className="nav__track" ref={listRef}>
          <span
            className="nav__indicator"
            aria-hidden="true"
            style={{ transform: `translateX(${indicator.x}px)`, width: indicator.w, opacity: indicator.visible ? 1 : 0 }}
          />
          <ul className="nav__list" role="list">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  ref={(el) => (linkRefs.current[item.id] = el)}
                  href={`#${item.id}`}
                  className={`nav__link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          </div>
        </nav>

        <div className="nav__actions">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              className="nav__icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (opens in a new tab)`}
            >
              <Icon name={s.icon} size={18} />
            </a>
          ))}
          <a
            href={cv.href}
            className="btn btn--secondary btn--sm nav__cv"
            {...(cv.download ? { download: cv.download } : {})}
            onClick={() => trackEvent(cv.available ? 'cv_download' : 'cv_request', { location: 'navbar' })}
          >
            <Icon name={cv.icon} size={16} className="btn__icon" />
            <span className="btn__label">{cv.available ? 'CV' : 'Request CV'}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__panel" ref={panelRef} hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="nav__mobile-list" role="list">
            {items.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a
                  href={`#${item.id}`}
                  className={`nav__mobile-link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={close}
                >
                  <span className="nav__mobile-index">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__mobile-footer">
          <a href={cv.href} className="btn btn--primary" {...(cv.download ? { download: cv.download } : {})} onClick={close}>
            <Icon name={cv.icon} size={18} className="btn__icon" />
            <span className="btn__label">{cv.label}</span>
          </a>
          <div className="nav__mobile-socials">
            {activeSocials(['github', 'linkedin', 'email', 'youtube']).map((s) => (
              <a
                key={s.id}
                href={s.url}
                className="nav__icon"
                aria-label={s.label}
                {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
