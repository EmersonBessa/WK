
    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true,
    format: "dd/mm/yyyy"
    });

    $(document).ready(function () {
        var dataAtual = new Date();
    var ano = dataAtual.getFullYear();
    var data = new Date();
    data_formatada = data.toLocaleDateString();
    $("#DataEntrada").val(data_formatada);

    if ($('#hdnEntradaMerendaEscolaId').val() != '') {
        $.ajax({
            url: '@Url.Action("ObterEntradaMerendaEscola", "EntradaMerendaEscola")',
            type: 'POST',
            dataType: 'json',
            data: { entradaMerendaEscolaId: $('#hdnEntradaMerendaEscolaId').val() },
            success: function (data) {
                $("#inputOperaca").val('update');
                $("#EntradaMerendaEscolaId").val(data.EntradaMerendaEscolaId);
                $("#EscolaAlmoxarifadoId").val(data.EscolaAlmoxarifadoId);
                $("#EscolaAlmoxarifadoIdTemp").val(data.EscolaAlmoxarifadoId);
                $("#GuiaRemessaId").val(data.GuiaRemessaId);
                $("#GuiaRemessaIdTemp").val(data.GuiaRemessaId);
                $('#DataEntrada').val(data.DataEntrada);
                $("#AlmoxarifadoResponsavelId").val(data.AlmoxarifadoResponsavelId);
                CarregarDropDownEscola();
                CarregarDropDownEscolaAlmoxarifado();
                CarregarDropDownGuiaRemessa();
                $('#btn-ConfirmarSalvar').hide();
                $('#btn-FinalizarEntradaMerendaEscola').show();
                $('#itensMerenda').show();
                $('#tableEntradaMerendaEscolaItens').bootstrapTable('refresh');
            }
        })
    } else {
        CarregarDropDownEscola();
            CarregarDropDownGuiaRemessa();
            CarregarDropDownEscolaAlmoxarifado();
            $('#btn-ConfirmarSalvar').show();
            $('#btn-FinalizarEntradaMerendaEscola').hide();
            $("#itensMerenda").hide();
        }
    });

    $('#modalItensGuiaRemessa').on('shown.bs.modal', function (e) {
            $('#tableProdutosGuiaRemessa').bootstrapTable('refresh');
    });
    
    
    $('#GuiaRemessaId').on('change',
    function (e) {
        $.ajax({
            url: '@Url.Action("ObterGuiaRemessa", "GuiaRemessa")',
            type: 'POST',
            dataType: 'json',
            data: { ordemCompraMerendaId: [$('#GuiaRemessaId').val()] },
            success: function (data) {
                $("#PessoaId").val(data.Pessoa.PessoaId);
                $('#PessoaNome').val(data.Pessoa.Nome);
                $('#ProgramaNome').val(data.DotacaoPrograma.Nome);
                $('#ValorNota').val(data.ValorGuiaRemessa);
                $('#DotacaoProgramaId').val(data.DotacaoProgramaId);
                $('#ContratoId').val(data.ContratoId);
            }
        });
        e.stopPropagation();
    });

    function CarregarDropDownEscola() {
        $.CarregarDropDown(
        {
            Url: $('#EscolaId').data('request-url'),
            TextoVazio: ' Selecione ',
            EditTemp: "#EscolaIdTemp",
            DropDownId: "#EscolaId",
            FuncaoCascade: CarregarDropDownGuiaRemessa,
            FuncaoCascade2: CarregarDropDownEscolaAlmoxarifado
        });
    }
    
    function CarregarDropDownGuiaRemessa() {
        var escola = $('#EscolaId').val() == null ? $('#EscolaIdTemp').val() : $('#EscolaId').val();
        $.CarregarDropDown(
        {
        Url: $('#GuiaRemessaId').data('request-url'),
            TextoVazio: ' Selecione ',
            EditTemp: "#GuiaRemessaIdTemp",
            DropDownId: "#GuiaRemessaId",
                Dados: {escolaId: escola}
        });
    }

    function CarregarDropDownEscolaAlmoxarifado() {
        var escola = $('#EscolaId').val() == null ? $('#EscolaIdTemp').val() : $('#EscolaId').val();
        $.CarregarDropDown(
        {
                Url: $('#EscolaAlmoxarifadoId').data('request-url'),
            TextoVazio: ' Selecione ',
            EditTemp: "#EscolaAlmoxarifadoIdTemp",
            DropDownId: "#EscolaAlmoxarifadoId",
                Dados: {escolaId: escola }
        });
    }

    function LimparItem() {
        $('div.campos').find('input').val('');
    }
    
    $('#EscolaId').on('change',
        function (e) {
            CarregarDropDownGuiaRemessa();
            CarregarDropDownEscolaAlmoxarifado();
        }
    );

    $('#EscolaAlmoxarifadoId').on('change',
        function (e) {
            $.ajax({
                url: '@Url.Action("ObterResponsavel", "AlmoxarifadoResponsavel", new {Area = "Almoxarifado" })',
                type: 'POST',
                dataType: 'json',
                data: { escolaAlmoxarifadoId: [$("#EscolaAlmoxarifadoId").val()] },
                success: function (data) {
                    $("#AlmoxarifadoResponsavelId").val(data.AlmoxarifadoResponsavelId);
                },
                error: function (data) {
                    $("#AlmoxarifadoResponsavelId").val('');
                    //alert('ERRO AQUI');
                }
            });
            e.stopPropagation();
        }
    );

    $('#GuiaRemessaId').on('change',
        function (e) {
            $.ajax({
                url: '@Url.Action("ObterGuiaRemessa", "GuiaRemessa", new {Area = "Almoxarifado" })',
                type: 'POST',
                dataType: 'json',
                data: { ordemCompraMerendaId: [$('#GuiaRemessaId').val()] },
                success: function (data) {
                    $("#PessoaIdT").val(data.Pessoa.PessoaId);
                    $('#NomePessoaT').val(data.Pessoa.Nome);
                    $('#ValorNota').val(data.ValorGuiaRemessa);
                    $('#DotacaoId').val(data.DotacaoId);
                }
            });
        e.stopPropagation();
        }
    );

    $('#btn-LocalizarProduto').on('click', function () {
        if ($("#TipoEntradaMerendaEscolaId").val() === "1"){
            $("#modalItensGuiaRemessa").modal();
        } else {
            $("#modalProduto").modal();
        }
    });

    $('#btn-ConfirmarSalvar').on('click', function () {
        var token = $("#__AjaxAntiForgeryForm input").val();
        var dataObject = {
            __RequestVerificationToken: token,
            entradaMerendaEscolaViewModel: ObterDadosEntrada(),
            operacao: $("#inputOperacao").val()
            };
            $.alertaSalvar({
                Texto: 'Deseja salvar os Dados ?',
            Dados: dataObject,
            Url: '@Url.Action("Create", "EntradaMerendaEscola")',
            MensagemSucesso: 'Dados salvo com sucesso!!!',
            TabelaAuxiliar: '#tableEntradaMerendaEscolaItens',
            CampoId: '#EntradaMerendaEscolaId',
            BtnGravar: '#btn-ConfirmarSalvar',
           // BtnFinalizar: '#btn-FinalizarEntradaMerendaEscola',
            Operacao: '#inputOperacao',
            FormAuxiliar: '#grupoProdutos'
        });
    });

    $('#btn-Cancelar').on('click', function () {
        if ($('#EntradaMerendaEscolaId').val() == '') {
            window.location.href = '@Url.Action("Index", "EntradaMerendaEscola")';
        } else {
            $.alertaSairSemGravar(
                {
                    Texto: "Deseja Abandonar a Entrada e Perder os Dados Não Salvos?",
                    UrlAposCancelamento: '@Url.Action("Index", "EntradaMerendaEscola")'
                });
        }
    });

    $("#btn-SalvarItem").on('click', function () {
        var qtdeNt = $("#QtdeNota").val();
        if (qtdeNt == "0,00") {
            $.alertaErro('Digite a Quantidade da Nota');
        } else {
            var token = $("#__AjaxAntiForgeryForm input").val();
            var dataObject = {
            __RequestVerificationToken: token,
            entradaMerendaEscolaItemViewModel: ObterDadosDaEntradaMerendaEscolaItem(),
            operacao: $("#inputOperacaoItem").val()
            };
            $.alertaSalvar({
                Texto: 'Deseja salvar este item na Entrada ?',
                Dados: dataObject,
                Url: '@Url.Action("Create", "EntradaMerendaEscolaItem")',
                Tabela: '#tableItensEntradaMerendaEscola',
                TabelaAuxiliar: '#tableEntradaMerendaEscolaItens',
                MensagemSucesso: 'Item da Entrada  salvo com sucesso!!!',
                InputTotalizadorGrade: '#ValorNota',
                ChaveTabela: $("#EntradaMerendaEscolaId").val(),
                Campos: $('div.campos'),
                UrlAuxiliar: '@Url.Action("ObterValorTotalDasEntradaMerendaEscolaItem", "EntradaMerendaEscolaItem")'
            });
        }
    });

    function ObterDadosEntrada() {
        var entradaMerendaEscolaId = $('#EntradaMerendaEscolaId').val();
        var guiaRemessaId = $('#GuiaRemessaId').val();
        var escolaId = $('#EscolaId').val();
        var dataEntrada = $("#DataEntrada").val();
        var escolaAlmoxarifadoId = $("#EscolaAlmoxarifadoId").val();
        return {
            EntradaMerendaEscolaId: entradaMerendaEscolaId,
            EscolaId: escolaId,
            GuiaRemessaId: guiaRemessaId,
            DataEntrada: dataEntrada,
            EscolaAlmoxarifadoId: escolaAlmoxarifadoId
        };
    }

    function parametrosListagemItensGuiaRemessa(p) {
        if (undefined == p.sort) p.sort = 'p.Nome';
        return {
            ordenacaoCampo: p.sort,
            ordenacaoDirecao: p.order,
            quantidadePagina: p.limit,
            paginaAtual: (p.offset / p.limit) + 1,
            pesquisa: p.search,
            ordemCompraMerendaId: $('#GuiaRemessaId').val()
        };
    }

    function parametrosListagemEntradaMerendaEscolaItens(p) {
        if ('Nome' === p.sort) p.sort = 'Nome';
        return {
            ordenacaoCampo: p.sort,
            ordenacaoDirecao: p.order,
            quantidadePagina: p.limit,
            paginaAtual: (p.offset / p.limit) + 1,
            pesquisa: p.search,
            entradaMerendaEscolaId: $('#EntradaMerendaEscolaId').val()
        };
    }

    function formatadorColunaOperacaoTabelaProdutoGuiaRemessa(value, row, index) {
        var operacoes = [];
        var operacao_selecionar_produtoOrdem =
            '<a class="operacao_selecionar_produtoOrdem"   href="javascript:void(0)" title="Selecionar" ><i class="glyphicon glyphicon-open col-md-12"></i></a>';
        operacoes.push(operacao_selecionar_produtoOrdem);
        return operacoes.join(' ');
    }

