import Renderer       from "../gfx/Renderer.js";
import MainMenuState  from "./state/MainMenuState.js";
import GamepadHandler from "../input/GamepadHandler.js";
import AssetHandler   from "../utils/AssetHandler.js";
import StateHandler   from "../utils/StateHandler.js";

import {
  DEBUG,
  GAME_SCALE,
  RES_HEIGHT,
  RES_SCALE,
  RES_WIDTH,
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

    // Poll assets
    // - Images
    AssetHandler.poll("spritesheet", "spritesheet.png");
    // - Sounds
    // -- SFX
    AssetHandler.poll("hit", "hit.wav");
    // -- Music
    AssetHandler.poll("music01", "music01.ogg");
    AssetHandler.poll("musicMainMenu", "music_MainMenu.ogg");

    // If assets successfully loaded, start game loop
    AssetHandler.load()
      .then(val  => this.init())
      .catch(err => console.error(err));
  }

  init() {
    StateHandler.push(new MainMenuState);
    StateHandler.init();

    Renderer.init(this.#cnv.getContext("2d"));

    this.#last = performance.now();
    this.update(this.#last);
  }

  update(ts) {
    const dt = (ts - this.#last) / 1000;
    this.#last = ts;

    requestAnimationFrame(this.update.bind(this));

    if (GamepadHandler.index !== null) GamepadHandler.update();

    StateHandler.update(dt);

    this.render(dt);
  }

  render(dt) {
    Renderer.clear(this.#cnv.width, this.#cnv.height);

    StateHandler.render();

    if (DEBUG) Renderer.text(1/dt, 32, 32);
  }
};