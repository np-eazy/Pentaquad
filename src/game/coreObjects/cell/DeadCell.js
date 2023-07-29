import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

// Dead Cell is a special cell that is "off-screen" and only exists to spawn
// pieces in-bounds to make indexing/coordinates easier to handle
export class DeadCell extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.EMPTY, coreState);
  }

  idleUpdate() {
  }

  updateCurrentColor() {
  }

  updateColorSuite() {
  }

  fallingUpdate() {
  }

  placementUpdate(computeColors) {
  }

  render(canvas, x0, y0, width, height) {
  }
}
