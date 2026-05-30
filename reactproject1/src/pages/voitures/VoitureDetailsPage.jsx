import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VoitureDetailsDisplay from '../../components/voitures/VoitureDetailsDisplay'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getVoiture } from '../../services/voituresService'
import { useAuth } from '../../context/AuthContext'

function VoitureDetailsPage() {
  const { matricule } = useParams()
  const { user } = useAuth()
  const isAdmin = user?.role === 'Admin'
  const [voiture, setVoiture] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [jours, setJours] = useState(1)

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

  const prixTotal = voiture ? (jours * voiture.prixLocation) : 0

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

          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '4px', maxWidth: '28rem', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 1rem', color: 'var(--text-h)' }}>Simulateur de Tarif de Location</h3>
            <div className="app-form-group">
              <label htmlFor="jours" style={{ fontWeight: '600', color: 'var(--text-h)' }}>Nombre de jours de location</label>
              <input
                id="jours"
                type="number"
                min="1"
                value={jours}
                onChange={(e) => setJours(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ maxWidth: '8rem', display: 'block', marginTop: '0.25rem' }}
              />
            </div>
            <p style={{ fontSize: '1.25rem', margin: '1rem 0 0', color: 'var(--text-h)' }}>
              Tarif estimé : <strong>{prixTotal.toFixed(2)} DH</strong> <span style={{ fontSize: '0.875rem', color: 'var(--text)', fontWeight: 'normal' }}>({voiture.prixLocation} DH / jour)</span>
            </p>
          </div>

          <div className="app-actions" style={{ marginTop: '2rem' }}>
            {isAdmin && (
              <>
                <Link to={`/voitures/${encodeURIComponent(voiture.matricule)}/edit`}>Edit</Link>
                {' | '}
              </>
            )}
            <Link to="/voitures">Back to List</Link>
          </div>
        </>
      )}
    </section>
  )
}

export default VoitureDetailsPage
