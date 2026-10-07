import Icon from './Icon.jsx';

export default function StatCard({ value, label, icon, delay = 0 }) {
  return (
    <div className="stat card" data-reveal style={{ '--d': `${delay}ms` }}>
      {icon && (
        <span className="stat__icon">
          <Icon name={icon} size={18} />
        </span>
      )}
      <p className="stat__value">{value}</p>
      <p className="stat__label">{label}</p>
    </div>
  );
}
