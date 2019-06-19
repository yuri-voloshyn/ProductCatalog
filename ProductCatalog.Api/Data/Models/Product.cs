using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Data.Models
{
    public class Product : AbstractEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ThumbnailImageId { get; set; }
        public DataFile ThumbnailImage { get; set; }
        public ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();
    }
}
