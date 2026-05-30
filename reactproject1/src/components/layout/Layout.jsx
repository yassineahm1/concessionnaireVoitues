import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  const year = new Date().getFullYear();

  return (
    <div className="app-layout">
      <header>
        <Navbar />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="app-footer-inner">
          <span>
            &copy; {year} Concessionnaire Voitures GrA
          </span>
          <span>Excellence automobile · Location & gestion</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
