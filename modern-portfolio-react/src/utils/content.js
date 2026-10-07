import { personal, socials, skillGroups, leetcode } from '../data/config.js';

/** True when a value holds displayable content. */
export const has = (v) => {
  if (v == null) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'object') return Object.values(v).some(has);
  return true;
};

/** Social links that actually have a URL. */
export const activeSocials = (ids) =>
  socials.filter((s) => has(s.url) && (!ids || ids.includes(s.id)));

export const allSkills = skillGroups.flatMap((g) => g.items);

/** CV action: download when a file is configured, otherwise a pre-filled request email. */
export const cvAction = () =>
  has(personal.cv.url)
    ? { href: personal.cv.url, label: 'Download CV', download: personal.cv.fileName, icon: 'download', available: true }
    : {
        href: `mailto:${personal.email}?subject=${encodeURIComponent('CV request')}&body=${encodeURIComponent('Hi Ledion,\n\nCould you please share your CV?\n\nThank you,\n')}`,
        label: 'Request CV',
        icon: 'file',
        available: false,
      };

/** About-section statistics — only factual, derived values. */
export const aboutStats = () => {
  const count = allSkills.length;
  const solved = leetcode.stats?.solved;
  return [
    { value: 'Bachelor', label: 'Computer Science — completed', icon: 'graduation' },
    { value: 'Master', label: 'Computer Science — in progress', icon: 'book' },
    { value: count >= 10 ? `${Math.floor(count / 5) * 5}+` : String(count), label: 'Technologies used', icon: 'layers' },
    has(solved)
      ? { value: `${solved}`, label: 'LeetCode problems solved', icon: 'leetcode' }
      : { value: 'LeetCode', label: 'Regular coding practice', icon: 'leetcode' },
  ];
};

/** Extracts a YouTube video ID from common URL formats. */
export const youtubeId = (url = '') => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : '';
};
