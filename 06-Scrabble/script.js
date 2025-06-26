const tablero = document.getElementById("tablero");
const fichas = document.getElementById("fichas");
const resultado = document.getElementById("resultado");
const botonVerificar = document.getElementById("verificar");

const letrasDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const diccionario = ["GATO", "CASA", "PERRO", "LUNA", "SOL", "RISA", "MESA", "SAL", "MAR", "RAYO"];

function crearTablero() {
  tablero.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.setAttribute("data-index", i);
    casilla.addEventListener("dragover", e => e.preventDefault());
    casilla.addEventListener("drop", colocarFicha);
    tablero.appendChild(casilla);
  }
}

function generarFichas(n = 20) {
  fichas.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const letra = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];
    const div = document.createElement("div");
    div.className = "ficha";
    div.textContent = letra;
    div.setAttribute("draggable", true);
    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", letra);
    });
    fichas.appendChild(div);
  }
}

function colocarFicha(e) {
  const letra = e.dataTransfer.getData("text");
  if (e.target.textContent === "") {
    e.target.textContent = letra;
  }
}

botonVerificar.addEventListener("click", () => {
  const casillas = Array.from(document.querySelectorAll(".casilla"));
  casillas.forEach(c => c.classList.remove("valida")); // Limpiar estilos previos

  const matriz = [];

  // Construir matriz 5x5
  for (let i = 0; i < 5; i++) {
    matriz[i] = casillas.slice(i * 5, (i + 1) * 5);
  }

  const palabrasEncontradas = new Set();

  // Buscar en FILAS
  for (let fila = 0; fila < 5; fila++) {
    const resultadoFila = buscarPalabrasEnLinea(matriz[fila]);
    resultadoFila.validas.forEach(p => palabrasEncontradas.add(p.palabra));
    resultadoFila.indices.forEach(idx => matriz[fila][idx].classList.add("valida"));
  }

  // Buscar en COLUMNAS
  for (let col = 0; col < 5; col++) {
    const columna = matriz.map(f => f[col]);
    const resultadoCol = buscarPalabrasEnLinea(columna);
    resultadoCol.validas.forEach(p => palabrasEncontradas.add(p.palabra));
    resultadoCol.indices.forEach(idx => columna[idx].classList.add("valida"));
  }

  // Mostrar resultado
  if (palabrasEncontradas.size > 0) {
    resultado.textContent = `✅ Palabras válidas: ${[...palabrasEncontradas].join(", ")}`;
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ No se encontraron palabras válidas.`;
    resultado.style.color = "red";
  }
});

function buscarPalabrasEnLinea(casillas) {
  let palabraActual = "";
  let indicesActual = [];
  const validas = [];
  const indicesFinales = [];

  for (let i = 0; i <= casillas.length; i++) {
    const letra = i < casillas.length ? casillas[i].textContent : "";
    if (letra !== "") {
      palabraActual += letra;
      indicesActual.push(i);
    }

    if (letra === "" || i === casillas.length) {
      if (palabraActual.length >= 2 && diccionario.includes(palabraActual)) {
        validas.push({ palabra: palabraActual });
        indicesFinales.push(...indicesActual);
      }
      palabraActual = "";
      indicesActual = [];
    }
  }

  return { validas, indices: indicesFinales };
}

// Inicializar juego
crearTablero();
generarFichas();

const botonRecargar = document.getElementById("recargarFichas");

botonRecargar.addEventListener("click", () => {
  generarFichas(); // Solo genera nuevas fichas sin tocar el tablero
});

