import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ClientDetailsDisplay from '../../components/clients/ClientDetailsDisplay'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { deleteClient, getClient } from '../../services/clientsService'

/**
 * Suppression d'un client — équivalent de Clients/Delete (MVC).
 */
function ClientDeletePage() {
  const { cine } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getClient(cine)
        if (!cancelled) {
          setClient(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger le client.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [cine])

  async function handleDelete(event) {
    event.preventDefault()
    setDeleting(true)
    setError(null)
    try {
      await deleteClient(cine)
      navigate('/clients')
    } catch (err) {
      setError(err.message ?? 'Impossible de supprimer le client.')
      setDeleting(false)
    }
  }

  return (
    <section>
      <h1>Delete</h1>

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && client && (
        <>
          <h3>Are you sure you want to delete this?</h3>
          <div>
            <h4>ClientDto</h4>
            <hr />
            <ClientDetailsDisplay client={client} />
            <form className="app-form" onSubmit={handleDelete}>
              <button type="submit" className="app-btn app-btn-danger" disabled={deleting}>
                {deleting ? '...' : 'Delete'}
              </button>
              {' | '}
              <Link to="/clients">Back to List</Link>
            </form>
          </div>
        </>
      )}
    </section>
  )
}

export default ClientDeletePage
