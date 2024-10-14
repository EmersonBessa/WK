using WK.Produtos.Bussiness.Notifications;
using System;
using System.Collections.Generic;
using System.Text;

namespace WK.Produtos.Bussiness.Intefaces
{
    public interface INotificador
    {
        bool TemNotificacao();
        List<Notificacao> ObterNotificacoes();
        void Handle(Notificacao notificacao);
    }
}
