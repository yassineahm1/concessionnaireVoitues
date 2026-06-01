using concessionnaireVoituesGrA.Models;

namespace concessionnaireVoituesGrA.Services
{
    public interface InterfaceLocations
    {
        List<LocationDto> GetLocationsForClient(int idClient);
        List<LocationDto> GetAllLocations();
        LocationDto? CreerReservation(int idClient, LocationCreateDto dto);
        bool Annuler(int id, int? idClientRestrict);
    }
}
