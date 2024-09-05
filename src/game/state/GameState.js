import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants.js";
import Player from "../../entity/paddle/Player.js";
import Ball from "../../entity/ball/Ball.js";
import State from "./State.js";
import AudioHandler from "../../audio/AudioHandler.js";
import Brick_Solid from "../../entity/brick/Brick_Solid.js";
import Brick_Basic from "../../entity/brick/Brick_Basic.js";
import Brick_Multihit from "../../entity/brick/Brick_Multihit.js";
import Brick_Powerup from "../../entity/brick/Brick_Powerup.js";
import Paddle from "../../entity/paddle/Paddle.js";

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
        const xpos = i*(16+4) + 10;
        const ypos = j*(8+4) + 8;
        const type  = Math.random() * 4 | 0;
        let   brick = null;

        switch(type) {
          case 0:
            brick = new Brick_Solid(xpos, ypos);
            break;
          case 1:
            brick = new Brick_Basic(xpos, ypos);
            break;
          case 2:
            brick = new Brick_Multihit(xpos, ypos, 2);
            break;
          case 3:
            brick = new Brick_Powerup(xpos, ypos);
            break;
        }

        if (brick) this.gameObjects.push(brick);
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

      if (go instanceof Ball || go instanceof Paddle)
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