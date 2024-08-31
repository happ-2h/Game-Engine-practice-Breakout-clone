import { TILE_SIZE } from "../game/constants.js";
import Vec2D from "../math/Vec2D.js";

/*
 * NOTE: class is engineered to mimic an abstract class
 */
export default class Entity {
  #dst;   // Rectangle for drawing onto the canvas

  // Physics
  #dir;      // directional vector
  #accel;    // acceleration vector
  #vel;      // velocity vector
  #friction; // Friction vector

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

    this.#dir      = Vec2D.zero();
    this.#accel    = Vec2D.zero();
    this.#vel      = Vec2D.zero();
    this.#friction = Vec2D.zero();
  }

  // Accessors
  get dst()      { return this.#dst; }

  get dir()      { return this.#dir; }
  get accel()    { return this.#accel; }
  get vel()      { return this.#vel; }
  get friction() { return this.#friction; }
};