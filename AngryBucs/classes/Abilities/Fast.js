import { Ability } from "./Ability.js";

export class Fast extends Ability {
  constructor() {
    super();
    this.speedMultiplier = 2.5;
  }

  use(buc) {
    if (this.used) return;
    super.use(buc);
    const dir = buc.physical.velocity.normalize();
    buc.physical.velocity = buc.physical.velocity.add(dir.scale(this.speedMultiplier * 300));
  }
}