using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using WK.Produtos.Bussiness.Intefaces.Services;
using WK.Produtos.Bussiness.Models;
using WK.Produtos.Web.ViewModels;
using WK.Produtos.Bussiness.ValueObjects;

namespace WK.Produtos.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;
        private readonly IMapper _mapper;

        public CategoriaController(ICategoriaService categoriaService, IMapper mapper)
        {
            _categoriaService = categoriaService;
            _mapper = mapper;
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        [HttpGet]
        [Route("grid-categorias")]
        public Object ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual)
        {

            var categoria = _categoriaService.ObterGrid(pesquisa, ordenacaoCampo, ordenacaoDirecao, quantidadePagina, paginaAtual);
            var categoriaViewModel = _mapper.Map<IEnumerable<CategoriaViewModel>>(categoria);
            var retorno = new Retorno();
            retorno.Row = categoriaViewModel;
            retorno.Total = _categoriaService.ObterTotalRegistros(pesquisa);

            return retorno;
        }

        [IgnoreAntiforgeryToken]
        [HttpPost]
        [Route("criar-categoria")]
        public async Task<Object> Create(CategoriaViewModel categoriaViewModel, string operacao)
        {
            var retorno = new RetornoSistemas();

            ValidationResult result = null;

            if (operacao != "update")
            {
                result = await _categoriaService.Adicionar(_mapper.Map<Categoria>(categoriaViewModel));

                foreach (var validationAppError in result.Erros)
                {
                    ModelState.AddModelError(string.Empty, validationAppError.Message);
                }
            }
            else
            {
                result = await _categoriaService.Atualizar(_mapper.Map<Categoria>(categoriaViewModel));

                foreach (var validationAppError in result.Erros)
                {
                    ModelState.AddModelError(string.Empty, validationAppError.Message);
                }
            }

            retorno.success = result.IsValid;
            retorno.errors = ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                                .Select(m => m.ErrorMessage).ToArray();

            return retorno;

        }

        [IgnoreAntiforgeryToken]
        [HttpPost]
        [Route("excluir-categoria")]
        public async Task<Object> DeleteConfirmed(Guid id)
        {
            var categoriasViewModel = _categoriaService.ObterPorId(id);

            ValidationResult result = null;

            result = await _categoriaService.Remover(categoriasViewModel.Id);

            foreach (var validationAppError in result.Erros)
            {
                ModelState.AddModelError(string.Empty, validationAppError.Message);
            }

            var retorno = new RetornoSistemas();
            retorno.success = result.IsValid;
            retorno.mensagem = "Categoria excluído com Sucesso!";
            retorno.errors = ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                                .Select(m => m.ErrorMessage).ToArray();

            return retorno;
        }

        [IgnoreAntiforgeryToken]
        [HttpGet]
        [Route("obter-categoria")]
        public Categoria Obter(Guid categoriaId)
        {
            var categoria = _categoriaService.ObterPorId(categoriaId);
            return categoria;
        }

        [Route("obter-todasCategoria")]
        [HttpGet]
        public Object ObterTodas()
        {
            var resultado = _categoriaService.ObterTodas();

            var dados = new List<Object> { };
            foreach (var result in resultado)
            {
                dados.Add(new
                {
                    label = result.Nome,
                    title = result.Nome,
                    value = result.Id
                });
            }

            return dados;
        }

        public class Retorno
        {
            public Object Row { get; set; }
            public int Total { get; set; }
        }

        public class RetornoSistemas
        {
            public bool success { get; set; }
            public string mensagem { get; set; }
            public string[] errors { get; set; }

        }

    }
}
