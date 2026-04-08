const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menu = document.getElementById('menu');
const instructionsModal = document.getElementById('instructions');
const levelsBtn = document.getElementById('levelsBtn');
const instructionsBtn = document.getElementById('instructionsBtn');
const closeInstructions = document.getElementById('closeInstructions');

let running = false;

levelsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  alert('Levels placeholder — add your level selection here.');
});

instructionsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  instructionsModal.classList.remove('hidden');
});

closeInstructions.addEventListener('click', (e) => {
  instructionsModal.classList.add('hidden');
});

// Start the game when clicking the menu background (not the buttons)
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') return;
  startGame();
});

function startGame() {
  menu.style.display = 'none';
  running = true;
}

// Basic render loop
function clear() {
  ctx.fillStyle = '#07101a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function render() {
  clear();
  if (!running) {
    // draw a subtle title on the canvas while menu shows
    ctx.fillStyle = '#9fb7ff';
    ctx.font = '18px sans-serif';
    ctx.fillText('Click the menu (or press Enter) to start the game.', 16, 30);
    return;
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = '20px sans-serif';
  ctx.fillText('Game running... (placeholder)', 16, 36);
}

function loop() {
  render();
  requestAnimationFrame(loop);
}

// keyboard: Enter to start, Esc to show menu
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') startGame();
  if (e.key === 'Escape') {
    running = false;
    menu.style.display = 'flex';
  }
});

// start the render loop
requestAnimationFrame(loop);
