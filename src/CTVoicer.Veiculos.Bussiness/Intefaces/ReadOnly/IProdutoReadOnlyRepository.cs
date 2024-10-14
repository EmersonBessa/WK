using System;
using System.Collections.Generic;
using WK.Produtos.Bussiness.Models;

namespace WK.Produtos.Bussiness.Intefaces.ReadOnly
{
    public interface IProdutoReadOnlyRepository
    {
        int ObterTotalRegistros(string pesquisa);
        IEnumerable<Produto> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual);
        Produto ObterPorId(Guid id);
    }
}
