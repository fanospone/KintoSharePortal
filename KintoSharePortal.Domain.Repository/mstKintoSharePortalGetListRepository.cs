using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;

namespace KintoSharePortal.Domain.Repository
{
    public class mstKintoSharePortalGetListRepository : BaseRepository<mstKintoSharePortalGetList>
    {
        private DbContext _context;
        public mstKintoSharePortalGetListRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        public List<mstKintoSharePortalGetList> CarList(string whereCond, SqlConnection con)
        {
            return pCarList(whereCond, con);
        }
        public List<mstKintoSharePortalGetList> PICList(string DeptID, SqlConnection con)
        {
            return pPICList(DeptID, con);
        }
        public List<mstKintoSharePortalGetList> BookingHeaderList (string WhereCond, SqlConnection con)
        {
            return pBookingHeaderList(WhereCond, con);
        }
        public mstKintoSharePortalGetList PlatNo (int CarId, SqlConnection con)
        {
            return pPlatNo(CarId, con);
        }
        private List<mstKintoSharePortalGetList> pCarList(string whereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_ASSETLIST";

                cmd.Parameters.Add(cmd.CreateParameter("@vWhereCond", whereCond));
                return this.ReadTransaction(cmd).ToList();
            }
        }
        private List<mstKintoSharePortalGetList> pPICList(string DeptID, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_GETEMPLOYEE";

                cmd.Parameters.Add(cmd.CreateParameter("@DeptID", DeptID));
                return this.ReadTransaction(cmd).ToList();
            }
        }
        private List<mstKintoSharePortalGetList> pBookingHeaderList(string whereCond, SqlConnection con) 
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKINGHEADERLIST";

                cmd.Parameters.Add(cmd.CreateParameter("@DeptID", whereCond));
                return this.ReadTransaction(cmd).ToList();
            }
        }
        private mstKintoSharePortalGetList pPlatNo(int CarId, SqlConnection con)
        {
            var trxGetPlatNo = new mstKintoSharePortalGetList();
            using (var command  = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_GETPLATNO";

                cmd.Parameters.Add(cmd.CreateParameter("@CarID", CarId));
                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }
    }
}
