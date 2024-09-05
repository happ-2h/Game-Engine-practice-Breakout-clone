import PlayerController from "../../controller/PlayerController.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH, TILE_SIZE } from "../../game/constants.js";
import Renderer from "../../gfx/Renderer.js";
import Collider from "../../utils/Collider.js";
import Powerup from "../powerup/Powerup.js";
import Paddle from "./Paddle.js";

export default class Player extends Paddle {
  #powerup; // Current powerup

  #iAccel; // Initial acceleration for powerup restoration

  constructor() {
    super(0, 0);

    this.controller = new PlayerController;

    // Image properties
    this.src.pos.x = TILE_SIZE;
    this.src.pos.y = 0;
    this.src.dim.x = 64;
    this.src.dim.y = 8;

    // Current powerup stats
    this.#powerup = {
      type: null,
      time: 0,
      maxTime: 0
    };

    this.init();
  }

  init() {
    this.dst.dim.x <<= 2; // Quadruple the width
    this.dst.dim.y >>= 1; // Halve the height

    this.dst.pos.x = ((SCREEN_WIDTH>>1) - (this.dst.dim.x>>1)); // Center on x
    this.dst.pos.y = SCREEN_HEIGHT - (this.dst.dim.y<<1); // Place near the bottom

    // Physics
    this.accel.x = 400;
    this.accel.y = 0;
    this.friction.x = 3;

    this.#iAccel = this.accel.clone();
  }

  update(gameobjects, dt) {
    this.#handleInput();

    this.vel.x += this.accel.x * this.dir.x * dt;
    this.vel.x += this.vel.x * -this.friction.x * dt;

    // Holds next x before finalizing
    let nextx = this.dst.pos.x + this.vel.x * dt;

    // Keep player inside game screen
    if (nextx <= 0) {
      nextx = 0;
      this.vel.x = -this.vel.x / 2; // Bounce effect
      this.dir.x = 0;
    }
    else if (nextx >= SCREEN_WIDTH - this.dst.dim.x) {
      nextx = SCREEN_WIDTH - this.dst.dim.x;
      this.vel.x = -this.vel.x / 2; // Bounce effect
      this.dir.x = 0;
    }

    // Powerup handler
    if (this.#powerup.type) {
      this.#powerup.time -= dt;

      if (this.#powerup.type === "speed") {
        this.accel.x = this.#iAccel.x<<1;
      }

      if (this.#powerup.time <= 0) {
        this.#powerup.type = null;

        // Reset settings
        this.accel.x = this.#iAccel.x;
      }
    }


    // Paddle->Powerup collision
    gameobjects.forEach(go => {
      if (go instanceof Powerup && !go.isDead) {
        if (Collider.rectRect(this.dst, go.dst)) {
          this.#powerup.type = go.type;
          this.#powerup.time = go.duration;
          this.#powerup.maxTime = go.duration;

          go.kill();
        }
      }
    });

    // Finalize the position
    this.dst.pos.x = nextx;
  }

  draw() {
    super.draw();

    // Draw powerup UI
    if (this.#powerup.type) {
      // Timer bar
      Renderer.rect(0, SCREEN_HEIGHT - 8,
        SCREEN_WIDTH * (this.#powerup.time / this.#powerup.maxTime), 8
      );

      // Icon
      Renderer.image("spritesheet", 0, 32, 8, 8,
        SCREEN_WIDTH - 14,
        SCREEN_HEIGHT - 13,
        32, 32);
    }
  }

  #handleInput() {
    if (this.controller.isRequestingLeft()) {
      this.dir.x = -1;
    }
    else if (this.controller.isRequestingRight()) {
      this.dir.x = 1;
    }
    else this.dir.x = 0;

    this.dir.normalize();
  }
}