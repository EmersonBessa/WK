using System;
using System.Collections.Generic;
using System.Text;
using WK.Produtos.Bussiness.Intefaces;
using WK.Produtos.Bussiness.Models;
using WK.Produtos.Data.Context;

namespace WK.Produtos.Data.Repository
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(ProdutoContext context) : base(context)
        {
        }
    }
}
