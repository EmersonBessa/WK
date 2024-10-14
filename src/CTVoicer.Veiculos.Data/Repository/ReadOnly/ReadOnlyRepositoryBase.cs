using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace WK.Produtos.Data.Repository.ReadOnly
{
    public class ReadOnlyRepositoryBase
    {
        private readonly IConfiguration _config;
        public IDbConnection Connection
        { 
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }
    }
}
