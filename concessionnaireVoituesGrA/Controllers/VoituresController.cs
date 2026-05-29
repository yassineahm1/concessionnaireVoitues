using concessionnaireVoituesGrA.Models;
using concessionnaireVoituesGrA.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace concessionnaireVoituesGrA.Controllers
{
    public class VoituresController : Controller
    {
        InterfaceVoitures service;
        public VoituresController(InterfaceVoitures service)
        {
            this.service = service;
        }
        // GET: VoituresController
        public ActionResult Index()
        {
            return View(service.GetAllVoitures());
        }
        [Authorize(Roles = "Admin,Client")]
        // GET: VoituresController/Details/5
        public ActionResult Details(string id) //id=matricule
        {
            VoitureDto v=service.GetVoiture(id);
            return View(v);
        }
        [Authorize(Roles = "Admin")]
        // GET: VoituresController/Create
        public ActionResult Create()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        // POST: VoituresController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection, VoitureDto voitureDto)
        {
            try
            {
                bool res=service.AjouterVoiture(voitureDto);
                if (res)
                    return RedirectToAction(nameof(Index));
                else
                {
                    ViewBag.ErrorMessage = "Matricule existe déjà";
                    return View(voitureDto);
                }
            }
            catch
            {
                return View();
            }
        }
        [Authorize(Roles = "Admin")]
        // GET: VoituresController/Edit/5
        public ActionResult Edit(string id)
        {
            VoitureDto v = service.GetVoiture(id);
            return View(v);
        }
        [Authorize(Roles = "Admin")]
        // POST: VoituresController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(string id, IFormCollection collection, VoitureDto voitureDto)
        {
            try
            {
                service.ModifierVoiture(id, voitureDto);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        [Authorize(Roles = "Admin")]
        // GET: VoituresController/Delete/5
        public ActionResult Delete(string id)
        {

            VoitureDto v = service.GetVoiture(id);
            return View(v);
        }
        [Authorize(Roles = "Admin")]
        // POST: VoituresController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(string id, IFormCollection collection)
        {
            try
            {
                service.SupprimerVoiture(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
