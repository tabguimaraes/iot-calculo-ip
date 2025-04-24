let cidr;
// let primeiroOctetoIP = 10;
let primeiroOcteto, segundoOcteto, terceiroOcteto, quartoOcteto, pClasse, pMascara, pHosts, pRedes;

const calculadora = {
  primeiroOcteto: document.querySelector("#primeiroOcteto"),
  segundoOcteto: document.querySelector("#segundoOcteto"),
  terceiroOcteto: document.querySelector("#terceiroOcteto"),
  quartoOcteto: document.querySelector("#quartoOcteto"),
  cidr: document.querySelector("#cidr"),
  btn: document.querySelector("#btn-calcular"),
  pClasse: document.querySelector("#pClasse"),
  pMascara: document.querySelector("#pMascara"),
  pHosts: document.querySelector("#pHosts"),
  pRedes: document.querySelector("#pRedes"),
};

// Event Listeners capturando a mudança do valor a cada mudança
calculadora.primeiroOcteto.addEventListener("change", function (evento) {
  primeiroOcteto = Number(evento.target.value);
  console.log(primeiroOcteto);
});

calculadora.cidr.addEventListener("change", function (evento) {
  cidr = Number(evento.target.value);
  console.log(cidr);
  getCIDR(cidr);
});

function getIP() {
  primeiroOcteto = calculadora.primeiroOcteto;
  return primeiroOcteto;
}

function getCIDR(cidr) {
  if (cidr > 32) {
  } else {
    calcularHosts(cidr);
  }
}

calculadora.btn.addEventListener("click", function (evento) {
  // Impedir o reload da página ao clicar em calcular
  evento.preventDefault();
  exibirResultado();
  getIP();
});

let ipv4 = {
  classes: {
    classeA: "A",
    classeB: "B",
    classeC: "C",
  },
  mascaraEmDecimal: {
    classeA: "255.0.0.0",
    classeB: "255.255.0.0",
    classeC: "255.255.255.0",
  },
  mascaraEmBinario: {
    classeA: "11111111.00000000.00000000.00000000",
    classeB: "11111111.11111111.00000000.00000000",
    classeC: "11111111.11111111.11111111.00000000",
  },
  hostsIniciais: {
    classeA: (Math.pow(255, 3) - 2).toLocaleString("pt-BR"),
    classeB: (Math.pow(255, 2) - 2).toLocaleString("pt-BR"),
    classeC: (Math.pow(255, 1) - 1).toLocaleString("pt-BR"),
  },
  bitsIniciais: {
    classeA: 8,
    classeB: 16,
    classeC: 24,
  },
};

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
  // Fórmula de cálculo de subredes: 2^(cidr - bitsClasseIP) com retorno utilizando as casas decimais no padrão brasileiro.
  return Math.pow(2, cidr - bitsClasseIP).toLocaleString("pt-BR");
}

function calcularHosts(cidr) {
  // Fórmula de cálculo de hosts: 2^(32 - cidr) - 2 com retorno utilizando as casas decimais no padrão brasileiro.
  return (Math.pow(2, 32 - cidr) - 2).toLocaleString("pt-BR");
}

function exibirResultado() {
  // const resultado = identificarClasseDoIP(primeiroOctetoIP);
  const resultado = identificarClasseDoIP(primeiroOcteto);
  const subRedes = calcularSubRedes(ipv4.bitsIniciais[resultado]);
  const hosts = getCIDR();

  if (resultado !== "Fora do Range" && resultado !== "Classe não identificada") {
    calculadora.pClasse.innerHTML = `O IP ${primeiroOcteto} Classe ${ipv4.classes[resultado]} (/${ipv4.bitsIniciais[resultado]} bits).`;
    calculadora.pMascara.innerHTML = `A máscara: ${ipv4.mascaraEmDecimal[resultado]} (Binário: ${ipv4.mascaraEmBinario[resultado]})`;
    calculadora.pHosts.innerHTML = `Número de hosts: ${ipv4.hostsIniciais[resultado]}.`;
    calculadora.pRedes.innerHTML = `Número de subredes: ${subRedes} subredes.`;
    // console.log(`| A máscara padrão em decimal é ${ipv4.mascaraEmDecimal[resultado]}. E em binário é ${ipv4.mascaraEmBinario[resultado]}`);
    // console.log(`| A quantidade padrão de hosts para esta classe é de ${ipv4.hostsIniciais[resultado]} equipamentos.`);
    // console.log(`| Com o barramento (CIDR) /${cidr} é possível criar até ${subRedes} subredes, com até ${hosts} equipamentos por subrede.`);
  } else {
    console.log(resultado);
  }
}

// exibirResultado();
