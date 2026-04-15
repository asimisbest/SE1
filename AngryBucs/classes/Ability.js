export class Ability {
  constructor() {
    this.used = false;
  }

  use(buc) {
    this.used = true;
  }
}