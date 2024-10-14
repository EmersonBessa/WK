$("#btn-SalvarPessoa").on('click', function () {
    var token = $("#__AjaxAntiForgeryForm input").val();
    var dataObject = {
        __RequestVerificationToken: token,
        pessoaViewModel: ObterDadosDaPessoa(),
        operacao: $("#inputOperacaoProdCli").val()
    };

    var dados = dataObject;
    $.ajax({
        url: $("#btn-SalvarPessoa").data('target'),
        type: 'POST',
        dataType: 'json',
        data: dados,
        success: function (data) {
            if (data.success == false) {
                $.alertaErro(data.errors);
            } else {
                // $.alertaSucesso("Cliente salva com sucesso!!!");
              //  ResetarCampos();
                $('#modalCadPessoa').modal('hide');
            }
        }
    });
});

function ObterDadosDaPessoa() {
    var pessoaId = $("#PessoaIdPes").val();
    var dataCadastro = $("#DataCadastro").val();
    var endereco = $("#EnderecoPes").val();
    var bairro = $("#BairroPes").val();
    var celular = $("#CelularPes").val();
    var telefone = $("#TelefonePes").val();
    var cep = $("#CepPes").val();
    var municipioId = $("#MunicipioIdPes").val();
    var email = $("#EmailPes").val();
    var complemento = $("#ComplementoPes").val();
    var numero = $("#NumeroPes").val();
    var tipoDePessoaId = $("#TipoDePessoaId").val();
    var desativado = $("#Desativado").val();

    //Pessoa Física
    var nome = $("#NomePes").val();
    var cpf = $("#CpfPes").val();
    var rg = $("#RgPes").val();
    var dataNascimento = $("#DataNascimentoPes").val();
    var nomePai = $("#NomePaiPes").val();
    var nomeMae = $("#NomeMaePes").val();

    //Pessoa Juridica
    var razaoSocial = $("#RazaoSocialPes").val();
    var nomeFantasia = $("#NomeFantasiaPes").val();
    var cnpj = $("#CnpjPes").val();
    var inscricaoEstadual = $("#InscricaoEstadualPes").val();

    return {
        PessoaId: pessoaId,
        DataCadastro: dataCadastro,
        Endereco: endereco,
        Bairro: bairro,
        Celular: celular,
        Telefone: telefone,
        Cep: cep,
        MunicipioId: municipioId,
        Email: email,
        Complemento: complemento,
        Numero: numero,
        TipoDePessoaId: tipoDePessoaId,
        Desativado: desativado,
        Nome: nome,
        Cpf: cpf,
        Rg: rg,
        DataNascimento: dataNascimento,
        NomePai: nomePai,
        NomeMae: nomeMae,
        RazaoSocial: razaoSocial,
        NomeFantasia: nomeFantasia,
        InscricaoEstadual: inscricaoEstadual,
        Cnpj: cnpj
    };
}

function CarregarDropDownPessoa() {
    $.CarregarDropDown(
        {
            Url: $('#TipoDePessoaId').data('request-url'),
            TextoVazio: 'Selecione o Tipo de Pessoa cadastrar',
            EditTemp: "#TipoDePessoaIdTemp",
            DropDownId: "#TipoDePessoaId"
        }
    );
}

function CarregarDropDownEstadoPes() {
    $.CarregarDropDown(
        {
            Url: $('#EstadoIdPes').data('request-url'),
            TextoVazio: 'Selecione a Unidade Federativa',
            EditTemp: "#EstadoIdPesTemp",
            DropDownId: "#EstadoIdPes",
            FuncaoCascade: CarregarDropDownMunicipioPes
        }
    );
}

function CarregarDropDownMunicipioPes() {
    $.CarregarDropDown(
        {
            Url: $('#MunicipioIdPes').data('request-url'),
            TextoVazio: 'Selecione o Município',
            EditTemp: "#MunicipioIdPesTemp",
            DropDownId: "#MunicipioIdPes",
            Dados: { unidadeFederativaId: $("#EstadoIdPes").val() }
        }
    );
}

$('#EstadoIdPes').on('change', function (e) {
    CarregarDropDownMunicipioPes();
});

$('#modalCadPessoa').on('shown.bs.modal', function (e) {
    CarregarDropDownEstadoPes();
    CarregarDropDownMunicipioPes();
    CarregarDropDownPessoa();
    if ($("#TipoDePessoaIdTemp").val() === '') {
        $("#pessoaJuridicaDiv").hide();
        $("#pessoaFisicaDiv").hide();
    }

});

$("#TipoDePessoaId").on('change', function () {
    if ($(this).val() === "1") {
        $("#pessoaFisicaDiv").show();
        $("#pessoaJuridicaDiv").hide();
    } else if ($(this).val() === "2") {
        $("#pessoaFisicaDiv").hide();
        $("#pessoaJuridicaDiv").show();
    } else if ($(this).val() === "0") {
        $("#pessoaJuridicaDiv, #pessoaFisicaDiv").hide();
    }
});
