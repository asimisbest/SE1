import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level9 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: FastBuc },
        { type: Buc },
        { type: FastBuc },
        { type: Buc },
        { type: FastBuc },
      ],

      blocks: [
        // Fort Wall Left
        { type: WoodBlock, x: 500, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 500, y: 190, width: 20, height: 80 },
        // Fort Wall Right
        { type: WoodBlock, x: 750, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 750, y: 190, width: 20, height: 80 },
        
        // Inner Core
        { type: MetalBlock, x: 625, y: 270, width: 80, height: 80 },
        { type: MetalBlock, x: 625, y: 190, width: 20, height: 80 },

        // Roofs
        { type: WoodBlock, x: 500, y: 140, width: 40, height: 20 },
        { type: WoodBlock, x: 750, y: 140, width: 40, height: 20 },
        { type: WoodBlock, x: 625, y: 140, width: 100, height: 20 },
      ],

      pigs: [
        { type: BasicPig, x: 550, y: 290 },
        { type: BasicPig, x: 700, y: 290 },
        { type: BasicPig, x: 625, y: 110 },
        { type: BasicPig, x: 500, y: 110 },
        { type: BasicPig, x: 750, y: 110 },
      ],
    });
  }
}
