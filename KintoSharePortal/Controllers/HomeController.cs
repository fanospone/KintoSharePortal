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
using System.Web.Helpers;
using System.Threading.Tasks;

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
        public ActionResult Facilities ()
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
        ////[ValidateAntiForgeryToken]
        public JsonResult AddAsset([Bind(Include = "UserName,Password,Location")] trxKintoSharePortalAddAsset data)
        {
            try
            {
                var kins = new KintoSharePortalService();
                kins.AddAsset(data);

                return Json("Data saved Successfully!");
            }
            catch (Exception ex)
            {
                return Json("Error occurred. Error details: " + ex.Message);
            }
            
        }

        [System.Web.Http.HttpPost]
        ////[ValidateAntiForgeryToken]
        public JsonResult SaveEdit([Bind(Include = "UserName,Password,Location")] trxKintoSharePortalAddAsset data)
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
        ////[ValidateAntiForgeryToken]
        public ActionResult ListAsset([Bind(Include = "UserName,Password,Location")] trxKintoSharePortalAsset post )
        {

            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            //var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            //var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            //var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            try
            { 
                List<trxKintoSharePortalAsset> ListAsset = new List<trxKintoSharePortalAsset>();
                KintoSharePortalService kins = new KintoSharePortalService();
                string strWhereCond = "";
                post.ShowAllAsset = kins.LoadAsset(strWhereCond);

                recordsTotal = post.ShowAllAsset.Count();
                var data = post.ShowAllAsset.Skip(skip).Take(pageSize).ToList();
                
                //return View(post.ShowAllAsset);
                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
            }
            catch (Exception ex)
            {
                //return View("Error Get Data:" + ex.Message);
                throw;
            }

        }

        [System.Web.Http.HttpPost]
        ////[ValidateAntiForgeryToken]
        public JsonResult ListDept([Bind(Include = "UserName,Password,Location")] mstKintoSharePortalDepartmentList post)
        {
            try 
            {
                KintoSharePortalService ksp = new KintoSharePortalService();
                var DeptList = new List<mstKintoSharePortalDepartmentList>();
                DeptList = ksp.DepartmentList();
                var data = DeptList.ToList();
                return Json(DeptList,JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                throw;
            }

        }

        [System.Web.Http.HttpPost]
        ////[ValidateAntiForgeryToken]
        public JsonResult ListCar(string token)
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
        //[ValidateAntiForgeryToken]
        public JsonResult ListPIC([Bind(Include = "UserName,Password,Location")] string DeptID)
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
        //[ValidateAntiForgeryToken]
        public JsonResult SubmitBook ([Bind(Include = "UserName,Password,Location")] trxKintoSharePortalBookSubmit post)
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
            catch(Exception ex)
            {
                model.Reason = ex.Message;
                return Json(model);
                //return Json("Error" + ex.Message, JsonRequestBehavior.AllowGet);
                //throw new NotImplementedException(ex.Message);
                //throw ex;
            }

        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult DateBookDetail ([Bind(Include = "UserName,Password,Location")] string BookingNo)
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
        //[ValidateAntiForgeryToken]
        public JsonResult PlatNo([Bind(Include = "UserName,Password,Location")] int CarId)
        {
            try
            {
                KintoSharePortalService ksp = new KintoSharePortalService();
                var CarPlatNo = new mstKintoSharePortalGetList();
                CarPlatNo = ksp.PlatNo(CarId);
                return Json(CarPlatNo, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult BookingList([Bind(Include = "UserName,Password,Location")] trxKintoSharePortalBookSubmit post)
        {
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            try
            {
                var bookkinto = new KintoSharePortalService();

                string strWhereCond = "";

                post.ShowAllBook = bookkinto.BookList(strWhereCond);
                recordsTotal = post.ShowAllBook.Count();
                var data = post.ShowAllBook.Skip(skip).Take(pageSize).ToList();

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CheckListDetail([Bind(Include = "UserName,Password,Location")] int Bookid, string BookingNo)
        {
            try
            {
                var ksp = new KintoSharePortalService();
                var CheckListDetail = new mstKintoSharePortalChecklist();
                CheckListDetail = ksp.ChecklistDetail(Bookid, BookingNo);
                return Json(CheckListDetail, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CheckOutDetail([Bind(Include = "UserName,Password,Location")] int Bookid, string BookingNo)
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
        //[ValidateAntiForgeryToken]
        public JsonResult DeleteBook([Bind(Include = "UserName,Password,Location")] int Bookid, string BookingNo)
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
        //[ValidateAntiForgeryToken]
        public JsonResult DeleteAsset([Bind(Include = "UserName,Password,Location")] int AssetID)
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
        //[ValidateAntiForgeryToken]
        public JsonResult SubmitChecklist([Bind(Include = "UserName,Password,Location")] mstKintoSharePortalChecklist data)
        {
            try
            {
                var  kins = new KintoSharePortalService();
                kins.SubmitChecklist(data);
                return Json("Data saved Successfully!");
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult SubmitCheckOut([Bind(Include = "UserName,Password,Location")] mstKintoSharePortalChecklist data)
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
        //[ValidateAntiForgeryToken]
        public ActionResult ApprovalList([Bind(Include = "UserName,Password,Location")] mstKintoSharePortalApproval post)
        {
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            try
            {
                var ChecklistKinto = new KintoSharePortalService();

                string strWhereCond = "";
                post.Showallapproval = ChecklistKinto.LoadApprovalList(strWhereCond);

                recordsTotal = post.Showallapproval.Count();
                var data = post.Showallapproval.Skip(skip).Take(pageSize).ToList();

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult ApprovalSubmit([Bind(Include = "UserName,Password,Location")] mstKintoSharePortalApproval post)
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
        //[ValidateAntiForgeryToken]
        public ActionResult ApprovalCheckIn([Bind(Include = "UserName,Password,Location")] string BookNumber, string StatusCheckIn)
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
        //[ValidateAntiForgeryToken]
        public ActionResult ApprovalCheckOut([Bind(Include = "UserName,Password,Location")] string BookNumber, string StatusCheckOut)
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
        //[ValidateAntiForgeryToken]
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
            catch(Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
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
        //[ValidateAntiForgeryToken]
        public ActionResult BookingListReport([Bind(Include = "UserName,Password,Location")] mstKintoSharePortalReport post)
        {
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            try
            {
                var bookkinto = new KintoSharePortalServiceReport();

                string strWhereCond = "";
                if (post.Startdate != null) 
                {
                    if(post.Enddate != null)
                    {
                        strWhereCond = "BOOK_DATE between '" + post.Startdate + "' AND '" + post.Enddate + "'";
                    }
                    else
                    {
                        strWhereCond = "";
                    }
                }
                else
                {
                    strWhereCond = "";
                }

                var BookList = new List<mstKintoSharePortalReport>();

                BookList = bookkinto.LoadBookingListReport(strWhereCond);

                recordsTotal = BookList.Count();
                var data = BookList.Skip(skip).Take(pageSize).ToList();

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult UserListReport([Bind(Include = "UserName,Password,Location")] mstKintoSharePortalReport post)
        {
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            try
            {
                var ReportService = new KintoSharePortalServiceReport();

                string strWhereCond = "";
                if ((post.Startdate != null || post.Startdate != "") && (post.Enddate != null || post.Enddate != ""))
                {
                    strWhereCond = "BOOK_DATE between " + post.Startdate + "AND" + post.Enddate;
                }
                else
                {
                    strWhereCond = "";
                }

                List<mstKintoSharePortalReport>  UserListReport = new List<mstKintoSharePortalReport>();
                UserListReport = ReportService.UserListReport(strWhereCond);

                recordsTotal = UserListReport.Count();
                var data = UserListReport.Skip(skip).Take(pageSize).ToList();

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data });
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
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
        //[ValidateAntiForgeryToken]
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
                        strWhereCond += " BOOK_DATE BETWEEN '" + StartDate + "' AND '" + EndDate + "'";
                    }
                    else
                    {
                        strWhereCond += " BOOK_DATE = '" + StartDate + "'";
                    }
                }

                var bookkinto = new KintoSharePortalServiceReport();
                var post = new mstKintoSharePortalReport();
                var data = new List<mstKintoSharePortalReport>();

                data = bookkinto.LoadBookingListReport(strWhereCond);
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
                    string[] ColumsShow = new string[] { "ID", "BookingNo", "Startdate", "Enddate", "KintoShareFee", "Revenue", "Charge", "UserReq", "Department" };
                    var reader = FastMember.ObjectReader.Create(data.Select(i => new
                    {
                        i.ID,
                        i.BookingNo,
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
                ExportToExcelHelper.Export("KintoSharePortal "+ Reporttype, table);
            }
            catch (Exception ex)
            {

            }
        }

        [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CheckAsset([Bind(Include = "UserName,Password,Location")] int AssetID)
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
        //[ValidateAntiForgeryToken]
        public JsonResult SearchIndex ([Bind(Include = "UserName,Password,Location")] trxKintoSharePortalBookSubmit post)
        {
            try
            {
                if(post.Cartype == "ALL ASSET")
                {
                    post.Cartype = "";
                }

                if(post.PIC == "ALL USER")
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