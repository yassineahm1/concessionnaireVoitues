using concessionnaireVoituesGrA.Models;
using concessionnaireVoituesGrA.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace concessionnaireVoituesGrA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComptesAPIController : ControllerBase
    {
        InterfaceComptes service;
        InterfaceClients clientsService;

        public ComptesAPIController(InterfaceComptes service, InterfaceClients clientsService)
        {
            this.service = service;
            this.clientsService = clientsService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            return Ok(service.GetComptes());
        }

        [HttpGet("statut")]
        [Authorize]
        public IActionResult GetStatut()
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized();
            }
            var idClient = service.GetIdClient(username);
            return Ok(new { hasProfile = idClient.HasValue && idClient.Value > 0, username = username });
        }

        [HttpPost("lier")]
        [Authorize]
        public IActionResult Lier(ClientDto model)
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized();
            }

            int clientId;
            var existingId = clientsService.GetClientIdByCine(model.CINE);
            if (existingId.HasValue)
            {
                clientId = existingId.Value;
            }
            else
            {
                clientId = clientsService.AjouterEtRetournerId(model);
            }

            service.LierClient(username, clientId);
            return Ok(new { hasProfile = true, username = username });
        }

        [HttpPost("authentifier")]
        [AllowAnonymous]
        public async Task<IActionResult> Authentifier(CompteDto model)
        {
            if (service.Authentifier(model))
            {
                Claim claim1 = new Claim(ClaimTypes.Name, model.Username);
                Claim claim2 = new Claim(ClaimTypes.Role, (model.Username == "Admin") ? "Admin" : "Client");
                var claims = new List<Claim> { claim1, claim2 };
                ClaimsIdentity identity = new ClaimsIdentity(claims, "Cookies");
                await HttpContext.SignInAsync(new ClaimsPrincipal(identity));
                return Ok();
            }
            return Unauthorized("Invalid username or password.");
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register(CompteDto model)
        {
            if (model.Username == "Admin")
            {
                return BadRequest("Username 'Admin' is reserved.");
            }
            service.Creer(model);
            return Ok();
        }

        [HttpPost("signout")]
        [AllowAnonymous]
        public async Task<IActionResult> Deconnecter()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }
    }
}
