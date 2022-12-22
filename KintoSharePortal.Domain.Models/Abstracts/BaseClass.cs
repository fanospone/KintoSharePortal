using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.Models
{
    public abstract class BaseClass
    {
        public int ErrorType { get; set; }
        [Required]
        public string ErrorMessage { get; set; }
    }
}
