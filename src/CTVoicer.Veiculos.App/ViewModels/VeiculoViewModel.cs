using System;


namespace CTVoicer.Veiculos.App.ViewModels
{
    public class VeiculoViewModel
    {
        public Guid Id { get; set; }
        public string Chassi { get; set; }
        public Guid TipoVeiculoId { get; set; }
        public virtual TipoVeiculoViewModel TipoVeiculo { get; set; }
        public Guid CorId { get; set; }
        public virtual CorViewModel Cor { get; set; }
    }
}
