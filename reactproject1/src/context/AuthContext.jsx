import { createContext, useContext, useMemo, useState } from 'react'
import { getStatut } from '../services/comptesService'

const AuthContext = createContext(null)

const STORAGE_KEY = 'auth'

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * État minimal connecté / déconnecté — calqué sur les claims du MVC ComptesController.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login(username, hasProfile = false) {
        const role = username === 'Admin' ? 'Admin' : 'Client'
        const next = { username, role, hasProfile: role === 'Admin' ? true : hasProfile }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setUser(next)
      },
      logout() {
        sessionStorage.removeItem(STORAGE_KEY)
        setUser(null)
      },
      async checkProfileStatus() {
        if (!user || user.role !== 'Client') return
        try {
          const status = await getStatut()
          const next = { ...user, hasProfile: status.hasProfile }
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
          setUser(next)
        } catch {
          // ignorer en cas d'erreur
        }
      },
      setHasProfile(val) {
        if (!user) return
        const next = { ...user, hasProfile: val }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setUser(next)
      }
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth doit être utilisé dans AuthProvider')
  }
  return ctx
}
