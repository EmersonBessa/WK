using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WK.Produtos.Bussiness.Intefaces.ReadOnly;
using WK.Produtos.Bussiness.Intefaces;
using WK.Produtos.Bussiness.Intefaces.Services;
using WK.Produtos.Bussiness.Models;
using WK.Produtos.Bussiness.ValueObjects;

namespace WK.Produtos.Bussiness.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoReadOnlyRepository _produtoReadOnlyRepository;
        private readonly IProdutoRepository _produtoRepository;
        public ProdutoService(IProdutoReadOnlyRepository produtoReadOnlyRepository,
            IProdutoRepository produtoRepository)
        {
            _produtoReadOnlyRepository = produtoReadOnlyRepository;
            _produtoRepository = produtoRepository;
        }

        public async Task<ValidationResult> Adicionar(Produto produto)
        {
            var resultadoValidacao = new ValidationResult();

            //var result = new VeiculoValidation(_veiculoReadOnlyRepository).Validar(veiculo);

            //if (!result.IsValid)
            //{
            //    resultadoValidacao.AdicionarErro(result);
            //    return resultadoValidacao;
            //}

            await _produtoRepository.Adicionar(produto);

            return resultadoValidacao;
        }

        public async Task<ValidationResult> Atualizar(Produto produto)
        {
            var resultadoValidacao = new ValidationResult();

            //var result = new VeiculoPodeAtualizarValidation(_veiculoReadOnlyRepository).Validar(veiculo);

            //if (!result.IsValid)
            //{
            //    resultadoValidacao.AdicionarErro(result);
            //    return resultadoValidacao;
            //}

            await _produtoRepository.Atualizar(produto);

            return resultadoValidacao;
        }

        public void Dispose()
        {
            _produtoRepository?.Dispose();
        }

        public IEnumerable<Produto> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual)
        {
            return _produtoReadOnlyRepository.ObterGrid(pesquisa, ordenacaoCampo, ordenacaoDirecao, quantidadePagina, paginaAtual);
        }

        public Produto ObterPorId(Guid id)
        {
            return _produtoReadOnlyRepository.ObterPorId(id);
        }

        public int ObterTotalRegistros(string pesquisa)
        {
            return _produtoReadOnlyRepository.ObterTotalRegistros(pesquisa);
        }

        public async Task<ValidationResult> Remover(Guid id)
        {
            var resultadoValidacao = new ValidationResult();

            await _produtoRepository.Remover(id);

            return resultadoValidacao;
        }
    }
}
