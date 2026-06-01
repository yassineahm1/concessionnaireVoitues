import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../services/comptesService';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'Admin';
  const isClient = user?.role === 'Client';
  const profilAlert = isClient && user?.hasProfile === false;

  async function handleSignOut(event) {
    event.preventDefault();
    try {
      await signOut();
    } catch {
      // déconnexion locale même si l'API échoue
    }
    logout();
    navigate('/voitures');
  }

  const roleBadgeClass = isAdmin
    ? 'app-badge app-badge--admin'
    : isClient
      ? 'app-badge app-badge--client'
      : 'app-badge app-badge--guest';

  const roleLabel = isAdmin ? 'Admin' : isClient ? 'Client' : null;

  return (
    <nav className="app-navbar" aria-label="Navigation principale">
      <Link to="/voitures" className="app-brand">
        <span className="app-brand-icon" aria-hidden="true">
          ◆
        </span>
        <span>
          Gr<span className="accent">A</span> Motors
        </span>
      </Link>
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
            Catalogue
          </NavLink>
        </li>
        {isClient && (
          <li>
            <NavLink
              to="/mes-reservations"
              className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
            >
              Mes réservations
            </NavLink>
          </li>
        )}
        {isClient && (
          <li>
            <NavLink
              to="/profil"
              className={({ isActive }) =>
                isActive
                  ? `app-nav-link active${profilAlert ? ' app-nav-link--alert' : ''}`
                  : `app-nav-link${profilAlert ? ' app-nav-link--alert' : ''}`
              }
            >
              {profilAlert ? 'Créer mon profil' : 'Mon profil'}
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink
              to="/locations"
              className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
            >
              Réservations
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
                Inscription
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comptes/signin"
                className={({ isActive }) => (isActive ? 'app-nav-link active' : 'app-nav-link')}
              >
                Connexion
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li className="app-nav-user">
            {roleLabel && <span className={roleBadgeClass}>{roleLabel}</span>}
            <button type="button" className="app-nav-link" onClick={handleSignOut}>
              Déconnexion · {user?.username}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
