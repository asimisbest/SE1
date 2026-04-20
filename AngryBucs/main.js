const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Menu / modal elements
const menu = document.getElementById('menu');
const instructionsModal = document.getElementById('instructions');
const startBtn = document.getElementById('startBtn');
const instructionsBtn = document.getElementById('instructionsBtn');
const closeInstructions = document.getElementById('closeInstructions');
const levelsBtn = document.getElementById('levelsBtn');
const levelsPage = document.getElementById('levelsPage');
const levelGrid = document.getElementById('levelGrid');
const backToMenu = document.getElementById('backToMenu');

// HUD elements
const gameHUD = document.getElementById('gameHUD');
const retryBtn = document.getElementById('retryBtn');
const exitBtn = document.getElementById('exitBtn');

let running = false;
let currentLevel = 1;
let unlockedLevel = 1;
let waveOffset = 0;

// ================= NAVIGATION =================

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startLevel(1);
});

instructionsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  instructionsModal.classList.remove('hidden');
});

closeInstructions.addEventListener('click', () => {
  instructionsModal.classList.add('hidden');
});

levelsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.style.display = 'none';
  levelsPage.classList.remove('hidden');
  createLevels();
});

backToMenu.addEventListener('click', () => {
  levelsPage.classList.add('hidden');
  menu.style.display = 'flex';
});

retryBtn.addEventListener('click', () => {
  startLevel(currentLevel);
});

exitBtn.addEventListener('click', () => {
  running = false;
  gameHUD.classList.add('hidden');
  levelsPage.classList.add('hidden');
  instructionsModal.classList.add('hidden');
  menu.style.display = 'flex';
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') return;
  startLevel(1);
});

function createLevels() {
  levelGrid.innerHTML = '';

  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;

    if (i > unlockedLevel) {
      btn.disabled = true;
    }

    btn.addEventListener('click', () => {
      startLevel(i);
    });

    levelGrid.appendChild(btn);
  }
}

function startLevel(level) {
  currentLevel = level;
  running = true;

  menu.style.display = 'none';
  levelsPage.classList.add('hidden');
  instructionsModal.classList.add('hidden');
  gameHUD.classList.remove('hidden');
}

// ================= DRAWING =================

function drawBackground() {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGrad.addColorStop(0, '#1a8fd1');
  skyGrad.addColorStop(1, '#87ceeb');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(700, 60, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#ffe94d';
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  [{ x: 120, y: 60 }, { x: 350, y: 40 }, { x: 580, y: 70 }].forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, 20, 0, Math.PI * 2);
    ctx.arc(c.x + 20, c.y + 5, 15, 0, Math.PI * 2);
    ctx.arc(c.x - 15, c.y + 5, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  waveOffset += 0.03;
  ctx.fillStyle = '#1a9dc4';
  ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.beginPath();
  for (let x = 0; x <= canvas.width; x += 5) {
    const y = (canvas.height - 75) + Math.sin(x * 0.02 + waveOffset) * 5;
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  ctx.fillStyle = '#5c3d1e';
  ctx.fillRect(0, canvas.height - 90, canvas.width, 15);
  ctx.fillStyle = '#c8975a';
  ctx.fillRect(0, canvas.height - 95, canvas.width, 8);
}

function drawCannon() {
  const bx = 80;
  const by = canvas.height - 95;

  ctx.fillStyle = '#3b2508';
  ctx.beginPath();
  ctx.arc(bx - 10, by + 2, 12, 0, Math.PI * 2);
  ctx.arc(bx + 12, by + 2, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(bx, by - 8);
  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(-10, -10, 50, 20);
  ctx.restore();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  if (!running) {
    ctx.fillStyle = '#f7d17a';
    ctx.font = '18px Georgia, serif';
    ctx.fillText('Tap the deck or press Enter to raise the sails.', 18, 32);
    return;
  }

  ctx.fillStyle = '#f9d56e';
  ctx.font = 'bold 24px Georgia';
  ctx.fillText(`Level ${currentLevel}`, 20, 40);
  drawCannon();
}

function loop() {
  render();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !running) {
    startLevel(1);
  }

  if (e.key === 'Escape' && running) {
    running = false;
    gameHUD.classList.add('hidden');
    levelsPage.classList.add('hidden');
    instructionsModal.classList.add('hidden');
    menu.style.display = 'flex';
  }
});

requestAnimationFrame(loop);