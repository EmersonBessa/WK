using System;
using System.Collections.Generic;
using System.Text;
using WK.Produtos.Bussiness.Intefaces;
using WK.Produtos.Bussiness.Models;
using WK.Produtos.Data.Context;

namespace WK.Produtos.Data.Repository
{
    public class CategoriaRepository : Repository<Categoria>, ICategoriaRepository
    {
        public CategoriaRepository(ProdutoContext context) : base(context)
        {
        }
    }
}
