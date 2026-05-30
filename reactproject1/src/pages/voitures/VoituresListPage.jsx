import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VoitureCatalog from '../../components/voitures/VoitureCatalog';
import VoitureTable from '../../components/voitures/VoitureTable';
import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getAllVoitures } from '../../services/voituresService';
import { useAuth } from '../../context/AuthContext';

function VoituresListPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const isClient = user?.role === 'Client';
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllVoitures();
        if (!cancelled) {
          setVoitures(data ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger les voitures.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const subtitle = isAdmin
    ? 'Gérez l’inventaire et présentez votre flotte aux clients.'
    : isClient
      ? 'Parcourez notre sélection et consultez les détails de chaque véhicule.'
      : 'Découvrez notre flotte — connectez-vous pour réserver et gérer votre profil.';

  return (
    <section>
      <div className="app-hero">
        <div className="app-hero-content">
          <h1>Notre catalogue</h1>
          <p>{subtitle}</p>
          <div className="app-hero-actions">
            {!user && (
              <Link to="/comptes/signin" className="app-btn app-btn-hero">
                Se connecter
              </Link>
            )}
            {isClient && user?.hasProfile === false && (
              <Link to="/profil" className="app-btn app-btn-hero-outline">
                Compléter mon profil
              </Link>
            )}
            {isAdmin && (
              <Link to="/voitures/new" className="app-btn app-btn-hero">
                Ajouter un véhicule
              </Link>
            )}
          </div>
        </div>
      </div>

      {loading && <Loading label="Chargement du catalogue…" />}
      <ErrorMessage message={error} />

      {!loading && !error && (
        <>
          <VoitureCatalog voitures={voitures} showAdminActions={isAdmin} />

          {isAdmin && voitures.length > 0 && (
            <>
              <h2 className="app-section-title">Vue administrateur</h2>
              <p className="page-header-subtitle" style={{ marginBottom: '1rem' }}>
                Tableau de gestion rapide — actions CRUD complètes.
              </p>
              <div className="table-wrapper">
                <VoitureTable voitures={voitures} />
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default VoituresListPage;
