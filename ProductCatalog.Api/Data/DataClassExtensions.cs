using ProductCatalog.Api.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Data
{
    public static class DataClassExtensions
    {
        public static void SetAuditProps(this IAbstractEntity entity, bool isNew = false)
        {
            var now = DateTime.Now;
            if (isNew)
            {
                entity.CreateDate = now;
            }
            entity.ModifyDate = now;
        }
    }
}
