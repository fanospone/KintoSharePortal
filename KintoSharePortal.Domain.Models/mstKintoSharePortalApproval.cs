using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public class mstKintoSharePortalApproval : BaseClass
    {
        public mstKintoSharePortalApproval()
        {
            this.ErrorType = 0;
            this.ErrorMessage = null;
        }
        public mstKintoSharePortalApproval(int errorType, string errorMessage)
        {
            this.ErrorType = errorType;
            this.ErrorMessage = errorMessage;
        }
        public int? ID { get; set; }
        public string Bookno { get; set; }
        public string Cartype { get; set; }
        public string Platno { get; set; }
        public string Department { get; set; }
        public string PIC { get; set; }
        public string Bookdate { get; set; }
        public string Approvalstatus { get; set; }
        public string Requester { get; set; }
        public decimal? Kintosharefee { get; set; }

        public List<mstKintoSharePortalApproval> Showallapproval {get;set;}
    }
}
