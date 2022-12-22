using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KintoSharePortal.Models
{
    public class UserModel
    {
        public int id { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string position { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string status { get; set; }
        [Required]
        public string level { get; set; }
        [Required]
        public string orgdesc { get; set; }
        [Required]
        public string dtm_crt { get; set; }
        [Required]
        public string dtm_upd { get; set; }
        [Required]
        public string message { get; set; }
        [Required]
        public string OTP { get; set; }
        [Required]
        public string role { get; set; }
        [Required]
        public string usr_crt { get; set; }
        [Required]
        public int? is_active { get; set; }
        [Required]
        public string formType { get; set; }
    }
}