import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level6 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: Buc },
        { type: Buc },
        { type: Buc },
        { type: Buc },
      ],

      blocks: [
        // Stair 1
        { type: MetalBlock, x: 500, y: 270, width: 20, height: 80 },
        // Stair 2
        { type: MetalBlock, x: 550, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 550, y: 190, width: 20, height: 80 },
        // Stair 3
        { type: MetalBlock, x: 600, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 600, y: 190, width: 20, height: 80 },
        { type: WoodBlock, x: 600, y: 110, width: 20, height: 80 },
        // Stair 4
        { type: MetalBlock, x: 650, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 650, y: 190, width: 20, height: 80 },
        { type: WoodBlock, x: 650, y: 110, width: 20, height: 80 },
        { type: WoodBlock, x: 650, y: 30, width: 20, height: 80 },
      ],

      pigs: [
        { type: BasicPig, x: 500, y: 210 },
        { type: BasicPig, x: 550, y: 130 },
        { type: BasicPig, x: 600, y: 50 },
        { type: BasicPig, x: 650, y: -30 },
      ],
    });
  }
}
