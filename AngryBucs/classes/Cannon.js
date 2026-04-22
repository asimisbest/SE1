export class Cannon {
  constructor({ x = 80, y = 305, angle = -Math.PI / 6, velocityMultiplier = 1 } = {}) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.velocityMultiplier = velocityMultiplier;
  }

  getBarrelTip() {
    const len = 40;
    return {
      x: this.x + Math.cos(this.angle) * len,
      y: this.y + Math.sin(this.angle) * len,
    };
  }

  draw(ctx) {
    const { x, y } = this;

    // Draw left wheel
    this.drawWheel(ctx, x - 28, y + 10);

    // Draw right wheel
    this.drawWheel(ctx, x + 28, y + 10);

    // Draw axle/carriage connecting wheels
    ctx.fillStyle = '#4a3a1a';
    ctx.fillRect(x - 32, y + 2, 64, 8);
    ctx.strokeStyle = '#2a1f08';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 32, y + 2, 64, 8);

    // Draw carriage support posts
    ctx.fillStyle = '#5a4a2a';
    ctx.fillRect(x - 22, y - 2, 6, 10);
    ctx.fillRect(x + 16, y - 2, 6, 10);

    // Draw mounting bracket
    ctx.fillStyle = '#5a4a2a';
    ctx.fillRect(x - 18, y - 14, 36, 12);
    ctx.strokeStyle = '#2a1f08';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 18, y - 14, 36, 12);

    // Draw barrel
    ctx.save();
    ctx.translate(x + 2, y - 12);
    ctx.rotate(this.angle);

    // Barrel base/breach
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-10, -11, 10, 22);
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 1;
    ctx.strokeRect(-10, -11, 10, 22);

    // Main barrel cylinder
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, -10, 50, 20);

    // Barrel highlight/top
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(0, -10, 50, 6);

    // Barrel shadow/bottom
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 4, 50, 6);

    // Barrel tip (tapered end)
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.moveTo(50, -10);
    ctx.lineTo(58, -5);
    ctx.lineTo(58, 5);
    ctx.lineTo(50, 10);
    ctx.closePath();
    ctx.fill();

    // Barrel tip highlight
    ctx.fillStyle = '#4a4a4a';
    ctx.beginPath();
    ctx.moveTo(50, -10);
    ctx.lineTo(58, -5);
    ctx.lineTo(55, -3);
    ctx.lineTo(50, -6);
    ctx.closePath();
    ctx.fill();

    // Trunnions (side mounting lugs)
    ctx.fillStyle = '#5a4a2a';
    ctx.fillRect(-8, -13, 4, 4);
    ctx.fillRect(-8, 9, 4, 4);

    ctx.restore();
  }

  drawWheel(ctx, wheelX, wheelY) {
    // Outer wheel rim
    ctx.fillStyle = '#5a4a2a';
    ctx.beginPath();
    ctx.arc(wheelX, wheelY, 28, 0, Math.PI * 2);
    ctx.fill();

    // Wood texture
    ctx.fillStyle = '#3b2508';
    ctx.beginPath();
    ctx.arc(wheelX, wheelY, 28, 0, Math.PI * 2);
    ctx.fill();

    // Iron bands (4 bands for reinforcement)
    ctx.strokeStyle = '#5a4a2a';
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      const radius = 25 - i * 4;
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Wheel spokes (12 spokes for authentic look)
    ctx.strokeStyle = '#2a1f08';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      ctx.beginPath();
      ctx.moveTo(wheelX, wheelY);
      ctx.lineTo(wheelX + Math.cos(angle) * 26, wheelY + Math.sin(angle) * 26);
      ctx.stroke();
    }

    // Wheel rim edge highlight
    ctx.strokeStyle = '#6a5a3a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(wheelX, wheelY, 28, 0, Math.PI * 2);
    ctx.stroke();

    // Hub center (axle attachment point)
    ctx.fillStyle = '#6a5a3a';
    ctx.beginPath();
    ctx.arc(wheelX, wheelY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4a3a1a';
    ctx.beginPath();
    ctx.arc(wheelX, wheelY, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}
