using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public class mstKintoSharePortalGetList : BaseClass
    {
        public mstKintoSharePortalGetList()
        {
            this.ErrorType = 0;
            this.ErrorMessage = null;
        }
        public mstKintoSharePortalGetList(int errorType, string errorMessage)
        {
            this.ErrorType = errorType;
            this.ErrorMessage = errorMessage;
        }
        public int? ID { get; set; }
        public int? CarId { get; set; }
        public string CarName { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }

        public string BookingNO { get; set; }
        public string BookType { get; set; }
        public DateTime RequestDate { get; set; }
        public string CarType { get; set; }
        public string Department { get; set; }
        public string PlatNo { get; set; }
        public decimal? FeeWeekDay { get; set; }
        public decimal? FeeWeekEnd { get; set; }
    }
}
