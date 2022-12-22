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


        public void Dispose()
        {
            foreach (var context in _contexts)
            {
                context.Dispose();
            }
        }
    }
}
