using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WK.Produtos.Bussiness.Models;
using WK.Produtos.Bussiness.ValueObjects;

namespace WK.Produtos.Bussiness.Intefaces.Services
{
    public interface ICategoriaService : IDisposable
    {
        Task<ValidationResult> Adicionar(Categoria categoria);
        Task<ValidationResult> Atualizar(Categoria categoria);
        Task<ValidationResult> Remover(Guid id);
        int ObterTotalRegistros(string pesquisa);
        IEnumerable<Categoria> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual);
        Categoria ObterPorId(Guid id);
        IEnumerable<Categoria> ObterTodas();
    }
}
