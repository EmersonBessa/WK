$(function () {
    $('.cnpj_format').formatter({
        'pattern': '{{99}}.{{999}}.{{999}}/{{9999}}-{{99}}',
        'persistent': false
    });

    $('#cep_format').formatter({
        'pattern': '{{99}}{{999}}-{{999}}',
        'persistent': false
    });

    $('.cep_format').formatter({
        'pattern': '{{99999}}-{{999}}',
        'persistent': false
    });

    $('.data_format').formatter({
        'pattern': '{{99}}/{{99}}/{{9999}}',
        'persistent': false
    });
    
    $('.cpf_format').formatter({
        'pattern': '{{999}}.{{999}}.{{999}}-{{99}}',
        'persistent': false
    });

    $('.hora_format').formatter({
        'pattern': '{{99}}:{{99}}',
        'persistent': false
    });
    
    $('.fone_format').formatter({
        'pattern': '({{99}}) {{99999}}-{{9999}}',
        'persistent': false
    });
    
    $('.foneFixo_format').formatter({
        'pattern': '({{99}}) {{9999}}-{{9999}}',
        'persistent': false
    });
    
    $('.placa_format').formatter({
        'pattern': '{{aaa}}-{{9999}}',
        'persistent': false
    });
    
    $('.ano_format').formatter({
        'pattern': '{{9999}}',
        'persistent': false
    });

    $('.doisNumeros_format').formatter({
        'pattern': '{{99}}',
        'persistent': false
    });
    
    $('.unidadeOrcamentariaCodigo_format').formatter({
        'pattern': '{{99}}.{{99}}',
        'persistent': false
    });
});

function OnlyNumbers(selector) {
    $(selector).keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}


function formatadorValorMonetarioBootstrapTable(value, row, index) {
    var localeUsuario = window.navigator.userLanguage || window.navigator.language;
    var configuracoesFormatacao = {
        currency: {
            symbol: "$", // default currency symbol is '$'
            format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal: ".", // decimal point separator
            thousand: ",", // thousands separator
            precision: 2 // decimal places
        },
        number: {
            precision: 0, // default precision on numbers is 0
            thousand: ",",
            decimal: "."
        }
    };

    if (localeUsuario === 'pt-BR') {
        configuracoesFormatacao = {
            currency: {
                symbol: "R$", // default currency symbol is '$'
                format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                decimal: ",", // decimal point separator
                thousand: ".", // thousands separator
                precision: 2 // decimal places
            },
            number: {
                precision: 0, // default precision on numbers is 0
                thousand: ".",
                decimal: ","
            }
        };
    }

    accounting.settings = configuracoesFormatacao;

    return accounting.formatMoney(value);
}

function formatadorValorMonetarioBootstrapTablePrecision3D(value, row, index) {
 
    var localeUsuario = window.navigator.userLanguage || window.navigator.language;

    // Configuração padrão (internacional).
    var configuracoesFormatacao = {
        currency: {
            symbol: "$", // default currency symbol is '$'
            format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal: ".", // decimal point separator
            thousand: ",", // thousands separator
            precision: 3 // decimal places
        },
        number: {
            precision: 0, // default precision on numbers is 0
            thousand: ",",
            decimal: "."
        }
    };

    if (localeUsuario === 'pt-BR') {
        configuracoesFormatacao = {
            currency: {
                symbol: "R$", // default currency symbol is '$'
                format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                decimal: ",", // decimal point separator
                thousand: ".", // thousands separator
                precision: 3 // decimal places
            },
            number: {
                precision: 0, // default precision on numbers is 0
                thousand: ".",
                decimal: ","
            }
        };
    }

    accounting.settings = configuracoesFormatacao;

    return accounting.formatMoney(value);
}

function formatadorValor(value, row, index) {
    var localeUsuario = window.navigator.userLanguage || window.navigator.language;
    
    var configuracoesFormatacao = {
        currency: {
            symbol: "$", // default currency symbol is '$'
            format: "%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal: ".", // decimal point separator
            thousand: ",", // thousands separator
            precision: 2 // decimal places
        },
        number: {
            precision: 0, // default precision on numbers is 0
            thousand: ",",
            decimal: "."
        }
    };

    if (localeUsuario === 'pt-BR') {
        configuracoesFormatacao = {
            currency: {
                symbol: "R$", // default currency symbol is '$'
                format: "%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                decimal: ",", // decimal point separator
                thousand: ".", // thousands separator
                precision: 2 // decimal places
            },
            number: {
                precision: 0, // default precision on numbers is 0
                thousand: ".",
                decimal: ","
            }
        };
    }

    accounting.settings = configuracoesFormatacao;

    return accounting.formatMoney(value);
}


function formatadorValorPrecision3D(value, row, index) {
    var localeUsuario = window.navigator.userLanguage || window.navigator.language;

    // Configuração padrão (internacional).
    var configuracoesFormatacao = {
        currency: {
            symbol: "$", // default currency symbol is '$'
            format: "%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal: ".", // decimal point separator
            thousand: ",", // thousands separator
            precision: 3 // decimal places
        },
        number: {
            precision: 0, // default precision on numbers is 0
            thousand: ",",
            decimal: "."
        }
    };

    if (localeUsuario === 'pt-BR') {
        configuracoesFormatacao = {
            currency: {
                symbol: "R$", // default currency symbol is '$'
                format: "%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                decimal: ",", // decimal point separator
                thousand: ".", // thousands separator
                precision: 3 // decimal places
            },
            number: {
                precision: 0, // default precision on numbers is 0
                thousand: ".",
                decimal: ","
            }
        };
    }

    accounting.settings = configuracoesFormatacao;

    return accounting.formatMoney(value);
}

function formatar_moeda(campo, separador_milhar, separador_decimal, tecla) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? tecla.which : tecla.keyCode;

    if (whichCode == 13) return true;

    if (whichCode == 8) return true;
    key = String.fromCharCode(whichCode);

    if (strCheck.indexOf(key) == -1) return false;
    len = campo.value.length;
    for (i = 0; i < len; i++)
        if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != separador_decimal)) break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(campo.value.charAt(i)) != -1) aux += campo.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) campo.value = '';
    if (len == 1) campo.value = '0' + separador_decimal + '0' + aux;
    if (len == 2) campo.value = '0' + separador_decimal + aux;

    if (len > 2) {
        aux2 = '';

        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += separador_milhar;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }

        campo.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            campo.value += aux2.charAt(i);
        campo.value += separador_decimal + aux.substr(len - 2, len);
    }

    return false;
}

$(document).ready(function() {
    $('.mascaraDecimal2d').inputmask('decimal');
    $('.mascaraDecimal3d').inputmask('decimal3Digitos');
    $('.mascaraDecimal1d').inputmask('decimal1Digitos');
});


