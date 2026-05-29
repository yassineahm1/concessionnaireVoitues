import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CompteTable from '../../components/comptes/CompteTable'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useAuth } from '../../context/AuthContext'
import { getComptes } from '../../services/comptesService'

/**
 * Liste des comptes — équivalent de Comptes/Index (MVC), réservé Admin.
 */
function ComptesListPage() {
  const { user } = useAuth()
  const [comptes, setComptes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getComptes()
        if (!cancelled) {
          setComptes(data ?? [])
          setShowActions(true)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger les comptes.')
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

      <p>
        <Link to="/comptes/signup">Create New</Link>
      </p>

      {loading && <Loading />}
      <ErrorMessage message={error} />
      {!loading && !error && (
        <CompteTable comptes={comptes} showActions={showActions || user?.role === 'Admin'} />
      )}
    </section>
  )
}

export default ComptesListPage
