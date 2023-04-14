using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KintoSharePortal.DataAccess
{
    public class OTPAuth
    {
        private static bool _resultArray;
        public static bool result()
        {
            return _resultArray;
        }
        public bool GenOTP(string domain, string username, string appid)
        {
            bool _resultArray;
            try
            {
                //_resultArray = false;
                var restclient = new RestClient(domain);
                var request = new RestRequest(Method.POST);
                string JsonToSend = "{'Username': '" + username + "','AppID':'" + appid + "'}";
                request.AddParameter("application/json; charset=utf-8", JsonToSend, ParameterType.RequestBody);
                request.RequestFormat = DataFormat.Json;
                IRestResponse response = restclient.Execute(request);
                var resultToken = response.Content.ToString();
                var payload = JObject.Parse(resultToken);
                _resultArray = payload.Value<bool>("Result");

                //Update the new path to the user in the directory.
                //return _resultArray;
            }
            catch (Exception ex)
            {
                throw new Exception("Error Generate OTP. " + ex.Message);
            }
            return _resultArray;

        }

        public bool CheckOTP(string domain, string username, string appid, string OTP)
        {
            bool _resultArray;
            try
            {
                //_resultArray = false;
                var restclient = new RestClient(domain);
                var request = new RestRequest(Method.POST);
                string JsonToSend = "{'Username': '" + username + "','AppID':'" + appid + "','OTP':'" + OTP + "'}";
                request.AddParameter("application/json; charset=utf-8", JsonToSend, ParameterType.RequestBody);
                request.RequestFormat = DataFormat.Json;
                IRestResponse response = restclient.Execute(request);
                var resultToken = response.Content.ToString();
                var payload = JObject.Parse(resultToken);
                _resultArray = payload.Value<bool>("Result");

                //Update the new path to the user in the directory.
                //return _resultArray;
            }
            catch (Exception ex)
            {
                throw new Exception("Error Check OTP. " + ex.Message);
            }
            return _resultArray;

        }
    }
}