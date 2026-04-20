import { Level1 } from './classes/Levels/Level1.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const menu = document.getElementById('menu');
const instructionsModal = document.getElementById('instructions');
const startBtn = document.getElementById('startBtn');
const instructionsBtn = document.getElementById('instructionsBtn');
const closeInstructions = document.getElementById('closeInstructions');
const levelsBtn = document.getElementById('levelsBtn');
const levelsPage = document.getElementById('levelsPage');
const levelGrid = document.getElementById('levelGrid');
const backToMenu = document.getElementById('backToMenu');

// HUD Elements
const gameHUD = document.getElementById('gameHUD');
const retryBtn = document.getElementById('retryBtn');
const exitBtn = document.getElementById('exitBtn');

let running = false;
let currentLevel = 1;
let unlockedLevel = 1;
let waveOffset = 0;
let level = null;

let aimX = 140;
let aimY = canvas.height - 160;
let isAiming = false;

const gravity = 900; // pixels/sec^2
const maxPower = 650;

// ================= NAVIGATION =================

startBtn.onclick = () => startLevel(1);
instructionsBtn.onclick = () => instructionsModal.classList.remove('hidden');
closeInstructions.onclick = () => instructionsModal.classList.add('hidden');
backToMenu.onclick = () => { levelsPage.classList.add('hidden'); menu.style.display = 'flex'; };

levelsBtn.onclick = () => {
    menu.style.display = 'none';
    levelsPage.classList.remove('hidden');
    createLevels();
};

retryBtn.onclick = () => startLevel(currentLevel);

exitBtn.onclick = () => {
    running = false;
    gameHUD.classList.add('hidden');
    menu.style.display = 'flex';
};


canvas.addEventListener('mousemove', (e) => {
  if (!running) return;

  const pos = getMousePos(e);
  aimX = pos.x;
  aimY = pos.y;
});

canvas.addEventListener('mouseleave', () => {
  isAiming = false;
});

canvas.addEventListener('mousedown', (e) => {
  if (!running) return;

  if (e.button === 0) { // left click only
    isAiming = true;
  }
});

canvas.addEventListener('mouseup', () => {
  isAiming = false;
});



canvas.addEventListener('touchstart', (e) => {
  if (!running) return;

  const touch = e.touches[0];
  const pos = getMousePos(touch);
  aimX = pos.x;
  aimY = pos.y;
  isAiming = true;

  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  if (!running) return;

  const touch = e.touches[0];
  const pos = getMousePos(touch);
  aimX = pos.x;
  aimY = pos.y;

  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', () => {
  isAiming = false;
});


function createLevels() {
    levelGrid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i > unlockedLevel) btn.disabled = true;
        btn.onclick = () => startLevel(i);
        levelGrid.appendChild(btn);
    }
}

function startLevel(num) {
    currentLevel = num;
    level = new Level1();
    level.build();
    menu.style.display = 'none';
    levelsPage.classList.add('hidden');
    gameHUD.classList.remove('hidden');
    running = true;
}

// ================= DRAWING =================

function drawBackground() {
    // Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGrad.addColorStop(0, '#1a8fd1');
    skyGrad.addColorStop(1, '#87ceeb');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sun
    ctx.beginPath();
    ctx.arc(700, 60, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe94d';
    ctx.fill();

    // Clouds
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    [ {x:120, y:60}, {x:350, y:40}, {x:580, y:70} ].forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 20, 0, Math.PI*2);
        ctx.arc(c.x+20, c.y+5, 15, 0, Math.PI*2);
        ctx.arc(c.x-15, c.y+5, 12, 0, Math.PI*2);
        ctx.fill();
    });

    // Water
    waveOffset += 0.03;
    ctx.fillStyle = '#1a9dc4';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 5) {
        const y = (canvas.height - 75) + Math.sin(x * 0.02 + waveOffset) * 5;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Ground
    ctx.fillStyle = '#5c3d1e';
    ctx.fillRect(0, canvas.height - 90, canvas.width, 15);
    ctx.fillStyle = '#c8975a';
    ctx.fillRect(0, canvas.height - 95, canvas.width, 8);
}

<<<<<<< HEAD
function drawCannon() {
  const bx = 80;
  const by = canvas.height - 95;

  const dx = aimX - bx;
  const dy = aimY - (by - 8);
  let angle = Math.atan2(dy, dx);

  // optional clamp so the cannon does not point backwards/down too much
  const minAngle = -Math.PI * 0.85;
  const maxAngle = -Math.PI * 0.1;
  angle = Math.max(minAngle, Math.min(maxAngle, angle));

  // Wheels
  ctx.fillStyle = '#3b2508';
  ctx.beginPath();
  ctx.arc(bx - 10, by + 2, 12, 0, Math.PI * 2);
  ctx.arc(bx + 12, by + 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Barrel
  ctx.save();
  ctx.translate(bx, by - 8);
  ctx.rotate(angle);
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(-10, -10, 50, 20);
  ctx.restore();
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  };
}

function drawTrajectoryPreview() {
  if (!running || !isAiming) return;

  const cannonX = 80;
  const cannonY = canvas.height - 103; // close to barrel pivot

  let dx = aimX - cannonX;
  let dy = aimY - cannonY;
  let angle = Math.atan2(dy, dx);

  const minAngle = -Math.PI * 0.85;
  const maxAngle = -Math.PI * 0.1;
  angle = Math.max(minAngle, Math.min(maxAngle, angle));

  const distance = Math.hypot(dx, dy);
  const power = Math.min(distance * 3, maxPower);

  const vx = Math.cos(angle) * power;
  const vy = Math.sin(angle) * power;

  // barrel tip position
  const startX = cannonX + Math.cos(angle) * 40;
  const startY = cannonY + Math.sin(angle) * 40;

  ctx.fillStyle = 'rgba(255, 230, 120, 0.85)';

  for (let t = 0; t <= 2; t += 0.08) {
    const px = startX + vx * t;
    const py = startY + vy * t + 0.5 * gravity * t * t;

    if (px < 0 || px > canvas.width || py > canvas.height) break;

    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

=======
>>>>>>> origin/Sprint-3
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    if (running) {
        ctx.font = 'bold 28px Georgia, serif';
        ctx.strokeStyle = '#7a3e00';
        ctx.lineWidth = 4;
        ctx.strokeText(`Level ${currentLevel}`, 16, 40);
        ctx.fillStyle = '#f9d56e';
<<<<<<< HEAD
        ctx.font = 'bold 24px Georgia';
        ctx.fillText(`Level ${currentLevel}`, 20, 40);
        drawCannon();
        drawTrajectoryPreview();
=======
        ctx.fillText(`Level ${currentLevel}`, 16, 40);
        if (level) level.cannon.draw(ctx);
>>>>>>> origin/Sprint-3
    }
}

function loop() {
    render();
    requestAnimationFrame(loop);
}

window.onkeydown = (e) => {
    if (e.key === 'Enter' && !running) startLevel(1);
    if (e.key === 'Escape' && running) {
        running = false;
        gameHUD.classList.add('hidden');
        menu.style.display = 'flex';
    }
};

loop();