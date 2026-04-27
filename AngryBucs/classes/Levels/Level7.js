import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level7 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: FastBuc },
        { type: Buc },
        { type: FastBuc },
      ],

      blocks: [
        // Left support
        { type: MetalBlock, x: 550, y: 270, width: 20, height: 80 },
        // Right support
        { type: MetalBlock, x: 750, y: 270, width: 20, height: 80 },
        // Bridge deck
        { type: WoodBlock, x: 650, y: 220, width: 220, height: 20 },
      ],

      pigs: [
        { type: BasicPig, x: 600, y: 290 }, // Under bridge
        { type: BasicPig, x: 700, y: 290 }, // Under bridge
        { type: BasicPig, x: 650, y: 190 }, // On bridge
      ],
    });
  }
}
