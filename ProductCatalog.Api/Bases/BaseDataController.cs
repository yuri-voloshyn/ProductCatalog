using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCatalog.Api.Classes;
using ProductCatalog.Api.Data;
using ProductCatalog.Api.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Controllers
{
    public enum ModifyDataOperation
    {
        Insert,
        Update,
        Delete
    }

    public abstract class BaseDataController<T, TDto> : BaseDataController<T, TDto, TDto>
        where T : class, IAbstractEntity
        where TDto : class
    {
        public BaseDataController(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
        }
    }

    public abstract class BaseDataController<T, TDto, TDtoExt> : ApplicationDbController
        where T : class, IAbstractEntity
        where TDto : class
        where TDtoExt : class
    {
        public BaseDataController(ApplicationDbContext db, IMapper mapper) : base(db, mapper)
        {
        }

        protected virtual IQueryable<T> GetData(Func<IQueryable<T>, IQueryable<T>> next = null)
        {
            return db.Set<T>().Where(a => !a.IsDeleted).Next(next);
        }

        protected IQueryable<T> GetData(int id, Func<IQueryable<T>, IQueryable<T>> next = null)
        {
            return GetData(q => q.Where(a => a.Id == id).Next(next));
        }

        protected IQueryable<P> GetData<P>(Func<IQueryable<T>, IQueryable<T>> next = null)
        {
            return GetData(next).ProjectTo<P>(mapper.ConfigurationProvider);
        }

        protected IQueryable<P> GetData<P>(int id, Func<IQueryable<T>, IQueryable<T>> next = null)
        {
            return GetData(id, next).ProjectTo<P>(mapper.ConfigurationProvider);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await GetData<TDtoExt>(a => a.OrderBy(b => b.Id)).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var entityDto = await GetData<TDto>(id).SingleOrDefaultAsync();
            if (entityDto == null)
                return NotFound();

            return Ok(entityDto);
        }

        protected virtual Task ModifyData(T entity, ModifyDataOperation operation, T oldEntity = null)
        {
            return Task.CompletedTask;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = mapper.Map<T>(model);
            entity.SetAuditProps(true);

            await ModifyData(entity, ModifyDataOperation.Insert);

            db.Add(entity);
            await db.SaveChangesAsync();

            return Ok(await GetData<TDto>(entity.Id).SingleAsync());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]TDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var entity = await GetData(id).SingleOrDefaultAsync();
            if (entity == null)
                return NotFound();

            var oldEntity = mapper.Map<T>(entity);

            mapper.Map(model, entity);
            entity.SetAuditProps();

            await ModifyData(entity, ModifyDataOperation.Update, oldEntity);

            await db.SaveChangesAsync();

            return Ok(await GetData<TDto>(entity.Id).SingleAsync());
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody]JsonPatchDocument<TDto> model)
        {
            var entity = await GetData(id).SingleOrDefaultAsync();
            if (entity == null)
                return NotFound();

            var oldEntity = mapper.Map<T>(entity);

            var entityDto = await GetData<TDto>(entity.Id).SingleAsync();

            model.ApplyTo(entityDto);
            mapper.Map(entityDto, entity);
            entity.SetAuditProps();

            await ModifyData(entity, ModifyDataOperation.Update, oldEntity);

            await db.SaveChangesAsync();

            return Ok(await GetData<TDto>(entity.Id).SingleAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await GetData(id).SingleOrDefaultAsync();
            if (entity == null)
                return NotFound();

            var oldEntity = mapper.Map<T>(entity);

            entity.IsDeleted = true;
            entity.SetAuditProps();

            await ModifyData(entity, ModifyDataOperation.Delete, oldEntity);

            await db.SaveChangesAsync();

            return Ok();
        }
    }
}
