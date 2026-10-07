/** Semantic section wrapper with consistent spacing and an accessible label. */
export default function Section({ id, className = '', children, labelledBy }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={labelledBy || `${id}-title`}>
      <div className="container">{children}</div>
    </section>
  );
}
