using concessionnaireVoituesGrA.Data;
using concessionnaireVoituesGrA.Domains;
using concessionnaireVoituesGrA.Models;
using concessionnaireVoituesGrA.Entities;

namespace concessionnaireVoituesGrA.Services
{
    public class GestionComptes : InterfaceComptes
    {
        ComptesDao dao;
        public GestionComptes(ComptesDao dao)
        {
            this.dao = dao;
        }

        public bool Authentifier(CompteDto compte)
        {
           Compte c=new Compte();
            AutoMapping<CompteDto, Compte>.Map(compte, c);
            return dao.Authentifier(c);
        }

        public void Creer(CompteDto compte)
        {
            Compte c=new Compte();
            AutoMapping<CompteDto, Compte>.Map(compte, c);
            c.Role="Client";
            dao.Ajouter(c);
        }

        public List<CompteDto> GetComptes()
        {
           List<Compte> liste1=  dao.GetAllComptes();
              List<CompteDto> liste2=new List<CompteDto>();
                foreach (var item in liste1)
                {
                 CompteDto compteDto = new CompteDto();
                 AutoMapping<Compte,CompteDto>.Map(item, compteDto);
                 liste2.Add(compteDto);
                }
                return liste2;
        }

        public bool Modifier(string username, CompteDto compte)
        {
            throw new NotImplementedException();
        }

        public CompteDto Rechercher(string username)
        {
            throw new NotImplementedException();
        }

        public int? GetIdClient(string username)
        {
            CompteEntity entity = dao.GetCompteEntity(username);
            if (entity == null || entity.IdClient <= 0)
            {
                return null;
            }
            return entity.IdClient;
        }

        public void LierClient(string username, int idClient)
        {
            dao.UpdateIdClient(username, idClient);
        }
    }
}
