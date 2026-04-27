import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { MetalBlock } from "./../Blocks/Metal.js";
import { IceBlock } from "./../Blocks/Ice.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level8 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: Buc },
        { type: Buc },
      ],

      blocks: [
        { type: IceBlock, x: 500, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 550, y: 270, width: 20, height: 80 },
        { type: IceBlock, x: 600, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 650, y: 270, width: 20, height: 80 },
        { type: IceBlock, x: 700, y: 270, width: 20, height: 80 },
        { type: MetalBlock, x: 750, y: 270, width: 20, height: 80 },
      ],

      pigs: [
        { type: BasicPig, x: 525, y: 290 },
        { type: BasicPig, x: 575, y: 290 },
        { type: BasicPig, x: 625, y: 290 },
        { type: BasicPig, x: 675, y: 290 },
        { type: BasicPig, x: 725, y: 290 },
        { type: BasicPig, x: 775, y: 290 },
      ],
    });
  }
}
