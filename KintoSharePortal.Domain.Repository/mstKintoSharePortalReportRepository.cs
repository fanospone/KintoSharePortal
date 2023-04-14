using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Repository
{
    public class mstKintoSharePortalReportRepository : BaseRepository<mstKintoSharePortalReport>
    {
        private DbContext _context;
        public mstKintoSharePortalReportRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString);

        public List<mstKintoSharePortalReport> BookListReport(string WhereCond, SqlConnection con)
        {
            return pBookListReport(WhereCond, con);
        }
        public List<mstKintoSharePortalReport> UserReport(string WhereCond, SqlConnection con)
        {
            return pUserReport(WhereCond, con);
        }
        private List<mstKintoSharePortalReport> pBookListReport(string WhereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKINGREPORT";

                cmd.Parameters.Add(cmd.CreateParameter("@WhereCond", WhereCond));
                return this.ReadTransaction(cmd).ToList();
            }
        }
        private List<mstKintoSharePortalReport> pUserReport(string WhereCond, SqlConnection con)
        {
            //if (WhereCond != "")
            //{
            //    WhereCond = "b." + WhereCond;
            //}
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_REPORTUSER";
                cmd.Parameters.Add(cmd.CreateParameter("@WhereCond", WhereCond));
                return this.ReadTransaction(cmd).ToList();
            }
        }


    }
}
