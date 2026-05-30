import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ClientDetailsDisplay from '../../components/clients/ClientDetailsDisplay'
import ClientForm from '../../components/clients/ClientForm'
import Loading from '../../components/common/Loading'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getMonProfil, updateClient } from '../../services/clientsService'
import { lierClient } from '../../services/comptesService'

/**
 * Espace Profil Personnel — permet au client connecté de gérer ses propres informations.
 */
function ClientProfilePage() {
  const { user, setHasProfile } = useAuth()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!user || user.hasProfile === false) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const data = await getMonProfil()
        if (!cancelled) {
          setClient(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger votre profil.')
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
  }, [user?.hasProfile])

  async function handleCreateProfile(clientDto) {
    setError(null)
    try {
      await lierClient(clientDto)
      setHasProfile(true)
      setClient(clientDto)
    } catch (err) {
      setError(err.message ?? 'Une erreur est survenue lors de la création du profil.')
      throw err
    }
  }

  async function handleUpdateProfile(clientDto) {
    setError(null)
    try {
      await updateClient(client.cine, clientDto)
      setClient(clientDto)
      setIsEditing(false)
    } catch (err) {
      setError(err.message ?? 'Une erreur est survenue lors de la mise à jour.')
      throw err
    }
  }

  if (loading) {
    return (
      <section>
        <h1>Mon Profil</h1>
        <Loading />
      </section>
    )
  }

  const hasProfileCreated = Boolean(client)

  return (
    <section>
      <h1>{hasProfileCreated ? 'Mon Profil Personnel' : 'Créer mon Profil'}</h1>
      <ErrorMessage message={error} />

      {!hasProfileCreated ? (
        <>
          <h4>Remplissez vos coordonnées pour activer votre compte client</h4>
          <hr />
          <ClientForm onSubmit={handleCreateProfile} submitLabel="Activer mon Profil" />
        </>
      ) : isEditing ? (
        <>
          <h4>Modifier mes informations</h4>
          <hr />
          <ClientForm
            defaultValues={client}
            onSubmit={handleUpdateProfile}
            submitLabel="Enregistrer les modifications"
            cineReadOnly={true}
          />
          <div className="app-actions">
            <button
              type="button"
              className="app-btn"
              onClick={() => setIsEditing(false)}
              style={{ marginTop: '1rem' }}
            >
              Annuler
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>Mes informations personnelles</h4>
          <hr />
          <ClientDetailsDisplay client={client} />
          <div className="app-actions" style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              className="app-btn app-btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Modifier mon Profil
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default ClientProfilePage
