let mascaraDecimal = {
  classeA: "255.0.0.0",
  classeB: "255.255.0.0",
  classeC: "255.255.255.0",
};
let mascaraBinario = {
  classeA: "11111111.00000000.00000000.00000000",
  classeB: "11111111.11111111.00000000.00000000",
  classeC: "11111111.11111111.11111111.00000000",
};

let hosts = {
  classeA: (Math.pow(255, 3) - 2).toLocaleString("pt-BR"),
  classeB: (Math.pow(255, 2) - 2).toLocaleString("pt-BR"),
  classeC: (Math.pow(255, 1) - 2).toLocaleString("pt-BR"),
};

let bitsIniciais = {
  classeA: 8,
  classeB: 16,
  classeC: 24,
};

let cidr = 26;

let ip = 198;

function checkIP(ip) {
  let classeA = new Uint8ClampedArray(128);
  for (let i = 0; i < 128; i++) {
    classeA[i] = i;
  }

  let classeB = new Uint8ClampedArray(192);
  for (let i = 128; i < 192; i++) {
    classeB[i] = i;
  }

  let classeC = new Uint8ClampedArray(224);
  for (let i = 192; i < 224; i++) {
    classeC[i] = i;
  }

  switch (true) {
    case classeA.includes(ip):
      console.log(
        `Classe A. Máscara decimal: ${mascaraDecimal.classeA}. Máscara binária: ${mascaraBinario.classeA}. Total de IP's disponíveis: ${hosts.classeA}`
      );
      return bitsIniciais.classeA;
    // break;

    case classeB.includes(ip):
      console.log(
        `Classe B. Máscara decimal: ${mascaraDecimal.classeB}. Máscara binária: ${mascaraBinario.classeB}. Total de IP's disponíveis: ${hosts.classeB}`
      );
      return bitsIniciais.classeB;
    // break;

    case classeC.includes(ip):
      console.log(
        `Classe C. Máscara decimal: ${mascaraDecimal.classeC}. Máscara binária: ${mascaraBinario.classeC}. Total de IP's disponíveis: ${hosts.classeC}`
      );
      return bitsIniciais.classeC;
    // break;

    case ip > 223:
      console.log("Fora do Range");
      break;

    default:
      console.log("Classe não identificada");
  }
}

checkIP(ip);

function totalHosts(cidr) {
  // 2^(32-CIDR)-2

  let hosts = Math.pow(32 - cidr, 2) - 2;
  console.log(hosts);
  return hosts;
}

totalHosts(checkIP(ip));

function totalSubRedes(cidr, bitsClasseIP) {
  // 2^(cidr - bitsClasseIP)

  let subRedes = Math.pow(cidr - bitsClasseIP, 2);
  console.log(subRedes);
  return subRedes;
}

totalSubRedes(cidr, checkIP(ip));
