import { Entity } from "./Entity.js";

export class Block extends Entity {
  constructor(options = {}) {
    super({
      width: 40,
      height: 40,
      health: 80,
      ...options,
    });
    this.material = options.material || "wood";
    this.physical.mass = options.material === "stone" ? 8 : options.material === "ice" ? 2 : 4;
    this.physical.restitution = 0.1;
  }

  get materialColor() {
    switch (this.material) {
      case "wood":
        return { fill: "#a16207", stroke: "#854d0e" };
      case "stone":
        return { fill: "#6b7280", stroke: "#4b5563" };
      case "ice":
        return { fill: "#7dd3fc", stroke: "#38bdf8" };
      default:
        return { fill: "#a16207", stroke: "#854d0e" };
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    const colors = this.materialColor;
    ctx.fillStyle = colors.fill;
    ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    ctx.strokeStyle = colors.stroke;
    ctx.lineWidth = 2;
    ctx.strokeRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);

    // Damage cracks
    if (this.health < 50) {
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-this.size.x * 0.3, -this.size.y * 0.2);
      ctx.lineTo(0, this.size.y * 0.1);
      ctx.lineTo(this.size.x * 0.2, -this.size.y * 0.3);
      ctx.stroke();
    }

    ctx.restore();
  }
}