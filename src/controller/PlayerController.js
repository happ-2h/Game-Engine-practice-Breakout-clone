import KeyHandler from "../input/KeyHandler.js";
import Controller from "./Controller.js";

export default class PlayerController extends Controller {
  constructor() { super(); }

  isRequestingLeft() {
    return KeyHandler.isDown(37);
  }
  isRequestingUp() {
    return KeyHandler.isDown(38);
  }
  isRequestingRight() {
    return KeyHandler.isDown(39);
  }
  isRequestingDown() {
    return KeyHandler.isDown(40);
  }
};