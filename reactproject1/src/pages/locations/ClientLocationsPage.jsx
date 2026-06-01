import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import LocationCard from '../../components/locations/LocationCard';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { cancelLocation, getLocations } from '../../services/locationsService';
import { useAuth } from '../../context/AuthContext';

function ClientLocationsPage() {
  const { user } = useAuth();
  const routeLocation = useLocation();
  const justReserved = routeLocation.state?.reserved === true;
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLocations();
      setLocations(data ?? []);
    } catch (err) {
      setError(err.message ?? 'Impossible de charger vos réservations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCancel(id) {
    if (!window.confirm('Annuler cette réservation ?')) return;
    setCancellingId(id);
    setError(null);
    try {
      await cancelLocation(id);
      setLocations((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      setError(err.message ?? "Impossible d'annuler la réservation.");
    } finally {
      setCancellingId(null);
    }
  }

  if (user?.hasProfile === false) {
    return (
      <section>
        <PageHeader
          title="Mes réservations"
          subtitle="Complétez votre profil client pour réserver un véhicule."
        />
        <div className="app-panel profile-card-highlight">
          <p style={{ marginBottom: '1rem' }}>
            Votre compte n&apos;est pas encore lié à un profil client.
          </p>
          <Link to="/profil" className="app-btn app-btn-primary">
            Créer mon profil
          </Link>
        </div>
      </section>
    );
  }

  const upcoming = locations.filter((l) => new Date(l.dateFin + 'T23:59:59') >= new Date());
  const past = locations.filter((l) => new Date(l.dateFin + 'T23:59:59') < new Date());

  return (
    <section>
      <PageHeader
        title="Mes réservations"
        subtitle="Consultez et gérez vos locations de véhicules."
      >
        <Link to="/voitures" className="app-btn app-btn-primary">
          Réserver un véhicule
        </Link>
      </PageHeader>

      {justReserved && (
        <div className="app-alert app-alert--success" role="status">
          Réservation confirmée avec succès.
        </div>
      )}

      {loading && <Loading label="Chargement de vos réservations…" />}
      <ErrorMessage message={error} />

      {!loading && !error && locations.length === 0 && (
        <div className="app-panel" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>
            Vous n&apos;avez pas encore de réservation.
          </p>
          <Link to="/voitures" className="app-btn app-btn-primary">
            Parcourir le catalogue
          </Link>
        </div>
      )}

      {!loading && !error && upcoming.length > 0 && (
        <>
          <h2 className="app-section-title">À venir ({upcoming.length})</h2>
          <div className="reservation-grid">
            {upcoming.map((loc) => (
              <LocationCard
                key={loc.id}
                location={loc}
                onCancel={handleCancel}
                cancelling={cancellingId === loc.id}
              />
            ))}
          </div>
        </>
      )}

      {!loading && !error && past.length > 0 && (
        <>
          <h2 className="app-section-title">Historique ({past.length})</h2>
          <div className="reservation-grid">
            {past.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ClientLocationsPage;
