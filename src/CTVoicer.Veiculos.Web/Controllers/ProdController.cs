using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WK.Produtos.Bussiness.Intefaces.Services;
using WK.Produtos.Bussiness.Models;
using WK.Produtos.Bussiness.ValueObjects;
using WK.Produtos.Web.ViewModels;

namespace WK.Produtos.Web.Controllers
{

    public class ProdController : Controller
    {
        private readonly IProdutoService _produtoService;
        private readonly IMapper _mapper;

        public ProdController(IProdutoService produtoService, IMapper mapper)
        {
            _produtoService = produtoService;
            _mapper = mapper;
        }
        public IActionResult Index()
        {
            return View();
        }

        //[Route("grid-produtos")]
        //[HttpGet]
        public Object ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual)
        {

            var produto = _produtoService.ObterGrid(pesquisa, ordenacaoCampo, ordenacaoDirecao, quantidadePagina, paginaAtual);
            var produtoViewModel = _mapper.Map<IEnumerable<ProdutoViewModel>>(produto);

            var dados = new
            {
                rows = produtoViewModel,
                total = _produtoService.ObterTotalRegistros(pesquisa)
            };

            return dados;
        }

        [IgnoreAntiforgeryToken]
        //[HttpPost]
        //[Route("criar-produto")]
        public async Task<Object> Create(ProdutoViewModel produtoViewModel, string operacao)
        {
            var retorno = new RetornoSistemas();

            ValidationResult result = null;

            if (operacao != "update")
            {
                result = await _produtoService.Adicionar(_mapper.Map<Produto>(produtoViewModel));

                foreach (var validationAppError in result.Erros)
                {
                    ModelState.AddModelError(string.Empty, validationAppError.Message);
                }
            }
            else
            {
                result = await _produtoService.Atualizar(_mapper.Map<Produto>(produtoViewModel));

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
        //[HttpPost]
        //[Route("excluir-produto")]
        public async Task<Object> DeleteConfirmed(Guid id)
        {
            var produtosViewModel = _produtoService.ObterPorId(id);

            ValidationResult result = null;

            result = await _produtoService.Remover(produtosViewModel.Id);

            foreach (var validationAppError in result.Erros)
            {
                ModelState.AddModelError(string.Empty, validationAppError.Message);
            }

            var retorno = new RetornoSistemas();
            retorno.success = result.IsValid;
            retorno.mensagem = "Produto excluído com Sucesso!";
            retorno.errors = ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                                .Select(m => m.ErrorMessage).ToArray();

            return retorno;
        }

        [IgnoreAntiforgeryToken]
        //[HttpPost]
        //[Route("obter-produto")]
        public Produto Obter(Guid id)
        {
            var produto = _produtoService.ObterPorId(id);
            return produto;
        }


        public class Retorno
        {
            public Object rows { get; set; }
            public int total { get; set; }
        }

        public class RetornoSistemas
        {
            public bool success { get; set; }
            public string mensagem { get; set; }
            public string[] errors { get; set; }

        }

    }
}
