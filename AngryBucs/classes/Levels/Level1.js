import { Level } from "./../Level.js";
import { Cannon } from "./../Cannon.js";
import { WoodBlock } from "./../Blocks/Wood.js";
import { BasicPig } from "./../Pigs/BasicPig.js";
import { Buc } from "./../Buc.js";
import { FastBuc } from "./../Bucs/FastBuc.js";

export class Level1 extends Level {
  constructor() {
    super({
      ground: 500,
      cannon: new Cannon({ x: 80, y: 305, velocityMultiplier: 1 }),

      bucs: [
        { type: Buc },
        { type: Buc },
        { type: FastBuc },
      ],

      blocks: [
        // Left tower — pillars: bottom=310(ground), top=230
        { type: WoodBlock, x: 580, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 640, y: 270, width: 20, height: 80 },
        // Left beam — bottom=230(pillar top), top=210
        { type: WoodBlock, x: 610, y: 220, width: 80, height: 20 },

        // Right tower
        { type: WoodBlock, x: 720, y: 270, width: 20, height: 80 },
        { type: WoodBlock, x: 780, y: 270, width: 20, height: 80 },
        // Right beam
        { type: WoodBlock, x: 750, y: 220, width: 80, height: 20 },

        // Bridge — bottom~210(beam tops), top~195
        { type: WoodBlock, x: 680, y: 203, width: 120, height: 15 },
      ],

      pigs: [
        // On left beam (beam top=210, pig radius=18)
        { type: BasicPig, x: 610, y: 192 },
        // On right beam
        { type: BasicPig, x: 750, y: 192 },
        // On bridge (bridge top≈195.5, pig radius=18)
        { type: BasicPig, x: 680, y: 178 },
      ],
    });
  }
}
