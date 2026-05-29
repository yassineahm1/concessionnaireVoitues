/**
 * Affichage lecture seule — aligné sur Comptes/Details.cshtml et Delete.cshtml.
 */
function CompteDetailsDisplay({ compte }) {
  return (
    <dl className="app-dl">
      <dt>Username</dt>
      <dd>{compte.username}</dd>
      <dt>Password</dt>
      <dd>{compte.password}</dd>
    </dl>
  )
}

export default CompteDetailsDisplay
