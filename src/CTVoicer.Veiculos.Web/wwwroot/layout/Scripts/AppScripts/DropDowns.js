(function (factory) {
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
        Url: null,
        TextoVazio: null,
        EditTemp: null,
        DropDownId: null,
        FuncaoCascade: null,
        FuncaoCascade2: null,
        Array: null
};

    $.CarregarDropDown = function (options) {
        var dados = $.extend(true, {}, options);
        $.ajax({
            url: dados.Url,
            type: 'GET',
            dataType: "json",
            data: dados.Dados,
            success: function (response) {

                $(dados.DropDownId).multiselect({
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    buttonWidth: '100%',
                    numberDisplayed: 5,
                    nSelectedText: 'selected',
                    nonSelectedText: dados.TextoVazio,
                    buttonClass: 'btn btn-primary col-md-12',
                    maxHeight: 300 
                });

                $(dados.DropDownId).empty();
                $(dados.DropDownId).append('<option value="">'+ dados.TextoVazio+'</option>');
                $(dados.DropDownId).multiselect('rebuild');

                $.each(response, function (i, resp) {
                    if (resp.value == $(dados.EditTemp).val()) {
                        $(dados.DropDownId).append('<option value="' + resp.value + '" selected="selected" >' + resp.label + '</option>');
                        if (dados.FuncaoCascade != null) dados.FuncaoCascade();  
                        if (dados.FuncaoCascade2 != null) dados.FuncaoCascade2();     
                    } else {
                        $(dados.DropDownId).append('<option value="' + resp.value + '">' + resp.label + '</option>');
                    }

                });
                $(dados.DropDownId).multiselect('rebuild');

            },
            error: function () {
                $(dados.DropDownId).multiselect({
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    buttonWidth: '100%',
                    numberDisplayed: 5,
                    nSelectedText: 'selected',
                    nonSelectedText: 'Selecione a Linha',
                    buttonClass: 'btn btn-primary col-md-12',
                    maxHeight: 300 
                });
                $(dados.DropDownId).empty();
                $(dados.DropDownId).append('<option value="">'+dados.TextoVazio+'</option>');
                $(dados.DropDownId).multiselect('rebuild');
            }
        });
    };

    $.CarregarDropDownFixo = function (options) {
        var dados = $.extend(true, {}, options);
        $(dados.DropDownId).multiselect({
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            buttonWidth: '100%',
            numberDisplayed: 5,
            nSelectedText: 'selected',
            nonSelectedText: dados.TextoVazio,
            buttonClass: 'btn btn-primary col-md-12',
            maxHeight: 300
        });

        $(dados.DropDownId).empty();
        $(dados.DropDownId).append('<option value="">' + dados.TextoVazio + '</option>');
        $(dados.DropDownId).multiselect('rebuild');

        $.each(dados.Array, function (i, resp) {
            if (resp.value === $(dados.EditTemp).val()) {
                $(dados.DropDownId).append('<option value="' + resp.value + '" selected="selected" >' + resp.label + '</option>');
                if (dados.FuncaoCascade != null) dados.FuncaoCascade();
            } else {
                $(dados.DropDownId).append('<option value="' + resp.value + '">' + resp.label + '</option>');
            }

        });
        $(dados.DropDownId).multiselect('rebuild');
    };
}));
