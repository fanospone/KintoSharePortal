﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KintoSharePortal.Domain.DA
{
    public interface IUnitOfWork
    {
        void Dispose();
        void SaveChanges();
    }
}
