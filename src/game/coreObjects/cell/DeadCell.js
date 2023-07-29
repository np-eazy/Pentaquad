import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

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
