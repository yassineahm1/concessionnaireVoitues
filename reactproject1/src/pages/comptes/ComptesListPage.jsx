import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CompteTable from '../../components/comptes/CompteTable';
import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../context/AuthContext';
import { getComptes } from '../../services/comptesService';

function ComptesListPage() {
  const { user } = useAuth();
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getComptes();
        if (!cancelled) {
          setComptes(data ?? []);
          setShowActions(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger les comptes.');
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

  return (
    <section>
      <PageHeader
        title="Gestion des comptes"
        subtitle="Utilisateurs enregistrés sur la plateforme."
        badge={<span className="app-badge app-badge--admin">Administration</span>}
      >
        <Link to="/comptes/signup" className="app-btn app-btn-primary">
          Nouveau compte
        </Link>
      </PageHeader>

      {loading && <Loading label="Chargement des comptes…" />}
      <ErrorMessage message={error} />
      {!loading && !error && (
        <div className="table-wrapper">
          <CompteTable comptes={comptes} showActions={showActions || user?.role === 'Admin'} />
        </div>
      )}
    </section>
  );
}

export default ComptesListPage;
