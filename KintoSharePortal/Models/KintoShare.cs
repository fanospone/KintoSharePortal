using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using KintoSharePortal.Domain.Models;

namespace KintoSharePortal.Models
{
    public class KintoShare
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Key]
        public string NoRek { get; set; }

        [Required]
        [MaxLength(100)]
        public string CustName { get; set; }
        public string DataID { get; set; }
        public string BranchName { get; set; }
        public string CustId { get; set; }
        public DateTime RealisasiDate { get; set; }
        public string CaraBayar { get; set; }
        public string BranchCity { get; set; }
        public string ContractDate { get; set; }
        public string CustAddr { get; set; }
        public string KelKac { get; set; }
        public string Kabupaten { get; set; }
        public string Phone { get; set; }
        public string Handphone { get; set; }
        public string NoPerjanjian { get; set; }
        public string JatuhTempoDate { get; set; }
        public string BesarAngsuran { get; set; }
        public string BranchZip { get; set; }
        public string HeadBranch { get; set; }
        public string Description { get; set; }
        public string BranchAddr { get; set; }
        public byte[] ImageSigner { get; set; }
        public string OfficerID { get; set; }
        public string OfficerName { get; set; }
        public string OFFICE_NAME { get; set; }
        public string BranchId { get; set; }

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

        public List<trxKintoSharePortalAsset> ShowAllAsset { get; set; }

        public List<KintoShare> ShowAllCustomer { get; set; }
        public List<KintoShare> ShowAllSignature { get; set; }
        public List<Branch> ShowAllBranch { get; set; }
        public List<KaCab> ShowAllKaCab { get; set; }
        public List<UserModel> ShowAllUserFoundation { get; set; }
        public List<UserModel> ShowAllUser { get; set; }
    }
    public class SearchKintoShare
    {
        public string Start { get; set; }
        public string End { get; set; }
        public string AggrementNo { get; set; }
        public string Cabang { get; set; }
        public string CaraBayar { get; set; }
    }
    public class Signature
    {
        public string BranchId { get; set; }
        public string OfficerID { get; set; }
    }
}