import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level1 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: Buc },
        { type: Buc },
        { type: FastBuc },
      ],

      blocks: [
        // Left tower
        { type: WoodBlock, x: 580, y: 460, width: 20, height: 80 },
        { type: WoodBlock, x: 640, y: 460, width: 20, height: 80 },
        { type: WoodBlock, x: 610, y: 410, width: 80, height: 20 },

        // Right tower
        { type: WoodBlock, x: 720, y: 460, width: 20, height: 80 },
        { type: WoodBlock, x: 780, y: 460, width: 20, height: 80 },
        { type: WoodBlock, x: 750, y: 410, width: 80, height: 20 },

        // Bridge between towers
        { type: WoodBlock, x: 680, y: 390, width: 120, height: 15 },
      ],

      pigs: [
        { type: BasicPig, x: 610, y: 380 },
        { type: BasicPig, x: 750, y: 380 },
        { type: BasicPig, x: 680, y: 365 },
      ],
    });
  }
}
