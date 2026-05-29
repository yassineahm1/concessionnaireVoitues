import { Link, useNavigate } from 'react-router-dom'
import ClientForm from '../../components/clients/ClientForm'
import { createClient } from '../../services/clientsService'

/**
 * Création d'un client — équivalent de Clients/Create (MVC).
 */
function ClientCreatePage() {
  const navigate = useNavigate()

  async function handleSubmit(clientDto) {
    await createClient(clientDto)
    navigate('/clients')
  }

  return (
    <section>
      <h1>Create</h1>
      <h4>ClientDto</h4>
      <hr />
      <ClientForm onSubmit={handleSubmit} submitLabel="Create" />
      <div className="app-actions">
        <Link to="/clients">Back to List</Link>
      </div>
    </section>
  )
}

export default ClientCreatePage
