using concessionnaireVoituesGrA.Models;

namespace concessionnaireVoituesGrA.Services
{
    //service pour faire les tests:
    public class ServiceComptesV0 : InterfaceComptes
    {
        static List<CompteDto> comptes = new List<CompteDto>();
        public bool Authentifier(CompteDto compte)
        {
            return comptes.Exists(c => (c.Username == compte.Username && c.Password == compte.Password));
        }

        public void Creer(CompteDto compte)
        {
            comptes.Add(compte);
        }

        public List<CompteDto> GetComptes()
        {
            return comptes;
        }

        public bool Modifier(string username, CompteDto compte)
        {
            throw new NotImplementedException();
        }

        public CompteDto Rechercher(string username)
        {
            throw new NotImplementedException();
        }
    }
}
