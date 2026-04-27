import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level2 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: Buc },
        { type: Buc },
        { type: FastBuc },
        { type: Buc },
        { type: FastBuc },
        { type: FastBuc },
      ], // Lots of buckies!

      blocks: [
        // Base layer
        { type: WoodBlock, x: 550, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 610, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 670, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 730, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 790, y: 270, width: 20, height: 80 },

        // Base roof
        { type: WoodBlock, x: 580, y: 220, width: 80, height: 20 },
        { type: WoodBlock, x: 700, y: 220, width: 80, height: 20 },
        { type: WoodBlock, x: 760, y: 220, width: 80, height: 20 },

        // Middle layer
        { type: WoodBlock, x: 580, y: 170, width: 20, height: 80 },
        { type: WoodBlock, x: 640, y: 170, width: 20, height: 80 },
        { type: WoodBlock, x: 700, y: 170, width: 20, height: 80 },

        // Middle roof
        { type: WoodBlock, x: 610, y: 120, width: 80, height: 20 },
        { type: WoodBlock, x: 670, y: 120, width: 80, height: 20 },

        // Top layer
        { type: WoodBlock, x: 640, y: 70, width: 20, height: 80 },
        
        // Top roof
        { type: WoodBlock, x: 640, y: 20, width: 60, height: 20 },
      ],

      pigs: [
        // Ground pigs
        { type: BasicPig, x: 580, y: 290 },
        { type: BasicPig, x: 700, y: 290 },
        // Middle pigs
        { type: BasicPig, x: 610, y: 190 },
        { type: BasicPig, x: 670, y: 190 },
        // Top pig
        { type: BasicPig, x: 640, y: 90 },
      ],
    });
  }
}
