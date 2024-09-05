import Controller     from "./Controller.js";
import GamepadHandler from "../input/GamepadHandler.js";
import KeyHandler     from "../input/KeyHandler.js";

export default class PlayerController extends Controller {
  constructor() { super(); }

  isRequestingLeft() {
    return KeyHandler.isDown(37)       ||
           GamepadHandler.isDpadLeft() ||
           GamepadHandler.leftStickX  <= -GamepadHandler.deadzone ||
           GamepadHandler.rightStickX <= -GamepadHandler.deadzone;
  }

  isRequestingUp() {
    return KeyHandler.isDown(38) || GamepadHandler.isDpadUp();
  }

  isRequestingRight() {
    return KeyHandler.isDown(39)        ||
           GamepadHandler.isDpadRight() ||
           GamepadHandler.leftStickX  >= GamepadHandler.deadzone ||
           GamepadHandler.rightStickX >= GamepadHandler.deadzone;
  }

  isRequestingDown() {
    return KeyHandler.isDown(40) || GamepadHandler.isDpadDown();
  }
};