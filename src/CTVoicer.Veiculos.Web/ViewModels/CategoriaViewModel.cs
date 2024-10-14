using System.ComponentModel.DataAnnotations;
using System;

namespace WK.Produtos.Web.ViewModels
{
    public class CategoriaViewModel
    {
        public Guid? Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Nome { get; set; }
    }
}
