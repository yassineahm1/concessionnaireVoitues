import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientTable from '../../components/clients/ClientTable';
import PageHeader from '../../components/common/PageHeader';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getAllClients } from '../../services/clientsService';

function ClientsListPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadClients() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllClients();
        if (!cancelled) {
          setClients(data ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger les clients.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadClients();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <PageHeader
        title="Gestion des clients"
        subtitle="Consultez et administrez la base clients du concessionnaire."
      >
        <Link to="/clients/new" className="app-btn app-btn-primary">
          Nouveau client
        </Link>
      </PageHeader>

      {!loading && !error && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-card-value">{clients.length}</div>
            <div className="stat-card-label">Clients enregistrés</div>
          </div>
        </div>
      )}

      {loading && <Loading label="Chargement des clients…" />}
      <ErrorMessage message={error} />
      {!loading && !error && (
        <div className="table-wrapper">
          <ClientTable clients={clients} />
        </div>
      )}
    </section>
  );
}

export default ClientsListPage;
