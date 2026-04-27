import { Block } from "./../Block.js";

export class StoneBlock extends Block {
  constructor(options = {}) {
    super({
      material: "stone",
      health: 100,
      ...options,
    });
    this.physical.mass = 7;
    this.physical.restitution = 0.05;
  }
}
