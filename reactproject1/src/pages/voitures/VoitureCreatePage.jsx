import { Link, useNavigate } from 'react-router-dom'
import VoitureForm from '../../components/voitures/VoitureForm'
import { createVoiture } from '../../services/voituresService'

function VoitureCreatePage() {
  const navigate = useNavigate()

  async function handleSubmit(voitureDto) {
    await createVoiture(voitureDto)
    navigate('/voitures')
  }

  return (
    <section>
      <h1>Create</h1>
      <h4>VoitureDto</h4>
      <hr />
      <VoitureForm onSubmit={handleSubmit} submitLabel="Create" />
      <div className="app-actions">
        <Link to="/voitures">Back to List</Link>
      </div>
    </section>
  )
}

export default VoitureCreatePage
