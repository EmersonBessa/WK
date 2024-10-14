$("#btn-SalvarConversao").on('click', function () {
    var token = $("#__AjaxAntiForgeryForm input").val();
    var dataObject = {
        __RequestVerificationToken: token,
        tabelaConversaoUnidadeViewModel: ObterDadosConversao(),
        operacao: $("#inputOperacaoConversao").val()
    };
    var dados = dataObject;
    $.ajax({
        url: $("#btn-SalvarConversao").data('target'),
        type: 'POST',
        dataType: 'json',
        data: dados,
        success: function (data) {
            if (data.success == false) {
                $.alertaErro(data.errors);
            } else {
                // $.alertaSucesso("Cliente salva com sucesso!!!");
                LimparFormulario();
                $('#tableUnidadeConvertida').bootstrapTable('refresh');
            }
        }
    });
});

$(document).ready(function () {
    CarregarDropDownUnidadeMedidaConversao();
});

$('#modalProdutoConversao').on('shown.bs.modal', function (e) {
    $('#tableProdutosConversao').bootstrapTable('refresh');
});


function CarregarDropDownUnidadeMedidaConversao() {
    $.CarregarDropDown(
        {
            Url: $('#UnidadeMedidaIdConversao').data('request-url'),
            TextoVazio: 'Selecione a Unidade de Medida ',
            EditTemp: "#UnidadeMedidaIdTempConversao",
            DropDownId: "#UnidadeMedidaIdConversao"
        }
    );
}

function ObterDadosConversao() {
    var tabelaConversaoUnidadeId = $("#TabelaConversaoUnidadeId").val();
    var produtoId = $("#ProdutoIdConversao").val();
    var unidadeMedidaId = $("#UnidadeMedidaIdConversao").val();
    var nivel = $("#Nivel").val();
    var fator = $("#Fator").val();
    return {
        TabelaConversaoUnidadeId: tabelaConversaoUnidadeId,
        ProdutoId: produtoId,
        UnidadeMedidaId: unidadeMedidaId,
        Nivel: nivel,
        Fator: fator
    };
}

$('.zerar-campos').on('click', function () {
    LimparFormulario();
});

function LimparFormulario() {
    $("#UnidadeMedidaIdConversao").val('');
    $("#UnidadeMedidaIdTempConversao").val('');
    $('#Nivel').val('');
    $('#Fator').val('');
}

function parametrosListagemProdutoConversao(p) {
    if ('Nome' === p.sort) p.sort = 'p.Nome';
    return {
        ordenacaoCampo: p.sort,
        ordenacaoDirecao: p.order,
        quantidadePagina: p.limit,
        paginaAtual: (p.offset / p.limit) + 1,
        pesquisa: p.search
    };
}


function parametrosListagemProdutoJaConvertido(p) {
    if (undefined == p.sort) p.sort = 'Nivel';
    //if ('Nome' == p.sort) p.sort = 'a.Nome';
    //if ('UnidadeOrcamentaria.Nome' == p.sort) p.sort = 'b.Nome';

    return {
        ordenacaoCampo: p.sort,
        ordenacaoDirecao: p.order,
        quantidadePagina: p.limit,
        paginaAtual: (p.offset / p.limit) + 1,
        pesquisa: p.search,
        produtoId: $("#ProdutoIdConversao").val()
    }
}

window.operacoesColunasTabelaProdutoParaConversao = tratadorEventoColunasConversao();
window.operacoesColunasUnidadeConvertida = tratadorEventoColunasConversao();

function formatadorColunaOperacaoTabelaProdutoParaConversao(value, row, index) {
    var operacoes = [];
    var operacao_selecionarProdutoParaConversao =
        '<a class="operacao_selecionarProdutoParaConversao"   href="javascript:void(0)" title="Selecionar" ><i class="glyphicon glyphicon-open col-md-12"></i></a>';

    operacoes.push(operacao_selecionarProdutoParaConversao);
    return operacoes.join(' ');
}


function formatadorColunaOperacaoUnidadeConvertida(value, row, index) {

    var operacoes = [];
    var operacao_editarConversao = '<a class="operacao_editarConversao"   href="javascript:void(0)" title="Editar Conversão" ><i class="glyphicon glyphicon-edit col-md-6"></i></a>';
    var operacao_deletarConversao = '<a class="operacao_deletarConversao" href="javascript:void(0)" title="Excluir Conversão"><i class="glyphicon glyphicon-trash col-md-6"></i></a>';

    operacoes.push(operacao_editarConversao);
    operacoes.push(operacao_deletarConversao);
    return operacoes.join(' ');
}


function tratadorEventoColunasConversao() {
    return {
        'click .operacao_deletar': function (e, value, row, index) {
            $.alertaExcluir(
                {
                    Texto: "Deseja excluir a Conversão selecionado?",
                    Url: '@Url.Action("DeleteConfirmed", "TabelaConversaoUnidade", new { Area = "Almoxarifado" })',
                    Dados: [row.TabelaConversaoUnidadeId],
                    Tabela: '#table'
                }
            );

            e.stopPropagation();
        },
        'click .operacao_selecionarProdutoParaConversao': function (e, value, row, index) {
            $('#NomeProdutoConversao').val(row.Nome);
            $("#ProdutoIdConversao").val(row.ProdutoId);
            $("#modalProdutoConversao").modal('hide');
            $('input[id=inputOperacaoConversao]').val('');
            $('#tableUnidadeConvertida').bootstrapTable('refresh');
            e.stopPropagation();
        }
    };
};

