/**
 * Affichage simple pendant le chargement des données API.
 */
function Loading({ message = 'Chargement...' }) {
  return <p className="app-message">{message}</p>
}

export default Loading
