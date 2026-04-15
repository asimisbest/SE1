import { Entity } from "./Entity.js";

export class Buc extends Entity {
  constructor(options = {}) {
    super({
      width: 32,
      height: 32,
      health: 999,
      ...options,
    });
    this.ability = options.ability || null;
    this.hasBeenShot = false;
    this._fallbackColor = "#ef4444";
    this.physical.mass = 3;
    this.physical.restitution = 0.4;
  }

  useAbility() {
    if (!this.ability || this.ability.used || !this.hasBeenShot) return;
    this.ability.use(this);
  }

  launch(velocity) {
    this.hasBeenShot = true;
    this.physical.velocity = velocity.clone();
  }

  update(dt) {
    if (!this.hasBeenShot) return;
    super.update(dt);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    // Body
    ctx.beginPath();
    ctx.arc(0, 0, this.size.x / 2, 0, Math.PI * 2);
    ctx.fillStyle = this._bodyColor || "#ef4444";
    ctx.fill();
    ctx.strokeStyle = "#991b1b";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Eyes
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(-4, -3, 4, 0, Math.PI * 2);
    ctx.arc(4, -3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(-3, -3, 2, 0, Math.PI * 2);
    ctx.arc(5, -3, 2, 0, Math.PI * 2);
    ctx.fill();

    // Angry brows
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(-2, -6);
    ctx.moveTo(8, -8);
    ctx.lineTo(2, -6);
    ctx.stroke();

    ctx.restore();
  }
}