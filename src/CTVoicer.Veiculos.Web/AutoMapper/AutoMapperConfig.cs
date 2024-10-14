using AutoMapper;
using WK.Produtos.Web.ViewModels;
using WK.Produtos.Bussiness.Models;

namespace WK.Produtos.Web.AutoMapper
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Produto, ProdutoViewModel>().ReverseMap();
            CreateMap<Categoria, CategoriaViewModel>().ReverseMap();
        }
    }
}
