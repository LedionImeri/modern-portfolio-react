import { useState } from 'react';
import Section from '../components/Section.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Icon from '../components/Icon.jsx';
import { personal } from '../data/config.js';
import { activeSocials } from '../utils/content.js';

export default function Contact({ index }) {
  const [copied, setCopied] = useState(false);
  const links = activeSocials();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <Section id="contact" className="contact">
      <div className="contact__grid">
        <div className="contact__info">
          <SectionHeader
            index={index}
            eyebrow="Contact"
            title="Get in touch"
            lead="Have an internship, a junior role or a project in mind? I’d be glad to hear from you."
            id="contact-title"
          />
          <ul className="contact__list" role="list" data-reveal>
            {links.map((s) => {
              const ext = s.url.startsWith('http');
              return (
                <li key={s.id} className="contact__item">
                  <a
                    href={s.url}
                    className="contact__link"
                    data-spotlight
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="contact__icon">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <span className="contact__text">
                      <span className="contact__label">{s.label}</span>
                      <span className="contact__value">{s.handle || s.url}</span>
                    </span>
                    <Icon name="arrowUpRight" size={18} className="contact__arrow" />
                    {ext && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                  {s.id === 'email' && (
                    <button type="button" className="contact__copy" onClick={copy} aria-label="Copy email address">
                      <Icon name={copied ? 'check' : 'copy'} size={16} />
                      <span className="contact__copy-tip" role="status">{copied ? 'Copied' : ''}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
