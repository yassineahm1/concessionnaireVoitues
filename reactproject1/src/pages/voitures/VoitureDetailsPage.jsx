import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import VoitureDetailsDisplay from '../../components/voitures/VoitureDetailsDisplay';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getVoiture } from '../../services/voituresService';
import { useAuth } from '../../context/AuthContext';

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function VoitureDetailsPage() {
  const { matricule } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const isClient = user?.role === 'Client';
  const canReserve = isClient && user?.hasProfile !== false;
  const [voiture, setVoiture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jours, setJours] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getVoiture(matricule);
        if (!cancelled) {
          setVoiture(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger la voiture.');
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
  }, [matricule]);

  const prixTotal = voiture ? jours * Number(voiture.prixLocation) : 0;

  return (
    <section>
      {loading && (
        <>
          <PageHeader title="Fiche véhicule" />
          <Loading />
        </>
      )}
      <ErrorMessage message={error} />

      {!loading && !error && voiture && (
        <>
          <PageHeader
            title={`${voiture.marque} ${voiture.modele}`}
            subtitle={`Matricule ${voiture.matricule} · Année ${voiture.annee}`}
          />

          <div className="profile-grid">
            <div className="app-panel">
              <p className="app-panel-title">Caractéristiques</p>
              <VoitureDetailsDisplay voiture={voiture} />
              <p className="catalog-price-lg" style={{ marginTop: '1.25rem' }}>
                {formatPrice(voiture.prixLocation)}
                <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>
                  {' '}
                  / jour
                </span>
              </p>
            </div>

            <div className="app-panel profile-card-highlight">
              <p className="app-panel-title">Simulateur de location</p>
              <div className="app-form-group">
                <label htmlFor="jours">Nombre de jours</label>
                <input
                  id="jours"
                  type="number"
                  min="1"
                  value={jours}
                  onChange={(e) => setJours(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  style={{ maxWidth: '8rem' }}
                />
              </div>
              <p className="catalog-price" style={{ marginTop: '1rem' }}>
                {formatPrice(prixTotal)}
                <span> estimé</span>
              </p>
              <p className="catalog-meta">
                Basé sur {formatPrice(voiture.prixLocation)} par jour
              </p>
            </div>
          </div>

          <div className="app-actions">
            {canReserve && (
              <Link
                to={`/voitures/${encodeURIComponent(voiture.matricule)}/reserver`}
                className="app-btn app-btn-primary"
              >
                Réserver ce véhicule
              </Link>
            )}
            {isClient && user?.hasProfile === false && (
              <Link to="/profil" className="app-btn app-btn-primary">
                Créer mon profil pour réserver
              </Link>
            )}
            {isAdmin && (
              <Link to={`/voitures/${encodeURIComponent(voiture.matricule)}/edit`} className="app-btn app-btn-primary">
                Modifier
              </Link>
            )}
            <Link to="/voitures" className="app-btn app-btn-secondary">
              Retour au catalogue
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default VoitureDetailsPage;
