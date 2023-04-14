using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using System.Data.SqlClient;
using System.Configuration;

namespace KintoSharePortal.Domain.Repository
{
    public class mstKintoSharePortalApprovalRepository: BaseRepository<mstKintoSharePortalApproval>
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString);
        private DbContext _context;
        public mstKintoSharePortalApprovalRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        public List<mstKintoSharePortalApproval> LoadApproval(string WhereCond, SqlConnection con)
        {
            return pLoadApproval(WhereCond, con);
        }
        public mstKintoSharePortalApproval SubmitApproval(string BookNo,  string Status, SqlConnection con)
        {
            return pSubmitApproval(BookNo, Status, con);
        }
        public mstKintoSharePortalApproval SubmitApprovalCheckIn(string BookNumber, string Status, SqlConnection con)
        {
            return pSubmitApprovalCheckIn(BookNumber, Status, con);
        }
        public mstKintoSharePortalApproval SubmitApprovalCheckOut(string BookNumber, string Status, SqlConnection con)
        {
            return pSubmitApprovalCheckOut(BookNumber, Status, con);
        }

        private List<mstKintoSharePortalApproval> pLoadApproval(string WhereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKAPPROVALLIST";

                cmd.Parameters.Add(cmd.CreateParameter("@UserID", WhereCond));

                return this.ReadTransaction(cmd).ToList();
            }
        }
        private mstKintoSharePortalApproval pSubmitApproval (string BookNo, string Status, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKAPPROVAL";

                cmd.Parameters.Add(cmd.CreateParameter("@Bookno", BookNo));
                cmd.Parameters.Add(cmd.CreateParameter("@Status", Status));

                //cmd.ExecuteNonQuery();
                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }
        private mstKintoSharePortalApproval pSubmitApprovalCheckIn(string BookNumber, string Status, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKINAPPROVAL";

                cmd.Parameters.Add(cmd.CreateParameter("@BookNo", BookNumber));
                cmd.Parameters.Add(cmd.CreateParameter("@ApprovalStatus", Status));

                //cmd.ExecuteNonQuery();
                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }
        private mstKintoSharePortalApproval pSubmitApprovalCheckOut(string BookNumber, string Status, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKOUTAPPROVAL";

                cmd.Parameters.Add(cmd.CreateParameter("@BookNo", BookNumber));
                cmd.Parameters.Add(cmd.CreateParameter("@ApprovalStatus", Status));

                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }

    }
}
