using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KintoSharePortal.Domain.Repository;
using System.Data;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using System.Data.SqlClient;

namespace KintoSharePortal.Domain.Repository
{
    public class mstKintoSharePortalAssetRepository : BaseRepository<trxKintoSharePortalAsset>
    {
        private DbContext _context;
        public mstKintoSharePortalAssetRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        public trxKintoSharePortalAddAsset AddAsset(trxKintoSharePortalAddAsset data, SqlConnection con)
        {
            return pAddAsset(data, con);
        }
        public List<trxKintoSharePortalAsset> LoadAsset(string WhereCond, SqlConnection con)
        {
            return pLoadAsset( WhereCond, con);
        }

        private trxKintoSharePortalAddAsset pAddAsset(trxKintoSharePortalAddAsset data, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("",con);

                string xml = Helper.XmlSerializer<trxKintoSharePortalAddAsset>(data);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_ASSET";

                cmd.Parameters.Add(cmd.CreateParameter("@vXml", xml));

                cmd.ExecuteNonQuery();

                return data;
            }
        }

        private List<trxKintoSharePortalAsset> pLoadAsset(string WhereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_ASSETDETAIL";

                cmd.Parameters.Add(cmd.CreateParameter("@vWhereCond", WhereCond));

                return this.ReadTransaction(cmd).ToList();
            }
                
        }
    }
}
