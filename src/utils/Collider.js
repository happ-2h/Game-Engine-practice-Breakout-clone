let instance = null;

class _Collider {
  constructor() {
    if (instance) throw new Error("Collider singleton reconstructed");

    instance = null;
  }

  /**
   * @brief Circle-rectangle collision detection
   *
   * @param {Vec2D} cVec - Circle's positional vector
   * @param {Vec2D} rVec - Rectangle's posiional vector
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