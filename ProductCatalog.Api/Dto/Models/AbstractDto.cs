using ProductCatalog.Api.Dto.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Dto.Models
{
    public class AbstractDto : IAbstractDto
    {
        public int Id { get; set; }
    }
}
