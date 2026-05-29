import { Link, useNavigate } from 'react-router-dom'
import AdminOnly from '../../components/comptes/AdminOnly'
import CompteDetailsDisplay from '../../components/comptes/CompteDetailsDisplay'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useCompteFromRoute } from '../../hooks/useCompteFromRoute'

/**
 * Suppression compte — équivalent de Comptes/Delete (MVC).
 * Le backend MVC redirige sans supprimer en base (pas de DELETE dans ComptesDao).
 */
function CompteDeletePage() {
  const navigate = useNavigate()
  const { compte, loading, error } = useCompteFromRoute()

  function handleDelete(event) {
    event.preventDefault()
    navigate('/comptes')
  }

  return (
    <AdminOnly>
      <section>
        <h1>Delete</h1>

        {loading && <Loading />}
        <ErrorMessage message={error} />

        {!loading && compte && (
          <>
            <h3>Are you sure you want to delete this?</h3>
            <div>
              <h4>CompteDto</h4>
              <hr />
              <CompteDetailsDisplay compte={compte} />
              <form className="app-form" onSubmit={handleDelete}>
                <button type="submit" className="app-btn app-btn-danger">
                  Delete
                </button>
                {' | '}
                <Link to="/comptes">Back to List</Link>
              </form>
            </div>
          </>
        )}
      </section>
    </AdminOnly>
  )
}

export default CompteDeletePage
