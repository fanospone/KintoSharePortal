using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KintoSharePortal.Models
{
    public class DatatableAjaxModel
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public List<DatatableColumn> columns { get; set; }
        public DatatableSearch search { get; set; }
        public List<DatatableOrder> order { get; set; }
        public string strOrderBy { get; set; }
        public int ErrorType { get; set; } 
        public string ErrorMessage { get; set; } 
    }
}