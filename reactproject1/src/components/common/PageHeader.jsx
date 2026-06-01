export default function PageHeader({ title, subtitle, children, badge }) {
  return (
    <header className="page-header">
      <div className="page-header-row">
        <div>
          {badge}
          <h1>{title}</h1>
          {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
        </div>
        {children}
      </div>
    </header>
  );
}
