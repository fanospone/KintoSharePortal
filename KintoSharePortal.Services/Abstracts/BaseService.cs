using System.Collections.Generic;

using KintoSharePortal.Domain.DA;

namespace KintoSharePortal.Services
{
    public abstract class BaseService
    {
        List<DbContext> _contexts;

        public BaseService()
        {
            _contexts = new List<DbContext>();
        }

        public DbContext SetContext(string connection = "connectionString")
        {
            DbContext context = new DbContext(Helper.GetConnection(connection));
            _contexts.Add(context);
            return context;
        }

        public void Dispose()
        {
            foreach (var context in _contexts)
            {
                context.Dispose();
            }
        }
    }
}
