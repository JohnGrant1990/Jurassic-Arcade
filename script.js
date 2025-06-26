// Música fondo y control de sonido
const musica = document.getElementById('musica-fondo');
const btnSonido = document.getElementById('toggle-sound');

let sonidoActivo = false;

btnSonido.addEventListener('click', () => {
  if (!sonidoActivo) {
    musica.play();
    musica.muted = false;
    btnSonido.textContent = "🔊 Silenciar";
  } else {
    musica.pause();
    btnSonido.textContent = "🔈 Activar Sonido";
  }
  sonidoActivo = !sonidoActivo;
});

// Lluvia
const canvas = document.getElementById('efecto-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function ajustarTamano() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
ajustarTamano();
window.addEventListener('resize', ajustarTamano);

class Gota {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.length = 10 + Math.random() * 20;
    this.speed = 2 + Math.random() * 4;
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = -this.length;
      this.x = Math.random() * width;
    }
  }

  draw() {
    ctx.strokeStyle = 'rgba(173, 216, 230, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

const gotas = [];
for (let i = 0; i < 100; i++) {
  gotas.push(new Gota());
}

function animar() {
  ctx.clearRect(0, 0, width, height);
  gotas.forEach(gota => {
    gota.update();
    gota.draw();
  });
  requestAnimationFrame(animar);
}
animar();
