using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public class trxKintoSharePortalAsset: BaseClass
    {
        public trxKintoSharePortalAsset()
        {
            this.ErrorType = 0;
            this.ErrorMessage = null;
        }
        public trxKintoSharePortalAsset(int errorType, string errorMessage)
        {
            this.ErrorType = errorType;
            this.ErrorMessage = errorMessage;
        }
        public string carType { get; set; }
        public string platNo { get; set; }
        public int capacity { get; set; }
        public string accessories { get; set; }
        public string status { get; set; }
        //public int availability { get; set; }
        public string chasisNo { get; set; }
        public string engineNo { get; set; }
        public decimal feeweekday { get; set; }
        public decimal feeweekend { get; set; }
        public string userID { get; set; }
        public int ID { get; set; }

        public List<trxKintoSharePortalAsset> ShowAllAsset { get; set; }
    }
}
