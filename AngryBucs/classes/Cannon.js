export class Cannon {
  constructor({ x = 80, y = 305, angle = -Math.PI / 6 } = {}) {
    this.x = x;
    this.y = y;
    this.angle = angle;
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
    ctx.fillStyle = '#3b2508';
    ctx.beginPath();
    ctx.arc(x - 10, y + 2, 12, 0, Math.PI * 2);
    ctx.arc(x + 12, y + 2, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.translate(x, y - 8);
    ctx.rotate(this.angle);
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(-10, -10, 50, 20);
    ctx.restore();
  }
}
