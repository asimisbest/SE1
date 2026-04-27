import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { IceBlock } from "./../Blocks/Ice.js";
import { StoneBlock } from "./../Blocks/Stone.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";
import { BomberBuc } from "./../Bucs/BomberBuc.js";
import { SplitBuc } from "./../Bucs/SplitBuc.js";

export class Level7 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: BomberBuc },
        { type: SplitBuc },
        { type: FastBuc },
        { type: Buc },
      ],

      blocks: [
        // Left fortress (metal walls, ice interior)
        { type: MetalBlock, x: 540, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 620, y: 270, width: 20, height: 80 },
        { type: IceBlock, x: 580, y: 270, width: 40, height: 40 },
        { type: WoodBlock, x: 580, y: 220, width: 100, height: 20 },

        // Right fortress (stone walls, wood interior)
        { type: StoneBlock, x: 700, y: 270, width: 20, height: 80 },
        { type: StoneBlock, x: 780, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 740, y: 270, width: 40, height: 40 },
        { type: WoodBlock, x: 740, y: 220, width: 100, height: 20 },

        // Bridge between them
        { type: WoodBlock, x: 660, y: 200, width: 80, height: 15 },

        // Top bunker
        { type: StoneBlock, x: 660, y: 170, width: 20, height: 40 },
        { type: StoneBlock, x: 720, y: 170, width: 20, height: 40 },
        { type: MetalBlock, x: 690, y: 140, width: 80, height: 20 },
      ],

      pigs: [
        { type: BasicPig, x: 580, y: 240 },
        { type: BasicPig, x: 740, y: 240 },
        { type: BasicPig, x: 660, y: 180 },
        { type: BasicPig, x: 690, y: 115 },
      ],
    });
  }
}
