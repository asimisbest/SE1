import { Ability } from "./../Ability.js";

export class Explode extends Ability {
  constructor() {
    super();
    this.explosionRadius = 120;
    this.explosionDamage = 60;
    this.explosionForce = 600;
  }

  use(buc) {
    if (this.used) return;
    super.use(buc);
    // Mark explosion data on the buc so the game loop can apply it
    buc._pendingExplosion = {
      origin: buc.position.clone(),
      radius: this.explosionRadius,
      damage: this.explosionDamage,
      force: this.explosionForce,
    };
  }
}
