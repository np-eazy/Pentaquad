import { DEFAULT_CELL_PROPS } from "../../../Constants";

// A container for properties of a grid cell. GameState initializes with a 2D array
// of empty Cells of type 0 and no props.

// Type 0: Empty cells

// Type 1: Basic filled cells, permanent

// Type 2: cells that die after a lifetime

// Use this as a base to add more functionalities and features to the game.


class Cell {
  constructor(type, props) {
    this.type = type;
    this.props = {
      ...DEFAULT_CELL_PROPS,
      ...props,
    }
  }

  
}

export default Cell;