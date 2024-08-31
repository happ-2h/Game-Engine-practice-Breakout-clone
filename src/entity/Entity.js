import { TILE_SIZE } from "../game/constants.js";
import Vec2D from "../math/Vec2D.js";

/*
 * NOTE: class is engineered to mimic an abstract class
 */
export default class Entity {
  #dst; // Rectangle for drawing onto the canvas

  /**
   * @param {Number} x - x-position of the entity
   * @param {Number} y - y-position of the entity
   */
  constructor(x=0, y=0) {
    if (this.constructor === Entity)
      throw new Error("Can't instantiate abstract class Entity");

    // Required abstract methods
    if (this.init === undefined)
      throw new Error("init() must be implemented");
    if (this.update === undefined)
      throw new Error("update(dt) must be implemented");
    if (this.draw === undefined)
      throw new Error("draw() must be implemented");

    this.#dst = {
      pos: new Vec2D(x, y),  // Position
      dim: new Vec2D(TILE_SIZE, TILE_SIZE) // Dimension
    };
  }

  // Accessors
  get dst() { return this.#dst; }
};