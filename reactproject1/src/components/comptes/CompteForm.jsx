import { useEffect, useState } from 'react'

const emptyForm = {
  username: '',
  password: '',
}

/**
 * Formulaire compte — aligné sur Comptes/Edit.cshtml.
 */
function CompteForm({ defaultValues, onSubmit, submitLabel, usernameReadOnly = false }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (defaultValues) {
      setForm({
        username: defaultValues.username ?? '',
        password: defaultValues.password ?? '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [defaultValues])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit({
        username: form.username,
        password: form.password,
      })
    } catch (err) {
      setError(err.message ?? 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      {error && <p className="app-error">{error}</p>}

      <div className="app-form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          readOnly={usernameReadOnly}
          required
        />
      </div>
      <div className="app-form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="app-form-group">
        <button type="submit" className="app-btn app-btn-primary" disabled={submitting}>
          {submitting ? '...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default CompteForm
