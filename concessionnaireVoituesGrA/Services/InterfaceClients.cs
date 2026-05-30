using concessionnaireVoituesGrA.Models;

namespace concessionnaireVoituesGrA.Services
{
    public interface InterfaceClients
    {
        void Ajouter(ClientDto clientDto);
        int AjouterEtRetournerId(ClientDto clientDto);
        bool Modifier(string cine, ClientDto clientDto);
        bool Supprimer(string cine);
        ClientDto GetClient(string cine);
        List<ClientDto> GetAllClients();
        int? GetClientIdByCine(string cine);
        ClientDto GetClientById(int id);
    }
}
