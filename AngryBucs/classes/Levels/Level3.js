import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { IceBlock } from "./../Blocks/Ice.js";
import { StoneBlock } from "./../Blocks/Stone.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level3 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: Buc },
        { type: FastBuc },
        { type: FastBuc },
        { type: Buc },
      ],

      blocks: [
        // Left ice tower (fragile, easy to shatter)
        { type: IceBlock, x: 550, y: 270, width: 20, height: 80 },
        { type: IceBlock, x: 550, y: 190, width: 20, height: 80 },
        { type: IceBlock, x: 550, y: 110, width: 20, height: 80 },
        
        // Right stone tower (heavy, hard to topple)
        { type: StoneBlock, x: 750, y: 270, width: 20, height: 80 },
        { type: StoneBlock, x: 750, y: 190, width: 20, height: 80 },
        { type: StoneBlock, x: 750, y: 110, width: 20, height: 80 },

        // Center wood structure
        { type: WoodBlock, x: 650, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 650, y: 220, width: 80, height: 20 },
      ],

      pigs: [
        { type: BasicPig, x: 550, y: 50 },
        { type: BasicPig, x: 750, y: 50 },
        { type: BasicPig, x: 650, y: 190 },
      ],
    });
  }
}
