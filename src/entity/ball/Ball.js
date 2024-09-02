import { DEBUG, SCREEN_HEIGHT, SCREEN_WIDTH, TILE_SIZE } from '../../game/constants.js';
import Entity from '../Entity.js';
import Renderer from '../../gfx/Renderer.js';
import AudioHandler from '../../audio/AudioHandler.js';
import Paddle from '../paddle/Paddle.js';
import Collider from '../../utils/Collider.js';

export default class Ball extends Entity {
  #radius; // Used for collisions
  #diameter;

  /**
   * @param {Number} x        - x-position of the ball
   * @param {Number} y        - y-position of the ball
   * @param {Number} diameter - diameter of the ball
   */
  constructor(x=0, y=0, diameter=TILE_SIZE) {
    super(x, y);

    this.#diameter = diameter;
    this.#radius = diameter>>1;

    this.dst.dim.x = diameter;
    this.dst.dim.y = diameter;

    // Image
    this.src.pos.x = 80;
    this.src.pos.y = 0;
    this.src.dim.x = diameter;
    this.src.dim.y = diameter;

    // Physics
    this.vel.x = 100;
    this.vel.y = 100;
    this.dir.x = -1;
    this.dir.y = -1;
    this.collisionThreshold = 4; // Prevents glitchy side collisions
  }

  init() {}

  update(gameobjects, dt) {
    this.dir.normalize();

    let nextx = this.dst.pos.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.pos.y + this.vel.y * this.dir.y * dt;

    // Keep inside screen bounds
    if (nexty <= 0) {
      nexty = 0;
      this.dir.y = -this.dir.y;
      AudioHandler.play("hit");
    }
    else if (nexty + this.#diameter >= SCREEN_HEIGHT) {
      nexty = SCREEN_HEIGHT - this.#diameter;
      this.dir.y = -this.dir.y;
      AudioHandler.play("hit");
    }

    if (nextx <= 0) {
      nextx = 0;
      this.dir.x = -this.dir.x;
      AudioHandler.play("hit");
    }
    else if (nextx + this.#diameter >= SCREEN_WIDTH) {
      nextx = SCREEN_WIDTH - this.#diameter;
      this.dir.x = -this.dir.x;
      AudioHandler.play("hit");
    }

    // Collision detection
    gameobjects.forEach(go => {
      if (go !== this) {
        // Ball->paddle
        if (go instanceof Paddle) {
         if (this.dst.pos.y + this.dst.dim.y >= go.dst.pos.y + this.collisionThreshold);
         else if (Collider.rectRect(this.dst, go.dst)) {
          // Respond only when moving downwards
          if (this.dir.y >= 0.2) {
            AudioHandler.play("hit");
            nexty = go.dst.pos.y - this.dst.dim.y;
            this.dir.y = -this.dir.y;
          }
         }

        }
      }
    });

    // Finalize position
    this.dst.pos.x = nextx;
    this.dst.pos.y = nexty;
  }

  draw() {
    if (DEBUG)
      Renderer.vrect(this.dst.pos, this.dst.dim);

    Renderer.vimage("spritesheet", this.dst, this.src);
  }
};