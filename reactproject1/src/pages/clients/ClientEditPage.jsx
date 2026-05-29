import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ClientForm from '../../components/clients/ClientForm'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getClient, updateClient } from '../../services/clientsService'

/**
 * Modification d'un client — équivalent de Clients/Edit (MVC).
 */
function ClientEditPage() {
  const { cine } = useParams()
  const navigate = useNavigate()
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

  async function handleSubmit(clientDto) {
    await updateClient(cine, clientDto)
    navigate('/clients')
  }

  return (
    <section>
      <h1>Edit</h1>

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && !error && client && (
        <>
          <h4>ClientDto</h4>
          <hr />
          <ClientForm
            defaultValues={client}
            onSubmit={handleSubmit}
            submitLabel="Save"
            cineReadOnly
          />
          <div className="app-actions">
            <Link to="/clients">Back to List</Link>
          </div>
        </>
      )}
    </section>
  )
}

export default ClientEditPage
