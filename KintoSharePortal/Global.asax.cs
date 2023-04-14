using KintoSharePortal.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace KintoSharePortal
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_Error()
        {
            Exception exception = Server.GetLastError();
            Response.Clear();

            HttpException httpException = exception as HttpException;

            if (httpException != null)
            {
                string action;

                switch (httpException.GetHttpCode())
                {
                    case 404:
                        // page not found
                        action = "Error404";
                        break;
                    case 500:
                        // server error
                        action = "Error500";
                        break;
                    default:
                        action = "Login";
                        break;
                }

                // clear error on server
                Server.ClearError();

                if (action == "Login")
                    Response.Redirect(String.Format("~/Login/{0}", "Index"));
                else
                    Response.Redirect(String.Format("~/Response/{0}", action));


            }
        }
    }
}
