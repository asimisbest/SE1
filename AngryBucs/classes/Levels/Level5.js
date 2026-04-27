import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { StoneBlock } from "./../Blocks/Stone.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { IceBlock } from "./../Blocks/Ice.js";
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
        { type: FastBuc },
        { type: Buc },
        { type: FastBuc },
      ],

      blocks: [
        // Pyramid structure with mixed materials
        // Bottom row (stone - heavy base)
        { type: StoneBlock, x: 600, y: 280, width: 40, height: 40 },
        { type: StoneBlock, x: 650, y: 280, width: 40, height: 40 },
        { type: StoneBlock, x: 700, y: 280, width: 40, height: 40 },
        { type: StoneBlock, x: 750, y: 280, width: 40, height: 40 },
        { type: StoneBlock, x: 800, y: 280, width: 40, height: 40 },

        // Second row (wood)
        { type: WoodBlock, x: 625, y: 240, width: 40, height: 40 },
        { type: WoodBlock, x: 675, y: 240, width: 40, height: 40 },
        { type: WoodBlock, x: 725, y: 240, width: 40, height: 40 },
        { type: WoodBlock, x: 775, y: 240, width: 40, height: 40 },

        // Third row (ice - fragile top)
        { type: IceBlock, x: 650, y: 200, width: 40, height: 40 },
        { type: IceBlock, x: 700, y: 200, width: 40, height: 40 },
        { type: IceBlock, x: 750, y: 200, width: 40, height: 40 },

        // Peak
        { type: WoodBlock, x: 675, y: 160, width: 40, height: 40 },
        { type: WoodBlock, x: 725, y: 160, width: 40, height: 40 },

        // Metal cap
        { type: MetalBlock, x: 700, y: 120, width: 40, height: 40 },
      ],

      pigs: [
        { type: BasicPig, x: 650, y: 255 },
        { type: BasicPig, x: 750, y: 255 },
        { type: BasicPig, x: 700, y: 175 },
        { type: BasicPig, x: 700, y: 90 },
      ],
    });
  }
}
