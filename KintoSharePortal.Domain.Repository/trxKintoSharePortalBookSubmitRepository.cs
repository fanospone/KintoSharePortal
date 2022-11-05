using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace KintoSharePortal.Domain.Repository
{
    public class trxKintoSharePortalBookSubmitRepository : BaseRepository<trxKintoSharePortalBookSubmit>
    {
        private DbContext _context;
        public trxKintoSharePortalBookSubmitRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString);

        public trxKintoSharePortalBookSubmit SubmitBook(trxKintoSharePortalBookSubmit data)
        {
            return pSubmitBook(data);
        }
        public List<trxKintoSharePortalBookSubmit> SearchList(string WhereCond , SqlConnection con)
        {
            return pSearchList(WhereCond);
        }
        private trxKintoSharePortalBookSubmit pSubmitBook(trxKintoSharePortalBookSubmit data)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                string xml = Helper.XmlSerializer<trxKintoSharePortalBookSubmit>(data);
                con.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKINGREQUEST";

                cmd.Parameters.Add(cmd.CreateParameter("@vXml", xml));

                cmd.ExecuteNonQuery();
    
                return data;
            }
        }

        private List<trxKintoSharePortalBookSubmit> pSearchList (string WhereCond)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                con.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_GETSEARCHLIST";

                cmd.Parameters.Add(cmd.CreateParameter("@WhereCond", WhereCond));
                return this.ReadTransaction(cmd).ToList();
            }
        }
    }
}
