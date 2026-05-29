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

        public ComptesAPIController(InterfaceComptes service)
        {
            this.service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            return Ok(service.GetComptes());
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
