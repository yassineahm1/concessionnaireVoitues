import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../services/comptesService'

/**
 * Barre de navigation — alignée sur Views/Shared/_Layout.cshtml.
 */
function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'Admin'
  const isClient = user?.role === 'Client'

  async function handleSignOut(event) {
    event.preventDefault()
    try {
      await signOut()
    } catch {
      // déconnexion locale même si l'API échoue
    }
    logout()
    navigate('/voitures')
  }

  return (
    <nav className="app-navbar">
      <span className="app-brand">concessionnaireVoituesGrA</span>
      <ul className="app-nav-links">
        {isAdmin && (
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
            >
              Clients
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/voitures"
            className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
          >
            Voitures
          </NavLink>
        </li>
        {isClient && (
          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
              style={user?.hasProfile === false ? { color: '#e74c3c', fontWeight: 'bold' } : {}}
            >
              {user?.hasProfile === false ? 'Créer mon Profil !' : 'Mon Profil'}
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink
              to="/comptes"
              className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
            >
              Comptes
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <>
            <li>
              <NavLink
                to="/comptes/signup"
                className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comptes/signin"
                className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
              >
                Signin
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li>
            <button type="button" className="app-nav-link" onClick={handleSignOut}>
              SignOut ({user?.username})
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
