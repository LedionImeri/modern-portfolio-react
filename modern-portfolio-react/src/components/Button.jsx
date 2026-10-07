import Icon from './Icon.jsx';

const isExternal = (href = '') => /^https?:\/\//.test(href);

/**
 * Renders a real <a> when `href` is provided, otherwise a real <button>.
 * variant: 'primary' | 'secondary' | 'ghost'   size: 'md' | 'sm'
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'end',
  className = '',
  external,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim();
  const content = (
    <>
      {icon && iconPosition === 'start' && <Icon name={icon} size={size === 'sm' ? 16 : 18} className="btn__icon" />}
      <span className="btn__label">{children}</span>
      {icon && iconPosition === 'end' && <Icon name={icon} size={size === 'sm' ? 16 : 18} className="btn__icon btn__icon--end" />}
    </>
  );

  if (href) {
    const ext = external ?? isExternal(href);
    return (
      <a href={href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
        {ext && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
