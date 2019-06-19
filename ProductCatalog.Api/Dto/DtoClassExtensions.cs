using AutoMapper;
using ProductCatalog.Api.Data.Interfaces;
using ProductCatalog.Api.Dto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Dto
{
    public static class DtoClassExtensions
    {
        public static IMappingExpression<TSource, TDestination> ForMemberRef<TSource, TDestination, TMember1, TMember2, TMember3>(
            this IMappingExpression<TSource, TDestination> mappingExpression,
            Expression<Func<TDestination, TMember1>> destinationMember1,
            Expression<Func<TDestination, TMember2>> destinationMember2,
            Expression<Func<TSource, TMember3>> destinationMember3)
            where TMember1 : IAbstractEntity
            where TMember3 : AbstractDto
        {
            Func<TSource, AbstractDto> getRef = src => destinationMember3.Compile()(src);

            mappingExpression
                .ForMember(
                    destinationMember1,
                    opt => opt.Ignore()
                )
                .ForMember(
                    destinationMember2,
                    opt => opt.MapFrom(src => getRef(src) != null ? (int?)getRef(src).Id : null)
                );

            return mappingExpression;
        }
    }
}
