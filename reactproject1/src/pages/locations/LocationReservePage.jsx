import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getVoiture } from '../../services/voituresService';
import { createLocation } from '../../services/locationsService';
import { useAuth } from '../../context/AuthContext';

function todayIso() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function LocationReservePage() {
  const { matricule } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [voiture, setVoiture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dateDebut, setDateDebut] = useState(todayIso());
  const [nombreJours, setNombreJours] = useState(3);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getVoiture(matricule);
        if (!cancelled) setVoiture(data);
      } catch (err) {
        if (!cancelled) setError(err.message ?? 'Véhicule introuvable.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [matricule]);

  const prixTotal = useMemo(() => {
    if (!voiture) return 0;
    return nombreJours * Number(voiture.prixLocation);
  }, [voiture, nombreJours]);

  const dateFinPreview = useMemo(() => {
    if (!dateDebut || nombreJours < 1) return '';
    const start = new Date(dateDebut + 'T12:00:00');
    const end = new Date(start);
    end.setDate(end.getDate() + nombreJours - 1);
    return end.toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
  }, [dateDebut, nombreJours]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createLocation({
        matricule,
        dateDebut,
        nombreJours,
      });
      navigate('/mes-reservations', { state: { reserved: true } });
    } catch (err) {
      setError(
        err.message ??
          'Réservation impossible. Vérifiez les dates ou la disponibilité du véhicule.',
      );
      setSubmitting(false);
    }
  }

  if (user?.hasProfile === false) {
    return (
      <section>
        <PageHeader title="Réserver" subtitle="Profil client requis." />
        <div className="app-panel profile-card-highlight">
          <p style={{ marginBottom: '1rem' }}>Créez votre profil avant de réserver.</p>
          <Link to="/profil" className="app-btn app-btn-primary">
            Créer mon profil
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      {loading && (
        <>
          <PageHeader title="Réserver un véhicule" />
          <Loading />
        </>
      )}
      <ErrorMessage message={error} />

      {!loading && voiture && (
        <>
          <PageHeader
            title={`Réserver · ${voiture.marque} ${voiture.modele}`}
            subtitle={`Matricule ${voiture.matricule}`}
          />

          <div className="profile-grid">
            <div className="app-panel">
              <p className="app-panel-title">Véhicule</p>
              <p className="catalog-price-lg">
                {formatPrice(voiture.prixLocation)}
                <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>
                  {' '}
                  / jour
                </span>
              </p>
            </div>

            <div className="app-panel profile-card-highlight">
              <p className="app-panel-title">Détails de la réservation</p>
              <form className="app-form app-form-wide" onSubmit={handleSubmit}>
                <div className="app-form-group">
                  <label htmlFor="dateDebut">Date de début</label>
                  <input
                    id="dateDebut"
                    type="date"
                    min={todayIso()}
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    required
                  />
                </div>
                <div className="app-form-group">
                  <label htmlFor="nombreJours">Nombre de jours</label>
                  <input
                    id="nombreJours"
                    type="number"
                    min="1"
                    max="90"
                    value={nombreJours}
                    onChange={(e) => setNombreJours(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    required
                  />
                </div>
                <p className="app-hint">Fin prévue le {dateFinPreview}</p>
                <p className="catalog-price" style={{ marginTop: '1rem' }}>
                  {formatPrice(prixTotal)}
                  <span> total estimé</span>
                </p>
                <div className="app-form-group" style={{ marginTop: '1.25rem' }}>
                  <button type="submit" className="app-btn app-btn-primary" disabled={submitting}>
                    {submitting ? 'Réservation…' : 'Confirmer la réservation'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="app-actions">
            <Link to={`/voitures/${encodeURIComponent(matricule)}`} className="app-btn app-btn-secondary">
              Retour à la fiche
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default LocationReservePage;
