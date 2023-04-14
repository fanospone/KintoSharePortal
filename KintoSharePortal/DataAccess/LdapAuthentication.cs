using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.DirectoryServices;
using System.Linq;
using System.Text;

namespace KintoSharePortal.DataAccess
{
    public class LdapAuthentication
    {
        private string _path;
        private string _filterAttribute;

        public LdapAuthentication(string path)
        {
            _path = path;
        }
        public string GetUser()
        {
            return _filterAttribute;
        }
        public bool IsAuthenticated(string domain, string username, string pwd)
        {
            string domainAndUsername = domain + @"\" + username; 
            DirectoryEntry entry = new DirectoryEntry(_path, domainAndUsername, pwd);

            try
            {
                //Bind to the native AdsObject to force authentication.
                object obj = entry.NativeObject;

                DirectorySearcher search = new DirectorySearcher(entry);

                search.Filter = "(SAMAccountName=" + username + ")";
                search.PropertiesToLoad.Add("cn");
                SearchResult result = search.FindOne();

                if (null == result)
                {
                    return false;
                }

                //Update the new path to the user in the directory.
                _path = result.Path;
                _filterAttribute = (string)result.Properties["cn"][0];
            }
            catch (Exception ex)
            {
                throw new Exception("Error authenticating user. " + ex.Message);
            }

            return true;
        }
        public bool IsAuthenticatedPost(string domain, string username, string pwd)
        {
            bool _resultArray;
            try
            {
                //_resultArray = false;
                var restclient = new RestClient(domain);
                var request = new RestRequest(Method.POST);
                string JsonToSend = "{'Username': '" + username + "','Password':'" + pwd + "'}";
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
                throw new Exception("Error authenticating user. " + ex.Message);
            }
            return _resultArray;

        }
        public string GetGroups()
        {
            DirectorySearcher search = new DirectorySearcher(_path);
            search.Filter = "(cn=" + _filterAttribute + ")";
            search.PropertiesToLoad.Add("memberOf");
            StringBuilder groupNames = new StringBuilder();

            try
            {
                SearchResult result = search.FindOne();
                int propertyCount = result.Properties["memberOf"].Count;
                string dn;
                int equalsIndex, commaIndex;

                for (int propertyCounter = 0; propertyCounter < propertyCount; propertyCounter++)
                {
                    dn = (string)result.Properties["memberOf"][propertyCounter];
                    equalsIndex = dn.IndexOf("=", 1);
                    commaIndex = dn.IndexOf(",", 1);
                    if (-1 == equalsIndex)
                    {
                        return null;
                    }
                    groupNames.Append(dn.Substring((equalsIndex + 1), (commaIndex - equalsIndex) - 1));
                    groupNames.Append("|");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error obtaining group names. " + ex.Message);
            }
            return groupNames.ToString();
        }
    }
}