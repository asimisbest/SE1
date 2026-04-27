import { Buc } from "./../Buc.js";
import { Split } from "./../Abilities/Split.js";

export class SplitBuc extends Buc {
  constructor(options = {}) {
    super({
      ability: new Split(),
      ...options,
    });
    this._bodyColor = "#2563eb"; // Blue themed
    this._fallbackColor = "#2563eb";
  }

  draw(ctx) {
    super.draw(ctx);

    // Triple dot indicator on the buc body
    if (!this.ability || !this.ability.used) {
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(i * 6, this.size.y / 2 + 5, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }
}
