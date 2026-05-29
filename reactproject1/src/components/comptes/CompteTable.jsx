import { Link } from 'react-router-dom'

/**
 * Tableau des comptes — aligné sur Views/Comptes/Index.cshtml.
 * Les actions Edit | Details | Delete sont affichées uniquement pour Admin.
 */
function CompteTable({ comptes, showActions = false }) {
  if (!comptes || comptes.length === 0) {
    return <p className="app-message">Aucun compte.</p>
  }

  return (
    <table className="app-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          {showActions && <th></th>}
        </tr>
      </thead>
      <tbody>
        {comptes.map((compte) => (
          <tr key={compte.username}>
            <td>{compte.username}</td>
            <td>{compte.password}</td>
            {showActions && (
              <td className="app-table-actions">
                <Link
                  to={`/comptes/${encodeURIComponent(compte.username)}/edit`}
                  state={{ compte }}
                >
                  Edit
                </Link>
                {' | '}
                <Link
                  to={`/comptes/${encodeURIComponent(compte.username)}`}
                  state={{ compte }}
                >
                  Details
                </Link>
                {' | '}
                <Link
                  to={`/comptes/${encodeURIComponent(compte.username)}/delete`}
                  state={{ compte }}
                >
                  Delete
                </Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CompteTable
