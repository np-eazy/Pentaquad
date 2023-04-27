import EmptyCell from "../../coreObjects/cell/EmptyCell";

// A class tasked with providing new empty cells
export class EmptyCellProvider {
  constructor() {}

  generateCell() {
    return new EmptyCell();
  }

  newCell() {
    return this.generateCell();
  }
}
