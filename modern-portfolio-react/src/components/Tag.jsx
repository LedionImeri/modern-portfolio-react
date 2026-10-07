export default function Tag({ children, tone = 'default' }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}
