import { Block } from "./Block.js";
import { Vector2 } from "./Vector2.js";

export class DynamiteBlock extends Block {
  constructor(options = {}) {
    super({
      health: 1,
      width: 30,
      height: 40,
      material: "wood",
      ...options,
    });
    this.explosionRadius = options.explosionRadius || 150;
    this.explosionDamage = options.explosionDamage || 80;
    this.explosionForce = options.explosionForce || 800;
    this.hasExploded = false;
    this.physical.mass = 2;
  }

  takeDamage(amount) {
    super.takeDamage(amount);
    if (!this.alive && !this.hasExploded) {
      this.hasExploded = true;
    }
  }

  /**
   * Call after takeDamage — if the block died, returns explosion data.
   * The game loop should apply this to nearby entities.
   * Returns null if no explosion occurred.
   */
  getExplosion() {
    if (!this.hasExploded) return null;
    return {
      origin: this.position.clone(),
      radius: this.explosionRadius,
      damage: this.explosionDamage,
      force: this.explosionForce,
    };
  }

  /**
   * Apply explosion to a target entity. Call from your game loop
   * for every entity in range after this block dies.
   */
  static applyExplosion(explosion, target) {
    const diff = target.position.subtract(explosion.origin);
    const dist = diff.magnitude();
    if (dist > explosion.radius || dist === 0) return;

    const falloff = 1 - dist / explosion.radius;
    const damage = Math.round(explosion.damage * falloff);
    target.takeDamage(damage);

    const dir = diff.normalize();
    const force = dir.scale(explosion.force * falloff);
    target.physical.applyForce(force);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    const hw = this.size.x / 2;
    const hh = this.size.y / 2;

    // Body
    ctx.fillStyle = "#991b1b";
    ctx.fillRect(-hw, -hh, this.size.x, this.size.y);
    ctx.strokeStyle = "#450a0a";
    ctx.lineWidth = 2;
    ctx.strokeRect(-hw, -hh, this.size.x, this.size.y);

    // Label
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TNT", 0, 0);

    // Fuse
    ctx.strokeStyle = "#78716c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -hh);
    ctx.quadraticCurveTo(6, -hh - 10, 2, -hh - 16);
    ctx.stroke();

    // Spark
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(2, -hh - 16, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}