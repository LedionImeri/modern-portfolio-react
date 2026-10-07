import Icon from './Icon.jsx';

export default function ServiceCard({ title, description, icon, index, delay = 0 }) {
  return (
    <li className="service card" data-reveal data-spotlight style={{ '--d': `${delay}ms` }}>
      <div className="service__top">
        <span className="service__icon">
          <Icon name={icon} size={22} />
        </span>
        <span className="service__index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <h3 className="service__title">{title}</h3>
      <p className="service__text">{description}</p>
    </li>
  );
}
