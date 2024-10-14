using System.Threading.Tasks;

namespace WK.Produtos.Bussiness.Intefaces.Specification
{
    public interface ISpecification<in T>
    {
        bool IsSatisfiedBy(T entity);
    }
}
