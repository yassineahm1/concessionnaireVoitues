import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import LocationCard from '../../components/locations/LocationCard';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { cancelLocation, getLocations } from '../../services/locationsService';

function AdminLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getLocations();
        if (!cancelled) setLocations(data ?? []);
      } catch (err) {
        if (!cancelled) setError(err.message ?? 'Impossible de charger les réservations.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCancel(id) {
    if (!window.confirm('Supprimer cette réservation ?')) return;
    setCancellingId(id);
    try {
      await cancelLocation(id);
      setLocations((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      setError(err.message ?? 'Erreur lors de la suppression.');
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <section>
      <PageHeader
        title="Toutes les réservations"
        subtitle="Vue administrateur des locations en cours et passées."
        badge={<span className="app-badge app-badge--admin">Administration</span>}
      />

      {!loading && !error && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-card-value">{locations.length}</div>
            <div className="stat-card-label">Réservations totales</div>
          </div>
        </div>
      )}

      {loading && <Loading />}
      <ErrorMessage message={error} />

      {!loading && !error && locations.length === 0 && (
        <p className="app-message">Aucune réservation enregistrée.</p>
      )}

      {!loading && !error && locations.length > 0 && (
        <div className="reservation-grid">
          {locations.map((loc) => (
            <LocationCard
              key={loc.id}
              location={loc}
              showClient
              onCancel={handleCancel}
              cancelling={cancellingId === loc.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminLocationsPage;
