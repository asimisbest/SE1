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
let waveOffset = 0; // Move this globally so it persists

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

levelsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.style.display = 'none';
    levelsPage.classList.remove('hidden');
    createLevels(); // Re-builds the grid based on unlockedLevel
});

backToMenu.addEventListener('click', () => {
    levelsPage.classList.add('hidden');
    menu.style.display = 'flex';
});

// ================= LEVEL SYSTEM =================
function createLevels() {
    levelGrid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.textContent = 'Level ' + i;
        btn.className = 'level-btn'; // Useful for CSS styling

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
}

function startGame() {
    currentLevel = 1;
    menu.style.display = 'none';
    instructionsModal.classList.add('hidden');
    running = true;
}

// ================= RENDER FUNCTIONS =================
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a8fd1');
    gradient.addColorStop(0.5, '#4db8e8');
    gradient.addColorStop(1, '#87ceeb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawSun();
    drawClouds();
    drawWater();
    drawGround();
}

function drawClouds() {
    const clouds = [
        {x: 100, y: 50, s: 1},
        {x: 320, y: 35, s: 0.8},
        {x: 520, y: 55, s: 1.1},
    ];

    clouds.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(c.s, c.s);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';

        ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(28, 5, 18, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-25, 5, 16, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(10, -10, 20, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    });
}

function drawSun() {
    // Glow
    const glow = ctx.createRadialGradient(700, 60, 10, 700, 60, 55);
    glow.addColorStop(0, 'rgba(255,240,100,0.5)');
    glow.addColorStop(1, 'rgba(255,200,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(645, 5, 110, 110);

    // Sun circle
    ctx.beginPath();
    ctx.arc(700, 60, 32, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe94d';
    ctx.fill();
    ctx.strokeStyle = '#ffb700';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function drawWater() {
    waveOffset += 0.03;

    // Bright ocean base
    ctx.fillStyle = '#1a9dc4';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

    // Lighter shimmer layer
    ctx.fillStyle = '#2ab8e0';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 20);

    // Wave lines
    for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.2 + w * 0.08})`;
        ctx.lineWidth = 2;
        const yBase = canvas.height - 75 + w * 18;
        for (let x = 0; x <= canvas.width; x += 4) {
            const y = yBase + Math.sin((x * 0.02) + waveOffset + w) * 5;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
}

function drawGround() {
    // Main sandy ground strip
    ctx.fillStyle = '#5c3d1e';
    ctx.fillRect(0, canvas.height - 90, canvas.width, 15);

    // Sandy top surface
    ctx.fillStyle = '#c8975a';
    ctx.fillRect(0, canvas.height - 95, canvas.width, 8);

    // Grass tufts
    const tufts = [60, 160, 280, 400, 520, 650, 750];
    tufts.forEach(x => {
        ctx.fillStyle = '#4a7c3f';
        ctx.fillRect(x, canvas.height - 100, 3, 8);
        ctx.fillRect(x + 5, canvas.height - 103, 3, 11);
        ctx.fillRect(x + 10, canvas.height - 99, 3, 7);
    });
}


function drawCannon() {
    const baseX = 80;
    const baseY = canvas.height - 95;

    // Wheels
    ctx.beginPath();
    ctx.arc(baseX - 10, baseY + 2, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#3b2508';
    ctx.fill();
    ctx.strokeStyle = '#6b4a1e';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(baseX + 14, baseY + 2, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#3b2508';
    ctx.fill();
    ctx.stroke();

    // Barrel (angled up-right)
    ctx.save();
    ctx.translate(baseX, baseY - 8);
    ctx.rotate(-Math.PI / 6); // 30 degrees up
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.roundRect(-8, -10, 52, 20, 6);
    ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Cannon body
    ctx.fillStyle = '#3a3a3a';
    ctx.beginPath();
    ctx.ellipse(baseX + 2, baseY - 8, 18, 13, 0, 0, Math.PI * 2);
    ctx.fill();
}


function render() {
    drawBackground(); // sky, stars, moon, water, ground

    if (!running) {
        ctx.fillStyle = '#f7d17a';
        ctx.font = '18px Georgia, serif';
        ctx.fillText('Tap the deck or press Enter to raise the sails.', 18, 32);
        return;
    }

    // HUD
    ctx.fillStyle = '#f9d56e';
    ctx.font = '24px Georgia, serif';
    ctx.fillText(`Level ${currentLevel}`, 16, 40);

    drawCannon();
}

// ================= GAME LOOP =================
function loop() {
    render();
    requestAnimationFrame(loop);
}

// ================= KEY CONTROLS =================
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !running) startGame();
    if (e.key === 'Escape') {
        running = false;
        levelsPage.classList.add('hidden');
        menu.style.display = 'flex';
    }
});

// Start the loop once
requestAnimationFrame(loop);