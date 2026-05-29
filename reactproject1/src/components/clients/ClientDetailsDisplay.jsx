/**
 * Affichage lecture seule — aligné sur Details.cshtml et Delete.cshtml (dl).
 */
function ClientDetailsDisplay({ client }) {
  return (
    <dl className="app-dl">
      <dt>CINE</dt>
      <dd>{client.cine}</dd>
      <dt>Nom</dt>
      <dd>{client.nom}</dd>
      <dt>Prenom</dt>
      <dd>{client.prenom}</dd>
      <dt>Tel</dt>
      <dd>{client.tel}</dd>
      <dt>Adresse</dt>
      <dd>{client.adresse}</dd>
    </dl>
  )
}

export default ClientDetailsDisplay
