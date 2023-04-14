using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KintoSharePortal.Models
{
    public class UserModel
    {
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string position { get; set; }
        public string name { get; set; }
        public string status { get; set; }
        public string level { get; set; }
        public string orgdesc { get; set; }
        public string dtm_crt { get; set; }
        public string dtm_upd { get; set; }
        public string message { get; set; }
        public string OTP { get; set; }
        public string role { get; set; }
        public string usr_crt { get; set; }
        public int is_active { get; set; }
        public string formType { get; set; }
    }
}