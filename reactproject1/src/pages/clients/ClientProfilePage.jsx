import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import ClientDetailsDisplay from '../../components/clients/ClientDetailsDisplay';
import ClientForm from '../../components/clients/ClientForm';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getMonProfil, updateMonProfil } from '../../services/clientsService';
import { lierClient } from '../../services/comptesService';

function ClientProfilePage() {
  const { user, setHasProfile } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!user || user.hasProfile === false) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getMonProfil();
        if (!cancelled) {
          setClient(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Impossible de charger votre profil.');
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
  }, [user?.hasProfile]);

  async function handleCreateProfile(clientDto) {
    setError(null);
    try {
      await lierClient(clientDto);
      setHasProfile(true);
      const saved = await getMonProfil();
      setClient(saved);
    } catch (err) {
      setError(err.message ?? 'Une erreur est survenue lors de la création du profil.');
      throw err;
    }
  }

  async function handleUpdateProfile(clientDto) {
    setError(null);
    try {
      const saved = await updateMonProfil({
        cine: client.cine,
        nom: clientDto.nom,
        prenom: clientDto.prenom,
        tel: clientDto.tel,
        adresse: clientDto.adresse,
      });
      setClient(saved);
      setIsEditing(false);
    } catch (err) {
      setError(err.message ?? 'Une erreur est survenue lors de la mise à jour.');
      throw err;
    }
  }

  if (loading) {
    return (
      <section>
        <PageHeader title="Mon profil" subtitle="Chargement de vos informations…" />
        <Loading />
      </section>
    );
  }

  const hasProfileCreated = Boolean(client);

  return (
    <section>
      <PageHeader
        title={hasProfileCreated ? 'Mon profil personnel' : 'Créer mon profil'}
        subtitle={
          hasProfileCreated
            ? 'Vos coordonnées sont visibles par l’administration après mise à jour.'
            : 'Complétez vos informations pour activer votre compte client.'
        }
        badge={
          user && (
            <span className="app-badge app-badge--client" style={{ marginBottom: '0.5rem' }}>
              Espace client
            </span>
          )
        }
      />
      <ErrorMessage message={error} />

      {!hasProfileCreated ? (
        <div className="app-panel profile-card-highlight">
          <p className="app-panel-title">Activation du compte</p>
          <ClientForm onSubmit={handleCreateProfile} submitLabel="Activer mon profil" />
        </div>
      ) : isEditing ? (
        <div className="app-panel">
          <p className="app-panel-title">Modifier mes informations</p>
          <ClientForm
            defaultValues={client}
            onSubmit={handleUpdateProfile}
            submitLabel="Enregistrer les modifications"
            cineReadOnly
          />
          <div className="app-actions">
            <button type="button" className="app-btn app-btn-secondary" onClick={() => setIsEditing(false)}>
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-grid">
          <div className="app-panel profile-card-highlight">
            <p className="app-panel-title">Coordonnées</p>
            <ClientDetailsDisplay client={client} />
          </div>
          <div className="app-panel">
            <p className="app-panel-title">Actions</p>
            <p style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>
              Mettez à jour votre téléphone ou adresse à tout moment. Le CINE ne peut pas être modifié.
            </p>
            <button type="button" className="app-btn app-btn-primary" onClick={() => setIsEditing(true)}>
              Modifier mon profil
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ClientProfilePage;
