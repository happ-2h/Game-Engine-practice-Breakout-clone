import Entity   from "../Entity.js";
import Renderer from "../../gfx/Renderer.js";
import { DEBUG, SCREEN_HEIGHT } from "../../game/constants.js";

export default class Powerup extends Entity {
  #duration;    // Duration of effect in frames
  #maxDuration; // Save initial duration
  #type;        // Type of powerup

  /**
   *
   * @param {Number} x        - x-position
   * @param {Number} y        - y-position
   * @param {Number} duration - Duration of effect in seconds
   */
  constructor(x, y, duration) {
    super(x, y);

    this.#type = "speed";

    this.dst.dim.x = 8;
    this.dst.dim.y = 8;

    this.src.pos.y = 32;
    this.src.dim.x = 8;
    this.src.dim.y = 8;

    this.vel.y = 80;

    this.#duration    = duration;
    this.#maxDuration = duration;
  }

  init() {}

  update(dt) {
    let nexty = this.dst.pos.y + this.vel.y * dt;

    if (nexty >= SCREEN_HEIGHT) this.kill();

    this.dst.pos.y = nexty;
  }

  draw() {
    if (DEBUG)
      Renderer.vrect(this.dst.pos, this.dst.dim);

    Renderer.vimage("spritesheet", this.dst, this.src);
  }

  // Accessors
  get duration()    { return this.#duration; }
  get maxDuration() { return this.#maxDuration; }
  get type()        { return this.#type; }
};