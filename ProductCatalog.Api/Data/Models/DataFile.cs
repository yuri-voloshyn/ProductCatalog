using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Data.Models
{
    public class DataFile : AbstractEntity
    {
        public string FileType { get; set; }
    }
}
