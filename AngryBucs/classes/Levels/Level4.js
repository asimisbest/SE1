import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level4 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: FastBuc },
        { type: FastBuc },
        { type: FastBuc },
        { type: FastBuc },
        { type: Buc },
      ],

      blocks: [
        // Dense Wall
        { type: WoodBlock, x: 550, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 550, y: 190, width: 20, height: 80 },
        { type: WoodBlock, x: 550, y: 110, width: 20, height: 80 },
        
        { type: WoodBlock, x: 580, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 580, y: 190, width: 20, height: 80 },
        { type: WoodBlock, x: 580, y: 110, width: 20, height: 80 },

        // Roof covering pigs
        { type: WoodBlock, x: 700, y: 220, width: 120, height: 20 },
        { type: WoodBlock, x: 660, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 740, y: 270, width: 20, height: 80 },
      ],

      pigs: [
        { type: BasicPig, x: 700, y: 290 },
        { type: BasicPig, x: 700, y: 190 },
      ],
    });
  }
}
