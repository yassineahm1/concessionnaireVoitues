import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VoitureForm from '../../components/voitures/VoitureForm'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getVoiture, updateVoiture } from '../../services/voituresService'

function VoitureEditPage() {
  const { matricule } = useParams()
  const navigate = useNavigate()
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

  async function handleSubmit(voitureDto) {
    await updateVoiture(matricule, voitureDto)
    navigate('/voitures')
  }

  return (
    <section>
      <h1>Edit</h1>

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && !error && voiture && (
        <>
          <h4>VoitureDto</h4>
          <hr />
          <VoitureForm
            defaultValues={voiture}
            onSubmit={handleSubmit}
            submitLabel="Save"
            matriculeReadOnly
          />
          <div className="app-actions">
            <Link to="/voitures">Back to List</Link>
          </div>
        </>
      )}
    </section>
  )
}

export default VoitureEditPage
