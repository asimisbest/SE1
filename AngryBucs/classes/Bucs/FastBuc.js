import { Buc } from "./../Buc.js";
import { Fast } from "./../Abilities/Fast.js";

export class FastBuc extends Buc {
  constructor(options = {}) {
    super({
      ability: new Fast(),
      ...options,
    });
    this._bodyColor = "#facc15";
    this._fallbackColor = "#facc15";
  }

  draw(ctx) {
    super.draw(ctx);

    // Speed streak indicator when ability is active
    if (this.ability && this.ability.used && this.physical.checkIfMoving()) {
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.rotation);
      ctx.strokeStyle = "rgba(250, 204, 21, 0.5)";
      ctx.lineWidth = 2;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-this.size.x / 2 - i * 8, -4 * i);
        ctx.lineTo(-this.size.x / 2 - i * 4, 0);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
}