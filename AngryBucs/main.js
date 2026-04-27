import { Level1 } from './classes/Levels/Level1.js';
import { Level2 } from './classes/Levels/Level2.js';
import { Level3 } from './classes/Levels/Level3.js';
import { Level4 } from './classes/Levels/Level4.js';
import { Level5 } from './classes/Levels/Level5.js';
import { Level6 } from './classes/Levels/Level6.js';
import { Level7 } from './classes/Levels/Level7.js';
import { Level8 } from './classes/Levels/Level8.js';
import { Level9 } from './classes/Levels/Level9.js';
import { Level10 } from './classes/Levels/Level10.js';
import { Vector2 } from './classes/Vector2.js';
import { Buc } from './classes/Buc.js';

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
const nextLevelBtn = document.getElementById('nextLevelBtn');

// Registry — add new level classes here as they are created
const LEVELS = {
    1: Level1,
    2: Level2,
    3: Level3,
    4: Level4,
    5: Level5,
    6: Level6,
    7: Level7,
    8: Level8,
    9: Level9,
    10: Level10,
};

let running = false;
let currentLevel = 1;
let unlockedLevel = 10;
let waveOffset = 0;
let level = null;
let lastTime = null;
let winLossTimer = 0;
let abilityUsedThisShot = false;

let aimX = 140;
let aimY = canvas.height - 160;
let isAiming = false;

const gravity = 980; // pixels/sec^2 — must match Entity.js
const maxPower = 1200;

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

nextLevelBtn.onclick = () => {
    if (currentLevel < 10 && LEVELS[currentLevel + 1]) {
        startLevel(currentLevel + 1);
    }
};

exitBtn.onclick = () => {
    running = false;
    level = null;
    winLossTimer = 0;
    nextLevelBtn.classList.add('hidden');
    gameHUD.classList.add('hidden');
    menu.style.display = 'flex';
};


canvas.addEventListener('mousemove', (e) => {
  if (!running) return;

  const pos = getMousePos(e);
  aimX = pos.x;
  aimY = pos.y;

  updateCannonAngle(); // ✅ ADD THIS
});

canvas.addEventListener('mouseleave', () => {
  isAiming = false;
});

canvas.addEventListener('mousedown', (e) => {
  if (!running) return;

  if (e.button === 0) {
    // Check if a buc is in flight and has an unused ability
    if (level && !abilityUsedThisShot) {
      const flyingBuc = level.bucs.find(b => b.hasBeenShot && b.physical.checkIfMoving() && b.ability && !b.ability.used);
      if (flyingBuc) {
        flyingBuc.useAbility();
        abilityUsedThisShot = true;
        handleAbilityEffects(flyingBuc);
        return; // Don't start aiming
      }
    }
    isAiming = true;
  }
});

canvas.addEventListener('mouseup', () => {
  shootCannon();
});



canvas.addEventListener('touchstart', (e) => {
  if (!running) return;

  const touch = e.touches[0];
  const pos = getMousePos(touch);
  aimX = pos.x;
  aimY = pos.y;

  updateCannonAngle();

  // Check if a buc is in flight and has an unused ability
  if (level && !abilityUsedThisShot) {
    const flyingBuc = level.bucs.find(b => b.hasBeenShot && b.physical.checkIfMoving() && b.ability && !b.ability.used);
    if (flyingBuc) {
      flyingBuc.useAbility();
      abilityUsedThisShot = true;
      handleAbilityEffects(flyingBuc);
      e.preventDefault();
      return;
    }
  }

  isAiming = true;

  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  if (!running) return;

  const touch = e.touches[0];
  const pos = getMousePos(touch);
  aimX = pos.x;
  aimY = pos.y;

  updateCannonAngle(); // ✅ ADD THIS

  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', () => {
  shootCannon();
});


function createLevels() {
    levelGrid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i > unlockedLevel || !LEVELS[i]) btn.disabled = true;
        btn.onclick = () => startLevel(i);
        levelGrid.appendChild(btn);
    }
}

function startLevel(num) {
    const LevelClass = LEVELS[num];
    if (!LevelClass) return;
    currentLevel = num;
    level = new LevelClass();
    level.build();
    winLossTimer = 0;
    menu.style.display = 'none';
    levelsPage.classList.add('hidden');
    gameHUD.classList.remove('hidden');
    nextLevelBtn.classList.add('hidden');
    abilityUsedThisShot = false;
    running = true;
}

// ================= PHYSICS / COLLISIONS =================

const GROUND_Y = canvas.height - 90;
const DAMAGE_THRESHOLD = 100;

function resolveGroundCollisions(entities) {
    for (const e of entities) {
        if (e.isStatic) continue;
        const b = e.getBounds();
        if (b.bottom >= GROUND_Y) {
            e.position.y -= b.bottom - GROUND_Y;
            const impact = Math.abs(e.physical.velocity.y);
            e.physical.velocity.y = -e.physical.velocity.y * e.physical.restitution;
            e.physical.velocity.x *= 0.7; // stronger ground friction
            e.physical.wake();
            if (impact > DAMAGE_THRESHOLD) e.takeDamage(impact * 0.05);
            // Stop micro-bouncing
            if (Math.abs(e.physical.velocity.y) < 10) {
                e.physical.velocity.y = 0;
            }
        }
    }
}

function resolveAABB(a, b) {
    const ba = a.getBounds(), bb = b.getBounds();
    const overlapX = Math.min(ba.right, bb.right) - Math.max(ba.left, bb.left);
    const overlapY = Math.min(ba.bottom, bb.bottom) - Math.max(ba.top, bb.top);
    if (overlapX <= 0 || overlapY <= 0) return;
    if (a.isStatic && b.isStatic) return;

    const mA = a.physical.mass, mB = b.physical.mass;
    const e = (a.physical.restitution + b.physical.restitution) / 2;

    if (overlapX < overlapY) {
        if (!a.isStatic && !b.isStatic) {
            const total = mA + mB;
            const pushA = (overlapX * mB) / total;
            const pushB = (overlapX * mA) / total;
            if (a.position.x < b.position.x) { a.position.x -= pushA; b.position.x += pushB; }
            else                              { a.position.x += pushA; b.position.x -= pushB; }
            const relVx = a.physical.velocity.x - b.physical.velocity.x;
            const impulse = -(1 + e) * relVx * mA * mB / total;
            a.physical.velocity.x += impulse / mA;
            b.physical.velocity.x -= impulse / mB;
            const impact = Math.abs(relVx);
            if (impact > DAMAGE_THRESHOLD) { const dmg = impact * 0.1; a.takeDamage(dmg); b.takeDamage(dmg); }
        } else {
            const dyn = a.isStatic ? b : a;
            const stat = a.isStatic ? a : b;
            const mDyn = dyn.physical.mass, mStat = stat.physical.mass;
            const total = mDyn + mStat;
            if (dyn.position.x < stat.position.x) dyn.position.x -= overlapX;
            else dyn.position.x += overlapX;
            const vx = dyn.physical.velocity.x;
            const impact = Math.abs(vx);
            if (impact > DAMAGE_THRESHOLD) {
                dyn.takeDamage(impact * 0.1);
                stat.takeDamage(impact * 0.1);
                if (!stat.isStatic) {
                    dyn.physical.velocity.x = vx * (mDyn - e * mStat) / total;
                    stat.physical.velocity.x = vx * (1 + e) * mDyn / total;
                    const halfH = Math.max(1, stat.size.y / 2);
                    const yOff = Math.max(-1, Math.min(1, (dyn.position.y - stat.position.y) / halfH));
                    stat.physical.angularVelocity = vx * yOff * 0.015;
                } else {
                    dyn.physical.velocity.x = -vx * e;
                }
            } else {
                dyn.physical.velocity.x = -vx * e;
            }
        }
    } else {
        if (!a.isStatic && !b.isStatic) {
            const total = mA + mB;
            const pushA = (overlapY * mB) / total;
            const pushB = (overlapY * mA) / total;
            if (a.position.y < b.position.y) { a.position.y -= pushA; b.position.y += pushB; }
            else                              { a.position.y += pushA; b.position.y -= pushB; }
            const relVy = a.physical.velocity.y - b.physical.velocity.y;
            const impulse = -(1 + e) * relVy * mA * mB / total;
            a.physical.velocity.y += impulse / mA;
            b.physical.velocity.y -= impulse / mB;
            const impact = Math.abs(relVy);
            if (impact > DAMAGE_THRESHOLD) { const dmg = impact * 0.1; a.takeDamage(dmg); b.takeDamage(dmg); }
        } else {
            const dyn = a.isStatic ? b : a;
            const stat = a.isStatic ? a : b;
            const mDyn = dyn.physical.mass, mStat = stat.physical.mass;
            const total = mDyn + mStat;
            if (dyn.position.y < stat.position.y) dyn.position.y -= overlapY;
            else dyn.position.y += overlapY;
            const vy = dyn.physical.velocity.y;
            const impact = Math.abs(vy);
            if (impact > DAMAGE_THRESHOLD) {
                dyn.takeDamage(impact * 0.1);
                stat.takeDamage(impact * 0.1);
                if (!stat.isStatic) {
                    dyn.physical.velocity.y = vy * (mDyn - e * mStat) / total;
                    stat.physical.velocity.y = vy * (1 + e) * mDyn / total;
                    dyn.physical.velocity.x *= 0.85;
                    const halfW = Math.max(1, stat.size.x / 2);
                    const xOff = Math.max(-1, Math.min(1, (dyn.position.x - stat.position.x) / halfW));
                    stat.physical.angularVelocity = vy * xOff * 0.015;
                } else {
                    dyn.physical.velocity.y = -vy * e;
                    dyn.physical.velocity.x *= 0.85;
                }
            } else {
                dyn.physical.velocity.y = -vy * e;
                dyn.physical.velocity.x *= 0.85;
            }
        }
    }
}

function resolveEntityCollisions(entities) {
    for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
            resolveAABB(entities[i], entities[j]);
        }
    }
}

function handleAbilityEffects(buc) {
    if (!level) return;
    // Handle explosion ability
    if (buc._pendingExplosion) {
        const explosion = buc._pendingExplosion;
        const allEnts = level.getAllEntities().filter(e => e.alive && e !== buc);
        for (const target of allEnts) {
            const diff = target.position.subtract(explosion.origin);
            const dist = diff.magnitude();
            if (dist > explosion.radius || dist === 0) continue;
            const falloff = 1 - dist / explosion.radius;
            const damage = Math.round(explosion.damage * falloff);
            target.takeDamage(damage);
            target.isStatic = false;
            target.physical.wake();
            const dir = diff.normalize();
            const force = dir.scale(explosion.force * falloff);
            target.physical.velocity = target.physical.velocity.add(force);
        }
        buc._pendingExplosion = null;
        buc.alive = false; // bomber buc dies on explosion
    }
    // Handle split ability
    if (buc._pendingSplits && buc._pendingSplits.length > 0) {
        for (const splitData of buc._pendingSplits) {
            const fragment = new Buc({ width: 24, height: 24, health: 999 });
            fragment.position.x = splitData.x;
            fragment.position.y = splitData.y;
            fragment.hasBeenShot = true;
            fragment.isSplitFragment = true;
            fragment.physical.velocity = new Vector2(splitData.vx, splitData.vy);
            fragment.physical.mass = 2.5;
            fragment._bodyColor = "#2563eb";
            fragment._fallbackColor = "#2563eb";
            level.extraProjectiles.push(fragment);
        }
        buc._pendingSplits = null;
    }
}

function update(dt) {
    if (!running || !level) return;
    level.update(dt);
    const alive = level.getAllEntities().filter(e => e.alive);

    // Process any pending ability effects each frame
    for (const buc of [...level.bucs, ...level.extraProjectiles]) {
        if (buc._pendingExplosion || (buc._pendingSplits && buc._pendingSplits.length > 0)) {
            handleAbilityEffects(buc);
        }
    }

    // WAKE UP UN-SUPPORTED STATIC BLOCKS
    for (const e of alive) {
        if (!e.isStatic) continue;
        let supported = false;
        const b = e.getBounds();
        if (b.bottom >= GROUND_Y - 3) {
            supported = true;
        } else {
            for (const other of alive) {
                if (e === other) continue;
                const o = other.getBounds();
                if (o.top >= b.bottom - 3 && o.top <= b.bottom + 3) {
                    if (b.right > o.left + 2 && b.left < o.right - 2) {
                        supported = true;
                        break;
                    }
                }
            }
        }
        if (!supported) {
            e.isStatic = false;
            e.physical.wake();
        }
    }

    // Multi-pass collision resolution for stability
    for (let pass = 0; pass < 4; pass++) {
        resolveGroundCollisions(alive);
        resolveEntityCollisions(alive);
    }

    if (level.isWin()) {
        winLossTimer += dt;
        nextLevelBtn.classList.remove('hidden');
        if (winLossTimer > 5) {
            unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
            running = false;
            level = null;
            winLossTimer = 0;
            nextLevelBtn.classList.add('hidden');
            gameHUD.classList.add('hidden');
            levelsPage.classList.remove('hidden');
            createLevels();
        }
    } else if (level.isLoss()) {
        winLossTimer += dt;
        if (winLossTimer > 3) {
            running = false;
            level = null;
            winLossTimer = 0;
            nextLevelBtn.classList.add('hidden');
            gameHUD.classList.add('hidden');
            levelsPage.classList.remove('hidden');
            createLevels();
        }
    } else {
        winLossTimer = 0;
    }
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

function updateCannonAngle() {
  if (!level || !level.cannon) return;

  const cannon = level.cannon;
  const dx = aimX - cannon.x;
  const dy = aimY - (cannon.y - 8);

  let angle = Math.atan2(dy, dx);

  const minAngle = -Math.PI * 0.85;
  const maxAngle = -Math.PI * 0.1;

  cannon.angle = Math.max(minAngle, Math.min(maxAngle, angle));
}

function shootCannon() {
  if (!running || !isAiming || !level || !level.cannon) {
    isAiming = false;
    return;
  }
  
  const cannon = level.cannon;
  const buc = level.getCurrentBuc();
  if (buc && !buc.hasBeenShot) {
    const dx = aimX - cannon.x;
    const dy = aimY - cannon.y;
    const distance = Math.hypot(dx, dy);
    const power = Math.min(distance * 5, maxPower);

    const vx = Math.cos(cannon.angle) * power * cannon.velocityMultiplier;
    const vy = Math.sin(cannon.angle) * power * cannon.velocityMultiplier;

    const { x, y } = cannon.getBarrelTip();
    buc.position.x = x;
    buc.position.y = y;
    
    buc.launch(new Vector2(vx, vy));
    abilityUsedThisShot = false;
    level.nextBuc();
  }
  isAiming = false;
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
  if (!running || !isAiming || !level || !level.cannon) return;

  const cannon = level.cannon;
  const angle = cannon.angle;

  const dx = aimX - cannon.x;
  const dy = aimY - cannon.y;
  const distance = Math.hypot(dx, dy);
  const power = Math.min(distance * 5, maxPower);

  const vx = Math.cos(angle) * power * cannon.velocityMultiplier;
  const vy = Math.sin(angle) * power * cannon.velocityMultiplier;

  const { x: startX, y: startY } = cannon.getBarrelTip();

  ctx.fillStyle = '#ffffff';

  for (let t = 0; t <= 2; t += 0.08) {
    const px = startX + vx * t;
    const py = startY + vy * t + 0.5 * gravity * t * t;

    if (px < 0 || px > canvas.width || py > canvas.height) break;

    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  if (running) {
    if (level) {
      level.draw(ctx);
      level.cannon.draw(ctx);

      // Draw queued bucs as ammo indicators near cannon
      const cannon = level.cannon;
      for (let i = level.currentBucIndex; i < level.bucs.length; i++) {
        const offset = i - level.currentBucIndex;
        if (offset === 0) {
          // Current buc: draw at barrel tip
          const tip = cannon.getBarrelTip();
          ctx.save();
          ctx.translate(tip.x, tip.y);
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(-1, -1, 1, 0, 0, 8);
          grad.addColorStop(0, "#0a2d5c");
          grad.addColorStop(1, "#041e42");
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = "#ffc72c";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = "#ffc72c";
          ctx.font = "bold 5px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("B", 0, 0);
          ctx.restore();
        } else {
          // Queued bucs: small icons below cannon
          const qx = cannon.x - 20 + (offset - 1) * 22;
          const qy = cannon.y + 20;
          ctx.save();
          ctx.translate(qx, qy);
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fillStyle = "#041e42";
          ctx.fill();
          ctx.strokeStyle = "#ffc72c";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#ffc72c";
          ctx.font = "bold 6px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText((offset).toString(), 0, 0);
          ctx.restore();
        }
      }

      // Show remaining Bucs count
      ctx.save();
      ctx.fillStyle = "#ffc72c";
      ctx.strokeStyle = "#041e42";
      ctx.lineWidth = 3;
      ctx.font = "bold 16px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      const remaining = level.bucs.length - level.currentBucIndex;
      ctx.strokeText(`Bucs: ${remaining}`, 16, 54);
      ctx.fillText(`Bucs: ${remaining}`, 16, 54);
      ctx.restore();

      drawTrajectoryPreview();

      // UI OVERLAYS - Drawn last so they appear on top of blocks/pigs
      ctx.font = 'bold 28px Georgia, serif';
      ctx.textAlign = 'left';
      ctx.strokeStyle = '#7a3e00';
      ctx.lineWidth = 4;
      ctx.strokeText(`Level ${currentLevel}`, 16, 40);
      ctx.fillStyle = '#f9d56e';
      ctx.fillText(`Level ${currentLevel}`, 16, 40);

      // Score display
      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.textAlign = 'right';
      ctx.strokeStyle = '#041e42';
      ctx.lineWidth = 3;
      ctx.strokeText(`Score: ${level.score}`, canvas.width - 16, 40);
      ctx.fillStyle = '#ffc72c';
      ctx.fillText(`Score: ${level.score}`, canvas.width - 16, 40);

      if (level.isWin() || level.isLoss()) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (level.isWin()) {
          ctx.textAlign = 'center';
          ctx.font = 'bold 48px Georgia, serif';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 6;
          ctx.strokeText("LEVEL WON!", canvas.width / 2, canvas.height / 2 - 30);
          ctx.fillStyle = '#4ade80';
          ctx.fillText("LEVEL WON!", canvas.width / 2, canvas.height / 2 - 30);
          // Final score
          ctx.font = 'bold 24px Georgia, serif';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 3;
          ctx.strokeText(`Final Score: ${level.getFinalScore()}`, canvas.width / 2, canvas.height / 2 + 15);
          ctx.fillStyle = '#ffc72c';
          ctx.fillText(`Final Score: ${level.getFinalScore()}`, canvas.width / 2, canvas.height / 2 + 15);
          // Next level hint
          ctx.font = '16px Georgia, serif';
          ctx.fillStyle = '#ccc';
          ctx.fillText("Click 'Next Level' to continue", canvas.width / 2, canvas.height / 2 + 45);
      } else if (level.isLoss()) {
          ctx.textAlign = 'center';
          ctx.font = 'bold 48px Georgia, serif';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 6;
          ctx.strokeText("LEVEL FAILED", canvas.width / 2, canvas.height / 2 - 15);
          ctx.fillStyle = '#f87171';
          ctx.fillText("LEVEL FAILED", canvas.width / 2, canvas.height / 2 - 15);
          // Retry hint
          ctx.font = '18px Georgia, serif';
          ctx.fillStyle = '#ccc';
          ctx.fillText("Click 'Retry' to try again", canvas.width / 2, canvas.height / 2 + 20);
      }
    }
  }
}

// ================= GAME LOOP =================

function loop(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05); // cap at 50ms to avoid spiral
    lastTime = timestamp;
    update(dt);
    render();
    requestAnimationFrame(loop);
}

window.onkeydown = (e) => {
    if (e.key === 'Enter' && !running) startLevel(1);
    if (e.key === 'Escape' && running) {
        running = false;
        level = null;
        gameHUD.classList.add('hidden');
        menu.style.display = 'flex';
    }
};

requestAnimationFrame(loop);
