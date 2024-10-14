using System;
using System.Collections.Generic;
using WK.Produtos.Bussiness.Models;

namespace WK.Produtos.Bussiness.Intefaces.ReadOnly
{
    public interface ICategoriaReadOnlyRepository
    {
        int ObterTotalRegistros(string pesquisa);
        IEnumerable<Categoria> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual);
        Categoria ObterPorId(Guid id);
        IEnumerable<Categoria> ObterTodas();
    }
}
