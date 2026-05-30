import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VoitureTable from '../../components/voitures/VoitureTable'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getAllVoitures } from '../../services/voituresService'
import { useAuth } from '../../context/AuthContext'

/**
 * Liste des voitures — équivalent de Voitures/Index (MVC).
 */
function VoituresListPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'Admin'
  const [voitures, setVoitures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllVoitures()
        if (!cancelled) {
          setVoitures(data ?? [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger les voitures.')
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
  }, [])

  return (
    <section>
      <h1>Index</h1>

      {isAdmin && (
        <p>
          <Link to="/voitures/new">Create New</Link>
        </p>
      )}

      {loading && <Loading />}
      <ErrorMessage message={error} />
      {!loading && !error && <VoitureTable voitures={voitures} />}
    </section>
  )
}

export default VoituresListPage
