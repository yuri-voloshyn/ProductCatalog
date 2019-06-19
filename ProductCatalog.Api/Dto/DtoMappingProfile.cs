using AutoMapper;
using ProductCatalog.Api.Data.Models;
using ProductCatalog.Api.Dto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Api.Dto
{
    public class DtoMappingProfile : Profile
    {
        public DtoMappingProfile()
        {
            // Dto to DB
            var me = CreateMap<AbstractDto, AbstractEntity>();

            foreach (var name in new[] {
                nameof(AbstractEntity.Id),
                nameof(AbstractEntity.Guid),
                nameof(AbstractEntity.IsDeleted),
                nameof(AbstractEntity.CreateDate),
                nameof(AbstractEntity.ModifyDate)
            })
            {
                me.ForMember(name, opt => opt.Ignore());
            }

            CreateMap<ProductDto, Product>()
                .IncludeBase<AbstractDto, AbstractEntity>()
                .ForMember(a => a.ThumbnailImageId, opt => opt.Ignore())
                .ForMember(a => a.ThumbnailImage, opt => opt.Ignore())
                .ForMember(a => a.Comments, opt => opt.Ignore());

            CreateMap<CommentDto, Comment>()
                .IncludeBase<AbstractDto, AbstractEntity>()
                .ForMemberRef(a => a.Product, a => a.ProductId, a => a.Product)
                .ForMember(a => a.AttachedFileId, opt => opt.Ignore())
                .ForMember(a => a.AttachedFile, opt => opt.Ignore());

            // DB to Dto
            CreateMap<Product, ProductDto>()
                .ForMember(a => a.ThumbnailImageUrl, opt => opt.Ignore());
            CreateMap<Product, LookupDto>()
                .ForMember(a => a.Code, opt => opt.Ignore());
            CreateMap<Comment, CommentDto>()
                .ForMember(a => a.AttachedFileUrl, opt => opt.Ignore());
        }
    }
}
