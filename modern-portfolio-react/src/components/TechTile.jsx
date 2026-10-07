import Icon from './Icon.jsx';

export default function TechTile({ name, icon, color, delay = 0 }) {
  return (
    <li className="tech" style={{ '--brand': color, '--d': `${delay}ms` }} data-reveal data-spotlight>
      <span className="tech__icon">
        <Icon name={icon} size={30} />
      </span>
      <span className="tech__name">{name}</span>
    </li>
  );
}
