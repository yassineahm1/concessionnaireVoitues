import { useEffect, useState } from 'react'

const emptyForm = {
  matricule: '',
  marque: '',
  modele: '',
  annee: '',
  prixLocation: '',
}

/**
 * Formulaire voiture — aligné sur Voitures/Create.cshtml et Edit.cshtml.
 */
function VoitureForm({ defaultValues, onSubmit, submitLabel, matriculeReadOnly = false }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (defaultValues) {
      setForm({
        matricule: defaultValues.matricule ?? '',
        marque: defaultValues.marque ?? '',
        modele: defaultValues.modele ?? '',
        annee: defaultValues.annee ?? '',
        prixLocation: defaultValues.prixLocation ?? '',
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
        matricule: form.matricule,
        marque: form.marque,
        modele: form.modele,
        annee: Number(form.annee),
        prixLocation: Number(form.prixLocation),
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
        <label htmlFor="matricule">Matricule</label>
        <input
          id="matricule"
          name="matricule"
          value={form.matricule}
          onChange={handleChange}
          readOnly={matriculeReadOnly}
          required
        />
      </div>
      <div className="app-form-group">
        <label htmlFor="marque">Marque</label>
        <input id="marque" name="marque" value={form.marque} onChange={handleChange} required />
      </div>
      <div className="app-form-group">
        <label htmlFor="modele">Modele</label>
        <input id="modele" name="modele" value={form.modele} onChange={handleChange} required />
      </div>
      <div className="app-form-group">
        <label htmlFor="annee">Annee</label>
        <input
          id="annee"
          name="annee"
          type="number"
          value={form.annee}
          onChange={handleChange}
          required
        />
      </div>
      <div className="app-form-group">
        <label htmlFor="prixLocation">PrixLocation</label>
        <input
          id="prixLocation"
          name="prixLocation"
          type="number"
          step="0.01"
          value={form.prixLocation}
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

export default VoitureForm
