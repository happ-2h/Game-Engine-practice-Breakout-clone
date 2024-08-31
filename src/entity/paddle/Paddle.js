import { DEBUG, TILE_SIZE } from "../../game/constants.js";
import Renderer from "../../gfx/Renderer.js";
import Entity from "../Entity.js";

export default class Paddle extends Entity {
  /**
   * @param {Number} x - x-position of the paddle
   * @param {Number} y - y-position of the paddle
   */
  constructor(x=0, y=0) {
    super(x, y);

    this.controller = null;
  }

  init() {}

  update(dt) {}

  draw() {
    if (DEBUG)
      Renderer.vrect(this.dst.pos, this.dst.dim);

    Renderer.vimage("spritesheet", this.dst, this.src);
  }
};