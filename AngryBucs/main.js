const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menu = document.getElementById('menu');
const instructionsModal = document.getElementById('instructions');
const startBtn = document.getElementById('startBtn');
const instructionsBtn = document.getElementById('instructionsBtn');
const closeInstructions = document.getElementById('closeInstructions');

const levelsBtn = document.getElementById('levelsBtn');
const levelsPage = document.getElementById('levelsPage');
const levelGrid = document.getElementById('levelGrid');
const backToMenu = document.getElementById('backToMenu');

let running = false;
let currentLevel = 1;
let unlockedLevel = 1;

// ================= MENU BUTTONS =================
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

// OPEN LEVELS PAGE
levelsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.style.display = 'none';
  levelsPage.classList.remove('hidden');
  createLevels();
});

// BACK TO MENU FROM LEVELS
backToMenu.addEventListener('click', () => {
  levelsPage.classList.add('hidden');
  menu.style.display = 'flex';
});

// CLICK BACKGROUND TO START
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') return;
  startGame();
});

// ================= LEVEL SYSTEM =================
function createLevels() {
  levelGrid.innerHTML = '';

  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = 'Level ' + i;

    if (i > unlockedLevel) {
      btn.disabled = true;
      btn.style.opacity = 0.5;
    }

    btn.addEventListener('click', () => {
      startLevel(i);
    });

    levelGrid.appendChild(btn);
  }
}

function startLevel(level) {
  currentLevel = level;
  levelsPage.classList.add('hidden');
  running = true;

  console.log("Starting Level:", level);
}

// ================= GAME CONTROL =================
function startGame() {
  currentLevel = 1;
  menu.style.display = 'none';
  instructionsModal.classList.add('hidden');
  running = true;
}

// ================= RENDER =================
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
  ctx.fillText(`Level ${currentLevel} - The voyage has begun...`, 16, 40);
}

// ================= GAME LOOP =================
function loop() {
  render();
  requestAnimationFrame(loop);
}

// ================= KEY CONTROLS =================
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') startGame();

  if (e.key === 'Escape') {
    running = false;
    levelsPage.classList.add('hidden');
    menu.style.display = 'flex';
  }
});

// ================= START =================
requestAnimationFrame(loop);