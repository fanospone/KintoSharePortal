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

namespace KintoSharePortal.Services
{
    public class KintoSharePortalServiceReport : BaseService
    {
        private DbContext _context;
        private DateTime _dtNow;
        private mstKintoSharePortalAssetRepository _mstKintoSharePortalAssetRepository;

        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString);

        public List<mstKintoSharePortalReport> LoadBookingListReport(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var BookListReportRepo = new mstKintoSharePortalReportRepository(_context);
                    var listBooking = new List<mstKintoSharePortalReport>();
                    //WhereCond = HttpContext.Current.Session["userId"].ToString();
                    if (WhereCond == "")
                    {
                        WhereCond = "";
                    }

                    con.Open();
                    listBooking = BookListReportRepo.BookListReport(WhereCond, con);
                    con.Close();
                    return listBooking;
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

        public List<mstKintoSharePortalReport> UserListReport(string WhereCond)
        {
            using (con)
            {
                try
                {
                    var UserListReportRepo = new mstKintoSharePortalReportRepository(_context);
                    var UserList = new List<mstKintoSharePortalReport>();
                    //WhereCond = HttpContext.Current.Session["userId"].ToString();
                    if (WhereCond == "")
                    {
                        WhereCond = "";
                    }
                    con.Open();
                    UserList = UserListReportRepo.UserReport(WhereCond, con);
                    con.Close();
                    return UserList;
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

    }
}
