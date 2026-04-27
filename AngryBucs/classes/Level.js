export class Level {
  constructor({ blocks = [], pigs = [], bucs = [], ground = 500, slingshot = { x: 120, y: 0 } } = {}) {
    this.blockDefs = blocks;    // [{ type: BlockClass, x, y, rotation?, ...opts }]
    this.pigDefs = pigs;        // [{ type: PigClass, x, y, ...opts }]
    this.bucDefs = bucs;        // [{ type: BucClass, ...opts }] — order = launch order
    this.ground = ground;
    this.slingshot = slingshot;

    this.blocks = [];
    this.pigs = [];
    this.bucs = [];
    this.currentBucIndex = 0;
    this.built = false;
  }

  build() {
    this.blocks = this.blockDefs.map((def) => {
      const { type: BlockType, ...opts } = def;
      return new BlockType(opts);
    });

    this.pigs = this.pigDefs.map((def) => {
      const { type: PigType, ...opts } = def;
      return new PigType(opts);
    });

    this.bucs = this.bucDefs.map((def) => {
      const { type: BucType, ...opts } = def;
      return new BucType(opts);
    });

    this.currentBucIndex = 0;
    this.built = true;
  }

  getCurrentBuc() {
    return this.bucs[this.currentBucIndex] || null;
  }

  nextBuc() {
    this.currentBucIndex++;
    return this.getCurrentBuc();
  }

  getAllEntities() {
    return [...this.blocks, ...this.pigs, ...this.bucs];
  }

  getAliveEnemies() {
    return this.pigs.filter((p) => p.alive);
  }

  isWin() {
    return this.getAliveEnemies().length === 0;
  }

  isLoss() {
    return this.currentBucIndex >= this.bucs.length && this.getAliveEnemies().length > 0;
  }

  update(dt) {
    for (const entity of this.getAllEntities()) {
      entity.update(dt);
    }
  }

  draw(ctx) {
    for (const block of this.blocks) block.draw(ctx);
    for (const pig of this.pigs) pig.draw(ctx);
    for (const buc of this.bucs) buc.draw(ctx);
  }
}