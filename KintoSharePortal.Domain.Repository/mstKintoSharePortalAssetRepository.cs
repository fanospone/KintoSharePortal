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
        public trxKintoSharePortalAddAsset SaveEditAsset(trxKintoSharePortalAddAsset data, SqlConnection con)
        {
            return pSaveEditAsset(data, con);
        }
        public List<trxKintoSharePortalAsset> LoadAsset(string WhereCond, SqlConnection con)
        {
            return pLoadAsset( WhereCond, con);
        }
        public trxKintoSharePortalAsset CheckAsset(int AssetID, SqlConnection con)
        {
            return pCheckAsset(AssetID, con);
        }
        public trxKintoSharePortalAsset DeleteAsset(int AssetID, SqlConnection con)
        {
            return pDeleteAsset(AssetID, con);
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

        private trxKintoSharePortalAddAsset pSaveEditAsset(trxKintoSharePortalAddAsset data, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_EDITASSET";
                cmd.Parameters.Add(cmd.CreateParameter("@ID", data.ID));
                cmd.Parameters.Add(cmd.CreateParameter("@carType", data.carType));
                cmd.Parameters.Add(cmd.CreateParameter("@platNo", data.platNo));
                cmd.Parameters.Add(cmd.CreateParameter("@capacity", data.capacity));
                cmd.Parameters.Add(cmd.CreateParameter("@accessories", data.accessories));
                cmd.Parameters.Add(cmd.CreateParameter("@status", data.status));
                cmd.Parameters.Add(cmd.CreateParameter("@chasisNo", data.chasisNo));
                cmd.Parameters.Add(cmd.CreateParameter("@engineNo", data.engineNo));
                cmd.Parameters.Add(cmd.CreateParameter("@feeWeekday", data.feeweekday));
                cmd.Parameters.Add(cmd.CreateParameter("@feeWeekend", data.feeweekend));
                cmd.Parameters.Add(cmd.CreateParameter("@userUpdt", data.userID));

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

        private trxKintoSharePortalAsset pCheckAsset (int AssetID, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKASSET";
                cmd.Parameters.Add(cmd.CreateParameter("@ID", AssetID));

                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }

        private trxKintoSharePortalAsset pDeleteAsset(int AssetID, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_DELETEASSET";
                cmd.Parameters.Add(cmd.CreateParameter("@ID", AssetID));

                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }
    }
}
