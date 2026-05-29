/**
 * Affichage d'une erreur (réseau, HTTP, etc.).
 */
function ErrorMessage({ message }) {
  if (!message) {
    return null
  }
  return <p className="app-error">{message}</p>
}

export default ErrorMessage
