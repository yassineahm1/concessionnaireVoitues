import { Link } from 'react-router-dom'

/**
 * Tableau des clients — aligné sur Views/Clients/Index.cshtml.
 */
function ClientTable({ clients }) {
  if (!clients || clients.length === 0) {
    return <p className="app-message">Aucun client.</p>
  }

  return (
    <table className="app-table">
      <thead>
        <tr>
          <th>CINE</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Tel</th>
          <th>Adresse</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.cine}>
            <td>{client.cine}</td>
            <td>{client.nom}</td>
            <td>{client.prenom}</td>
            <td>{client.tel}</td>
            <td>{client.adresse}</td>
            <td className="app-table-actions">
              <Link to={`/clients/${encodeURIComponent(client.cine)}/edit`}>Modifier</Link>
              {' · '}
              <Link to={`/clients/${encodeURIComponent(client.cine)}`}>Détails</Link>
              {' · '}
              <Link to={`/clients/${encodeURIComponent(client.cine)}/delete`}>Supprimer</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ClientTable
