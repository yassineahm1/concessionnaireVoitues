import { Link, useNavigate } from 'react-router-dom'
import AdminOnly from '../../components/comptes/AdminOnly'
import CompteForm from '../../components/comptes/CompteForm'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useCompteFromRoute } from '../../hooks/useCompteFromRoute'

/**
 * Édition compte — équivalent de Comptes/Edit (MVC).
 * Le backend MVC redirige sans persister (GestionComptes.Modifier non implémenté).
 */
function CompteEditPage() {
  const navigate = useNavigate()
  const { compte, loading, error } = useCompteFromRoute()

  async function handleSubmit() {
    navigate('/comptes')
  }

  return (
    <AdminOnly>
      <section>
        <h1>Edit</h1>

        {loading && <Loading />}
        <ErrorMessage message={error} />

        {!loading && !error && compte && (
          <>
            <h4>CompteDto</h4>
            <hr />
            <CompteForm
              defaultValues={compte}
              onSubmit={handleSubmit}
              submitLabel="Save"
              usernameReadOnly
            />
            <div className="app-actions">
              <Link to="/comptes">Back to List</Link>
            </div>
          </>
        )}
      </section>
    </AdminOnly>
  )
}

export default CompteEditPage
