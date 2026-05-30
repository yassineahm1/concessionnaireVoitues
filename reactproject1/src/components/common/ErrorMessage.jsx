export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="app-alert app-alert--error" role="alert">
      {message}
    </div>
  );
}
