using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace KintoSharePortal.Domain.DA
{
    public interface IDbConnectionFactory
    {
        IDbConnection Create();
    }
}
