using WK.Produtos.Bussiness.Intefaces;
using WK.Produtos.Bussiness.Intefaces.ReadOnly;
using WK.Produtos.Bussiness.Intefaces.Services;
using WK.Produtos.Bussiness.Services;
using WK.Produtos.Data.Context;
using WK.Produtos.Data.Repository;
using WK.Produtos.Data.Repository.ReadOnly;
using Microsoft.Extensions.DependencyInjection;

namespace WK.Produtos.CrossCutting.Ioc
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<ProdutoContext>();

            services.AddScoped<ICategoriaRepository, CategoriaRepository>();
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<ICategoriaReadOnlyRepository, CategoriaReadOnlyRepository>();

            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddScoped<IProdutoService, ProdutoService>();
            services.AddScoped<IProdutoReadOnlyRepository, ProdutoReadOnlyRepository>();


            //services.AddScoped<INotificador, Notificador>();

            return services;
        }
    }
}
