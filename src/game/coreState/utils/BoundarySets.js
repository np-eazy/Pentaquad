import { getPID } from "./Functions";
import { Angle } from "./Direction";
import { BOARD_SIZE } from "../../rules/Constants";

// A container class to hold CollisionSets for quick
// collision detection.
class BoundarySets {
  constructor(boundaryMargin, pidSize) {
    this.boundarySets = [];
    var [xSize, ySize] = [BOARD_SIZE, BOARD_SIZE];
    var pid;
    for (var i = 0; i < 4; i++) {
      this.boundarySets.push(new Map());
    }
    for (var i = -boundaryMargin; i < ySize + boundaryMargin; i++) {
      pid = getPID(xSize, i, pidSize);
      this.boundarySets[Angle.RIGHT].set(pid, [xSize, i]);

      pid = getPID(i, -1, pidSize);
      this.boundarySets[Angle.UP].set(pid, [i, -1]);

      pid = getPID(-1, i, pidSize);
      this.boundarySets[Angle.LEFT].set(pid, [-1, i]);

      pid = getPID(i, ySize, pidSize);
      this.boundarySets[Angle.DOWN].set(pid, [i, ySize]);
    }
  }
}
export default BoundarySets;
