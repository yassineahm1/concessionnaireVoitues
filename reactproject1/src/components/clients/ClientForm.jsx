import { useEffect, useState } from 'react'
import ErrorMessage from '../common/ErrorMessage'

const emptyForm = {
  cine: '',
  nom: '',
  prenom: '',
  tel: '',
  adresse: '',
}

/**
 * Formulaire client — aligné sur Create.cshtml et Edit.cshtml.
 */
function ClientForm({ defaultValues, onSubmit, submitLabel, cineReadOnly = false }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (defaultValues) {
      setForm({
        cine: defaultValues.cine ?? '',
        nom: defaultValues.nom ?? '',
        prenom: defaultValues.prenom ?? '',
        tel: defaultValues.tel ?? '',
        adresse: defaultValues.adresse ?? '',
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
        cine: form.cine,
        nom: form.nom,
        prenom: form.prenom,
        tel: form.tel || null,
        adresse: form.adresse || null,
      })
    } catch (err) {
      setError(err.message ?? 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <ErrorMessage message={error} />

      <div className="app-form-group">
        <label htmlFor="cine">CINE</label>
        <input
          id="cine"
          name="cine"
          value={form.cine}
          onChange={handleChange}
          readOnly={cineReadOnly}
          required
        />
      </div>
      <div className="app-form-group">
        <label htmlFor="nom">Nom</label>
        <input id="nom" name="nom" value={form.nom} onChange={handleChange} required />
      </div>
      <div className="app-form-group">
        <label htmlFor="prenom">Prenom</label>
        <input id="prenom" name="prenom" value={form.prenom} onChange={handleChange} required />
      </div>
      <div className="app-form-group">
        <label htmlFor="tel">Tel</label>
        <input id="tel" name="tel" value={form.tel} onChange={handleChange} />
      </div>
      <div className="app-form-group">
        <label htmlFor="adresse">Adresse</label>
        <input id="adresse" name="adresse" value={form.adresse} onChange={handleChange} />
      </div>
      <div className="app-form-group">
        <button type="submit" className="app-btn app-btn-primary" disabled={submitting}>
          {submitting ? '...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ClientForm
