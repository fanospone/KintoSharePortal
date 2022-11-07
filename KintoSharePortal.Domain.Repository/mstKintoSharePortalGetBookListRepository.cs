using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KintoSharePortal.Domain.Models;
using KintoSharePortal.Domain.DA;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace KintoSharePortal.Domain.Repository
{
    public class mstKintoSharePortalGetBookListRepository : BaseRepository<trxKintoSharePortalBookSubmit>
    {
        private DbContext _context;
        public mstKintoSharePortalGetBookListRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString);

        public trxKintoSharePortalBookSubmit GetBookNo()
        {
            return pGetBookNo();
        }

        public List<trxKintoSharePortalBookSubmit> LoadBook(string WhereCond, SqlConnection con)
        {
            return pLoadBook(WhereCond, con);
        }
        public List<trxKintoSharePortalBookSubmit> LoadBookIndex(string WhereCond, SqlConnection con)
        {
            return pLoadBookIndex(WhereCond, con);
        }
        public List<trxKintoSharePortalBookSubmit> ListResourcesAsset(string WhereCond, SqlConnection con)
        {
            return pListResourcesAsset(WhereCond, con);
        }
        public trxKintoSharePortalBookSubmit DeleteBook(int Bookid, string BookingNo, SqlConnection con)
        {
            return pDeleteBook(Bookid, BookingNo, con);
        }

        public trxKintoSharePortalBookSubmit CheckBooking (string BookingNo, SqlConnection con)
        {
            return pCheckBooking(BookingNo, con);
        }
        public List<trxKintoSharePortalBookSubmit> BookListIndex( SqlConnection con)
        {
            return pBookListIndex(con);
        }
        
        public List<trxKintoSharePortalBookSubmit> ListBookRepeat(string car, string startDate, string endDate, SqlConnection con)
        {
            return pListBookRepeat(car, startDate, endDate, con);
        }

        public List<trxKintoSharePortalBookSubmit> ListAssetDate(string car, string startDate, string endDate, SqlConnection con)
        {
            return pListAssetDate(car, startDate, endDate, con);
        }
        private trxKintoSharePortalBookSubmit pGetBookNo()
        {
            var trxGetPlatNo = new mstKintoSharePortalGetList();
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                con.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_GETBOOKNO";
                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }

        private List<trxKintoSharePortalBookSubmit> pLoadBook(string WhereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKLIST";

                cmd.Parameters.Add(cmd.CreateParameter("@UserID", WhereCond));

                return this.ReadTransaction(cmd).ToList();
            }

        }

        private List<trxKintoSharePortalBookSubmit> pLoadBookIndex(string WhereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKLISTINDEX";

                cmd.Parameters.Add(cmd.CreateParameter("@UserID", WhereCond));

                return this.ReadTransaction(cmd).ToList();
            }

        }
        private List<trxKintoSharePortalBookSubmit> pListResourcesAsset(string WhereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_GETRESOURCESASSET";

                return this.ReadTransaction(cmd).ToList();
            }

        }

        private trxKintoSharePortalBookSubmit pDeleteBook(int Bookid, string BookingNo, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_DELETEBOOK";

                cmd.Parameters.Add(cmd.CreateParameter("@ID", Bookid));
                cmd.Parameters.Add(cmd.CreateParameter("@BookNo", BookingNo));
                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }

        private trxKintoSharePortalBookSubmit pCheckBooking( string BookingNo, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKBOOKING";

                cmd.Parameters.Add(cmd.CreateParameter("@BookNo", BookingNo));
                return this.ReadTransaction(cmd).SingleOrDefault();
            }
        }

        private List<trxKintoSharePortalBookSubmit> pBookListIndex (SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_BOOKLISTFORINDEX";

                return this.ReadTransaction(cmd).ToList();
            }
        }

        private List<trxKintoSharePortalBookSubmit> pListBookRepeat(string car, string startDate, string endDate, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKBOOKREPEAT";

                cmd.Parameters.Add(cmd.CreateParameter("@Cartype", car));
                cmd.Parameters.Add(cmd.CreateParameter("@StartDate", startDate));
                cmd.Parameters.Add(cmd.CreateParameter("@EndDate", endDate));
                return this.ReadTransaction(cmd).ToList();
            }
        }
        private List<trxKintoSharePortalBookSubmit> pListAssetDate(string car, string startDate, string endDate, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_CHECKBOOKASSETDATE";

                cmd.Parameters.Add(cmd.CreateParameter("@Cartype", car));
                cmd.Parameters.Add(cmd.CreateParameter("@StartDate", startDate));
                cmd.Parameters.Add(cmd.CreateParameter("@EndDate", endDate));

                return this.ReadTransaction(cmd).ToList();
            }
        }
    }
}
