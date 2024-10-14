using WK.Produtos.Bussiness.ValueObjects;

namespace WK.Produtos.Bussiness.Intefaces.Validation
{
    public interface IFiscal<in TEntity>
    {
        ValidationResult Validar(TEntity entity);

    }
}
