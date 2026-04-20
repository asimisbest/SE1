import { Block } from "./../Block.js";

export class WoodBlock extends Block {
  constructor(options = {}) {
    super({
      material: "metal",
      health: 120,
      ...options,
    });
    this.physical.mass = 8;
    this.physical.restitution = 0.075;
  }
}