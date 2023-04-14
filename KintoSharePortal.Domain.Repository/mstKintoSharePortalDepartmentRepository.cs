using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using System.Data.SqlClient;

namespace KintoSharePortal.Domain.Repository
{
    public class mstKintoSharePortalDepartmentRepository: BaseRepository<mstKintoSharePortalDepartmentList>
    {
        private DbContext _context;
        public mstKintoSharePortalDepartmentRepository(DbContext context) : base(context)
        {
            _context = context;
        }
        public List<mstKintoSharePortalDepartmentList> DepartmentList(string whereCond, SqlConnection con)
        {
            return pDepartmentList(whereCond,con);
        }
        private List<mstKintoSharePortalDepartmentList> pDepartmentList(string whereCond, SqlConnection con)
        {
            using (var command = con)
            {
                SqlCommand cmd = new SqlCommand("", con);

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spKINTOSHARE_DEPARTMENT";

                cmd.Parameters.Add(cmd.CreateParameter("@vWhereCond", whereCond));
                return this.ReadTransaction(cmd).ToList();
            }
        }
    }
}
