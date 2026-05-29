import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClientDetailsDisplay from '../../components/clients/ClientDetailsDisplay'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getClient } from '../../services/clientsService'

/**
 * Détails d'un client — équivalent de Clients/Details (MVC).
 */
function ClientDetailsPage() {
  const { cine } = useParams()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <section>
      <h1>Details</h1>

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && !error && client && (
        <>
          <h4>ClientDto</h4>
          <hr />
          <ClientDetailsDisplay client={client} />
          <div className="app-actions">
            <Link to={`/clients/${encodeURIComponent(client.cine)}/edit`}>Edit</Link>
            {' | '}
            <Link to="/clients">Back to List</Link>
          </div>
        </>
      )}
    </section>
  )
}

export default ClientDetailsPage
