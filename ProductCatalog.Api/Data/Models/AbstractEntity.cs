using ProductCatalog.Api.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Data.Models
{
    public abstract class AbstractEntity : IAbstractEntity
    {
        public int Id { get; set; }
        public string Guid { get; set; } = System.Guid.NewGuid().ToString("B").ToUpperInvariant();
        public bool IsDeleted { get; set; }
        public DateTimeOffset CreateDate { get; set; }
        public DateTimeOffset ModifyDate { get; set; }
    }
}
