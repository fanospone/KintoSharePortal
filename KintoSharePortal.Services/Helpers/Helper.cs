using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using KintoSharePortal.Domain.Repository;

namespace KintoSharePortal.Services
{
    public static class Helper
    {
        #region Enum
        public enum ErrorType : int
        {
            None = 0,
            Validation = 1,
            Error = 2
        }
        #endregion
        //public static IDbConnectionFactory GetConnection()
        //{
        //    return new DbConnectionFactory("connectionString");
        //}
        public static IDbConnectionFactory GetConnection(string strConnection)
        {
            return new DbConnectionFactory(strConnection);
        }
        //public static string LogError(string strError, string strService, string strMethod, string strUserID)
        //{
        //    var context = new DbContext(Helper.GetConnection());
        //    var errorRepo = new logErrorRepository(context);

        //    logError error = new logError();
        //    error.ErrorMessages = strError;
        //    error.Service = strService;
        //    error.Method = strMethod;
        //    error.CreatedDate = Helper.GetDateTimeNow();
        //    error.CreatedBy = strUserID;
        //    error = errorRepo.Create(error);

        //    return "Error on System (Error Log: " + error.ErrorID + "). Please Call IT Help Desk!";
        //}
    }
}
