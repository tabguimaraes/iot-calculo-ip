function init() {
  let cidr = 8;
  let primeiroOcteto, segundoOcteto, terceiroOcteto, quartoOcteto;

  const formCalculadora = {
    primeiroOcteto: document.querySelector("#primeiroOcteto"),
    segundoOcteto: document.querySelector("#segundoOcteto"),
    terceiroOcteto: document.querySelector("#terceiroOcteto"),
    quartoOcteto: document.querySelector("#quartoOcteto"),
    cidr: document.querySelector("#cidr"),
    pIP: document.querySelector("#pIP"),
    pClasse: document.querySelector("#pClasse"),
    pMascaraDecimal: document.querySelector("#pMascaraDecimal"),
    pMascaraBinario: document.querySelector("#pMascaraBinario"),
    pHosts: document.querySelector("#pHosts"),
    pRedes: document.querySelector("#pRedes"),
    ipInput: document.querySelectorAll(".ip-input"),
  };
  let { ipInput, pMascaraDecimal, pIP, pClasse, pMascaraBinario, pHosts, pRedes } = formCalculadora;

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

  // Event Listeners capturando a mudança do valor a cada mudança do elemento NodeList (array type) ipInput
  ipInput.forEach((element) => {
    element.addEventListener("change", function (evento) {
      let valor = Number(evento.target.value.trim());

      if (valor < 0 || valor > 255) {
        alert("O valor do octeto deve estar entre 0 e 255.");
        evento.target.value = ""; // limpa o campo
      } else {
        getCIDR(cidr);
        exibirResultado();
      }
    });
  });

  formCalculadora.cidr.addEventListener("change", function (evento) {
    if (Number(evento.target.value) > 32) {
      alert("O valor do CIDR deve estar entre 8 e 32.");
      Number((evento.target.value = 8));
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

  function identificarClasseDoIP(ip) {
    if (ip >= 0 && ip <= 127) return "classeA";
    if (ip >= 128 && ip <= 191) return "classeB";
    if (ip >= 192 && ip <= 223) return "classeC";
    return "Fora do Range";
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

  function limparResultados() {
    pIP.innerHTML = "";
    pClasse.innerHTML = "";
    pMascaraDecimal.innerHTML = "";
    pMascaraBinario.innerHTML = "";
    pHosts.innerHTML = "";
    pRedes.innerHTML = "";
  }

  function exibirResultado() {
    const resultado = identificarClasseDoIP(primeiroOcteto);
    const mascara = calcularMascara(cidr);
    const subRedes = calcularSubRedes(ipv4.bitsIniciais[resultado]);

    validarOctetos();

    if (resultado !== "Fora do Range") {
      pMascaraDecimal.innerHTML = `<span>Máscara decimal:</span> ${mascara.decimal}`;
      pMascaraBinario.innerHTML = `<span>Máscara binária:</span> ${mascara.binaria}`;

      pIP.innerHTML = `<span>IP:</span> ${primeiroOcteto}.${segundoOcteto}.${terceiroOcteto}.${quartoOcteto}`;
      pClasse.innerHTML = `<span>Classe:</span> ${ipv4.classes[resultado]}`;

      pHosts.innerHTML = `<span>Número de hosts:</span> ${hosts}`;
      pRedes.innerHTML = `<span>Número de subredes:</span> ${subRedes}`;
    } else {
      limparResultados();
      pIP.innerHTML = `${resultado}`;
    }
  }
}

init();
