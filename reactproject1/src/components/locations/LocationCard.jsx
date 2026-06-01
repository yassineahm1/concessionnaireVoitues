import { Link } from 'react-router-dom';

function formatPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function LocationCard({ location, onCancel, showClient = false, cancelling = false }) {
  const isPast = new Date(location.dateFin + 'T23:59:59') < new Date();

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

      <div className="reservation-card-actions">
        <Link to={`/voitures/${encodeURIComponent(location.matricule)}`}>Voir le véhicule</Link>
        {onCancel && !isPast && (
          <button
            type="button"
            className="app-link-btn"
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
