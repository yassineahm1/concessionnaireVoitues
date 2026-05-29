/**
 * Affichage lecture seule — aligné sur Voitures/Details.cshtml et Delete.cshtml.
 */
function VoitureDetailsDisplay({ voiture }) {
  return (
    <dl className="app-dl">
      <dt>Matricule</dt>
      <dd>{voiture.matricule}</dd>
      <dt>Marque</dt>
      <dd>{voiture.marque}</dd>
      <dt>Modele</dt>
      <dd>{voiture.modele}</dd>
      <dt>Annee</dt>
      <dd>{voiture.annee}</dd>
      <dt>PrixLocation</dt>
      <dd>{voiture.prixLocation}</dd>
    </dl>
  )
}

export default VoitureDetailsDisplay
