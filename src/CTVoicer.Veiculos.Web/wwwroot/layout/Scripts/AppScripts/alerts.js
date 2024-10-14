(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var defaults = {
        Dados: null,
        Url: null,
        UrlAuxiliar: null,
        Tabela: null,
        TabelaAuxiliar: null,
        Texto: null,
        Modal: null,
        MensagemSucesso: null,
        UrlAposAcao: null,
        DivTotalizarItensGrade: null,
        ChaveTabela: null,
        InputTotalizadorGrade: null
    };
    
    $.alertaErro = function (mensagem) {
        swal({
            title: "Opa! Algo de errado!",
            text: mensagem,
            type: "error",
            confirmButtonColor: "#DD6B55"
        });
    }; 
    
    $.alertaSucesso = function (mensagem) {       
        swal({
            title: "Bom trabalho!",
            text: mensagem,
            type: "success"
        });
    };

    $.alertaLoading = function() {
        swal({
            text: "Processando as Informações",
            showCancelButton: false,
            showConfirmButton: false
        });
    };

    $.alertSucessoVoltaIndex = function(options) {
        var dados = $.extend(true, {}, options);
        swal({
            title: "Bom trabalho!",
            text: dados.MensagemSucesso,
            type: "success",
            closeOnConfirm: false,
        },function() {
            window.location.href = dados.UrlAposAcao;
        });
    };

    $.alertaExcluir = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
            title: "Cuidado!",
            text: dados.Texto,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Excluir",
            confirmButtonColor: "#DD6B55"
        },
        function() {
            $.ajax({
                url: dados.Url,
                type: 'POST',
                dataType: 'json',
                data: { id: dados.Dados },
                success: function (data) {
                    if (data.success) {
                        $(dados.Tabela).bootstrapTable('refresh');
                        if (dados.Modal != null) $(dados.Modal).modal('hide');
                        if (dados.TabelaAuxiliar != null) $(dados.TabelaAuxiliar).bootstrapTable('refresh');                        
                        if (dados.DivTotalizarItensGrade != null) $.TotalizarTabela({ DivTotalizarItensGrade: dados.DivTotalizarItensGrade, Url: dados.UrlAuxiliar, ChaveTabela: dados.ChaveTabela });
                        if (dados.InputTotalizadorGrade != null) $.TotalizarTabelaInput({ InputTotalizadorGrade: dados.InputTotalizadorGrade, Url: dados.UrlAuxiliar, ChaveTabela: dados.ChaveTabela });
                        $.alertaSucesso(data.mensagem);
                    } else {
                        $.alertaErro(data.errors);
                    }
                }
            });            
        });
    };

    $.ExcluirSemAlerta = function (options) {
        var dados = $.extend(true, {}, options);       
        swal({
            title: "Cuidado!",
            text: dados.Texto,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Excluir",
            confirmButtonColor: "#DD6B55"
        },
        function () {
            $.ajax({
                url: dados.Url,
                type: 'POST',
                dataType: 'json',
                data: { id: dados.Dados },
                success: function (data) {
                    if (data.success) {
                        $(dados.Tabela).bootstrapTable('refresh');
                        if (dados.TabelaAuxiliar != null) $(dados.TabelaAuxiliar).bootstrapTable('refresh');
                        if (dados.DivTotalizarItensGrade != null) $.TotalizarTabela({ DivTotalizarItensGrade: dados.DivTotalizarItensGrade, Url: dados.UrlAuxiliar, ChaveTabela: dados.ChaveTabela });
                        if (dados.InputTotalizadorGrade != null) $.TotalizarTabelaInput({ InputTotalizadorGrade: dados.InputTotalizadorGrade, Url: dados.UrlAuxiliar, ChaveTabela: dados.ChaveTabela });
                        swal.close();
                    } else {
                        $.alertaErro(data.errors);
                    }
                }
            });
        });        
    };

    $.TotalizarTabela = function (options) {
        var dados = $.extend(true, {}, options);
        $.ajax({
            url: dados.Url,
            type: 'POST',
            dataType: 'json',
            data: { id: dados.ChaveTabela },
            success: function(data) {
                $(dados.DivTotalizarItensGrade).text(formatadorValorMonetarioBootstrapTable(data));
            },
            error:function (data) {
                alert('ERROR Totalizador');
            }
        });
    };    


    $.TotalizarTabelaInput = function (options) {
        var dados = $.extend(true, {}, options);
        $.ajax({
            url: dados.Url,
            type: 'POST',
            dataType: 'json',
            data: { id: dados.ChaveTabela },
            success: function (data) {
                $(dados.InputTotalizadorGrade).val(data);
            },
            error: function (data) {
                alert(dados.Url + ' - ' + dados.ChaveTabela + ' - ' + dados.InputTotalizadorGrade);
            }
        });
    };

    $.LimparCampos = function (options) {
        $('div.campos').find('input').val('');
    }

    $.alertaSalvar = function (options) {
        var dados = $.extend(true, {}, options);
        $.ajax({
            url: dados.Url,
            type: 'POST',
            dataType: 'json',
            data: dados.Dados,
            success: function (data) {
                if (data.success == false) {
                    $.alertaErro(data.errors);
                } else {
                    $(dados.Tabela).bootstrapTable('refresh');
                    if (dados.Modal != null) $(dados.Modal).modal('hide');                    
                    if (dados.DivTotalizarItensGrade != null) $.TotalizarTabela({ DivTotalizarItensGrade: dados.DivTotalizarItensGrade, Url: dados.UrlAuxiliar, ChaveTabela: dados.ChaveTabela });
                    if (dados.InputTotalizadorGrade != null) $.TotalizarTabelaInput({ InputTotalizadorGrade: dados.InputTotalizadorGrade, Url: dados.UrlAuxiliar, ChaveTabela: dados.ChaveTabela });
                    if (data.Id !== null) $(dados.CampoId).val(data.Id);                    
                    if (dados.TabelaAuxiliar != null) $(dados.TabelaAuxiliar).bootstrapTable('refresh');
                    if (dados.TabelaAuxiliar2 != null) $(dados.TabelaAuxiliar2).bootstrapTable('refresh');
                    if (dados.FormAuxiliar != null) $(dados.FormAuxiliar).show();
                    if (dados.FormAuxiliar1 != null) $(dados.FormAuxiliar1).show();
                    if (dados.BtnGravar != null) $(dados.BtnGravar).hide();
                    if (dados.BtnFinalizar != null) $(dados.BtnFinalizar).show();
                    if (dados.BtnCancelar != null) $(dados.BtnCancelar).hide();
                    if (data.Operacao !== null) $(dados.inputOperacao).val('update');
                    if (data.Campos !== null) $.LimparCampos(data.Campos);
                }
            }
        });
    };
    
    $.SalvarSemAlert = function (options) {
        var dados = $.extend(true, {}, options);
        $.ajax({   
            url: dados.Url,
            type: 'POST',
            dataType: 'json',
            data: dados.Dados,
            success: function (data) {
                if (data.success == false) {
                    $.alertaErro(data.errors);
                } else {
                    $(dados.Tabela).bootstrapTable('refresh');
                    if (dados.TabelaAuxiliar != null) $(dados.TabelaAuxiliar).bootstrapTable('refresh');
                    if (dados.DivTotalizarItensGrade != null) $.TotalizarTabela({ DivTotalizarItensGrade: dados.DivTotalizarItensGrade, Url: dados.UrlAuxiliar, ChaveTabela: dados.ChaveTabela });
                }
            }
        });
    };  

    $.salvarSemConfirmar = function (options) {
        var dados = $.extend(true, {}, options);
        $.ajax({
            url: dados.Url,
            type: 'POST',
            dataType: 'json',
            data: dados.Dados,
            success: function (data) {
                if (data.success == false) {
                    $.alertaErro(data.errors);
                } else {
                    $(dados.Tabela).bootstrapTable('refresh');
                    if (dados.Modal != null) $(dados.Modal).modal('hide');
                    if (dados.TabelaAuxiliar != null) $(dados.TabelaAuxiliar).bootstrapTable('refresh');
                    $.alertaSucesso(dados.MensagemSucesso);
                }
            }
        });
    };

    $.alertaSalvarComMultiSelect = function (options) {
        var dados = $.extend(true, {}, options);
        bootbox.dialog({
            title: "<h2><i class='fa fa-question'></i> Gravar Dados?</h2>",
            message: "<h3>" + dados.Texto + "</h3>",
            buttons: {
                "Fechar": {
                    className: "btn-default",
                    callback: function () { this.modal('hide'); }
                },
                "Salvar": {
                    className: "btn-success btn-primary",
                    callback: function () {
                        $.ajax({
                            url: dados.Url,
                            type: 'POST',
                            dataType: 'json',
                            data: dados.Dados,
                            traditional:false,
                            success: function (data) {
                                if (data.success == false) {
                                    $.alertaErro(data.errors);
                                } else {
                                    $(dados.Tabela).bootstrapTable('refresh');
                                    $(dados.Modal).modal('hide');
                                    $.alertaSucesso(dados.MensagemSucesso);
                                }
                            }
                        });
                    }
                }
            }
        });
    };
    
    $.alertaResetarSenha = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
                title: "Cuidado!",
                text: dados.Texto,
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Alterar",
                confirmButtonColor: "#DD6B55"
            },
            function () {
                $.ajax({
                    url: dados.Url,
                    type: 'POST',
                    dataType: 'json',
                    data: dados.Dados ,
                    success: function (data) {
                        if (data.success) {
                            $.alertaSucesso(data.mensagem);
                        } else {
                            $.alertaErro(data.errors);
                        }
                    }
                });
            });
    };

    $.alertaDesbloquearUsuario = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
                title: "Cuidado!",
                text: dados.Texto,
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Desbloquear",
                confirmButtonColor: "#DD6B55"
            },
            function () {
                $.ajax({
                    url: dados.Url,
                    type: 'POST',
                    dataType: 'json',
                    data: dados.Dados,
                    success: function (data) {
                        if (data.success) {
                            $.alertaSucesso(data.mensagem);
                        } else {
                            $.alertaErro(data.errors);
                        }
                    }
                });
            });
    };

    $.alertaInativarUsuario = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
                title: "Cuidado!",
                text: dados.Texto,
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Inativar",
                confirmButtonColor: "#DD6B55"
            },
            function () {
                $.ajax({
                    url: dados.Url,
                    type: 'POST',
                    dataType: 'json',
                    data: dados.Dados,
                    success: function (data) {
                        if (data.success) {
                            $.alertaSucesso(data.mensagem);
                            $(dados.Tabela).bootstrapTable('refresh');
                        } else {
                            $.alertaErro(data.errors);
                        }
                    }
                });
            });
    }

    $.alertaAtivarUsuario = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
                title: "Cuidado!",
                text: dados.Texto,
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Ativar",
                confirmButtonColor: "#DD6B55"
            },
            function () {
                $.ajax({
                    url: dados.Url,
                    type: 'POST',
                    dataType: 'json',
                    data: dados.Dados,
                    success: function (data) {
                        if (data.success) {
                            $.alertaSucesso(data.mensagem);
                            $(dados.Tabela).bootstrapTable('refresh');
                        } else {
                            $.alertaErro(data.errors);
                        }
                    }
                });
            });
    }

    $.alertaCancelarEExcluir = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
            title: "Cuidado!",
            text: dados.Texto,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, quero sair",
            confirmButtonColor: "#DD6B55"
        },
        function () {
            $.ajax({
                url: dados.Url,
                type: 'POST',
                dataType: 'json',
                data: { id: dados.Dados },
                success: function (response) {
                    if (response.success) {
                        if (response.Modal != null) $(response.Modal).modal('hide');
                        window.location.href = dados.UrlAposCancelamento;
                    } else {
                        $.alertaErro(response.errors);
                    }
                }
            });
        });
    };

    $.alertaSairSemGravar = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
            title: "Cuidado!",
            text: dados.Texto,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, quero sair",
            confirmButtonColor: "#DD6B55"
        },
            function () {          
                window.location.href = dados.UrlAposCancelamento                   
            });
    };




    $.alertaFinalizar = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
            title: "Atenção!",
            text: dados.Texto,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Finalizar",
            confirmButtonColor: "#DD6B55"
        },
            function () {
                $.ajax({
                    url: dados.Url,
                    type: 'POST',
                    dataType: 'json',
                    data: dados.Dados,
                    success: function (data) {
                        if (data.success) {
                            $.alertaSucesso(data.mensagem);
                            $(dados.Tabela).bootstrapTable('refresh');
                        } else {
                            $.alertaErro(data.errors);
                        }
                    }
                });
            });
    }

    $.alertaReabrir = function (options) {
        var dados = $.extend(true, {}, options);
        swal({
                title: "Atenção!",
                text: dados.Texto,
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Reabrir",
                confirmButtonColor: "#DD6B55"
            },
            function () {
                $.ajax({
                    url: dados.Url,
                    type: 'POST',
                    dataType: 'json',
                    data: dados.Dados,
                    success: function (data) {
                        if (data.success) {
                            $.alertaSucesso(data.mensagem);
                            $(dados.Tabela).bootstrapTable('refresh');
                        } else {
                            $.alertaErro(data.errors);
                        }
                    }
                });
            });
    }

}));
