import Entity from "../Entity.js";
import Renderer from "../../gfx/Renderer.js";
import { DEBUG } from "../../game/constants.js";

export default class Brick extends Entity {
  #type;
  #hp; // Number of hits before the brick breaks

  /**
   *
   * @param {Number} x    - x-position of the brick
   * @param {Number} y    - y-position of the brick
   * @param {Number} type - Brick type\
   *                        0: solid\
   *                        1: basic\
   *                        2: multi-hit\
   *                        3: power-up
   */
  constructor(x=0, y=0, type=0) {
    super(x, y);

    this.#type = type;
    this.#hp = 1;

    this.dst.dim.y = 8;

    // Image
    this.src.pos.x = type<<4;
    this.src.pos.y = 16;
    this.src.dim.y = 8;
  }

  init() {}

  update(dt) {}

  draw() {
    if (DEBUG)
      Renderer.vrect(this.dst.pos, this.dst.dim);

    Renderer.vimage("spritesheet", this.dst, this.src);
  }

  /**
   * @brief Reduces health points
   *
   * @param {Number} hitPoints - Value to reduce health points by
   */
  hurt(hitPoints) {
    this.#hp -= hitPoints;
  }

  // Mutators
  set type(type) { this.#type = type; }
  set hp(hp)     { this.#hp = hp; }

  // Accessors
  get type()   { return this.#type; }
  get hp()     { return this.#hp; }
};