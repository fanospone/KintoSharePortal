using System.Web;
using System.Web.Optimization;

namespace KintoSharePortal
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/bsb").Include(
                "~/Content/bsb/css/icon.css",
                "~/Content/bsb/css/font.css",
                "~/Content/bsb/plugins/bootstrap/css/bootstrap.css",
                "~/Content/bsb/plugins/bootstrap/css/bootstrap.min.css",
                "~/Content/bsb/plugins/node-waves/waves.css",
                "~/Content/bsb/plugins/animate-css/animate.css",
                "~/Content/bsb/plugins/jquery-spinner/css/bootstrap-spinner.css",
                "~/Content/bsb/plugins/bootstrap-select/css/bootstrap-select.css",
                "~/Content/bsb/css/style.css",
                "~/Content/bsb/css/themes/all-themes.css",
                "~/Content/bsb/css/materialize.css",
                 "~/Content/bsb/plugins/jquery-ui.multidatespicker/jquery-ui.multidatespicker.css",
                 "~/Content/bsb/plugins/jquery-dataTables/jquery.dataTables.min.css",
                 "~/Content/bsb/plugins/fullcalendar/lib/main.css"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                "~/Content/bsb/plugins/jquery/jquery.js",
                "~/Content/bsb/plugins/jquery-ui/jquery-ui.js",
                "~/Content/bsb/plugins/popper/popper.min.js",
                "~/Content/bsb/plugins/momentjs/moment.js",
                "~/Content/bsb/plugins/bootstrap/js/bootstrap.js",
                "~/Content/bsb/plugins/bootstrap-select/js/bootstrap-select.js",
                "~/Content/bsb/plugins/jquery-slimscroll/jquery.slimscroll.js",
                "~/Content/bsb/plugins/jquery-spinner/js/jquery.spinner.js",
                "~/Content/bsb/plugins/node-waves/waves.js",
                "~/Content/bsb/plugins/raphael/raphael.min.js",
                 "~/Content/bsb/plugins/ladda/ladda.min.js",
                 "~/Content/bsb/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js",
                 "~/Content/bsb/plugins/jquery-ui.multidatespicker/jquery-ui.multidatespicker.js",
                 "~/Content/bsb/plugins/jquery-dataTables/jquery.dataTables.min.js",
                 "~/Content/bsb/plugins/bootstrap-notify/bootstrap-notify.js",
                 "~/Content/bsb/plugins/sweetalert/sweetalert.min.js",
                "~/Content/bsb/js/admin.js",
                "~/Content/bsb/plugins/fullcalendar/lib/main.js",
                "~/Content/bsb/plugins/loadingoverlay/loadingoverlay.min.js"
                ));
            BundleTable.EnableOptimizations = true;

        }
    }
}
