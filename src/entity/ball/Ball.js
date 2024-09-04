import { DEBUG, SCREEN_HEIGHT, SCREEN_WIDTH, TILE_SIZE } from '../../game/constants.js';
import Entity from '../Entity.js';
import Renderer from '../../gfx/Renderer.js';
import AudioHandler from '../../audio/AudioHandler.js';
import Paddle from '../paddle/Paddle.js';
import Collider from '../../utils/Collider.js';
import Brick from '../brick/Brick.js';

export default class Ball extends Entity {
  #diameter;

  #hitPoints; // Damage dealt to bricks

  /**
   * @param {Number} x        - x-position of the ball
   * @param {Number} y        - y-position of the ball
   * @param {Number} diameter - diameter of the ball
   */
  constructor(x=0, y=0, diameter=TILE_SIZE) {
    super(x, y);

    this.#diameter = diameter;
    this.#hitPoints = 1;

    this.dst.dim.x = diameter;
    this.dst.dim.y = diameter;

    // Image
    this.src.pos.x = 80;
    this.src.pos.y = 0;
    this.src.dim.x = diameter;
    this.src.dim.y = diameter;

    // Physics
    this.vel.x = 170;
    this.vel.y = 140;
    this.dir.x = -1;
    this.dir.y = -1;
    this.collisionThreshold = 4; // Prevents glitchy side collisions
  }

  init() {}

  update(gameobjects, dt) {
    let playHitSound = false;

    this.dir.normalize();

    let nextx = this.dst.pos.x + this.vel.x * this.dir.x * dt;
    let nexty = this.dst.pos.y + this.vel.y * this.dir.y * dt;

    // Keep inside screen bounds
    if (nexty <= 0) {
      nexty = 0;
      this.dir.y = -this.dir.y;
      playHitSound = true;
    }
    else if (nexty + this.#diameter >= SCREEN_HEIGHT) {
      nexty = SCREEN_HEIGHT - this.#diameter;
      this.dir.y = -this.dir.y;
      playHitSound = true;
    }

    if (nextx <= 0) {
      nextx = 0;
      this.dir.x = -this.dir.x;
      playHitSound = true;
    }
    else if (nextx + this.#diameter >= SCREEN_WIDTH) {
      nextx = SCREEN_WIDTH - this.#diameter;
      this.dir.x = -this.dir.x;
      playHitSound = true;
    }

    // Collision detection
    gameobjects.forEach(go => {
      if (go !== this && !go.isDead) {
        // Ball->paddle
        if (go instanceof Paddle) {
          // Prevent side collision glitches
         if (this.dst.pos.y + this.dst.dim.y >= go.dst.pos.y + this.collisionThreshold);
         else if (Collider.rectRect(this.dst, go.dst)) {
          // Respond only when moving downwards
          if (this.dir.y > 0) {
            nexty = go.dst.pos.y - this.dst.dim.y;
            this.dir.y = -this.dir.y;
            playHitSound = true;
          }
         }
        }
        // Ball->Brick
        else if (go instanceof Brick) {
          let hurt = false; // Prevents multiple damage from one hit

          if (Collider.rectRect(this.dst, go.dst)) {
            // Hit top of brick
            if (
              this.dir.y > 0 &&
              Math.abs((nexty + this.dst.dim.y) - go.dst.pos.y) < this.collisionThreshold) {
              nexty = go.dst.pos.y - this.dst.dim.y;
              this.dir.y = -this.dir.y;
              playHitSound = true;
              hurt = true;

            }
            // Hit bottom of brick
            if (
              this.dir.y < 0 &&
              Math.abs(nexty - (go.dst.pos.y + go.dst.dim.y)) < this.collisionThreshold) {
              nexty = go.dst.pos.y + go.dst.dim.y;
              this.dir.y = -this.dir.y;
              playHitSound = true;
              hurt = true;
            }

            // Hit left of brick
            if (
              this.dir.x > 0 &&
              Math.abs((nextx + this.dst.dim.x) - go.dst.pos.x) < this.collisionThreshold) {
              nextx = go.dst.pos.x - this.dst.dim.x;
              this.dir.x = -this.dir.x;
              playHitSound = true;
              hurt = true;
            }
            // Hit right of brick
            if (
              this.dir.x < 0 &&
              Math.abs(nextx - (go.dst.pos.x + go.dst.dim.x)) < this.collisionThreshold) {
              nextx = go.dst.pos.x + go.dst.dim.x;
              this.dir.x = -this.dir.x;
              playHitSound = true;
              hurt = true;
            }

            if (hurt) {
              go.hurt(this.#hitPoints);
              if (go.hp <= 0) go.kill();
            }
          }
        }
      }
    });

    // Finalize position
    this.dst.pos.x = nextx;
    this.dst.pos.y = nexty;

    // Play sounds
    if (playHitSound) AudioHandler.play("hit");
  }

  draw() {
    if (DEBUG)
      Renderer.vrect(this.dst.pos, this.dst.dim);

    Renderer.vimage("spritesheet", this.dst, this.src);
  }

  // Mutators
  set hitPoints(hitPoints) { this.#hitPoints = hitPoints; }

  // Accessors
  get hitPoints() { return this.#hitPoints; }
};