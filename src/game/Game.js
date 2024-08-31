import Player from "../entity/paddle/Player.js";
import Renderer from "../gfx/Renderer.js";
import {
  GAME_SCALE,
  RES_HEIGHT,
  RES_SCALE,
  RES_WIDTH
} from "./constants.js";

export default class Game {
  #cnv;  // HTML5 canvas
  #last; // Holds last timestamp

  constructor() {
    // Init canvas properties
    this.#cnv = document.querySelector("canvas");
    this.#cnv.width  = RES_WIDTH  * RES_SCALE * GAME_SCALE;
    this.#cnv.height = RES_HEIGHT * RES_SCALE * GAME_SCALE;
    this.#cnv.autofocus = true;

    this.player = new Player();

    this.init();
  }

  init() {
    Renderer.init(this.#cnv.getContext("2d"));

    this.#last = performance.now();
    this.update(this.#last);
  }

  update(ts) {
    const dt = (ts - this.#last) / 1000;
    this.#last = ts;

    requestAnimationFrame(this.update.bind(this));

    this.player.update(dt);

    this.render(dt);
  }

  render(dt) {
    Renderer.clear(this.#cnv.width, this.#cnv.height);

    this.player.draw();

    Renderer.text(1/dt, 32, 32);
  }
};