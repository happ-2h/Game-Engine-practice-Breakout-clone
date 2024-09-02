import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants.js";
import Player from "../../entity/paddle/Player.js";
import Ball from "../../entity/ball/Ball.js";
import State from "./State.js";
import AudioHandler from "../../audio/AudioHandler.js";
import Brick from "../../entity/brick/Brick.js";

export default class GameState extends State {
  constructor() {
    super();
  }

  onEnter() {}
  onExit()  {}

  init() {
    // Clear gameobjects
    this.gameObjects.splice(0, this.gameObjects.length);

    // Add objects
    this.gameObjects.push(new Player);
    this.gameObjects.push(
      new Ball(SCREEN_WIDTH / 2 - 4, SCREEN_HEIGHT / 2 - 4, 8)
    );

    // TEMP Bricks
    for (let i = 0; i < 15; ++i) {
      for (let j = 0; j < 3; ++j) {
        this.gameObjects.push(
          new Brick(
            i*(16+4) + 10,
            j*(8 + 4) + 8,
            Math.random() * 4 | 0)
        );
      }
    }

    // Relevant asset properties
    AudioHandler.setVolume("hit", 0.4);
    AudioHandler.setPlaybackRate("music01", 0.7);
    AudioHandler.setVolume("music01", 0.2);

    AudioHandler.playMusic("music01");
  }

  update(dt) {
    this.gameObjects.forEach(go => {
      if (go.isDead) return;

      if (go instanceof Ball)
        go.update(this.gameObjects, dt);
      else
        go.update(dt);
    });
  }

  render() {
    this.gameObjects.forEach(go => {
      if (go.isDead) return;

      go.draw();
    });
  }
};