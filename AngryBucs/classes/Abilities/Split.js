import { Ability } from "./../Ability.js";
import { Vector2 } from "./../Vector2.js";

export class Split extends Ability {
  constructor() {
    super();
    this.splitCount = 2;
    this.spreadAngle = 0.35; // radians spread above and below
  }

  use(buc) {
    if (this.used) return;
    super.use(buc);

    const vel = buc.physical.velocity;
    const speed = vel.magnitude();
    const baseAngle = Math.atan2(vel.y, vel.x);

    // Create split projectile data on the buc for the game loop to spawn
    buc._pendingSplits = [];
    for (let i = 0; i < this.splitCount; i++) {
      const angleOffset = (i === 0) ? -this.spreadAngle : this.spreadAngle;
      const newAngle = baseAngle + angleOffset;
      buc._pendingSplits.push({
        x: buc.position.x,
        y: buc.position.y,
        vx: Math.cos(newAngle) * speed,
        vy: Math.sin(newAngle) * speed,
      });
    }
  }
}
