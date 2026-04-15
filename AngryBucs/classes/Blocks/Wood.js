import { Block } from "./Block.js";

export class WoodBlock extends Block {
  constructor(options = {}) {
    super({
      material: "wood",
      health: 60,
      ...options,
    });
    this.physical.mass = 4;
    this.physical.restitution = 0.15;
  }
}