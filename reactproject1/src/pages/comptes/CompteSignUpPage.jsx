import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/common/ErrorMessage'
import { register } from '../../services/comptesService'

/**
 * Inscription — équivalent de Comptes/Create (MVC), via CompteDto côté contrôleur.
 */
function CompteSignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await register({ username, password })
      navigate('/clients')
    } catch (err) {
      setError(err.message ?? "Une erreur est survenue.")
      setSubmitting(false)
    }
  }

  return (
    <section>
      <h1>Create</h1>
      <h4>CompteDto</h4>
      <hr />
      <form className="app-form" onSubmit={handleSubmit}>
        <ErrorMessage message={error} />
        <div className="app-form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="app-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="app-form-group">
          <button type="submit" className="app-btn app-btn-primary" disabled={submitting}>
            {submitting ? '...' : 'Create'}
          </button>
        </div>
      </form>
      <div className="app-actions">
        <Link to="/comptes">Back to List</Link>
      </div>
    </section>
  )
}

export default CompteSignUpPage
