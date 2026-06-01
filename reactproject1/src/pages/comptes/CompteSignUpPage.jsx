import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/common/ErrorMessage';
import { register } from '../../services/comptesService';

function CompteSignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await register({ username, password });
      navigate('/comptes/signin');
    } catch (err) {
      setError(err.message ?? 'Une erreur est survenue.');
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1>Inscription</h1>
        <p className="auth-card-sub">Créez votre compte client pour accéder au catalogue</p>
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
              autoComplete="new-password"
              required
            />
          </div>
          <div className="app-form-group">
            <button type="submit" className="app-btn app-btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? 'Création…' : 'Créer mon compte'}
            </button>
          </div>
        </form>
        <div className="app-actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Déjà inscrit ? <Link to="/comptes/signin">Se connecter</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompteSignUpPage;
