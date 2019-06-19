using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Dto.Models
{
    public abstract class ProductBaseDto : AbstractDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ProductReqDto : ProductBaseDto
    {
        public IFormFile ThumbnailImageFile { get; set; }
    }

    public class ProductDto : ProductBaseDto
    {
        public string ThumbnailImageUrl { get; set; }
    }
}
