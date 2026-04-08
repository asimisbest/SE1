const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menu = document.getElementById('menu');
const instructionsModal = document.getElementById('instructions');
const startBtn = document.getElementById('startBtn');
const instructionsBtn = document.getElementById('instructionsBtn');
const closeInstructions = document.getElementById('closeInstructions');

let running = false;

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startGame();
});

instructionsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  instructionsModal.classList.remove('hidden');
});

closeInstructions.addEventListener('click', () => {
  instructionsModal.classList.add('hidden');
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') return;
  startGame();
});

function startGame() {
  menu.style.display = 'none';
  instructionsModal.classList.add('hidden');
  running = true;
}

function clear() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#06101f');
  gradient.addColorStop(0.6, '#08101a');
  gradient.addColorStop(1, '#020507');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderSea() {
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.15)';
  ctx.lineWidth = 2;
  for (let y = 80; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(200, y - 14, 400, y + 14, 800, y);
    ctx.stroke();
  }
}

function render() {
  clear();
  renderSea();

  if (!running) {
    ctx.fillStyle = '#f7d17a';
    ctx.font = '18px Georgia, serif';
    ctx.fillText('Tap the deck or press Enter to raise the sails.', 18, 32);
    return;
  }

  ctx.fillStyle = '#f9d56e';
  ctx.font = '24px Georgia, serif';
  ctx.fillText('The voyage has begun... prepare to fire!', 16, 40);
}

function loop() {
  render();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') startGame();
  if (e.key === 'Escape') {
    running = false;
    menu.style.display = 'flex';
  }
});

requestAnimationFrame(loop);
