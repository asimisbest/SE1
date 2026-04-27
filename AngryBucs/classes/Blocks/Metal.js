import { Block } from "./../Block.js";

export class MetalBlock extends Block {
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