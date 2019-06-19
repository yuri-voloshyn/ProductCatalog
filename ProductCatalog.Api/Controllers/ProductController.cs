using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCatalog.Api.Data;
using ProductCatalog.Api.Data.Models;
using ProductCatalog.Api.Dto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Controllers
{
    [Route("v1/[controller]")]
    public class ProductController : BaseDataController<Product, ProductDto>
    {
        public ProductController(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
        }

        [HttpGet("{id}/Comment")]
        [Produces(typeof(IEnumerable<CommentDto>))]
        public async Task<IActionResult> Comment(int id)
        {
            return Ok(await db.Comments
                .Where(a => a.ProductId == id && !a.Product.IsDeleted && !a.IsDeleted)
                .OrderBy(a => a.Id)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync());
        }
    }
}
