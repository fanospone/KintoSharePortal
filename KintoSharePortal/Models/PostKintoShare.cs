using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KintoSharePortal.Models.Datatable
{
    public class PostKintoShare : DatatableAjaxModel
    {
        public string carType { get; set; }
        public string licensePlatNo { get; set; }
        public string capacity { get; set; }
        public string accessories { get; set; }
        public string status { get; set; }
        public int availability { get; set; }
        public string chasisNo { get; set; }
        public string engineNo { get; set; }
        public double feeweekday { get; set; }
        public double feeweekend { get; set; }
        public string userID { get; set; }
    }
}