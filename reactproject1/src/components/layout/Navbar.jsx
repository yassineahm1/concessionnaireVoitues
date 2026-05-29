import { NavLink } from 'react-router-dom'

/**
 * Barre de navigation — Phase A : uniquement le module Clients (API REST disponible).
 * Voitures et Comptes ne sont pas affichés tant qu'il n'existe pas d'API REST.
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
      </ul>
    </nav>
  )
}

export default Navbar
