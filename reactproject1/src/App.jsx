import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RequireRole from './components/auth/RequireRole';
import ClientsListPage from './pages/clients/ClientsListPage';
import ClientDetailsPage from './pages/clients/ClientDetailsPage';
import ClientCreatePage from './pages/clients/ClientCreatePage';
import ClientEditPage from './pages/clients/ClientEditPage';
import ClientDeletePage from './pages/clients/ClientDeletePage';
import ClientProfilePage from './pages/clients/ClientProfilePage';
import VoituresListPage from './pages/voitures/VoituresListPage';
import VoitureDetailsPage from './pages/voitures/VoitureDetailsPage';
import VoitureCreatePage from './pages/voitures/VoitureCreatePage';
import VoitureEditPage from './pages/voitures/VoitureEditPage';
import VoitureDeletePage from './pages/voitures/VoitureDeletePage';
import ComptesListPage from './pages/comptes/ComptesListPage';
import CompteSignInPage from './pages/comptes/CompteSignInPage';
import CompteSignUpPage from './pages/comptes/CompteSignUpPage';
import CompteDetailsPage from './pages/comptes/CompteDetailsPage';
import CompteEditPage from './pages/comptes/CompteEditPage';
import CompteDeletePage from './pages/comptes/CompteDeletePage';
import ClientLocationsPage from './pages/locations/ClientLocationsPage';
import AdminLocationsPage from './pages/locations/AdminLocationsPage';
import LocationReservePage from './pages/locations/LocationReservePage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/voitures" replace />} />
        <Route path="clients" element={<ClientsListPage />} />
        <Route path="clients/new" element={<ClientCreatePage />} />
        <Route path="clients/:cine/edit" element={<ClientEditPage />} />
        <Route path="clients/:cine/delete" element={<ClientDeletePage />} />
        <Route path="clients/:cine" element={<ClientDetailsPage />} />
        <Route
          path="profil"
          element={
            <RequireRole role="Client">
              <ClientProfilePage />
            </RequireRole>
          }
        />
        <Route path="voitures" element={<VoituresListPage />} />
        <Route path="voitures/new" element={<VoitureCreatePage />} />
        <Route path="voitures/:matricule/edit" element={<VoitureEditPage />} />
        <Route path="voitures/:matricule/delete" element={<VoitureDeletePage />} />
        <Route
          path="voitures/:matricule/reserver"
          element={
            <RequireRole role="Client">
              <LocationReservePage />
            </RequireRole>
          }
        />
        <Route path="voitures/:matricule" element={<VoitureDetailsPage />} />
        <Route
          path="mes-reservations"
          element={
            <RequireRole role="Client">
              <ClientLocationsPage />
            </RequireRole>
          }
        />
        <Route
          path="locations"
          element={
            <RequireRole role="Admin">
              <AdminLocationsPage />
            </RequireRole>
          }
        />
        <Route path="comptes" element={<ComptesListPage />} />
        <Route path="comptes/signin" element={<CompteSignInPage />} />
        <Route path="comptes/signup" element={<CompteSignUpPage />} />
        <Route path="comptes/:username/edit" element={<CompteEditPage />} />
        <Route path="comptes/:username/delete" element={<CompteDeletePage />} />
        <Route path="comptes/:username" element={<CompteDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
