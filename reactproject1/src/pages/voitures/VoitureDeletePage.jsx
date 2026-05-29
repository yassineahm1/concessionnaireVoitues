import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VoitureDetailsDisplay from '../../components/voitures/VoitureDetailsDisplay'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { deleteVoiture, getVoiture } from '../../services/voituresService'

function VoitureDeletePage() {
  const { matricule } = useParams()
  const navigate = useNavigate()
  const [voiture, setVoiture] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

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

  async function handleDelete(event) {
    event.preventDefault()
    setDeleting(true)
    setError(null)
    try {
      await deleteVoiture(matricule)
      navigate('/voitures')
    } catch (err) {
      setError(err.message ?? 'Impossible de supprimer la voiture.')
      setDeleting(false)
    }
  }

  return (
    <section>
      <h1>Delete</h1>

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && voiture && (
        <>
          <h3>Are you sure you want to delete this?</h3>
          <div>
            <h4>VoitureDto</h4>
            <hr />
            <VoitureDetailsDisplay voiture={voiture} />
            <form className="app-form" onSubmit={handleDelete}>
              <button type="submit" className="app-btn app-btn-danger" disabled={deleting}>
                {deleting ? '...' : 'Delete'}
              </button>
              {' | '}
              <Link to="/voitures">Back to List</Link>
            </form>
          </div>
        </>
      )}
    </section>
  )
}

export default VoitureDeletePage
