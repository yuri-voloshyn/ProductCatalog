using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Data.Models
{
    public class Comment : AbstractEntity
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Author { get; set; }
        public string Message { get; set; }
        public int? AttachedFileId { get; set; }
        public DataFile AttachedFile { get; set; }
    }
}
