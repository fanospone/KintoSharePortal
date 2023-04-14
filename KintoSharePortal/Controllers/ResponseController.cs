using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KintoSharePortal.Controllers
{
    public class ResponseController : Controller
    {
        public ActionResult Error401()
        {
            return View();
        }
        public ActionResult Error403()
        {
            return View();
        }
        public ActionResult Error404()
        {
            return View();
        }
        public ActionResult Error500()
        {
            return View();
        }
    }
}