import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '../../context/AuthContext';
import { authentifier, getStatut } from '../../services/comptesService';

function CompteSignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await authentifier({ username, password });
      let hasProfile = false;
      const isAdmin = username === 'Admin';
      if (!isAdmin) {
        try {
          const status = await getStatut();
          hasProfile = status.hasProfile;
        } catch {
          // ignorer
        }
      } else {
        hasProfile = true;
      }
      login(username, hasProfile);
      navigate(isAdmin ? '/clients' : '/voitures');
    } catch (err) {
      setError(err.message ?? 'Identifiants incorrects.');
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1>Connexion</h1>
        <p className="auth-card-sub">Accédez à votre espace client ou administrateur</p>
        <form className="app-form app-form-wide" onSubmit={handleSubmit}>
          <ErrorMessage message={error} />
          <div className="app-form-group">
            <label htmlFor="username">Nom d&apos;utilisateur</label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="app-form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="app-form-group">
            <button type="submit" className="app-btn app-btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? 'Connexion…' : 'Se connecter'}
            </button>
          </div>
        </form>
        <div className="app-actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Pas de compte ?{' '}
            <Link to="/comptes/signup">Créer un compte</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompteSignInPage;
