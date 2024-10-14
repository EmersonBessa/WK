using System;
using System.Collections.Generic;
using WK.Produtos.Bussiness.Intefaces.ReadOnly;
using WK.Produtos.Bussiness.Intefaces;
using WK.Produtos.Bussiness.Intefaces.Services;
using System.Threading.Tasks;
using WK.Produtos.Bussiness.ValueObjects;
using WK.Produtos.Bussiness.Models;

namespace WK.Produtos.Bussiness.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaReadOnlyRepository _categoriaReadOnlyRepository;
        private readonly ICategoriaRepository _categoriaRepository;
        public CategoriaService(ICategoriaReadOnlyRepository categoriaReadOnlyRepository,
            ICategoriaRepository categoriaRepository)
        {
            _categoriaReadOnlyRepository = categoriaReadOnlyRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<ValidationResult> Adicionar(Categoria categoria)
        {
            var resultadoValidacao = new ValidationResult();
            await _categoriaRepository.Adicionar(categoria);

            return resultadoValidacao;
        }

        public async Task<ValidationResult> Atualizar(Categoria categoria)
        {
            var resultadoValidacao = new ValidationResult();
            await _categoriaRepository.Atualizar(categoria);

            return resultadoValidacao;
        }

        public void Dispose()
        {
            _categoriaRepository.Dispose();
        }

        public IEnumerable<Categoria> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual)
        {
            return _categoriaReadOnlyRepository.ObterGrid(pesquisa, ordenacaoCampo, ordenacaoDirecao, quantidadePagina, paginaAtual);
        }

        public Categoria ObterPorId(Guid id)
        {
            return _categoriaReadOnlyRepository.ObterPorId(id);
        }

        public int ObterTotalRegistros(string pesquisa)
        {
            return _categoriaReadOnlyRepository.ObterTotalRegistros(pesquisa);
        }

        public async Task<ValidationResult> Remover(Guid id)
        {
            var resultadoValidacao = new ValidationResult();

            await _categoriaRepository.Remover(id);

            return resultadoValidacao;
        }

        public IEnumerable<Categoria> ObterTodas()
        {
            return _categoriaReadOnlyRepository.ObterTodas();

        }
    }
}
