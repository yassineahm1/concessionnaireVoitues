using concessionnaireVoituesGrA.Domains;
using concessionnaireVoituesGrA.Models;
using concessionnaireVoituesGrA.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace concessionnaireVoituesGrA.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ComptesController : Controller
    {
        InterfaceComptes service;
        public ComptesController(InterfaceComptes service)
        {
            this.service = service;
        }

        // GET: ComptesController      
        public ActionResult Index()
        {
            return View(service.GetComptes());
        }

        // GET: ComptesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }
        [AllowAnonymous]
        // GET: ComptesController/Create
        public ActionResult Authentifier()
        {
            return View();
        }
        [AllowAnonymous]
        // POST: ComptesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Authentifier(IFormCollection collection, CompteDto model)
        {
            try
            {
                if (service.Authentifier(model))
                {
                    Claim claim1 = new Claim(ClaimTypes.Name, model.Username);
                    Claim claim2 = new Claim(ClaimTypes.Role, (model.Username == "Admin") ? "Admin" : "Client");
                    var claims = new List<Claim> { claim1, claim2 };
                    ClaimsIdentity identity = new ClaimsIdentity(claims, "Cookies");
                    HttpContext.SignInAsync(new ClaimsPrincipal(identity));
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.MessageErreur = "Invalid username or password.";
                    return View();
                }
            }
            catch
            {
                return View();
            }
        }
        [AllowAnonymous]
        public ActionResult SignOut()
        {
            HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
        [AllowAnonymous]
        // GET: ComptesController/Create
        public ActionResult Create()
        {
            return View();
        }
        [AllowAnonymous]
        // POST: ComptesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection, CompteDto model)
        {
            try
            {
                if(model.Username == "Admin")
                {
                    ViewBag.MessageErreur = "Username 'Admin' is reserved.";
                    return View();
                }
                service.Creer(model);
                return RedirectToAction(nameof(Index),"Home");
            }
            catch
            {
                return View();
            }
        }

        // GET: ComptesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ComptesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ComptesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ComptesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
