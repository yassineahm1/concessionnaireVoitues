import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VoitureDetailsDisplay from '../../components/voitures/VoitureDetailsDisplay'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getVoiture } from '../../services/voituresService'

function VoitureDetailsPage() {
  const { matricule } = useParams()
  const [voiture, setVoiture] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getVoiture(matricule)
        if (!cancelled) {
          setVoiture(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger la voiture.')
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
  }, [matricule])

  return (
    <section>
      <h1>Details</h1>

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && !error && voiture && (
        <>
          <h4>VoitureDto</h4>
          <hr />
          <VoitureDetailsDisplay voiture={voiture} />
          <div className="app-actions">
            <Link to={`/voitures/${encodeURIComponent(voiture.matricule)}/edit`}>Edit</Link>
            {' | '}
            <Link to="/voitures">Back to List</Link>
          </div>
        </>
      )}
    </section>
  )
}

export default VoitureDetailsPage
