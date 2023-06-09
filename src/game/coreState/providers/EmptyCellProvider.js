import EmptyCell from "../../coreObjects/cell/EmptyCell";

// A class tasked with providing new empty cells
export class EmptyCellProvider {
  constructor() {}

  generateCell(coreState) {
    return new EmptyCell(coreState);
  }
}
