using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using WK.Produtos.Bussiness.Intefaces.ReadOnly;
using WK.Produtos.Bussiness.Models;

namespace WK.Produtos.Data.Repository.ReadOnly
{
    public class ProdutoReadOnlyRepository : IProdutoReadOnlyRepository
    {
        private readonly IConfiguration _config;

        public ProdutoReadOnlyRepository(IConfiguration config)
        {
            _config = config;
        }

        public IEnumerable<Produto> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual)
        {
            using (SqlConnection cn = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                var sql = $@"Select p.*, c.*
                                From Produto p
                                Join Categoria c on c.Id = p.CategoriaId
                                where 
                                (@sPesquisa is null 
                                    or p.Nome Like '%' + @sPesquisa + '%' COLLATE Latin1_General_CI_AI
                                    or c.Nome Like '%' + @sPesquisa + '%' COLLATE Latin1_General_CI_AI
                                )
                            ORDER BY {ordenacaoCampo} {ordenacaoDirecao}
                            OFFSET {quantidadePagina} * ({paginaAtual} -1) ROWS
                            FETCH NEXT {quantidadePagina} ROWS ONLY";
                cn.Open();
                try
                {
                    var multi = cn.QueryMultiple(sql, new { @sPesquisa = pesquisa });
                    var produtos = multi.Read<Produto, Categoria,Produto>
                        ((p, c) =>
                        {
                            p.CategoriaId = c.Id;
                            p.Categoria = c;

                            return p;
                        }, splitOn: "Id,Id");

                    return produtos;
                }
                catch (Exception ex)
                {
                    return null;
                }

            }
        }

        public Produto ObterPorId(Guid id)
        {
            using (SqlConnection cn = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                var sql = $@"Select *
                                From Produto p
                                where 
                                p.Id = '{id}' ";
                cn.Open();

                var produto = cn.Query<Produto>(sql);
                return produto.FirstOrDefault();
            }
        }

        public int ObterTotalRegistros(string pesquisa)
        {
            using (SqlConnection cn = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                var sql = $@"Select count(*) as 'TOTAL'
                                From Produto p
                                Join Categoria c on c.Id = p.CategoriaId
                                where 
                                (@sPesquisa is null 
                                    or p.Nome Like '%' + @sPesquisa + '%' COLLATE Latin1_General_CI_AI
                                    or c.Nome Like '%' + @sPesquisa + '%' COLLATE Latin1_General_CI_AI
                                )";
                cn.Open();

                var total = (int)cn.ExecuteScalar(sql, new { @sPesquisa = pesquisa });
                return total;
            }
        }
    }
}
