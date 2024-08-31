import Renderer from "../../gfx/Renderer.js";
import Entity from "../Entity.js";

export default class Paddle extends Entity {
  /**
   * @param {Number} x - x-position of the paddle
   * @param {Number} y - y-position of the paddle
   */
  constructor(x=0, y=0) {
    super(x, y);
  }

  init() {}

  update(dt) {}

  draw() {
    Renderer.vrect(this.dst.pos, this.dst.dim);
  }
};