import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level10 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: FastBuc },
        { type: FastBuc },
        { type: Buc },
        { type: FastBuc },
        { type: Buc },
        { type: FastBuc },
        { type: FastBuc },
      ],

      blocks: [
        // Huge complex structure
        { type: MetalBlock, x: 500, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 560, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 620, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 680, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 740, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 800, y: 270, width: 20, height: 80 },

        { type: WoodBlock, x: 530, y: 220, width: 80, height: 20 },
        { type: WoodBlock, x: 650, y: 220, width: 80, height: 20 },
        { type: WoodBlock, x: 770, y: 220, width: 80, height: 20 },

        { type: WoodBlock, x: 530, y: 170, width: 20, height: 80 },
        { type: WoodBlock, x: 650, y: 170, width: 20, height: 80 },
        { type: WoodBlock, x: 770, y: 170, width: 20, height: 80 },

        { type: WoodBlock, x: 590, y: 120, width: 140, height: 20 },
        { type: WoodBlock, x: 710, y: 120, width: 140, height: 20 },

        { type: WoodBlock, x: 590, y: 70, width: 20, height: 80 },
        { type: WoodBlock, x: 710, y: 70, width: 20, height: 80 },

        { type: WoodBlock, x: 650, y: 20, width: 140, height: 20 },
      ],

      pigs: [
        { type: BasicPig, x: 530, y: 290 },
        { type: BasicPig, x: 650, y: 290 },
        { type: BasicPig, x: 770, y: 290 },
        { type: BasicPig, x: 590, y: 190 },
        { type: BasicPig, x: 710, y: 190 },
        { type: BasicPig, x: 650, y: 90 },
        { type: BasicPig, x: 650, y: -10 },
      ],
    });
  }
}
