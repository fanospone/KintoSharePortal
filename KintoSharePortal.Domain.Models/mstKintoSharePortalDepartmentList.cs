using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public class mstKintoSharePortalDepartmentList : BaseClass
    {
        public mstKintoSharePortalDepartmentList()
        {
            this.ErrorType = 0;
            this.ErrorMessage = null;
        }
        public mstKintoSharePortalDepartmentList(int errorType, string errorMessage)
        {
            this.ErrorType = errorType;
            this.ErrorMessage = errorMessage;
        }
        public int? DeptId { get; set; }
        public string DeptName { get; set; }

    }
}
