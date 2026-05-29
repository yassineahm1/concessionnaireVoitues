import { useAuth } from '../../context/AuthContext'

/**
 * Affiche le contenu uniquement si l'utilisateur a le rôle Admin (comme ComptesController MVC).
 */
function AdminOnly({ children }) {
  const { user } = useAuth()

  if (user?.role !== 'Admin') {
    return (
      <p className="app-error">
        Accès réservé au rôle Admin. Connectez-vous avec le compte Admin.
      </p>
    )
  }

  return children
}

export default AdminOnly
