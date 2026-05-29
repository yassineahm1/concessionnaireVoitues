import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getComptes } from '../services/comptesService'

/**
 * Récupère le compte depuis la navigation (state) ou la liste API (fallback).
 */
export function useCompteFromRoute() {
  const { username } = useParams()
  const location = useLocation()
  const decodedUsername = decodeURIComponent(username)
  const [compte, setCompte] = useState(location.state?.compte ?? null)
  const [loading, setLoading] = useState(!location.state?.compte)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (location.state?.compte) {
      setCompte(location.state.compte)
      setLoading(false)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const list = await getComptes()
        const found = (list ?? []).find((c) => c.username === decodedUsername)
        if (!cancelled) {
          if (found) {
            setCompte(found)
          } else {
            setError('Compte introuvable.')
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger le compte.')
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
  }, [decodedUsername, location.state?.compte])

  return { compte, loading, error, username: decodedUsername }
}
