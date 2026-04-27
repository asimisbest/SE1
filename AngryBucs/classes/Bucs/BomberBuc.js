import { Buc } from "./../Buc.js";
import { Explode } from "./../Abilities/Explode.js";

export class BomberBuc extends Buc {
  constructor(options = {}) {
    super({
      ability: new Explode(),
      ...options,
    });
    this._bodyColor = "#dc2626"; // Red themed
    this._fallbackColor = "#dc2626";
  }

  draw(ctx) {
    super.draw(ctx);

    // Explosion warning indicator when ability is active
    if (this.ability && this.ability.used && this.alive) {
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      // Pulsing glow
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.01);
      ctx.beginPath();
      ctx.arc(0, 0, this.size.x / 2 + 4 + pulse * 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 100, 0, ${0.3 + pulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
  }
}
