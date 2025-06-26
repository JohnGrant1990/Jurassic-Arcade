const emojis = ['🐶', '🐱', '🦊', '🐻', '🦕', '🐸', '🦖', '🦁'];
let cards = [];
const gameBoard = document.getElementById('gameBoard');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function iniciarJuego() {
  gameBoard.innerHTML = '';
  cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  cards.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="card-inner">
        <div class="front">❓</div>
        <div class="back">${emoji}</div>
      </div>
    `;

    card.addEventListener('click', () => manejarClick(card));
    gameBoard.appendChild(card);
  });
}

function manejarClick(card) {
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  const firstEmoji = firstCard.querySelector('.back').textContent;
  const secondEmoji = secondCard.querySelector('.back').textContent;

  if (firstEmoji === secondEmoji) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
    verificarVictoria();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Iniciar al cargar
iniciarJuego();