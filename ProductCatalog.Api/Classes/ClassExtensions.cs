using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Classes
{
    public static class ClassExtensions
    {
        public static IQueryable<T> Next<T>(this IQueryable<T> query, Func<IQueryable<T>, IQueryable<T>> next = null)
        {
            return next != null ? next(query) : query;
        }
    }
}
