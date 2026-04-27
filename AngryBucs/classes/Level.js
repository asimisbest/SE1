export class Level {
  constructor({ blocks = [], pigs = [], bucs = [], ground = 500, cannon = null } = {}) {
    this.blockDefs = blocks;
    this.pigDefs = pigs;
    this.bucDefs = bucs;
    this.ground = ground;
    this.cannon = cannon;

    this.blocks = [];
    this.pigs = [];
    this.bucs = [];
    this.extraProjectiles = []; // for split fragments
    this.currentBucIndex = 0;
    this.built = false;
    this.score = 0;
    this._scoredPigs = new Set();
    this._scoredBlocks = new Set();
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

    this.extraProjectiles = [];
    this.currentBucIndex = 0;
    this.score = 0;
    this._scoredPigs = new Set();
    this._scoredBlocks = new Set();
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
    return [...this.blocks, ...this.pigs, ...this.bucs, ...this.extraProjectiles];
  }

  getAliveEnemies() {
    return this.pigs.filter((p) => p.alive);
  }

  updateScore() {
    // Score for killed pigs
    for (let i = 0; i < this.pigs.length; i++) {
      if (!this.pigs[i].alive && !this._scoredPigs.has(i)) {
        this._scoredPigs.add(i);
        this.score += 5000;
      }
    }
    // Score for destroyed blocks
    for (let i = 0; i < this.blocks.length; i++) {
      if (!this.blocks[i].alive && !this._scoredBlocks.has(i)) {
        this._scoredBlocks.add(i);
        this.score += 500;
      }
    }
  }

  getFinalScore() {
    // Bonus for remaining bucs
    const remainingBucs = Math.max(0, this.bucs.length - this.currentBucIndex);
    return this.score + remainingBucs * 3000;
  }

  isWin() {
    return this.getAliveEnemies().length === 0;
  }

  isLoss() {
    const allBucsUsed = this.currentBucIndex >= this.bucs.length;
    const noExtraMoving = this.extraProjectiles.every(e => !e.alive || !e.physical.checkIfMoving());
    const allBucsStopped = this.bucs.every(b => !b.hasBeenShot || !b.physical.checkIfMoving());
    return allBucsUsed && noExtraMoving && allBucsStopped && this.getAliveEnemies().length > 0;
  }

  update(dt) {
    for (const entity of this.getAllEntities()) {
      entity.update(dt);
    }
    this.updateScore();
  }

  draw(ctx) {
    if (this.cannon) this.cannon.draw(ctx);
    for (const block of this.blocks) {
      if (block.alive) block.draw(ctx);
    }
    for (const pig of this.pigs) {
      if (pig.alive) pig.draw(ctx);
    }
    for (const buc of this.bucs) {
      if (buc.hasBeenShot) buc.draw(ctx);
    }
    for (const proj of this.extraProjectiles) {
      if (proj.alive) proj.draw(ctx);
    }
  }
}