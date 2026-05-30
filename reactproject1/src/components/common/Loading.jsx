export default function Loading({ label = 'Chargement…' }) {
  return (
    <div className="app-loading" role="status" aria-live="polite">
      <div className="app-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
