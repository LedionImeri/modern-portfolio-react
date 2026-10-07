export default function SectionHeader({ index, eyebrow, title, lead, id, align = 'left' }) {
  return (
    <header className={`section-header section-header--${align}`} data-reveal>
      <p className="eyebrow">
        {index && <span className="eyebrow__index">{index}</span>}
        {eyebrow}
      </p>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}
