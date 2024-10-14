using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WK.Produtos.Bussiness.Models;
using WK.Produtos.Bussiness.ValueObjects;

namespace WK.Produtos.Bussiness.Intefaces.Services
{
    public interface IProdutoService : IDisposable
    {
        Task<ValidationResult> Adicionar(Produto produto);
        Task<ValidationResult> Atualizar(Produto produto);
        Task<ValidationResult> Remover(Guid id);
        int ObterTotalRegistros(string pesquisa);
        IEnumerable<Produto> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual);
        Produto ObterPorId(Guid id);
    }
}
