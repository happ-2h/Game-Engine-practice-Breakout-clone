import AudioHandler from '../../audio/AudioHandler.js';
import Renderer from '../../gfx/Renderer.js';
import KeyHandler from '../../input/KeyHandler.js';
import StateHandler from '../../utils/StateHandler.js';
import { SCREEN_WIDTH } from '../constants.js';
import GameState from './GameState.js';
import State from './State.js';

export default class MainMenuState extends State {
  #spacebarSx; // For animation

  #animationTimer;
  #animationTimerMax; // Timer in seconds

  constructor() {
    super();

    this.#spacebarSx = 40;
    this.#animationTimer = 0;
    this.#animationTimerMax = 0.2;
  }

  onEnter() {}
  onExit() {
    AudioHandler.stop("musicMainMenu");
  }

  init() {
    AudioHandler.setVolume("musicMainMenu", 0.6);
    AudioHandler.setPlaybackRate("musicMainMenu", 1.1);
    AudioHandler.playMusic("musicMainMenu");
  }

  update(dt) {
    this.#animationTimer += dt;

    if (KeyHandler.isDown(32)) {
      StateHandler.pop();
      StateHandler.push(new GameState);
    }

    if (this.#animationTimer >= this.#animationTimerMax) {
      this.#animationTimer = 0;
      this.#spacebarSx = this.#spacebarSx === 40 ? 72 : 40;
    }
  }

  render() {
    // Logo
    Renderer.image("spritesheet",
      0, 104, 88, 8,
      (SCREEN_WIDTH>>1) - 44,
      8 * 5,
      88,
      8
    );

    // "start"
    Renderer.image("spritesheet",
      0, 120, 40, 8,
      (SCREEN_WIDTH>>1) - 20,
      8 * 10,
      40,
      8
    );

    // Spacebar
    Renderer.image("spritesheet",
      this.#spacebarSx, 120, 32, 8,
      (SCREEN_WIDTH>>1) - 16,
      8 * 12,
      32,
      8
    );
  }
};