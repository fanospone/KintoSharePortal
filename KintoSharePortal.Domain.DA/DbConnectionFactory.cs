using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.DA
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        private readonly DbProviderFactory _provider;
        private readonly string _connectionString;
        private readonly string _name;

        /// <summary>
        /// DbConnectionFactory Contructor
        /// </summary>
        /// <param name="connectionName">Connection Name</param>
        public DbConnectionFactory(string connectionName)
        {
            if (connectionName == null) throw new ArgumentNullException("connectionName");

            ConnectionStringSettings conStr = ConfigurationManager.ConnectionStrings[connectionName];
            if (conStr == null)
                throw new ConfigurationErrorsException(string.Format("Failed to find connection string named '{0}' in app/web.config.", connectionName));

            _name = conStr.ProviderName;
            //_provider = DbProviderFactories.GetFactory(conStr.ProviderName);

            if (conStr.ConnectionString.Contains("Data Source"))
            {
                _connectionString = conStr.ConnectionString;
            }
            else
            {
                var ConStringDecrypt = CryptoHelper.Decrypt(conStr.ConnectionString);
                _connectionString = ConStringDecrypt;
            }
        }

        /// <summary>
        /// Create Connection
        /// </summary>
        /// <returns></returns>
        public IDbConnection Create()
        {
            var connection = _provider.CreateConnection();
            if (connection == null)
                throw new ConfigurationErrorsException(string.Format("Failed to create a connection using the connection string named '{0}' in app/web.config.", _name));

            connection.ConnectionString = _connectionString;
            connection.Open();
            return connection;
        }
    }
}
