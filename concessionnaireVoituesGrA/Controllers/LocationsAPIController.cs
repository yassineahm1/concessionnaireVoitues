using concessionnaireVoituesGrA.Models;
using concessionnaireVoituesGrA.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace concessionnaireVoituesGrA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LocationsAPIController : ControllerBase
    {
        private readonly InterfaceLocations locationsService;
        private readonly InterfaceComptes comptesService;

        public LocationsAPIController(InterfaceLocations locationsService, InterfaceComptes comptesService)
        {
            this.locationsService = locationsService;
            this.comptesService = comptesService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (User.IsInRole("Admin"))
            {
                return Ok(locationsService.GetAllLocations());
            }

            var idClient = GetCurrentIdClient();
            if (!idClient.HasValue)
            {
                return BadRequest("Complete your client profile before viewing reservations.");
            }

            return Ok(locationsService.GetLocationsForClient(idClient.Value));
        }

        [HttpPost]
        [Authorize(Roles = "Client")]
        public IActionResult Post([FromBody] LocationCreateDto model)
        {
            var idClient = GetCurrentIdClient();
            if (!idClient.HasValue)
            {
                return BadRequest("Complete your client profile before making a reservation.");
            }

            var created = locationsService.CreerReservation(idClient.Value, model);
            if (created == null)
            {
                return BadRequest(
                    "Reservation failed. Check dates (must be today or later), vehicle, or availability (vehicle may already be booked).");
            }

            return Ok(created);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            int? restrict = null;
            if (!User.IsInRole("Admin"))
            {
                var idClient = GetCurrentIdClient();
                if (!idClient.HasValue)
                {
                    return BadRequest("No profile linked to this account.");
                }
                restrict = idClient.Value;
            }

            if (!locationsService.Annuler(id, restrict))
            {
                return NotFound("Reservation not found or access denied.");
            }

            return Ok();
        }

        private int? GetCurrentIdClient()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return null;
            }
            return comptesService.GetIdClient(username);
        }
    }
}
