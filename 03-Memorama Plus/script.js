const emojis = ['🐶', '🐱', '🦊', '🐻', '🦕', '🐸', '🦖', '🦁'];
let cards = [];
let gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let time = 0;
let timerInterval = null;

const timeDisplay = document.getElementById('time');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('resetBtn');
const messageDisplay = document.getElementById('message');

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timeDisplay.textContent = time;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function showVictoryMessage() {
  messageDisplay.textContent = `🎉 ¡Ganaste en ${time} segundos con ${attempts} intentos!`;
}

function resetGame() {
  stopTimer();
  time = 0;
  attempts = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  timeDisplay.textContent = "0";
  attemptsDisplay.textContent = "0";
  messageDisplay.textContent = "";
  gameBoard.innerHTML = "";
  cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  createBoard();
  startTimer();
}

function createBoard() {
  cards.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="front">❓</div>
      <div class="back">${emoji}</div>
    `;

    card.addEventListener('click', () => handleClick(card));
    gameBoard.appendChild(card);
  });
}

function handleClick(card) {
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lockBoard = true;
    attempts++;
    attemptsDisplay.textContent = attempts;

    const firstEmoji = firstCard.querySelector('.back').textContent;
    const secondEmoji = secondCard.querySelector('.back').textContent;

    if (firstEmoji === secondEmoji) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      resetTurn();
      checkVictory();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
      }, 800);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkVictory() {
  const allMatched = document.querySelectorAll('.card.matched').length;
  if (allMatched === cards.length) {
    stopTimer();
    showVictoryMessage();
  }
}

resetBtn.addEventListener('click', resetGame);
resetGame();