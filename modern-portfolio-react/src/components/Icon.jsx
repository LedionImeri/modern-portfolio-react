import { icons } from '../assets/icons.js';

/**
 * Inline SVG icon. Decorative by default (aria-hidden);
 * pass `title` to make it meaningful to assistive technology.
 */
export default function Icon({ name, size = 20, className = '', title, strokeWidth = 1.75 }) {
  const icon = icons[name];
  if (!icon) return null;
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: 'false' };
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill={icon.stroke ? 'none' : 'currentColor'}
      stroke={icon.stroke ? 'currentColor' : undefined}
      strokeWidth={icon.stroke ? strokeWidth : undefined}
      strokeLinecap={icon.stroke ? 'round' : undefined}
      strokeLinejoin={icon.stroke ? 'round' : undefined}
      {...a11y}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
