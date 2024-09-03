import Brick from "./Brick.js";

export default class Brick_Solid extends Brick {
  constructor(x, y) {
    super(x, y, 0);
  }

  hurt(hitPoints) {}
};