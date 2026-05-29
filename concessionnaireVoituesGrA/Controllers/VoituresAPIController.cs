using concessionnaireVoituesGrA.Models;
using concessionnaireVoituesGrA.Services;
using Microsoft.AspNetCore.Mvc;

namespace concessionnaireVoituesGrA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoituresAPIController : ControllerBase
    {
        InterfaceVoitures service;

        public VoituresAPIController(InterfaceVoitures service)
        {
            this.service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(service.GetAllVoitures());
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var voiture = service.GetVoiture(id);
            if (voiture == null)
            {
                return NotFound("Voiture not found!");
            }
            return Ok(voiture);
        }

        [HttpPost]
        public IActionResult Post(VoitureDto model)
        {
            if (!service.AjouterVoiture(model))
            {
                return BadRequest("Matricule existe déjà");
            }
            return Ok();
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody] VoitureDto model)
        {
            service.ModifierVoiture(id, model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (!service.SupprimerVoiture(id))
            {
                return NotFound("Voiture not found!");
            }
            return Ok();
        }
    }
}
