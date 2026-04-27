import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level5 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: Buc },
        { type: Buc },
        { type: FastBuc },
        { type: FastBuc },
      ],

      blocks: [
        // Bunker 1
        { type: WoodBlock, x: 500, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 560, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 530, y: 220, width: 80, height: 20 },

        // Bunker 2
        { type: WoodBlock, x: 650, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 710, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 680, y: 220, width: 80, height: 20 },
      ],

      pigs: [
        { type: BasicPig, x: 530, y: 290 },
        { type: BasicPig, x: 680, y: 290 },
        { type: BasicPig, x: 605, y: 290 }, // Pig between bunkers
      ],
    });
  }
}
