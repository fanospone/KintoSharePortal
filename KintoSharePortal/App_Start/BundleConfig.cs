using System.Web;
using System.Web.Optimization;

namespace KintoSharePortal
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/bundles/bsb").Include(
                "~/Content/bsb/plugins/bootstrap/css/bootstrap.css",
                "~/Content/bsb/plugins/node-waves/waves.css",
                "~/Content/bsb/plugins/animate-css/animate.css",
                "~/Content/bsb/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.css",
                "~/Content/bsb/plugins/dropzone/dropzone.css",
                "~/Content/bsb/plugins/multi-select/css/multi-select.css",
                "~/Content/bsb/plugins/jquery-spinner/css/bootstrap-spinner.css",
                "~/Content/bsb/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css",
                "~/Content/bsb/plugins/bootstrap-select/css/bootstrap-select.css",
                "~/Content/bsb/plugins/morrisjs/morris.css",
                "~/Content/bsb/css/style.css",
                "~/Content/bsb/css/themes/all-themes.css",
                "~/Content/bsb/css/materialize.css"
                ));

            bundles.Add(new StyleBundle("~/bundles/js").Include(
                "~/Content/bsb/plugins/jquery/jquery.min.js",
                "~/Content/bsb/plugins/bootstrap/js/bootstrap.js",
                "~/Content/bsb/plugins/bootstrap-select/js/bootstrap-select.js",
                "~/Content/bsb/plugins/jquery-slimscroll/jquery.slimscroll.js",
                "~/Content/bsb/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js",
                "~/Content/bsb/plugins/dropzone/dropzone.js",
                "~/Content/bsb/plugins/jquery-inputmask/jquery.inputmask.bundle.js",
                "~/Content/bsb/plugins/multi-select/js/jquery.multi-select.js",
                "~/Content/bsb/plugins/jquery-spinner/js/jquery.spinner.js",
                "~/Content/bsb/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js",
                "~/Content/bsb/plugins/node-waves/waves.js",
                "~/Content/bsb/plugins/jquery-countto/jquery.countTo.js",
                "~/Content/bsb/plugins/raphael/raphael.min.js",
                "~/Content/bsb/plugins/morrisjs/morris.js",
                "~/Content/bsb/plugins/chartjs/Chart.bundle.js",
                "~/Content/bsb/plugins/jquery-sparkline/jquery.sparkline.js",
                "~/Content/bsb/js/admin.js",
                "~/Content/bsb/js/demo.js"));

        }
    }
}
