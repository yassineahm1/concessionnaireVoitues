import { Link } from 'react-router-dom'
import AdminOnly from '../../components/comptes/AdminOnly'
import CompteDetailsDisplay from '../../components/comptes/CompteDetailsDisplay'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useCompteFromRoute } from '../../hooks/useCompteFromRoute'

/**
 * Détails compte — équivalent de Comptes/Details (MVC), Admin uniquement.
 */
function CompteDetailsPage() {
  const { compte, loading, error } = useCompteFromRoute()

  return (
    <AdminOnly>
      <section>
        <h1>Details</h1>

        {loading && <Loading />}
        <ErrorMessage message={error} />

        {!loading && !error && compte && (
          <>
            <h4>CompteDto</h4>
            <hr />
            <CompteDetailsDisplay compte={compte} />
            <div className="app-actions">
              <Link to={`/comptes/${encodeURIComponent(compte.username)}/edit`} state={{ compte }}>
                Edit
              </Link>
              {' | '}
              <Link to="/comptes">Back to List</Link>
            </div>
          </>
        )}
      </section>
    </AdminOnly>
  )
}

export default CompteDetailsPage
