using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;

namespace KintoSharePortal.Domain.Repository
{
    public class trxKintoSharePortalChecklistRepository : BaseRepository<mstKintoSharePortalChecklist>
    {
        private DbContext _context;
        public trxKintoSharePortalChecklistRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString);

        public mstKintoSharePortalChecklist SubmitChecklist(mstKintoSharePortalChecklist data)
        {
            return pSubmitChecklist(data);
        }
        public mstKintoSharePortalChecklist SubmitCheckOut(mstKintoSharePortalChecklist data)
        {
            return pSubmitCheckOut(data);
        }

        private mstKintoSharePortalChecklist pSubmitChecklist(mstKintoSharePortalChecklist data)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                string xml = Helper.XmlSerializer<mstKintoSharePortalChecklist>(data);
                con.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKINSUBMIT";

                cmd.Parameters.Add(cmd.CreateParameter("@vXml", xml));

                cmd.ExecuteNonQuery();
                return data;
            }
        }
        private mstKintoSharePortalChecklist pSubmitCheckOut(mstKintoSharePortalChecklist data)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                string xml = Helper.XmlSerializer<mstKintoSharePortalChecklist>(data);
                con.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKOUTSUBMIT";

                cmd.Parameters.Add(cmd.CreateParameter("@vXml", xml));

                cmd.ExecuteNonQuery();
                return data;
            }
        }
    }
}
