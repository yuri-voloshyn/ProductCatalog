using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Dto.Models
{
    public class LookupDto : AbstractDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
