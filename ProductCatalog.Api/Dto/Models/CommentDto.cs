using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Dto.Models
{
    public abstract class CommentBaseDto : AbstractDto
    {
        public LookupDto Product { get; set; }
        public string Author { get; set; }
        public string Message { get; set; }
    }

    public class CommentReqDto : CommentBaseDto
    {
        public IFormFile AttachedFileFile { get; set; }
    }

    public class CommentDto : CommentBaseDto
    {
        public string AttachedFileUrl { get; set; }
    }
}
