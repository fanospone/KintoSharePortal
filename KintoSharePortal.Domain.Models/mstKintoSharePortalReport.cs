using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public class mstKintoSharePortalReport : BaseClass
    {
        public mstKintoSharePortalReport()
        {
            this.ErrorType = 0;
            this.ErrorMessage = null;
        }
        public mstKintoSharePortalReport(int errorType, string errorMessage)
        {
            this.ErrorType = errorType;
            this.ErrorMessage = errorMessage;
        }
        public string BookingNo { get; set; }
        public string Cartype { get; set; }
        public string Department { get; set; }
        public string PlatNo { get; set; }
        public string PIC { get; set; }
        public string BookType { get; set; }
        public string Purpose { get; set; }
        public string BookRepeat { get; set; }
        public decimal KintoShareFee { get; set; }
        public string DateFreq { get; set; }
        public string BookDate { get; set; }
        public string UserReq { get; set; }
        public string ApprovalStatus { get; set; }
        public int? ID { get; set; }
        public string DateCrt { get; set; }
        public string Reporttype { get; set; }
        public string Startdate { get; set; }
        public string Enddate { get; set; }
        public string RowIndex { get; set; }
        public decimal? CapexAmount { get; set; }
        public decimal? RevenueAmount { get; set; }
        public decimal? CompensationAmount { get; set; }
        public decimal? Revenue { get; set; }
        public decimal? Charge { get; set; }
    }
}
