using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Api.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Controllers
{
    public class ApplicationDbController : Controller
    {
        protected readonly ApplicationDbContext db;
        protected readonly IMapper mapper;

        public ApplicationDbController(ApplicationDbContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
    }
}
