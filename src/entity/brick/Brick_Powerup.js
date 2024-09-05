import Brick    from "./Brick.js";
import Renderer from "../../gfx/Renderer.js";
import Powerup  from "../powerup/Powerup.js";
import { DEBUG } from "../../game/constants.js";

export default class Brick_Powerup extends Brick {
  constructor(x, y) {
    super(x, y, 3);
  }

  draw() {
    if (DEBUG)
      Renderer.vrect(this.dst.pos, this.dst.dim);

    Renderer.vimage("spritesheet", this.dst, this.src);
  }

  spawnPowerup() {
    // Spawn at the center of the brick
    return new Powerup(
      this.dst.pos.x + (this.dst.dim.x>>1) - 4,
      this.dst.pos.y,
      5
    )
  }
};