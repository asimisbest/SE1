import { Pig } from "./../Pig.js";

export class BasicPig extends Pig {
  constructor(options = {}) {
    super({
      health: 30,
      width: 32,
      height: 32,
      ...options,
    });
    this.physical.mass = 1.5;
  }
}