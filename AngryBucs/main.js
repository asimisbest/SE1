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

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    if (running) {
        ctx.font = 'bold 28px Georgia, serif';
        ctx.strokeStyle = '#7a3e00';
        ctx.lineWidth = 4;
        ctx.strokeText(`Level ${currentLevel}`, 16, 40);
        ctx.fillStyle = '#f9d56e';
        ctx.fillText(`Level ${currentLevel}`, 16, 40);
        if (level) level.cannon.draw(ctx);
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