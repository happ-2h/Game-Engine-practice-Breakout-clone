let instance = null;

class _Collider {
  constructor() {
    if (instance) throw new Error("Collider singleton reconstructed");

    instance = null;
  }

  /**
   * @brief Performs AABB calculation on two rectangle objects
   *
   * @param {Object} rect1 - dst object of the first rectangle
   * @param {Object} rect2 - dst object of the second rectangle
   *
   * @returns true if the rectangles intersect; false otherwise
   */
  rectRect(rect1, rect2) {
    return !(
      rect2.pos.x > rect1.pos.x + rect1.dim.x ||
      rect2.pos.x + rect2.dim.x < rect1.pos.x ||
      rect2.pos.y > rect1.pos.y + rect1.dim.y ||
      rect2.pos.y + rect2.dim.y < rect1.pos.y
    );
  }

  /**
   * @brief Circle-rectangle collision detection
   *
   * @param {Object} cVec - Circle's positional vector
   * @param {Object} rVec - Rectangle's positional vector
   * @param {Number} rad - Radius of the circle
   *
   * @returns true if collision occured; false otherwise
   */
  circleRect(cVec, rVec, rad=4) {
    const cx = Math.abs(cVec.pos.x - rVec.pos.x - rVec.dim.x / 2);
    const cy = Math.abs(cVec.pos.y - rVec.pos.y - rVec.dim.y / 2);

    if (cx > rVec.dim.x / 2 + rad) return  false;
    if (cy > rVec.dim.y / 2 + rad) return  false;

    if (cx <= rVec.dim.x / 2) return true;
    if (cy <= rVec.dim.y / 2) return true;

    const dx = cx - rVec.dim.x / 2;
    const dy = cy - rVec.dim.y / 2;

    return dx*dx + dy*dy <= rad*rad;
  }
};

const Collider = new _Collider;
export default Collider;