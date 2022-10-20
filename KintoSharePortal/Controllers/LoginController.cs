using KintoSharePortal.DataAccess;
using KintoSharePortal.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace KintoSharePortal.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CheckUser(UserModel model)
        {
            try
            {
                string username = model.username;
                string password = model.password;
                string adPath = ConfigurationManager.AppSettings["AdLink"].ToString();

                LdapAuthentication adAuth = new LdapAuthentication(adPath);

                bool checkAuth = adAuth.IsAuthenticatedPost(ConfigurationManager.AppSettings["AdLink"].ToString(), model.username, model.password);
                OTPAuth genOTP = new OTPAuth();

                if (checkAuth)
                {
                    Access access = new Access();

                    bool abc = genOTP.GenOTP(ConfigurationManager.AppSettings["OTPGenLink"].ToString(), model.username, ConfigurationManager.AppSettings["appID"].ToString());
                }
                else
                {
                    return PartialView("ErrorLogin");
                }
            }
            catch (Exception ex)
            {
                return PartialView("ErrorLogin");
            }
            return PartialView("CheckUser");
        }

        [HttpPost]
        public JsonResult CheckOTP(UserModel model)
        {
            DataTable dtUsers = new DataTable();
            string username = model.username;
            string OTP = model.OTP;
            OTPAuth OtpCheck = new OTPAuth();

            Access access = new Access();
            var dtOTP = access.ReadOTP(username, OTP);
            bool checkOTP = OtpCheck.CheckOTP(ConfigurationManager.AppSettings["OTPCheck"].ToString(), model.username, ConfigurationManager.AppSettings["appID"].ToString(), OTP);

            if (checkOTP != false)
            {
                FormsAuthenticationTicket authTicket;

                authTicket = new FormsAuthenticationTicket(1,
                          username, DateTime.Now, DateTime.Now.AddMinutes(60), false, "admin");

                //Encrypt the ticket.
                string encryptedTicket = FormsAuthentication.Encrypt(authTicket);

                //Create a cookie, and then add the encrypted ticket to the cookie as data.
                HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);

                authCookie.Expires = authTicket.Expiration;

                //Add the cookie to the outgoing cookies collection.
                Response.Cookies.Add(authCookie);

                //check role
                KintoShare KS = new KintoShare();
                UserModel UM = new UserModel();
                Access Acc = new Access();

                UM.username = model.username;
                KS.ShowAllUser = Acc.ShowUser(UM);

                if (KS.ShowAllUser.Count > 0)
                    //HttpContext.Session["userRole"] = "admin";
                    HttpContext.Session["userRole"] = KS.ShowAllUser[0].role;

                else
                    HttpContext.Session["userRole"] = null;

                HttpContext.Session["userid"] = model.username;
                HttpContext.Session["username"] = KS.ShowAllUser[0].name;

                return (Json(true));
            }
            else
            {
                return (Json(false));
            }
        }

        [HttpGet]
        public ActionResult Logout()
        {
            Session.Remove("userid");
            return RedirectToAction("Index");
        }
    }
}