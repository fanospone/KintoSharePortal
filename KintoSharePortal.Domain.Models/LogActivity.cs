using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public class LogActivity : BaseClass
    {
		public LogActivity()
		{
			this.ErrorType = 0;
			this.ErrorMessage = null;
		}
		public LogActivity(int errorType, string errorMessage)
		{
			this.ErrorType = errorType;
			this.ErrorMessage = errorMessage;
		}
		public int ID { get; set; }
		public string RequestNumber { get; set; }
		public int Status { get; set; }
		public string LogRemark { get; set; }
		public string Attachment { get; set; }
		public DateTime CreatedDate { get; set; }
		public string CreatedBy { get; set; }
		public DateTime? UpdatedDate { get; set; }
		public string UpdatedBy { get; set; }
	}
}
