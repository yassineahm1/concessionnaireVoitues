import { useState } from 'react';
import { Link } from 'react-router-dom';
import { downloadFacture } from '../../services/locationsService';

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 2,
  }).format(n);
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function LocationCard({ location, onCancel, showClient = false, cancelling = false }) {
  const isPast = new Date(location.dateFin + 'T23:59:59') < new Date();
  const [downloading, setDownloading] = useState(false);
  const [dlError, setDlError] = useState(null);

  async function handleDownloadFacture() {
    setDownloading(true);
    setDlError(null);
    try {
      await downloadFacture(location.id);
    } catch (err) {
      setDlError(err.message ?? 'Impossible de télécharger la facture.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <article className={`reservation-card${isPast ? ' reservation-card--past' : ''}`}>
      <div className="reservation-card-header">
        <div>
          <h3 className="reservation-card-title">
            {location.marque} {location.modele}
          </h3>
          <p className="reservation-card-matricule">Matricule · {location.matricule}</p>
        </div>
        <span className={`app-badge ${isPast ? 'app-badge--guest' : 'app-badge--client'}`}>
          {isPast ? 'Terminée' : 'À venir'}
        </span>
      </div>

      {showClient && (location.clientNom || location.clientPrenom) && (
        <p className="reservation-card-client">
          Client · {location.clientPrenom} {location.clientNom}
        </p>
      )}

      <dl className="reservation-card-dates">
        <div>
          <dt>Début</dt>
          <dd>{formatDate(location.dateDebut)}</dd>
        </div>
        <div>
          <dt>Fin</dt>
          <dd>{formatDate(location.dateFin)}</dd>
        </div>
        <div>
          <dt>Durée</dt>
          <dd>
            {location.nombreJours} jour{location.nombreJours > 1 ? 's' : ''}
          </dd>
        </div>
      </dl>

      <p className="catalog-price reservation-card-price">{formatPrice(location.prixTotal)}</p>

      {dlError && (
        <p style={{ color: 'var(--color-error, #ef4444)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
          {dlError}
        </p>
      )}

      <div className="reservation-card-actions">
        <Link to={`/voitures/${encodeURIComponent(location.matricule)}`}>Voir le véhicule</Link>

        {/* Bouton téléchargement facture PDF — visible pour toutes les réservations */}
        <button
          type="button"
          className="app-link-btn"
          onClick={handleDownloadFacture}
          disabled={downloading}
          title="Télécharger la facture PDF"
        >
          {downloading ? 'Génération…' : '⬇ Facture PDF'}
        </button>

        {onCancel && !isPast && (
          <button
            type="button"
            className="app-link-btn app-link-btn--danger"
            onClick={() => onCancel(location.id)}
            disabled={cancelling}
          >
            {cancelling ? 'Annulation…' : 'Annuler la réservation'}
          </button>
        )}
      </div>
    </article>
  );
}
