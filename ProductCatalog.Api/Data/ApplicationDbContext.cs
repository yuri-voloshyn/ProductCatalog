using Microsoft.EntityFrameworkCore;
using ProductCatalog.Api.Data.Interfaces;
using ProductCatalog.Api.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<DataFile> DataFiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var types = GetType().GetTypeInfo().Assembly.DefinedTypes;
            var entityTypes = modelBuilder.Model.GetEntityTypes()
                .Where(a => a.ClrType != null && types.Contains(a.ClrType.GetTypeInfo()));


            foreach (var entityType in entityTypes)
            {
                var clrType = entityType.ClrType;

                entityType.Relational().TableName = clrType.Name;

                foreach (var foreignKey in entityType.GetForeignKeys())
                {
                    foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
                }

                var isAbstractEntity = typeof(IAbstractEntity).IsAssignableFrom(clrType);

                if (isAbstractEntity)
                {
                    modelBuilder.Entity(clrType, entity =>
                    {
                        if (isAbstractEntity)
                        {
                            entity.Property(nameof(IAbstractEntity.Guid)).HasMaxLength(38).IsRequired();
                            entity.HasIndex(nameof(IAbstractEntity.Guid)).IsUnique();
                        }
                    });
                }
            }

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(a => a.Name).HasMaxLength(100).IsRequired();
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(a => a.Author).HasMaxLength(100).IsRequired();
                entity.Property(a => a.Message).IsRequired();
            });

            modelBuilder.Entity<DataFile>(entity =>
            {
                entity.Property(a => a.FileType).HasMaxLength(100);
            });
        }
    }
}
