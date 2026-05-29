import { NavLink } from 'react-router-dom'

/**
 * Barre de navigation — Clients et Voitures (API REST disponibles).
 * Comptes : Phase B2 (pas d'API REST pour l'instant).
 */
function Navbar() {
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
      </ul>
    </nav>
  )
}

export default Navbar
