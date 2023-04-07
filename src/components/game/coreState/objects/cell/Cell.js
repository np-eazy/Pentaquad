// A container for properties of a grid cell. GameState initializes with a 2D array
// of empty Cells of type 0 and no props.

import { Color } from "../../../graphics/utils/Colors";

// Type 0: Empty cells

// Type 1: Filled cells with a parent Piece

// Use this as a base to add more functionalities and features to the game.

const DEFAULT_PROPS = {
  xOffset: 0,
  yOffset: 0,
  baseColor: new Color({ red: 0, green: 0, blue: 0, }),
}

class Cell {
  constructor(type, props) {
    this.type = type;
    var defaultProps = {
      xOffset: 0,
      yOffset: 0,
    };
    this.props = {
      ...defaultProps,
      ...props,
    }
  }
}

export default Cell;
