// let ip = {
//   classeA: 127,
//   classeB: 191,
//   classeC: 223,
// };
// let mascaraDecimal = {
//   classeA: "255.0.0.0",
//   classeB: "255.255.0.0",
//   classeC: "255.255.255.0",
// };
// let mascaraBinario = {
//   classeA: "11111111.00000000.00000000.00000000",
//   classeB: "11111111.11111111.00000000.00000000",
//   classeC: "11111111.11111111.11111111.00000000",
// };

// let hosts = {
//   classeA: (Math.pow(255, 3) - 2).toLocaleString("pt-BR"),
//   classeB: (Math.pow(255, 2) - 2).toLocaleString("pt-BR"),
//   classeC: (Math.pow(255, 1) - 2).toLocaleString("pt-BR"),
// };

// let entrada = 126;

// if (entrada <= ip.classeA) {
//   console.log(
//     `Classe A. Máscara decimal: ${mascaraDecimal.classeA}. Máscara binária: ${mascaraBinario.classeA}. Total de IP's disponíveis: ${hosts.classeA}`
//   );
// } else if (entrada <= ip.classeB) {
//   console.log(
//     `Classe B. Máscara decimal: ${mascaraDecimal.classeB}. Máscara binária: ${mascaraBinario.classeB}. Total de IP's disponíveis: ${hosts.classeB}`
//   );
// } else if (entrada <= ip.classeC) {
//   console.log(
//     `Classe C. Máscara decimal: ${mascaraDecimal.classeC}. Máscara binária: ${mascaraBinario.classeC}. Total de IP's disponíveis: ${hosts.classeC}`
//   );
// } else {
//   console.log("Valor inválido");
// }



let verificarClasseIP = 110;

function testeIP(verificarClasseIP) {
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
    case classeA.includes(verificarClasseIP):
      console.log("Classe A");
      break;

    case classeB.includes(verificarClasseIP):
      console.log("Classe B");
      break;

    case classeC.includes(verificarClasseIP):
      console.log("Classe C");
      break;

    case verificarClasseIP > 223:
      console.log("Fora do Range");
      break;

    default:
      console.log("Classe não identificada");
  }
}

testeIP(verificarClasseIP);
