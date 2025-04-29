function init() {
  let cidr = 8;

  const formCalculadora = {
    primeiroOcteto: document.querySelector("#primeiroOcteto"),
    segundoOcteto: document.querySelector("#segundoOcteto"),
    terceiroOcteto: document.querySelector("#terceiroOcteto"),
    quartoOcteto: document.querySelector("#quartoOcteto"),
    cidr: document.querySelector("#cidr"),
    btn: document.querySelector("#btn-calcular"),
    pIP: document.querySelector("#pIP"),
    pClasse: document.querySelector("#pClasse"),
    pMascaraDecimal: document.querySelector("#pMascaraDecimal"),
    pMascaraBinario: document.querySelector("#pMascaraBinario"),
    pHosts: document.querySelector("#pHosts"),
    pRedes: document.querySelector("#pRedes"),
  };

  let { pMascaraDecimal, pIP, pClasse, pMascaraBinario, pHosts, pRedes } = formCalculadora;

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

  function calcularMascara(cidr) {
    const binario = "1".repeat(cidr).padEnd(32, "0");
    const octetosBinarios = binario.match(/.{1,8}/g); // divide em 4 blocos de 8 bits
    const octetosDecimais = octetosBinarios.map((b) => parseInt(b, 2));
    return {
      binaria: octetosBinarios.join("."),
      decimal: octetosDecimais.join("."),
    };
  }

  // Event Listeners capturando a mudança do valor a cada mudança
  formCalculadora.primeiroOcteto.addEventListener("change", function (evento) {
    let valor = Number(evento.target.value.trim());
    if (valor < 0 || valor > 255) {
      alert("O valor do octeto deve estar entre 0 e 255.");
      evento.target.value = ""; // limpa o campo
    } else {
      primeiroOcteto = valor;
      getCIDR(cidr);
      exibirResultado();
    }
  });

  formCalculadora.segundoOcteto.addEventListener("change", function (evento) {
    let valor = Number(evento.target.value.trim());
    if (valor < 0 || valor > 255) {
      alert("O valor do octeto deve estar entre 0 e 255.");
      evento.target.value = ""; // limpa o campo
    } else {
      segundoOcteto = valor;
      getCIDR(cidr);
      exibirResultado();
    }
  });

  formCalculadora.terceiroOcteto.addEventListener("change", function (evento) {
    let valor = Number(evento.target.value.trim());
    if (valor < 0 || valor > 255) {
      alert("O valor do octeto deve estar entre 0 e 255.");
      evento.target.value = ""; // limpa o campo
    } else {
      terceiroOcteto = valor;
      getCIDR(cidr);
      exibirResultado();
    }
  });

  formCalculadora.quartoOcteto.addEventListener("change", function (evento) {
    let valor = Number(evento.target.value.trim());
    if (valor < 0 || valor > 255) {
      alert("O valor do octeto deve estar entre 0 e 255.");
      evento.target.value = ""; // limpa o campo
    } else {
      quartoOcteto = valor;
      getCIDR(cidr);
      exibirResultado();
    }
  });

  formCalculadora.cidr.addEventListener("change", function (evento) {
    if (Number(evento.target.value) > 32) {
    } else {
      cidr = Number(evento.target.value);
      getCIDR(cidr);
      exibirResultado();
    }
  });

  function getCIDR(cidr) {
    if (cidr > 32) {
      window.alert("Digite um número entre 8 e 32 bits");
    } else {
      calcularHosts(cidr);
    }
  }

  formCalculadora.btn.addEventListener("click", function (evento) {
    // Impedir o reload da página ao clicar em calcular

    evento.preventDefault();
    exibirResultado();
  });

  function identificarClasseDoIP(ip) {
    // Loop para identificar o intervalo de cada classe de IP. Classe A vai do 0 até o 127.
    let classeA = new Uint8ClampedArray(128);
    for (let i = 0; i < 128; i++) {
      classeA[i] = i;
    }

    // Loop para identificar o intervalo de cada classe de IP. Classe B vai do 128 até o 191.
    let classeB = new Uint8ClampedArray(192);
    for (let i = 128; i < 192; i++) {
      classeB[i] = i;
    }

    // Loop para identificar o intervalo de cada classe de IP. Classe C vai do 192 até o 223.
    let classeC = new Uint8ClampedArray(224);
    for (let i = 192; i < 224; i++) {
      classeC[i] = i;
    }

    // Uso do switch para identificar a classe com base no número do primeiro octeto do IP. Ex: 192 retorna a string "classeC"
    switch (true) {
      case classeA.includes(ip):
        return "classeA";

      case classeB.includes(ip):
        return "classeB";

      case classeC.includes(ip):
        return "classeC";

      case ip > 223:
        return "Fora do Range";

      default:
        return "Classe não identificada";
    }
  }

  function calcularSubRedes(bitsClasseIP) {
    validarOctetos();
    // Fórmula de cálculo de subredes: 2^(cidr - bitsClasseIP) com retorno utilizando as casas decimais no padrão brasileiro.
    subRedes = Math.pow(2, cidr - bitsClasseIP);
    if (subRedes < 1) {
      return (subRedes = 0);
    } else {
      return (subRedes = subRedes.toLocaleString("pt-BR"));
    }
  }

  function calcularHosts(cidr) {
    validarOctetos();
    // Fórmula de cálculo de hosts: 2^(32 - cidr) - 2 com retorno utilizando as casas decimais no padrão brasileiro.
    hosts = Math.pow(2, 32 - cidr) - 2;
    if (hosts < 0) {
      return (hosts = 0);
    }
    return (hosts = hosts.toLocaleString("pt-BR"));
  }

  function validarOctetos() {
    primeiroOcteto = Number(formCalculadora.primeiroOcteto.value) || 0;
    segundoOcteto = Number(formCalculadora.segundoOcteto.value) || 0;
    terceiroOcteto = Number(formCalculadora.terceiroOcteto.value) || 0;
    quartoOcteto = Number(formCalculadora.quartoOcteto.value) || 0;

    const octetos = [primeiroOcteto, segundoOcteto, terceiroOcteto, quartoOcteto];
    const campos = [formCalculadora.primeiroOcteto, formCalculadora.segundoOcteto, formCalculadora.terceiroOcteto, formCalculadora.quartoOcteto];

    for (let i = 0; i < octetos.length; i++) {
      if (octetos[i] < 0 || octetos[i] > 255) {
        alert(`O octeto ${i + 1} deve estar entre 0 e 255.`);
        campos[i].focus();
        return false;
      }
    }

    return true;
  }

  function exibirResultado() {
    const resultado = identificarClasseDoIP(primeiroOcteto);
    const mascara = calcularMascara(cidr);
    const subRedes = calcularSubRedes(ipv4.bitsIniciais[resultado]);

    validarOctetos();

    if (resultado !== "Fora do Range" && resultado !== "Classe não identificada") {
      pMascaraDecimal.innerHTML = `<span>Máscara decimal:</span> ${mascara.decimal}`;
      pMascaraBinario.innerHTML = `<span>Máscara binária:</span> ${mascara.binaria}`;

      pIP.innerHTML = `<span>IP:</span> ${primeiroOcteto}.${segundoOcteto}.${terceiroOcteto}.${quartoOcteto}`;
      pClasse.innerHTML = `<span>Classe:</span> ${ipv4.classes[resultado]}`;

      pHosts.innerHTML = `<span>Número de hosts:</span> ${hosts}`;
      pRedes.innerHTML = `<span>Número de subredes:</span> ${subRedes}`;
    } else {
      pIP.innerHTML += "";
      pClasse.innerHTML += "";
      pMascaraDecimal.innerHTML += "";
      pMascaraBinario.innerHTML += "";
      pHosts.innerHTML += "";
      pRedes.innerHTML += "";
      pIP.innerHTML = `${resultado}`;
    }
  }
}

init();
