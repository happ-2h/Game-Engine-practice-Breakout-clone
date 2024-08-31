import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../game/constants.js";
import Paddle from "./Paddle.js";

export default class Player extends Paddle {
  constructor() {
    super(0, 0);

    this.init();
  }

  init() {
    this.dst.dim.x <<= 2; // Quadruple the width
    this.dst.dim.y >>= 1; // Halve the height

    this.dst.pos.x = ((SCREEN_WIDTH>>1) - (this.dst.dim.x>>1)); // Center on x
    this.dst.pos.y = SCREEN_HEIGHT - (this.dst.dim.y<<1); // Place near the bottom
  }
}