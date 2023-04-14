using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using System.Data;
using System.Web;
using KintoSharePortal.Domain.Repository;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Mvc;
using System.Globalization;

namespace KintoSharePortal.Services
{
    public class KintoSharePortalService : BaseService
    {
        private DbContext _context;
        private DateTime _dtNow;
        private mstKintoSharePortalAssetRepository _mstKintoSharePortalAssetRepository;


        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString);
        
        public trxKintoSharePortalAddAsset AddAsset(trxKintoSharePortalAddAsset data)
        {
            //var uow = _context.CreateUnitOfWork();
            using (con)
            {
                try
                {
                    var assetRepo = new mstKintoSharePortalAssetRepository(_context);
                    data.userID = HttpContext.Current.Session["userId"].ToString();

                    //_mstKintoSharePortalAssetRepository = new mstKintoSharePortalAssetRepository(_context);
                    con.Open();
                    data = assetRepo.AddAsset(data, con);
                    con.Close();
                    return (data);
                }
                catch (Exception ex)
                {
                    con.Close();
                    return (data);
                } 
            }
        }

        public trxKintoSharePortalAddAsset SaveEdit(trxKintoSharePortalAddAsset data)
        {
            using (con)
            {
                try
                {
                    var assetRepo = new mstKintoSharePortalAssetRepository(_context);
                    data.userID = HttpContext.Current.Session["userId"].ToString();
                    con.Open();
                    data = assetRepo.SaveEditAsset(data, con);
                    con.Close();
                    return (data);
                }
                catch (Exception ex)
                {
                    con.Close();
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public trxKintoSharePortalBookSubmit SubmitBook(trxKintoSharePortalBookSubmit data)
        {
            try
            {
                string BookNo = "";
                var KSPHeader = new trxKintoSharePortalBookSubmit();

                var BookReqRepo = new trxKintoSharePortalBookSubmitRepository(_context);
                var GetBookNoRepo = new mstKintoSharePortalGetBookListRepository(_context);
                var CheckBook = new mstKintoSharePortalGetBookListRepository(_context);
                var ListBook = new List<trxKintoSharePortalBookSubmit>();

                if (data.BookRepeat == "Y")
                {
                    //data.Enddate = (DateTime.ParseExact(data.Startdate, "MM/dd/yyyy", CultureInfo.InvariantCulture).AddDays(7)).ToString("MM/dd/yyyy");
                    using (con)
                    {
                        var car = data.Cartype;
                        var startDate = DateTime.ParseExact(data.Startdate, "MM/dd/yyyy", CultureInfo.InvariantCulture).ToString("yyyyMMdd", CultureInfo.InvariantCulture);
                        var endDate = DateTime.ParseExact(data.Enddate, "MM/dd/yyyy", CultureInfo.InvariantCulture).ToString("yyyyMMdd", CultureInfo.InvariantCulture);
                        con.Open();
                        ListBook = CheckBook.ListBookRepeat(car, startDate, endDate, con);
                        if (ListBook.Count > 0)
                        {
                            con.Dispose();
                            throw new InvalidOperationException("Another PIC Has Booked The Asset");
                        //ValidationMessages.AddModelError("BookingNo", "Asset has booked with other PIC in same date. Please choise other Asset/date");
                        }
                    }
                }
                else
                {
                    using (con)
                    {
                        var car = data.Cartype;
                        var startDate = DateTime.ParseExact(data.Startdate, "MM/dd/yyyy", CultureInfo.InvariantCulture).ToString("yyyyMMdd", CultureInfo.InvariantCulture);
                        var endDate = DateTime.ParseExact(data.Enddate, "MM/dd/yyyy", CultureInfo.InvariantCulture).ToString("yyyyMMdd", CultureInfo.InvariantCulture);

                        con.Open();
                        ListBook = CheckBook.ListAssetDate(car, startDate, endDate,con);
                        if (ListBook.Count > 0)
                        {
                            con.Dispose();
                            throw new InvalidOperationException("Another PIC Has Booked The Asset");
                        }
                    }
                       
                    }
                
                //using (con)
                //{
                //    con.Open();
                    KSPHeader = GetBookNoRepo.GetBookNo();
                    //con.Dispose();
                //}
                    
                BookNo = KSPHeader == null ? "" : KSPHeader.BookingNo;

                if (BookNo == "")
                {
                    BookNo = "0001";
                }
                else
                {
                    BookNo = BookNo.Substring(3, 4);
                    int counter = int.Parse(BookNo) + 1;
                    if (counter.ToString().Length == 1)
                        BookNo = "000" + counter.ToString();
                    else if (counter.ToString().Length == 2)
                        BookNo = "00" + counter.ToString();
                    else if (counter.ToString().Length == 3)
                        BookNo = "0" + counter.ToString();
                    else
                        BookNo = counter.ToString();
                }
                string year = System.DateTime.Now.Year.ToString();
                string month = System.DateTime.Now.Month.ToString();
                if (month.Length == 1)
                    month = "0" + month.ToString();
                else
                    month = month.ToString();
                data.BookingNo = "KSP" + BookNo + year + month ;

                data.UserReq = HttpContext.Current.Session["userId"].ToString();
                data.ApprovalStatus = "Waiting";
                data.BookDate = DateTime.Now.ToString("MM-dd-yyyy");

                BookReqRepo.SubmitBook(data);
                
                return (data);
            }
            catch(Exception ex)
            {
                throw new NotImplementedException(ex.Message);
                //return Json("Error occurred. Error details: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
            finally
            {
                con.Dispose();
            }
        }

        private trxKintoSharePortalBookSubmit Json(string v, JsonRequestBehavior allowGet)
        {
            throw new NotImplementedException();
        }

        public List<trxKintoSharePortalAsset>LoadAsset(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var assetRepo = new mstKintoSharePortalAssetRepository(_context);
                    var listAsset = new List<trxKintoSharePortalAsset>();

                    con.Open();
                    listAsset = assetRepo.LoadAsset(WhereCond, con);
                    con.Close();
                    return listAsset;
                }
                catch (Exception ex)
                {
                    con.Close();
                    return strJson("Error occurred. Error details: " + ex.Message);
                }
            }
        }

        public trxKintoSharePortalAsset CheckAsset(int AssetID)
        {
            using (con)
            {
                try
                {
                    var assetRepo = new mstKintoSharePortalAssetRepository(_context);
                    var listAsset = new trxKintoSharePortalAsset();
                    con.Open();
                    listAsset = assetRepo.CheckAsset(AssetID, con);
                    con.Close();
                    return listAsset;
                }
                catch (Exception ex)
                {
                    con.Close();
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public List<mstKintoSharePortalDepartmentList> DepartmentList()
        {
            using (con)
            {
                try 
                {
                    var departmentRepo = new mstKintoSharePortalDepartmentRepository(_context);
                    var ListDepartrment = new List<mstKintoSharePortalDepartmentList>();
                    var WhereCond = "";
                    //con.Open();
                    //ListDepartrment = departmentRepo.DepartmentList(WhereCond,con);
                    //con.Close();
                    con.Open();
                    return departmentRepo.DepartmentList(WhereCond, con);
                }
                catch(Exception ex)
                {
                    con.Close();
                    return Json("Error occurred. Error details: " + ex.Message);
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public List<mstKintoSharePortalGetList> CarList()
        {
            using (con)
            {
                try
                {
                    var CarRepo = new mstKintoSharePortalGetListRepository(_context);
                    var ListDepartrment = new List<mstKintoSharePortalGetList>();
                    var WhereCond = "";
                    con.Open();
                    return CarRepo.CarList(WhereCond,con);
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public mstKintoSharePortalGetList PlatNo(int CarId)
        {
            using (con)
            {
                try
                { 
                    var CarRepo = new mstKintoSharePortalGetListRepository(_context);
                    var CarPlatNo = new mstKintoSharePortalGetList();
                    con.Open();
                    CarPlatNo = CarRepo.PlatNo(CarId, con);
                    return CarPlatNo;
                }
                catch (Exception ex)
                {
                    con.Close();
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public mstKintoSharePortalChecklist ChecklistDetail(int Bookid , string BookingNo)
        {
            using (con)
            {
                try
                {
                    var ChecklistRepo = new trxKintoSharePortalChecklistRepository(_context);
                    var CheckList = new mstKintoSharePortalChecklist();
                    con.Open();
                    CheckList = ChecklistRepo.ChecklistDetail(Bookid, BookingNo, con);
                    CheckList.Role = HttpContext.Current.Session["userRole"].ToString();
                    return CheckList;
                }
                catch(Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public trxKintoSharePortalBookSubmit DateDetail(string BookingNo)
        {
            using (con)
            {
                try
                {
                    var detailDate = new mstKintoSharePortalGetBookListRepository(_context);
                    var CheckList = new trxKintoSharePortalBookSubmit();
                    con.Open();
                    CheckList = detailDate.CheckBooking(BookingNo, con);
                    return CheckList;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public mstKintoSharePortalChecklist CheckOutDetail(int Bookid, string BookingNo)
        {
            using (con)
            {
                try
                {
                    var ChecklistRepo = new trxKintoSharePortalChecklistRepository(_context);
                    var CheckOutList = new mstKintoSharePortalChecklist();
                    con.Open();
                    CheckOutList = ChecklistRepo.CheckOutlistDetail(Bookid, BookingNo, con);
                    CheckOutList.Role = HttpContext.Current.Session["userRole"].ToString();
                    return CheckOutList;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public List<trxKintoSharePortalBookSubmit> GetListSearch(trxKintoSharePortalBookSubmit data)
        {
            using (con)
            {
                try
                {
                    string PIC = data.PIC;
                    string cartype = data.Cartype;
                    var SearchRepo = new trxKintoSharePortalBookSubmitRepository(_context);
                    var ListSearch = new List<trxKintoSharePortalBookSubmit>();
                    con.Open();
                    ListSearch = SearchRepo.SearchList(PIC, cartype, con);

                    var lbi = new trxKintoSharePortalBookSubmit();
                    var dataGet = new List<trxKintoSharePortalBookSubmit>();
                    foreach (var item in ListSearch.Where(i => i.BookRepeat == "Y"))
                    {
                        dataGet.Add(new trxKintoSharePortalBookSubmit
                        {
                            ID = item.ID,
                            BookingNo = item.BookingNo,
                            Cartype = item.Cartype,
                            Department = item.Department,
                            PlatNo = item.PlatNo,
                            PIC = item.PIC,
                            BookType = item.BookType,
                            Purpose = item.Purpose,
                            BookRepeat = item.BookRepeat,
                            DateFreq = item.DateFreq,
                            BookDate = item.BookDate,
                            UserReq = item.UserReq,
                            ApprovalStatus = item.ApprovalStatus,
                            DateCrt = item.DateCrt,
                            Enddate = (DateTime.ParseExact(item.Enddate, "yyyy-MM-dd", CultureInfo.InvariantCulture).AddDays(7)).ToString("yyyy-MM-dd"),/*(DateTime.ParseExact(item.Enddate, "yyyy-MM-dd", CultureInfo.InvariantCulture).AddDays(7)).ToString("yyyy-MM-dd"),*/
                            Startdate = (DateTime.ParseExact(item.Startdate, "yyyy-MM-dd", CultureInfo.InvariantCulture).AddDays(7)).ToString("yyyy-MM-dd"),
                            Role = item.Role,
                            CarID = item.CarID
                            
                        });
                        //data.Add(lbi);
                    }
                    foreach (var item in dataGet)
                    {
                        ListSearch.Add(new trxKintoSharePortalBookSubmit
                        {
                            ID = item.ID,
                            BookingNo = item.BookingNo,
                            Cartype = item.Cartype,
                            Department = item.Department,
                            PlatNo = item.PlatNo,
                            PIC = item.PIC,
                            BookType = item.BookType,
                            Purpose = item.Purpose,
                            BookRepeat = item.BookRepeat,
                            DateFreq = item.DateFreq,
                            BookDate = item.BookDate,
                            UserReq = item.UserReq,
                            ApprovalStatus = item.ApprovalStatus,
                            DateCrt = item.DateCrt,
                            Startdate = item.Startdate,
                            Enddate = item.Enddate,
                            Role = item.Role,
                            CarID = item.CarID
                        });
                    }
                    return ListSearch;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }
        public trxKintoSharePortalBookSubmit BookingDelete(int Bookid, string BookingNo)
        {
            try
            {
                var DeleteBook = new mstKintoSharePortalGetBookListRepository(_context);
                var CheckList = new trxKintoSharePortalBookSubmit();
                con.Open();
                CheckList = DeleteBook.DeleteBook(Bookid, BookingNo, con);
                return CheckList;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                con.Dispose();
            }
        }

        public trxKintoSharePortalAsset DeleteAsset (int AssetID)
        {
            try
            {
                var AssetRepo = new mstKintoSharePortalAssetRepository(_context);
                var CheckList = new trxKintoSharePortalAsset();
                con.Open();
                CheckList = AssetRepo.DeleteAsset(AssetID, con);
                return CheckList;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                con.Dispose();
            }

        }

        public List<mstKintoSharePortalGetList> PICList(String DeptID)
        {
            using (con)
            {
                try
                {
                    var PICRepo = new mstKintoSharePortalGetListRepository(_context);
                    var ListPIC = new List<mstKintoSharePortalGetList>();
                    con.Open();
                    return PICRepo.PICList(DeptID,con);
                    
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public List<trxKintoSharePortalBookSubmit> BookListIndex(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var BookRepo = new mstKintoSharePortalGetBookListRepository(_context);
                    var listBookingIndex = new List<trxKintoSharePortalBookSubmit>();

                        WhereCond = "";

                    con.Open();
                    listBookingIndex = BookRepo.LoadBookIndex(WhereCond, con);
                        var lbi = new trxKintoSharePortalBookSubmit();
                        var data = new List<trxKintoSharePortalBookSubmit>();
                        foreach (var item in listBookingIndex.Where(i => i.BookRepeat == "Y"))
                        {
                            data.Add(new trxKintoSharePortalBookSubmit
                            {
                                ID = item.ID,
                                BookingNo = item.BookingNo,
                                Cartype = item.Cartype,
                                Department = item.Department,
                                PlatNo = item.PlatNo,
                                PIC = item.PIC,
                                BookType = item.BookType,
                                Purpose = item.Purpose,
                                BookRepeat = item.BookRepeat,
                                DateFreq = item.DateFreq,
                                BookDate = item.BookDate,
                                UserReq = item.UserReq,
                                ApprovalStatus = item.ApprovalStatus,
                                DateCrt = item.DateCrt,
                                Enddate = (DateTime.ParseExact(item.Enddate, "yyyy-MM-dd", CultureInfo.InvariantCulture).AddDays(7)).ToString("yyyy-MM-dd"),/*(DateTime.ParseExact(item.Enddate, "yyyy-MM-dd", CultureInfo.InvariantCulture).AddDays(7)).ToString("yyyy-MM-dd"),*/
                                Startdate = (DateTime.ParseExact(item.Startdate, "yyyy-MM-dd", CultureInfo.InvariantCulture).AddDays(7)).ToString("yyyy-MM-dd"),
                                Role = item.Role,
                                CarID = item.CarID
                            });
                            //data.Add(lbi);
                        }
                        foreach(var item in data)
                        {
                            listBookingIndex.Add(new trxKintoSharePortalBookSubmit
                            {
                                ID = item.ID,
                                BookingNo = item.BookingNo,
                                Cartype = item.Cartype,
                                Department = item.Department,
                                PlatNo = item.PlatNo,
                                PIC = item.PIC,
                                BookType = item.BookType,
                                Purpose = item.Purpose,
                                BookRepeat = item.BookRepeat,
                                DateFreq = item.DateFreq,
                                BookDate = item.BookDate,
                                UserReq = item.UserReq,
                                ApprovalStatus = item.ApprovalStatus,
                                DateCrt = item.DateCrt,
                                Startdate = item.Startdate,
                                Enddate = item.Enddate,
                                Role = item.Role,
                                CarID = item.CarID
                            });
                        }

                        con.Close();
                    return listBookingIndex;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
                
        }

        public List<trxKintoSharePortalBookSubmit> ResourceAssetList(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var BookRepo = new mstKintoSharePortalGetBookListRepository(_context);
                    var listResourcesAsset = new List<trxKintoSharePortalBookSubmit>();

                    WhereCond = "";

                    con.Open();
                    listResourcesAsset = BookRepo.ListResourcesAsset(WhereCond, con);
                    return listResourcesAsset;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }
        public List<trxKintoSharePortalBookSubmit> BookList(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var BookRepo = new mstKintoSharePortalGetBookListRepository(_context);
                    var listBookingIndex = new List<trxKintoSharePortalBookSubmit>();
                    var useid = HttpContext.Current.Session["userId"].ToString();
                    var role = HttpContext.Current.Session["userRole"].ToString();

                    if (role == "admin")
                    {
                        WhereCond = "";
                    }
                    else
                    {
                        WhereCond = useid;
                    }

                    con.Open();
                    listBookingIndex = BookRepo.LoadBook(WhereCond, con);
                    con.Close();
                    return listBookingIndex;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }

        }
        private List<mstKintoSharePortalDepartmentList> Json(string v)
        {
            throw new NotImplementedException();
        }

        private List<trxKintoSharePortalAsset> strJson(string v)
        {
            throw new NotImplementedException();
        }

        public List<mstKintoSharePortalReport> LoadBookingListReport(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var BookListReportRepo = new mstKintoSharePortalReportRepository(_context);
                    var listBooking = new List<mstKintoSharePortalReport>();
                    //WhereCond = HttpContext.Current.Session["userId"].ToString();
                    WhereCond = "";
                    con.Open();
                    listBooking = BookListReportRepo.BookListReport(WhereCond, con);
                    con.Close();
                    return listBooking;
                }
                catch(Exception ex)
                {
                    con.Close();
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public mstKintoSharePortalChecklist SubmitChecklist(mstKintoSharePortalChecklist data)
        {
            using (con)
            {
                var ChecklistRepo = new trxKintoSharePortalChecklistRepository(_context);
                data.UserID = HttpContext.Current.Session["userId"].ToString();
                try
                {
                    con.Open();
                    ChecklistRepo.SubmitChecklist(data);
                    con.Close();
                    return (data);
                }
                catch (Exception ex)
                {
                    con.Close();
                    return (data);
                }
                finally
                {
                    con.Dispose();
                }
            }
                
        }

        public mstKintoSharePortalChecklist SubmitCheckOut(mstKintoSharePortalChecklist data)
        {
            using (con)
            {
                var CheckOutRepo = new trxKintoSharePortalChecklistRepository(_context);
                data.UserID = HttpContext.Current.Session["userId"].ToString();
                try
                {
                    con.Open();
                    CheckOutRepo.SubmitCheckOut(data);
                    con.Close();
                    return (data);
                }
                catch (Exception ex)
                {
                    con.Close();
                    return (data);
                }
                finally
                {
                    con.Dispose();
                }
            }

        }

        public List<mstKintoSharePortalApproval> LoadApprovalList(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var ApprovalRepo = new mstKintoSharePortalApprovalRepository(_context);
                    var listApproval = new List<mstKintoSharePortalApproval>();
                    var Role = HttpContext.Current.Session["userRole"].ToString();
                    con.Open();
                    if (Role == "admin")
                    {
                        listApproval = ApprovalRepo.LoadApproval(WhereCond, con);
                    }
                    else
                    {
                        WhereCond = HttpContext.Current.Session["userId"].ToString(); ;
                        listApproval = ApprovalRepo.LoadApproval(WhereCond, con);
                    }
                    con.Close();
                    return listApproval;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public mstKintoSharePortalApproval ApprovalSubmit(string BookNo, string Status)
        {
            using (con)
            {
                try
                {
                    var ApprovalRepo = new mstKintoSharePortalApprovalRepository(_context);
                    var ApprovalEnt = new mstKintoSharePortalApproval();
                    con.Open();
                    ApprovalRepo.SubmitApproval(BookNo, Status, con);
                    return ApprovalEnt;
                }
                catch (Exception ex)
                {
                    con.Close();
                    return JsonApproval("Error occurred. Error details: " + ex.Message);
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public mstKintoSharePortalApproval ApprovalCheckIn(string BookNumber, string Status)
        {
            using (con)
            {
                try
                {
                    var ApprovalRepo = new mstKintoSharePortalApprovalRepository(_context);
                    var ApprovalEnt = new mstKintoSharePortalApproval();
                    con.Open();
                    ApprovalRepo.SubmitApprovalCheckIn(BookNumber, Status, con);
                    return ApprovalEnt;
                }
                catch (Exception ex)
                {
                    con.Close();
                    return JsonApproval("Error occurred. Error details: " + ex.Message);
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        public mstKintoSharePortalApproval ApprovalCheckOut(string BookNumber, string Status)
        {
            using (con)
            {
                try
                {
                    var ApprovalRepo = new mstKintoSharePortalApprovalRepository(_context);
                    var ApprovalEnt = new mstKintoSharePortalApproval();
                    con.Open();
                    ApprovalRepo.SubmitApprovalCheckOut(BookNumber, Status, con);
                    return ApprovalEnt;
                }
                catch (Exception ex)
                {
                    con.Close();
                    return JsonApproval("Error occurred. Error details: " + ex.Message);
                }
                finally
                {
                    con.Dispose();
                }
            }
        }

        private mstKintoSharePortalApproval JsonApproval(string v)
        {
            throw new NotImplementedException();
        }
    }   
}
