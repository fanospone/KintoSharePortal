using KintoSharePortal.DataAccess;
using KintoSharePortal.Helper;
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
        [HttpPost]
        public ActionResult Authentication(UserModel model)
        {
            try
            {

                string userName = model.username;
                string userPass = model.password;
                string adPath = ConfigurationManager.AppSettings["AdLink"].ToString();
                bool useOTP = Convert.ToBoolean(ConfigurationManager.AppSettings["UseOTP"]);

                LdapAuthentication adAuth = new LdapAuthentication(adPath);

                bool checkAuth = adAuth.IsAuthenticatedPost(adPath, model.username, model.password);
                OTPAuth genOTP = new OTPAuth();

                if (checkAuth)
                {
                    Access access = new Access();
                    var data = access.GetUserData(userName);
                    HttpContext.Session["userid"] = userName;
                    if (useOTP)
                    {
                        genOTP.GenOTP(ConfigurationManager.AppSettings["OTPGenLink"].ToString(), model.username, ConfigurationManager.AppSettings["appID"].ToString());
                        string paramEncode = HttpUtility.UrlEncode(UrlHelperExtensions.Encrypt(userName));
                        return RedirectToAction("OTP", new { userName = paramEncode });
                    }
                    else
                    {
                        if (data.Count > 0)
                        {
                            HttpContext.Session["userid"] = userName;
                            HttpContext.Session["username"] = data[0].name;
                            HttpContext.Session["userRole"] = data[0].role;
                            SetCredential(userName, data[0].role);
                            return RedirectToAction("Index", "Home");
                        }
                        else
                        {
                            HttpContext.Session["userid"] = userName;
                            HttpContext.Session["username"] = userName;
                            HttpContext.Session["userRole"] = "requestor";
                            SetCredential(userName, "requestor");
                            return RedirectToAction("Index", "Home");
                        }
                    }
                }
                else
                {
                    //return RedirectToAction("Error403", "Response");
                    return RedirectToAction("Index", "Login");
                    
                }
            }
            catch (Exception ex)
            {
                //return RedirectToAction("Error500", "Response");
                return RedirectToAction("Index", "Login");
            }

        }
        public ActionResult OTP(string userName)
        {
            UserModel model = new UserModel();
            model.username = userName;
            return View(model);
        }
        [HttpPost]
        public ActionResult OTPAction(UserModel model)
        {
            Access Acc = new Access();
            OTPAuth OtpCheck = new OTPAuth();

            string userName = UrlHelperExtensions.Decrypt(HttpUtility.UrlDecode(model.username));
            string OTP = model.OTP;
            string appId = ConfigurationManager.AppSettings["appID"].ToString();

            bool checkOTP = OtpCheck.CheckOTP(ConfigurationManager.AppSettings["OTPCheck"].ToString(), userName, appId, OTP);

            if (checkOTP)
            {
                var data = Acc.GetUserData(userName);

                if (data.Count > 0)
                {

                    HttpContext.Session["userRole"] = data[0].role;
                    HttpContext.Session["username"] = data[0].name;
                    HttpContext.Session["userid"] = userName;
                    SetCredential(userName, data[0].role);
                }
                else
                {
                    HttpContext.Session["userRole"] = "requestor";
                    HttpContext.Session["username"] = userName;
                    HttpContext.Session["userid"] = userName;
                    SetCredential(userName, "requestor");
                }


                return RedirectToAction("Index", "Home");
            }
            else
            {
                return RedirectToAction("Error500", "Response");
            }
        }
        public ActionResult Logout()
        {
            Session.RemoveAll();
            Session.Abandon();
            return RedirectToAction("Index", "Login");
        }
        public void SetCredential(string userName, string userRole)
        {
            FormsAuthenticationTicket authTicket;

            authTicket = new FormsAuthenticationTicket(1, userName, DateTime.Now, DateTime.Now.AddMinutes(60), false, userRole);
            string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
            HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            authCookie.Expires = authTicket.Expiration;
            Response.Cookies.Add(authCookie);
        }
    }
}