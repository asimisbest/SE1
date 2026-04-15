import { Entity } from "./Entity.js";

export class Pig extends Entity {
  constructor(options = {}) {
    super({
      width: 36,
      height: 36,
      health: 50,
      ...options,
    });
    this._fallbackColor = "#4ade80";
    this.physical.mass = 2;
    this.physical.restitution = 0.2;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    // Body
    ctx.beginPath();
    ctx.arc(0, 0, this.size.x / 2, 0, Math.PI * 2);
    ctx.fillStyle = this.health > 25 ? "#4ade80" : "#f87171";
    ctx.fill();
    ctx.strokeStyle = "#166534";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Eyes
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(-6, -4, 5, 0, Math.PI * 2);
    ctx.arc(6, -4, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(-5, -4, 2, 0, Math.PI * 2);
    ctx.arc(7, -4, 2, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.ellipse(0, 4, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#166534";
    ctx.beginPath();
    ctx.arc(-3, 4, 1.5, 0, Math.PI * 2);
    ctx.arc(3, 4, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}