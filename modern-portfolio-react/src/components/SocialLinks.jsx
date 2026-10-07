import Icon from './Icon.jsx';
import { activeSocials } from '../utils/content.js';

export default function SocialLinks({ ids, className = '', size = 18 }) {
  const links = activeSocials(ids);
  if (!links.length) return null;
  return (
    <ul className={`socials ${className}`} role="list">
      {links.map((s) => {
        const ext = s.url.startsWith('http');
        return (
          <li key={s.id}>
            <a
              className="socials__link"
              href={s.url}
              aria-label={ext ? `${s.label} (opens in a new tab)` : s.label}
              {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon name={s.icon} size={size} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
