function init() {
  let cidr = 8;
  let primeiroOcteto, segundoOcteto, terceiroOcteto, quartoOcteto;

  const formCalculadora = {
    primeiroOcteto: document.querySelector("#primeiroOcteto"),
    segundoOcteto: document.querySelector("#segundoOcteto"),
    terceiroOcteto: document.querySelector("#terceiroOcteto"),
    quartoOcteto: document.querySelector("#quartoOcteto"),
    cidr: document.querySelector("#cidr"),
    paragrafoIP: document.querySelector("#paragrafoIP"),
    paragrafoClasse: document.querySelector("#paragrafoClasse"),
    paragrafoMascaraDecimal: document.querySelector("#paragrafoMascaraDecimal"),
    paragrafoMascaraBinario: document.querySelector("#paragrafoMascaraBinario"),
    paragrafoHosts: document.querySelector("#paragrafoHosts"),
    paragrafoRedes: document.querySelector("#paragrafoRedes"),
    paragrafoTitulo: document.querySelector("#paragrafoTitulo"),
    primeiroIP: document.querySelector(".primeiroIP"),
    ultimoIP: document.querySelector(".ultimoIP"),
    ipInput: document.querySelectorAll(".ip-input"),
    displayToggle: document.querySelectorAll(".displayToggle"),
    btnCalcular: document.querySelector("#btnCalcular"),
  };
  const {
    ipInput,
    paragrafoMascaraDecimal,
    paragrafoIP,
    paragrafoClasse,
    paragrafoMascaraBinario,
    paragrafoHosts,
    paragrafoRedes,
    paragrafoTitulo,
    primeiroIP,
    ultimoIP,
    displayToggle,
    btnCalcular,
  } = formCalculadora;

  const ipv4 = {
    classes: {
      classeA: "A",
      classeB: "B",
      classeC: "C",
    },

    bitsIniciais: {
      classeA: 8,
      classeB: 16,
      classeC: 24,
    },
  };

  btnCalcular.addEventListener("click", function (evento) {
    evento.preventDefault();
    fazOL();
    exibirResultado();
  });

  function calcularMascara(cidr) {
    const binario = "1".repeat(cidr).padEnd(32, "0");
    const octetosBinarios = binario.match(/.{1,8}/g); // divide em 4 blocos de 8 bits
    const octetosDecimais = octetosBinarios.map((b) => parseInt(b, 2));
    return {
      binaria: octetosBinarios.join("."),
      decimal: octetosDecimais.join("."),
    };
  }

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      fazOL();
    }
  });

  // Event Listeners capturando a mudança do valor a cada mudança do elemento NodeList (array type) ipInput
  ipInput.forEach((element) => {
    element.addEventListener("change", function (evento) {
      validarInputOctetos(cidr);
      fazOL();
      resetParagrafoDeTitulo();
      let valor = Number(evento.target.value.trim());

      if (valor < 0 || valor > 255) {
        alert("O valor do octeto deve estar entre 0 e 255.");
        evento.target.value = ""; // limpa o campo
      } else {
        calcularCIDR(cidr);
        exibirResultado();
      }
    });
  });

  formCalculadora.cidr.addEventListener("change", function (evento) {
    cidr = Number(evento.target.value);
    resetParagrafoDeTitulo();
    calcularCIDR(cidr);
    validarInputOctetos(cidr);
    exibirResultado();
  });

  function calcularCIDR(cidr) {
    if (cidr > 32) {
      window.alert("Digite um número entre 8 e 32 bits");
    } else {
      calcularHosts(cidr);
    }
  }

  function fazOL() {
    limparResultados();
    paragrafoTitulo.innerHTML = `<img src="./assets/img/faz-o-L.gif"></img>`;
  }

  function identificarClasseDoIP(ip) {
    if (ip >= 0 && ip <= 127) {
      return "classeA";
    }
    if (ip >= 128 && ip <= 191) {
      return "classeB";
    }
    if (ip >= 192 && ip <= 223) {
      return "classeC";
    }
    return "Fora do Range";
  }

  function calcularSubRedes(bitsClasseIP) {
    // Fórmula de cálculo de subredes: 2^(cidr - bitsClasseIP) com retorno utilizando as casas decimais no padrão brasileiro.
    subRedes = Math.pow(2, cidr - bitsClasseIP);
    if (subRedes < 1) {
      return (subRedes = 0);
    } else {
      return (subRedes = subRedes.toLocaleString("pt-BR"));
    }
  }

  function calcularHosts(cidr) {
    // Fórmula de cálculo de hosts: 2^(32 - cidr) - 2 com retorno utilizando as casas decimais no padrão brasileiro.
    hosts = Math.pow(2, 32 - cidr) - 2;
    if (hosts < 0) {
      return (hosts = 0);
    }
    return (hosts = hosts.toLocaleString("pt-BR"));
  }

  function validarInputOctetos(cidr) {
    primeiroOcteto = formCalculadora.primeiroOcteto.valueAsNumber || 0;
    segundoOcteto = formCalculadora.segundoOcteto.valueAsNumber || 0;
    terceiroOcteto = formCalculadora.terceiroOcteto.valueAsNumber || 0;
    quartoOcteto = formCalculadora.quartoOcteto.valueAsNumber || 0;

    if (primeiroOcteto === 13 && segundoOcteto === 13 && terceiroOcteto === 13 && quartoOcteto === 13 && cidr === 13) {
      fazOL();
    }
    console.log(primeiroOcteto, segundoOcteto, terceiroOcteto, quartoOcteto, cidr);
  }

  function limparResultados() {
    displayToggle.forEach((item) => {
      item.classList.add("displayToggle");
    });
  }

  function resetParagrafoDeTitulo() {
    paragrafoTitulo.innerHTML = "";
  }

  function exibirResultado() {
    const resultado = identificarClasseDoIP(primeiroOcteto);
    const mascara = calcularMascara(cidr);
    const subRedes = calcularSubRedes(ipv4.bitsIniciais[resultado]);

    displayToggle.forEach((item) => {
      item.classList.remove("displayToggle");
    });

    if (resultado !== "Fora do Range") {
      paragrafoMascaraDecimal.innerHTML = `<span>Máscara decimal:</span> ${mascara.decimal}`;
      paragrafoMascaraBinario.innerHTML = `<span>Máscara binária:</span> ${mascara.binaria}`;

      paragrafoIP.innerHTML = `<span>IP:</span> ${primeiroOcteto}.${segundoOcteto}.${terceiroOcteto}.${quartoOcteto}`;
      paragrafoClasse.innerHTML = `<span>Classe:</span> ${ipv4.classes[resultado]}`;

      paragrafoHosts.innerHTML = `<span>Número de hosts:</span> ${hosts}`;
      paragrafoRedes.innerHTML = `<span>Número de subredes:</span> ${subRedes}`;
    } else {
      limparResultados();
      paragrafoTitulo.innerHTML = `${resultado}`;
    }
  }
}
init();
