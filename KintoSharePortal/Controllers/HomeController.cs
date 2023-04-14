using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using KintoSharePortal.Domain.Repository;
using KintoSharePortal.Services;
using System.Web.Http;
using System.Web.UI.WebControls;
using System.IO;
using System.Web.UI;
using System.Data;
using KintoSharePortal.Helper;
using System.Globalization;

namespace KintoSharePortal.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        //[System.Web.Http.Authorize]
        public ActionResult MyBook()
        {
            //ViewBag.Message = "Your application description page.";

            return View();
        }
        //[System.Web.Mvc.Authorize]
        public ActionResult Facilities()
        {
            //ViewBag.Message = "Your application description page.";

            return View();
        }
        //[System.Web.Mvc.Authorize]
        public ActionResult Bookapproval()
        {
            //ViewBag.Message = "Your application description page.";

            return View();
        }
        //[System.Web.Mvc.Authorize] 
        public ActionResult Report()
        {
            //ViewBag.Message = "Your application description page.";

            return View();
        }

        [System.Web.Http.HttpPost]
        public JsonResult AddAsset(trxKintoSharePortalAddAsset data)
        {
            try
            {
                KintoSharePortalService kins = new KintoSharePortalService();
                kins.AddAsset(data);

                return Json("Data saved Successfully!");
            }
            catch (Exception ex)
            {
                return Json("Error occurred. Error details: " + ex.Message);
            }

        }

        [System.Web.Http.HttpPost]
        public JsonResult SaveEdit(trxKintoSharePortalAddAsset data)
        {
            try
            {
                KintoSharePortalService kins = new KintoSharePortalService();
                kins.SaveEdit(data);

                return Json("Data saved Successfully!");
            }
            catch (Exception ex)
            {
                return Json("Error occurred. Error details: " + ex.Message);
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult ListAsset(trxKintoSharePortalAsset post)
        {
            try
            {
                List<trxKintoSharePortalAsset> ListAsset = new List<trxKintoSharePortalAsset>();
                KintoSharePortalService kins = new KintoSharePortalService();
                string strWhereCond = "";
                ListAsset = kins.LoadAsset(strWhereCond);

                return Json(ListAsset, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [System.Web.Http.HttpPost]
        public JsonResult ListDept(mstKintoSharePortalDepartmentList post)
        {
            try
            {
                KintoSharePortalService ksp = new KintoSharePortalService();
                var DeptList = new List<mstKintoSharePortalDepartmentList>();
                DeptList = ksp.DepartmentList();
                var data = DeptList.ToList();
                return Json(DeptList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [System.Web.Http.HttpPost]
        public JsonResult ListCar(mstKintoSharePortalGetList post)
        {
            try
            {
                KintoSharePortalService ksp = new KintoSharePortalService();
                var CarList = new List<mstKintoSharePortalGetList>();
                CarList = ksp.CarList();
                return Json(CarList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [System.Web.Http.HttpPost]
        public JsonResult ListPIC(string DeptID)
        {
            try
            {
                KintoSharePortalService ksp = new KintoSharePortalService();
                var PICList = new List<mstKintoSharePortalGetList>();
                PICList = ksp.PICList(DeptID);
                return Json(PICList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult SubmitBook(trxKintoSharePortalBookSubmit post)
        {
            var model = new ErrorModel { Success = false };
            try
            {
                if (post.BookRepeat == "Y")
                {
                    post.Enddate = (DateTime.ParseExact(post.Startdate, "MM/dd/yyyy", CultureInfo.InvariantCulture).AddDays(7)).ToString("MM/dd/yyyy");
                }
                else
                {
                    post.DateFreq = "D";
                }

                KintoSharePortalService kins = new KintoSharePortalService();
                kins.SubmitBook(post);
                model.Success = true;
                return Json(model);
            }
            catch (Exception ex)
            {
                model.Reason = ex.Message;
                return Json(model);
                //return Json("Error" + ex.Message, JsonRequestBehavior.AllowGet);
                //throw new NotImplementedException(ex.Message);
                //throw ex;
            }

        }

        [System.Web.Http.HttpPost]
        public JsonResult DateBookDetail(string BookingNo)
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var DateDetail = new trxKintoSharePortalBookSubmit();
                DateDetail = ksp.DateDetail(BookingNo);
                return Json(DateDetail, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult PlatNo(int CarId)
        {
            try
            {
                KintoSharePortalService ksp = new KintoSharePortalService();
                var CarPlatNo = new mstKintoSharePortalGetList();
                CarPlatNo = ksp.PlatNo(CarId);
                return Json(CarPlatNo, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult BookingList(trxKintoSharePortalBookSubmit post)
        {

            try
            {
                var bookkinto = new KintoSharePortalService();

                string strWhereCond = "";

                post.ShowAllBook = bookkinto.BookList(strWhereCond);
                return Json(post.ShowAllBook, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult CheckListDetail(int Bookid, string BookingNo)
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var CheckListDetail = new mstKintoSharePortalChecklist();
                CheckListDetail = ksp.ChecklistDetail(Bookid, BookingNo);
                return Json(CheckListDetail, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult CheckOutDetail(int Bookid, string BookingNo)
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var CheckOutDetail = new mstKintoSharePortalChecklist();
                CheckOutDetail = ksp.CheckOutDetail(Bookid, BookingNo);
                return Json(CheckOutDetail, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult DeleteBook(int Bookid, string BookingNo)
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var DeleteBook = new trxKintoSharePortalBookSubmit();
                DeleteBook = ksp.BookingDelete(Bookid, BookingNo);
                return Json("Data delete Successfully!");
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [System.Web.Http.HttpPost]
        public JsonResult DeleteAsset(int AssetID)
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var DeleteAsset = new trxKintoSharePortalAsset();
                DeleteAsset = ksp.DeleteAsset(AssetID);
                return Json("Data delete Successfully!");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult SubmitChecklist(mstKintoSharePortalChecklist data)
        {
            try
            {
                var kins = new KintoSharePortalService();
                kins.SubmitChecklist(data);
                return Json("Data saved Successfully!");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult SubmitCheckOut(mstKintoSharePortalChecklist data)
        {
            try
            {
                var kins = new KintoSharePortalService();
                kins.SubmitCheckOut(data);
                return Json("Data saved Successfully!");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult ApprovalList(mstKintoSharePortalApproval post)
        {
            try
            {
                var ChecklistKinto = new KintoSharePortalService();

                string strWhereCond = "";
                post.Showallapproval = ChecklistKinto.LoadApprovalList(strWhereCond);

                return Json(post.Showallapproval, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult ApprovalSubmit(mstKintoSharePortalApproval post)
        {
            try
            {
                var kins = new KintoSharePortalService();
                kins.ApprovalSubmit(post.Bookno, post.Approvalstatus);
                return Json("Data saved Successfully!");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult ApprovalCheckIn(string BookNumber, string StatusCheckIn)
        {
            try
            {
                var kins = new KintoSharePortalService();
                kins.ApprovalCheckIn(BookNumber, StatusCheckIn);

                return Json("Data saved Successfully!");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult ApprovalCheckOut(string BookNumber, string StatusCheckOut)
        {
            try
            {
                var kins = new KintoSharePortalService();
                kins.ApprovalCheckOut(BookNumber, StatusCheckOut);

                return Json("Data saved Successfully!");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult IndexBooking()
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var BookListIndex = new List<trxKintoSharePortalBookSubmit>();
                var WhereCond = "";
                BookListIndex = ksp.BookListIndex(WhereCond);

                return Json(BookListIndex, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult ResourcesAsset()
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var listResourcesAsset = new List<trxKintoSharePortalBookSubmit>();
                var WhereCond = "";
                listResourcesAsset = ksp.ResourceAssetList(WhereCond);

                return Json(listResourcesAsset, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult BookingListReport(mstKintoSharePortalReport post)
        {
            try
            {
                var bookkinto = new KintoSharePortalServiceReport();

                string strWhereCond = "";
                if (post.Startdate != null)
                {
                    if (post.Enddate != null)
                    {
                        strWhereCond = "Cast (b.BOOK_DATE as date) between '" + post.Startdate + "' AND '" + post.Enddate + "'";
                    }
                    else
                    {
                        strWhereCond = "Cast (b.BOOK_DATE as date) = '" + post.Startdate + "'";
                    }
                }
                else
                {
                    strWhereCond = "";
                }

                var BookList = new List<mstKintoSharePortalReport>();

                BookList = bookkinto.LoadBookingListReport(strWhereCond);

                return Json(BookList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public ActionResult UserListReport(mstKintoSharePortalReport post)
        {
            try
            {
                var ReportService = new KintoSharePortalServiceReport();

                string strWhereCond = "";
                if (!string.IsNullOrWhiteSpace(post.Startdate))
                {
                    if (!string.IsNullOrWhiteSpace(post.Enddate))
                    {
                        strWhereCond += " CAST(b.BOOK_DATE as date) BETWEEN '" + post.Startdate + "' AND '" + post.Enddate + "'";
                    }
                    else
                    {
                        strWhereCond += " CAST(b.BOOK_DATE as date) = '" + post.Startdate + "'";
                    }
                }
                else
                {
                    strWhereCond = "";
                }
                //if ((post.Startdate != null || post.Startdate != "") && (post.Enddate != null || post.Enddate != ""))
                //{
                //    strWhereCond = "BOOK_DATE between " + post.Startdate + "AND" + post.Enddate;
                //}
                //else
                //{
                //    strWhereCond = "";
                //}

                List<mstKintoSharePortalReport> UserListReport = new List<mstKintoSharePortalReport>();
                UserListReport = ReportService.UserListReport(strWhereCond);

                return Json(UserListReport, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult ExportExcel()
        {
            string strWhereCond = "";
            string Reporttype = Request.QueryString["Reporttype"];
            string StartDate = Request.QueryString["Startdate"];
            string EndDate = Request.QueryString["Enddate"];

            if (!string.IsNullOrWhiteSpace(StartDate))
            {
                if (!string.IsNullOrWhiteSpace(EndDate))
                {
                    strWhereCond += " BOOK_DATE BETWEEN '" + StartDate + "' AND '" + EndDate + "'";
                }
                else
                {
                    strWhereCond += " BOOK_DATE = '" + StartDate + "'";
                }
            }

            try
            {
                var bookkinto = new KintoSharePortalServiceReport();
                var post = new mstKintoSharePortalReport();
                var data = new List<mstKintoSharePortalReport>();
                data = bookkinto.LoadBookingListReport(strWhereCond);

                var gv = new GridView();
                gv.DataSource = data;
                gv.DataBind();
                Response.ClearContent();
                Response.Buffer = true;
                Response.AddHeader("content-disposition", "attachment; filename=KintoSharePortal.xls");
                Response.ContentType = "application/ms-excel";
                Response.Charset = "";
                StringWriter objStringWriter = new StringWriter();
                HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);
                gv.RenderControl(objHtmlTextWriter);
                Response.Output.Write(objHtmlTextWriter);
                Response.Flush();
                Response.End();

                //return Json(post.ShowAllBook, JsonRequestBehavior.AllowGet);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpGet]
        public void ExportToExcelKinto()
        {
            DataTable table = new DataTable();
            try
            {
                string strWhereCond = "";
                string Reporttype = Request.QueryString["Reporttype"];
                string StartDate = Request.QueryString["Startdate"];
                string EndDate = Request.QueryString["Enddate"];

                if (!string.IsNullOrWhiteSpace(StartDate))
                {
                    if (!string.IsNullOrWhiteSpace(EndDate))
                    {
                        if (Reporttype == "asset")
                        {
                            strWhereCond += " BOOK_DATE BETWEEN '" + StartDate + "' AND '" + EndDate + "'";
                        }
                        else
                        {
                            strWhereCond += " CAST (BOOK_DATE as date) BETWEEN '" + StartDate + "' AND '" + EndDate + "'";
                        }
                    }
                    else
                    {
                        if (Reporttype == "asset")
                        {
                            strWhereCond += " BOOK_DATE = '" + StartDate + "'";
                        }
                        else
                        {
                            strWhereCond += " CAST (BOOK_DATE as date) = '" + StartDate + "'";
                        }
                    }
                }

                var bookkinto = new KintoSharePortalServiceReport();
                var post = new mstKintoSharePortalReport();
                var data = new List<mstKintoSharePortalReport>();
                if (Reporttype.Contains("asset"))
                {
                    data = bookkinto.LoadBookingListReport(strWhereCond);
                }
                else
                {
                    data = bookkinto.UserListReport(strWhereCond);
                }
                var dataSum = new mstKintoSharePortalReport();
                dataSum.CapexAmount = data.Sum(x => x.CapexAmount);
                dataSum.RevenueAmount = data.Sum(x => x.RevenueAmount);
                dataSum.CompensationAmount = data.Sum(x => x.CompensationAmount);
                data.Add(dataSum);

                if (Reporttype.Contains("asset"))
                {
                    string[] ColumsShow = new string[] { "ID", "BookingNo", "Cartype", "PlatNo", "Department", "PIC", "BookDate", "DateFreq", "ApprovalStatus", "UserReq", "Purpose", "DateCrt", "KintoShareFee" };
                    var reader = FastMember.ObjectReader.Create(data.Select(i => new
                    {
                        i.ID,
                        i.BookingNo,
                        i.Cartype,
                        i.PlatNo,
                        i.Department,
                        i.PIC,
                        i.BookDate,
                        i.DateFreq,
                        i.ApprovalStatus,
                        i.UserReq,
                        i.Purpose,
                        i.DateCrt,
                        i.KintoShareFee
                    }), ColumsShow); ;
                    table.Load(reader);
                }
                else
                {
                    string[] ColumsShow = new string[] { "ID", "BookingNo", "BookDate", "Startdate", "Enddate", "KintoShareFee", "Revenue", "Charge", "UserReq", "Department" };
                    var reader = FastMember.ObjectReader.Create(data.Select(i => new
                    {
                        i.ID,
                        i.BookingNo,
                        i.BookDate,
                        i.Startdate,
                        i.Enddate,
                        i.KintoShareFee,
                        i.Revenue,
                        i.Charge,
                        i.UserReq,
                        i.Department
                    }), ColumsShow); ;
                    table.Load(reader);
                }
                ExportToExcelHelper.Export("KintoSharePortal " + Reporttype, table);
            }
            catch (Exception ex)
            {

            }
        }

        [System.Web.Http.HttpPost]
        public JsonResult CheckAsset(int AssetID)
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var CheckAsset = new trxKintoSharePortalAsset();
                CheckAsset = ksp.CheckAsset(AssetID);
                return Json(CheckAsset, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpGet]
        public JsonResult SearchIndex(trxKintoSharePortalBookSubmit post)
        {
            try
            {
                if (post.Cartype == "ALL ASSET")
                {
                    post.Cartype = "";
                }

                if (post.PIC == "ALL USER")
                {
                    post.PIC = "";
                }

                var ksp = new KintoSharePortalService();
                var ListSearch = new List<trxKintoSharePortalBookSubmit>();
                ListSearch = ksp.GetListSearch(post);
                return Json(ListSearch, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public class ErrorModel
        {
            public bool Success { get; set; }
            public string Reason { get; set; }
        }
    }
}