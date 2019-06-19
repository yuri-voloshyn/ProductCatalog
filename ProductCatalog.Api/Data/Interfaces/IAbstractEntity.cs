using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Data.Interfaces
{
    public interface IAbstractEntity
    {
        int Id { get; set; }
        string Guid { get; set; }
        bool IsDeleted { get; set; }
        DateTimeOffset CreateDate { get; set; }
        DateTimeOffset ModifyDate { get; set; }
    }
}
