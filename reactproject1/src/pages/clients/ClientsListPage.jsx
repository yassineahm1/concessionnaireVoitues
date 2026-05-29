import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClientTable from '../../components/clients/ClientTable'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getAllClients } from '../../services/clientsService'

/**
 * Liste des clients — équivalent de Clients/Index (MVC).
 */
function ClientsListPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadClients() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllClients()
        if (!cancelled) {
          setClients(data ?? [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger les clients.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadClients()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <h1>Index</h1>

      <p>
        <Link to="/clients/new">Create New</Link>
      </p>

      {loading && <Loading />}
      <ErrorMessage message={error} />
      {!loading && !error && <ClientTable clients={clients} />}
    </section>
  )
}

export default ClientsListPage
