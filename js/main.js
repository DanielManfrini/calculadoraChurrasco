const tabela = {
  Homens: {
    CarneBovina: 500,
    Frango: 200,
    Linguiça: 200,
    Refrigerante: 300,
    Cerveja: 800
  },
  Mulheres: {
    CarneBovina: 300,
    Frango: 200,
    Linguiça: 200,
    Refrigerante: 400,
    Cerveja: 500
  },
  Criancas: {
    CarneBovina: 200,
    Frango: 100,
    Linguiça: 200,
    Refrigerante: 200,
    Cerveja: 0
  },
};

$(document).ready(function () {
  $('#btn-calcular').on('click', function () {
    calcularTotal();
  });
  $('#btn-limpar').on('click', function () {
    limparInputs();
  });
  $(".input-quantidade").on('change', function () {
    limparResultado();
    validaInputs();
  })
});

function calcularTotal() {

  var pessoas = [
    { pessoa: 'Homens', valor: parseInt($('#input-homens').val()) },
    { pessoa: 'Mulheres', valor: parseInt($('#input-mulheres').val()) },
    { pessoa: 'Criancas', valor: parseInt($('#input-criancas').val()) },
  ];

  var quantidade = {
    CarneBovina: 0,
    Frango: 0,
    Linguiça: 0,
    Refrigerante: 0,
    Cerveja: 0
  };

  for (var pessoa of pessoas) {
    if (pessoa.valor > 0) {

      quantidade = {
        CarneBovina: quantidade.CarneBovina + (tabela[pessoa.pessoa].CarneBovina * pessoa.valor),
        Frango: quantidade.Frango + (tabela[pessoa.pessoa].Frango * pessoa.valor),
        Linguiça: quantidade.Linguiça + (tabela[pessoa.pessoa].Linguiça * pessoa.valor),
        Refrigerante: quantidade.Refrigerante + (tabela[pessoa.pessoa].Refrigerante * pessoa.valor),
        Cerveja: quantidade.Cerveja + (tabela[pessoa.pessoa].Cerveja * pessoa.valor)
      };

    };

  };

  var texto = `
  <ul>
    <li> ${formatarTexto(quantidade.CarneBovina, 'Kg', 'g')} de carne bovina </li>\
    <li> ${formatarTexto(quantidade.Frango, 'Kg', 'g')} de frango </li>\
    <li> ${formatarTexto(quantidade.Linguiça, 'Kg', 'g')} de linguiça </li>\
    <li> ${formatarTexto(quantidade.Refrigerante, 'L', 'ml')} de refrigerante </li>\
    ${quantidade.Cerveja > 0 ? `<li> ${formatarTexto(quantidade.Cerveja, 'L', 'ml')} de cerveja </li>` : ''}
  </ul>
  `
  $('#div-resultado').html(texto);
}

function formatarTexto(valor, unidade1, unidade2) {

  let valorString = valor.toString();
  let valorFormatado = valorString.length > 3 ? (valor / 1000).toFixed(1) : valor;

  return `${valorFormatado}${valorString.length > 3 ? unidade1 : unidade2}`
}

function limparInputs() {
  $('#input-homens').val('0');
  $('#input-mulheres').val('0');
  $('#input-criancas').val('0');
  limparResultado();
}

function limparResultado() {
  $('#div-resultado').html('');
}

function validaInputs() {

  let contador = 0
  let inputInvalido = false;

  $(".input-quantidade").each(function () {
    contador = contador + parseInt($(this).val());
    
    if ($(this).val() == "" || $(this).val() < 0) {
      inputInvalido = true;
    }

  });

  console.log(inputInvalido, contador)

  if (inputInvalido || contador <= 0) {
    $('.btn-padrao').attr('disabled', true);
  } else {
    $('.btn-padrao').attr('disabled', false);
  }

}