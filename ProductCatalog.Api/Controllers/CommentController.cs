using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
    public class CommentController : BaseDataController<Comment, CommentDto>
    {
        public CommentController(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
        }
    }
}
