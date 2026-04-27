import { Block } from "./../Block.js";

export class IceBlock extends Block {
  constructor(options = {}) {
    super({
      material: "ice",
      health: 10,
      ...options,
    });
    this.physical.mass = 1.5;
    this.physical.restitution = 0.3;
  }
}