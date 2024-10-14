using CTVoicer.Veiculos.Bussiness.Intefaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace CTVoicer.Veiculos.App.Controllers
{
    public class CorController : Controller
    {
        private readonly ICorService _corService;

        public CorController(ICorService corService)
        {
            _corService = corService;
        }

        public IActionResult Index()
        {            
            return View();
        }
    }
}
