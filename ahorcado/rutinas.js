let palabra = null;
let intentos = 0;
let aciertos = 0;

document.addEventListener("onload", () => {
  foto = document.getElementById("foto");
  letrainput = document.getElementById("letrainput");

});

function repetir() {
  frase = document.getElementById("frase").value;
  veces = document.getElementById("veces").value;
  veces = parseInt(veces);
  cadena = "";

  for (let i = 0; i < veces; i++) {
    cadena = cadena + "<p>" + frase.toUpperCase() + "</p> ";
  }
  document.getElementById("frases").innerHTML = cadena;
}

function limpiar() {
  document.getElementById("frase").value = "";
  document.getElementById("veces").value = 1;
  document.getElementById("frases").textContent = "";
}

async function generarPalabra() {
  await fetch("https://clientes.api.greenborn.com.ar/public-random-word")
    .then((response) => response.json())
    .then((data) => {
      palabra = data;
    });

  palabra = String(palabra);
  letras = document.getElementById("letras");
  cadena = "";

  for (i = 0; i < palabra.length; i++) {
    cadena =
      cadena +
      "<input type='text'  class='fieldletra' disabled maxlength='1' id='l" +
      i +
      "'>";
  }
  resetearJuego();
  letras.innerHTML = cadena;
}


function resetearJuego() {
  foto.src = "./image/a0.png";
  aciertos = 0;
  intentos = 0;
}

function verificarLetra(event) {
  tecla = String(event.code);

  console.log(palabra);
  encontrado = false;

  miLetra = letrainput.value;
  miLetra = miLetra.toUpperCase();

  if (tecla.includes("Enter")) {
    if (miLetra != "") {
      indice = 0;
      for (const l of palabra.toUpperCase()) {
        if (l === miLetra) {
          inpLetra = document.getElementById("l" + indice);
          inpLetra.value = l;
          inpLetra.backgroundColor = "green";
          encontrado = true;
          aciertos += 1;
        }
        indice += 1;
      }
      if (!encontrado) {
        intentos += 1;
        foto.src = "./image/a" + intentos + ".png";
      }
    }
    if (intentos == 7) {
      alert("GAME OVER!!");
      generarPalabra();
    }

    if (aciertos == palabra.length) {
      alert("GANASTE!!!");
      generarPalabra();
    }
  }
}
