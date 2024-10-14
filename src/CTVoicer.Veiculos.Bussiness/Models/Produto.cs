using System;

namespace WK.Produtos.Bussiness.Models
{
    public class Produto : Entity
    {
        public string Nome { get; set; }
        public Guid CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; }
    }
}
