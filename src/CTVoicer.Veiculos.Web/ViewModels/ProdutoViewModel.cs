using System.ComponentModel.DataAnnotations;
using System;
using WK.Produtos.Bussiness.Models;

namespace WK.Produtos.Web.ViewModels
{
    public class ProdutoViewModel
    {
        public Guid? Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Nome { get; set; }
        public DateTime DataCriacao { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public Guid CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
        
    }
}
