using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public class mstKintoSharePortalChecklist : BaseClass
    {
        public mstKintoSharePortalChecklist()
        {
            this.ErrorType = 0;
            this.ErrorMessage = null;
        }
        public mstKintoSharePortalChecklist(int errorType, string errorMessage)
        {
            this.ErrorType = errorType;
            this.ErrorMessage = errorMessage;
        }
        public int? ID { get; set; }
        public string bookNo { get; set; }
        public string rbff { get; set; }
        public string rbdash { get; set; }
        public string rbSeat { get; set; }
        public string rbbmprf { get; set; }
        public string rbbmpr { get; set; }
        public string rbfenderrf { get; set; }
        public string rbfenderlf { get; set; }
        public string rbfenderrb { get; set; }
        public string rbfenderlb { get; set; }
        public string rbkm { get; set; }
        public string rbstnk { get; set; }
        public string rbserviceBook { get; set; }
        public string rbvelg { get; set; }
        public string rbbanrf { get; set; }
        public string rbbanlf { get; set; }
        public string rbbanrb { get; set; }
        public string rbbanlb { get; set; }
        public string rbdongkrak { get; set; }
        public string rbkaca { get; set; }
        public string rbkf { get; set; }
        public string rbaudio { get; set; }
        public string rbac { get; set; }
        public string rbbancdg { get; set; }
        public string rbfuel { get; set; }
        public string UserID { get; set; }
        public decimal? KintoShareFee { get; set; }
        public decimal? Charge { get; set; }
        public int? bodyrepair { get; set; }
        public string cleaniness { get; set; }
        public string smoke { get; set; }
        public string parking { get; set; }
        public string BookingNo { get; set; }
        public string Cartype { get; set; }
        public string Department { get; set; }
        public string PlatNo { get; set; }
        public string PIC { get; set; }
        public string BookType { get; set; }
        public string Purpose { get; set; }
        public string BookDate { get; set; }
        public string UserReq { get; set; }
        public string ApprovalStatus { get; set; }
        public string Startdate { get; set; }
        public string Enddate { get; set; }
        public string Role { get; set; }
        public string CheckInStatus { get; set; }
        public string CheckOutStatus { get; set; }
        public int? IsCheckIn { get; set; }
        public int? IsCheckOut { get; set; }
        public string fuelCI { get; set; }
        public string fuel { get; set; }
        public string smokeci { get; set; }
        public int? bodyrepairci { get; set; }
        public string cleaninessci { get; set; }

        public List<mstKintoSharePortalChecklist> ShowAllApproval { get; set; }
    }
}
