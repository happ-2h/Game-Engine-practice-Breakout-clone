import Renderer       from '../../gfx/Renderer.js';
import State          from './State.js';
import GameState      from './GameState.js';
import AudioHandler   from '../../audio/AudioHandler.js';
import GamepadHandler from '../../input/GamepadHandler.js';
import KeyHandler     from '../../input/KeyHandler.js';
import StateHandler   from '../../utils/StateHandler.js';
import { SCREEN_WIDTH } from '../constants.js';

export default class MainMenuState extends State {
  #spacebarSx; // For animation
  #optionsSx;  // Gamepad

  #animationTimer;
  #animationTimerMax; // Timer in seconds

  constructor() {
    super();

    this.#spacebarSx =  40;
    this.#optionsSx  = 104;
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

    if (KeyHandler.isDown(32) || GamepadHandler.isOptions()) {
      StateHandler.pop();
      StateHandler.push(new GameState);
    }

    if (this.#animationTimer >= this.#animationTimerMax) {
      this.#animationTimer = 0;
      this.#spacebarSx = this.#spacebarSx === 40 ? 72 : 40;
      this.#optionsSx = this.#optionsSx === 104 ? 112 : 104;
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

    // Joypad Options
    if (GamepadHandler.index !== null) {
      // - Button
      Renderer.image("spritesheet",
        this.#optionsSx, 120, 8, 8,
        (SCREEN_WIDTH>>1) - 4,
        8 * 14,
        8,
        8
      );
    }
  }
};