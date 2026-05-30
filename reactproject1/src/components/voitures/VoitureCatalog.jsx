import { useMemo, useState } from 'react';
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

export default function VoitureCatalog({ voitures, showAdminActions = false }) {
  const [sortBy, setSortBy] = useState('marque-asc');
  const [filterMarque, setFilterMarque] = useState('');

  const marques = useMemo(() => {
    const set = new Set(voitures.map((v) => v.marque).filter(Boolean));
    return [...set].sort((a, b) => a.localeCompare(b, 'fr'));
  }, [voitures]);

  const filtered = useMemo(() => {
    let list = [...voitures];
    if (filterMarque) {
      list = list.filter((v) => v.marque === filterMarque);
    }
    list.sort((a, b) => {
      switch (sortBy) {
        case 'prix-asc':
          return (Number(a.prixLocation) || 0) - (Number(b.prixLocation) || 0);
        case 'prix-desc':
          return (Number(b.prixLocation) || 0) - (Number(a.prixLocation) || 0);
        case 'marque-desc':
          return (b.marque || '').localeCompare(a.marque || '', 'fr');
        case 'marque-asc':
        default:
          return (a.marque || '').localeCompare(b.marque || '', 'fr');
      }
    });
    return list;
  }, [voitures, sortBy, filterMarque]);

  if (voitures.length === 0) {
    return <p className="app-message">Aucun véhicule au catalogue pour le moment.</p>;
  }

  return (
    <>
      <div className="catalog-toolbar">
        <label>
          Marque
          <select value={filterMarque} onChange={(e) => setFilterMarque(e.target.value)}>
            <option value="">Toutes les marques</option>
            {marques.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label>
          Trier par
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="marque-asc">Marque (A → Z)</option>
            <option value="marque-desc">Marque (Z → A)</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>
        </label>
      </div>

      <p className="app-message" style={{ textAlign: 'left', padding: '0 0 1rem', fontSize: '0.9rem' }}>
        {filtered.length} véhicule{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
      </p>

      <div className="catalog-grid">
        {filtered.map((v) => (
          <article key={v.matricule} className="catalog-card">
            <div className="catalog-card-visual">
              <span className="catalog-card-brand">{v.marque}</span>
            </div>
            <div className="catalog-card-body">
              <p className="catalog-card-model">{v.modele}</p>
              <p className="catalog-price">
                {formatPrice(v.prixLocation)}
                <span> / jour</span>
              </p>
              <p className="catalog-meta">Matricule · {v.matricule}</p>
              <div className="catalog-card-actions">
                <Link to={`/voitures/${encodeURIComponent(v.matricule)}`}>Voir la fiche</Link>
                {showAdminActions && (
                  <>
                    <Link to={`/voitures/${encodeURIComponent(v.matricule)}/edit`}>Modifier</Link>
                    <Link to={`/voitures/${encodeURIComponent(v.matricule)}/delete`}>Supprimer</Link>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
