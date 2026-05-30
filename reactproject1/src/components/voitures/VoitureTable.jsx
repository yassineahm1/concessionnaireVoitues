import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Tableau des voitures — aligné sur Views/Voitures/Index.cshtml.
 */
function VoitureTable({ voitures }) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'Admin'

  if (!voitures || voitures.length === 0) {
    return <p className="app-message">Aucune voiture.</p>
  }

  return (
    <table className="app-table">
      <thead>
        <tr>
          <th>Matricule</th>
          <th>Marque</th>
          <th>Modele</th>
          <th>Annee</th>
          <th>PrixLocation</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {voitures.map((voiture) => (
          <tr key={voiture.matricule}>
            <td>{voiture.matricule}</td>
            <td>{voiture.marque}</td>
            <td>{voiture.modele}</td>
            <td>{voiture.annee}</td>
            <td>{voiture.prixLocation}</td>
            <td className="app-table-actions">
              {isAdmin && (
                <>
                  <Link to={`/voitures/${encodeURIComponent(voiture.matricule)}/edit`}>Edit</Link>
                  {' | '}
                </>
              )}
              <Link to={`/voitures/${encodeURIComponent(voiture.matricule)}`}>Details</Link>
              {isAdmin && (
                <>
                  {' | '}
                  <Link to={`/voitures/${encodeURIComponent(voiture.matricule)}/delete`}>Delete</Link>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default VoitureTable
