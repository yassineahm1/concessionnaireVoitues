import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

/**
 * Enveloppe commune : navbar + contenu de la route active (Outlet).
 */
function Layout() {
  return (
    <div className="app-layout">
      <header>
        <Navbar />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <span>&copy; 2026 - concessionnaireVoituesGrA</span>
      </footer>
    </div>
  )
}

export default Layout
