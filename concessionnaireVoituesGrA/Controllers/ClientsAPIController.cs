using concessionnaireVoituesGrA.Models;
using concessionnaireVoituesGrA.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace concessionnaireVoituesGrA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsAPIController : ControllerBase
    {
        InterfaceClients service;
        public ClientsAPIController(InterfaceClients service) //DI
        { this.service = service; }


        // GET: api/<ClientsAPIController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(service.GetAllClients());
        }

        [HttpPut("mon-profil")]
        [Authorize]
        public IActionResult PutMonProfil(ClientDto model, [FromServices] InterfaceComptes comptesService)
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized();
            }
            var idClient = comptesService.GetIdClient(username);
            if (!idClient.HasValue || idClient.Value <= 0)
            {
                return BadRequest("No profile linked to this account.");
            }
            if (!service.ModifierById(idClient.Value, model))
            {
                return BadRequest("Profile update failed.");
            }
            var updated = service.GetClientById(idClient.Value);
            return Ok(updated);
        }

        [HttpGet("mon-profil")]
        [Authorize]
        public IActionResult MonProfil([FromServices] InterfaceComptes comptesService)
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized();
            }
            var idClient = comptesService.GetIdClient(username);
            if (!idClient.HasValue || idClient.Value <= 0)
            {
                return NotFound("No profile linked to this account.");
            }
            var client = service.GetClientById(idClient.Value);
            if (client == null)
            {
                return NotFound("Client profile not found.");
            }
            return Ok(client);
        }

        // GET api/<ClientsAPIController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var client = service.GetClient(id);
            if (client == null)
            {
                return NotFound("Client not found!");
            }
            return Ok(client)   ;
        }

        // POST api/<ClientsAPIController>
        [HttpPost]  
        public void Post(ClientDto model)
        {
            service.Ajouter(model);
        }

        // PUT api/<ClientsAPIController>/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] ClientDto model)
        {
            service.Modifier(id, model);
        }

        // DELETE api/<ClientsAPIController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            service.Supprimer(id);
        }
    }
}
