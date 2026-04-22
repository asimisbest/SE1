import { Vector2 } from "./Vector2.js";
import { Physical } from "./Physical.js";

export class Entity {
  constructor({ x = 0, y = 0, width = 40, height = 40, image = null, health = 100 } = {}) {
    this.health = health;
    this.physical = new Physical();
    this.position = new Vector2(x, y);

    this.image = image;
    this.size = new Vector2(width, height);
    this.rotation = 0;
    this.alive = true;
    this.isStatic = false;
  }

  update(dt) {
    if (this.isStatic) return;
    this.physical.calculateForces(980, dt);
    this.position = this.physical.calculatePosition(this.position, dt);
    this.rotation = this.physical.calculateRotation(this.rotation, dt);
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  }

  getBounds() {
    return {
      left: this.position.x - this.size.x / 2,
      right: this.position.x + this.size.x / 2,
      top: this.position.y - this.size.y / 2,
      bottom: this.position.y + this.size.y / 2,
    };
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    if (this.image && this.image instanceof HTMLImageElement && this.image.complete) {
      ctx.drawImage(
        this.image,
        -this.size.x / 2,
        -this.size.y / 2,
        this.size.x,
        this.size.y
      );
    } else {
      ctx.fillStyle = this._fallbackColor || "#888";
      ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    }

    ctx.restore();
  }
}