import { GAME_SCALE, TILE_SIZE } from "../game/constants.js";
import Vec2D from "../math/Vec2D.js";
import TextureHandler from "./TextureHandler.js";

let instance = null;

class _Renderer {
  /**@type {CanvasRenderingContext2D} */
  #ctx;

  constructor() {
    if (instance) throw new Error("Renderer singleton reconstructed");

    this.#ctx = null;

    instance = this;
  }

  /**
   * @brief Initializes the drawing context
   *
   * @param {CanvasRenderingContext2D} context2d - Drawing context
   */
  init(context2d) {
    if (context2d) {
      this.#ctx = context2d;

      // Init context properties
      this.#ctx.font = "24px Arial";

      // Display images as pixelated
      this.#ctx.imageSmoothingEnabled = false;
    }
  }

  /**
   * @brief Clears a rectangular section of the canvas from (0, 0) to (width, height)
   *
   * @param {Number} width  - Width of the area to clear
   * @param {Number} height - Height of the area to clear
   */
  clear(width=1, height=1) {
    this.#ctx.clearRect(0, 0, width, height);
  }

  /**
   * @brief Displays ASCII text on the canvas
   *
   * @param {String} text  - Text to display
   * @param {Number} x     - Abscissa to place the text
   * @param {Number} y     - Ordinate to place the text
   * @param {String} color - Color of the text
   */
  text(text="SAMPLE", x=0, y=0, color="black") {
    this.#ctx.fillStyle = color;
    this.#ctx.fillText(text, x, y);
  }

  /**
   * @brief Draws a stroked rectangle (no fill)
   *
   * @param {Number} x      - x-position to draw the rectangle
   * @param {Number} y      - y-position to draw the rectangle
   * @param {Number} width  - Width of the rectangle
   * @param {Number} height - Height of the rectangle
   * @param {String} color  - Stroke color of the rectangle
   */
  rect(x=0, y=0, width=TILE_SIZE, height=TILE_SIZE, color="red") {
    this.#ctx.strokeStyle = color;
    this.#ctx.strokeRect(
      x      * GAME_SCALE,
      y      * GAME_SCALE,
      width  * GAME_SCALE,
      height * GAME_SCALE
    );
  }

  // Vector rendering functions
  /**
   * @brief Draws a stroked rectangle (no fill)\
   *        Uses Vec2D for positioning and dimension
   *
   * @param {Vec2D} pos     - Vector to use for the position
   * @param {Vec2D} dim     - Vector to use as dimension (width, height)
   * @param {String} color  - Stroke color of the rectangle
   */
  vrect(vec, dim, color="red") {
    this.#ctx.strokeStyle = color;
    this.#ctx.strokeRect(
      Math.floor(vec.x * GAME_SCALE),
      Math.floor(vec.y * GAME_SCALE),
      dim.x * GAME_SCALE,
      dim.y * GAME_SCALE
    );
  }

  /**
   * @brief Draws an image to the canvas
   *
   * @param {String} textureID - ID of texture
   * @param {Vec2D} dst        - Destination vector (HTML5 canvas)
   * @param {Vec2D} src        - Source vector (blit of image file)
   */
  vimage(textureID, dst, src) {
    this.#ctx.drawImage(
      TextureHandler.getTexture(textureID),
      src.pos.x, src.pos.y, src.dim.x, src.dim.y,
      Math.floor(dst.pos.x * GAME_SCALE),
      Math.floor(dst.pos.y * GAME_SCALE),
      dst.dim.x * GAME_SCALE,
      dst.dim.y * GAME_SCALE
    );
  }
};

const Renderer = new _Renderer;
export default Renderer;