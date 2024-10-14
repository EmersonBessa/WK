using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace CTVoicer.Veiculos.App.ValidationsViewModels
{
    public class ValidationsViewModels
    {
        public static string ValidarViewModel(ModelStateDictionary modelState)
        {
            var erros = modelState.Keys.SelectMany(k => modelState[k].Errors).Select(m => m.ErrorMessage).ToArray();

            //var errosTratados = "<ul>";
            var errosTratados = string.Empty;
            for (var i = 0; i <= (erros.Count()) - 1; i++)
            {
                errosTratados += string.Format(@"{0} {1}", erros[i], "\r\n");
            }
            //errosTratados += "</ul>";

            return errosTratados;
        }
    }
}
