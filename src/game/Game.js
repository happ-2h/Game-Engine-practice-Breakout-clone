import Renderer from "../gfx/Renderer.js";

export default class Game {
  #cnv;  // HTML5 canvas
  #last; // Holds last timestamp

  constructor() {
    // Init canvas properties
    this.#cnv = document.querySelector("canvas");
    this.#cnv.width  = 640;
    this.#cnv.height = 480;
    this.#cnv.autofocus = true;

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

    this.render(dt);
  }

  render(dt) {
    Renderer.clear(this.#cnv.width, this.#cnv.height);

    Renderer.text(1/dt, 32, 32);
  }
};