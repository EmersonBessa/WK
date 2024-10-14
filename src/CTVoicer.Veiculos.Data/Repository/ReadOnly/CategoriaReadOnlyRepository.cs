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
    public class CategoriaReadOnlyRepository : ICategoriaReadOnlyRepository
    {
        private readonly IConfiguration _config;

        public CategoriaReadOnlyRepository(IConfiguration config)
        {
            _config = config;
        }

        public IEnumerable<Categoria> ObterGrid(string pesquisa, string ordenacaoCampo, string ordenacaoDirecao, string quantidadePagina, string paginaAtual)
        {
            using (SqlConnection cn = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                var sql = $@"Select c.*
                                From Categoria c 
                                where 
                                (@sPesquisa is null 
                                    or c.Nome Like '%' + @sPesquisa + '%' COLLATE Latin1_General_CI_AI
                                )
                            ORDER BY {ordenacaoCampo} {ordenacaoDirecao}
                            OFFSET {quantidadePagina} * ({paginaAtual} -1) ROWS
                            FETCH NEXT {quantidadePagina} ROWS ONLY";
                cn.Open();
                try
                {
                    var categoria = cn.Query<Categoria>(sql, new { @sPesquisa = pesquisa });

                    return categoria;
                }
                catch (Exception ex)
                {
                    return null;
                }

            }
        }

        public Categoria ObterPorId(Guid id)
        {
            using (SqlConnection cn = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                var sql = $@"Select *
                                From Categoria c
                                where 
                                c.Id = '{id}' ";
                cn.Open();

                var categoria = cn.Query<Categoria>(sql);
                return categoria.FirstOrDefault();
            }
        }

        public IEnumerable<Categoria> ObterTodas()
        {
            using (SqlConnection cn = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                var sql = $@"Select *
                                From Categoria c ";
                cn.Open();

                var categoria = cn.Query<Categoria>(sql);
                return categoria;
            }
        }

        public int ObterTotalRegistros(string pesquisa)
        {
            using (SqlConnection cn = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                var sql = $@"Select count(*) as 'TOTAL'
                                From Categoria c
                                where 
                                (@sPesquisa is null 
                                    or c.Nome Like '%' + @sPesquisa + '%' COLLATE Latin1_General_CI_AI
                                )";
                cn.Open();

                var total = (int)cn.ExecuteScalar(sql, new { @sPesquisa = pesquisa });
                return total;
            }
        }
    }
}
