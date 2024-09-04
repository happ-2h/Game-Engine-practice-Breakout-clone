import Brick from "./Brick.js"

export default class Brick_Multihit extends Brick {
  constructor(x, y, hp=2) {
    super(x, y, 2);

    this.hp = hp;
    this.ttlHp = hp;
  }

  update(dt) {
    // Change image at 50% health
    if (this.hp <= this.ttlHp>>1) {
      this.src.pos.y = 24;
    }
  }
};