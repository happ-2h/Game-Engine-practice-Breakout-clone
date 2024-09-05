let instance = null;

class _GamepadHandler {
  #index; // FIXME Assumes only one player

  // D-Pad
  #up;
  #down;
  #left;
  #right;

  // Center buttons
  #options;

  // Analog sticks
  #deadzone;
  #leftStickX;  // Left stick x-value
  #leftStickY;  // Left stick y-value
  #rightStickX; // Right stick x-value
  #rightStickY; // Right stick y-value

  constructor() {
    if (instance) throw new Error("KeyHandler singleton reconstructed");

    this.#index = null;

    this.#up      = false;
    this.#down    = false;
    this.#left    = false;
    this.#right   = false;
    this.#options = false;

    this.#deadzone = 0.4;

    addEventListener("gamepadconnected", e => {
      this.#index = e.gamepad.index;
    });

    addEventListener("gamepaddisconnected", e => {
      this.#index = null;
    });

    instance = this;
  }

  init() {}

  update() {
    const gamepad = navigator.getGamepads()[this.#index];

    // D-Pad
    this.#up      = gamepad.buttons[12].pressed;
    this.#down    = gamepad.buttons[13].pressed;
    this.#left    = gamepad.buttons[14].pressed;
    this.#right   = gamepad.buttons[15].pressed;

    // Center buttons
    this.#options = gamepad.buttons[9].pressed;

    // Analog sticks
    this.#leftStickX  = gamepad.axes[0];
    this.#leftStickY  = gamepad.axes[1];
    this.#rightStickX = gamepad.axes[2];
    this.#rightStickY = gamepad.axes[3];
  }

  // Accessors
  isDpadUp()    { return this.#up; }
  isDpadDown()  { return this.#down; }
  isDpadLeft()  { return this.#left; }
  isDpadRight() { return this.#right; }

  isOptions()   { return this.#options; }

  get index()    { return this.#index; }
  get deadzone() { return this.#deadzone; }

  get leftStickX()  { return this.#leftStickX; }
  get leftStickY()  { return this.#leftStickY; }
  get rightStickX() { return this.#rightStickX; }
  get rightStickY() { return this.#rightStickY; }

  // Mutators
  set deadzone(deadzone) { this.#deadzone = deadzone; }
};

const GamepadHandler = new _GamepadHandler;
export default GamepadHandler;