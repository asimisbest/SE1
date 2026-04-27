import { Block } from "./../Block.js";

export class WoodBlock extends Block {
  constructor(options = {}) {
    super({
      material: "wood",
      health: 60,
      ...options,
    });
    this.physical.mass = 3;
    this.physical.restitution = 0.15;
  }
}