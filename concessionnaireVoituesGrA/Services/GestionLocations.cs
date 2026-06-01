using concessionnaireVoituesGrA.Data;
using concessionnaireVoituesGrA.Entities;
using concessionnaireVoituesGrA.Models;

namespace concessionnaireVoituesGrA.Services
{
    public class GestionLocations : InterfaceLocations
    {
        private readonly LocationsDao locationsDao;
        private readonly VoituresDao voituresDao;
        private readonly ClientsDao clientsDao;

        public GestionLocations(LocationsDao locationsDao, VoituresDao voituresDao, ClientsDao clientsDao)
        {
            this.locationsDao = locationsDao;
            this.voituresDao = voituresDao;
            this.clientsDao = clientsDao;
        }

        public List<LocationDto> GetLocationsForClient(int idClient)
        {
            var entities = locationsDao.GetByClient(idClient);
            return entities.Select(e => ToDto(e, includeClient: false)).ToList();
        }

        public List<LocationDto> GetAllLocations()
        {
            var entities = locationsDao.GetAll();
            return entities.Select(e => ToDto(e, includeClient: true)).ToList();
        }

        public LocationDto? CreerReservation(int idClient, LocationCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Matricule) || dto.NombreJours < 1)
            {
                return null;
            }

            if (!DateTime.TryParse(dto.DateDebut, out DateTime dateDebut))
            {
                return null;
            }

            dateDebut = dateDebut.Date;
            if (dateDebut < DateTime.Today)
            {
                return null;
            }

            var voiture = voituresDao.GetVoiture(dto.Matricule);
            if (voiture == null)
            {
                return null;
            }

            DateTime dateFin = dateDebut.AddDays(dto.NombreJours - 1);
            if (locationsDao.ExisteChevauchement(dto.Matricule, dateDebut, dateFin))
            {
                return null;
            }

            double prixTotal = dto.NombreJours * voiture.PrixLocation;
            var entity = new LocationEntity
            {
                IdClient = idClient,
                Matricule = dto.Matricule,
                DateDebut = dateDebut,
                DateFin = dateFin,
                NombreJours = dto.NombreJours,
                PrixTotal = prixTotal
            };

            int id = locationsDao.Ajouter(entity);
            entity.Id = id;
            return ToDto(entity, includeClient: false);
        }

        public bool Annuler(int id, int? idClientRestrict)
        {
            var entity = locationsDao.GetById(id);
            if (entity == null)
            {
                return false;
            }

            if (idClientRestrict.HasValue && entity.IdClient != idClientRestrict.Value)
            {
                return false;
            }

            return locationsDao.Supprimer(id);
        }

        private LocationDto ToDto(LocationEntity entity, bool includeClient)
        {
            var voiture = voituresDao.GetVoiture(entity.Matricule);
            var dto = new LocationDto
            {
                Id = entity.Id,
                IdClient = entity.IdClient,
                Matricule = entity.Matricule,
                Marque = voiture?.Marque ?? "",
                Modele = voiture?.Modele ?? "",
                DateDebut = entity.DateDebut.ToString("yyyy-MM-dd"),
                DateFin = entity.DateFin.ToString("yyyy-MM-dd"),
                NombreJours = entity.NombreJours,
                PrixTotal = entity.PrixTotal
            };

            if (includeClient)
            {
                var client = clientsDao.GetClientById(entity.IdClient);
                if (client != null)
                {
                    dto.ClientNom = client.Nom;
                    dto.ClientPrenom = client.Prenom;
                }
            }

            return dto;
        }
    }
}
