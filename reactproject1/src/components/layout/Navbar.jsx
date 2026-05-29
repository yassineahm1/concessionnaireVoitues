import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../services/comptesService'

/**
 * Barre de navigation — alignée sur Views/Shared/_Layout.cshtml.
 */
function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut(event) {
    event.preventDefault()
    try {
      await signOut()
    } catch {
      // déconnexion locale même si l'API échoue
    }
    logout()
    navigate('/clients')
  }

  return (
    <nav className="app-navbar">
      <span className="app-brand">concessionnaireVoituesGrA</span>
      <ul className="app-nav-links">
        <li>
          <NavLink
            to="/clients"
            className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
          >
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/voitures"
            className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
          >
            Voitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/comptes"
            className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
          >
            Comptes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/comptes/signup"
            className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
          >
            Signup
          </NavLink>
        </li>
        {!isAuthenticated && (
          <li>
            <NavLink
              to="/comptes/signin"
              className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
            >
              Signin
            </NavLink>
          </li>
        )}
        <li>
          <button type="button" className="app-nav-link" onClick={handleSignOut}>
            SignOut
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
