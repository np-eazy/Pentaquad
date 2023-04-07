import { DEFAULT_CELL_PROPS } from "../../../Constants";
import { Color, interpolateColor } from "../../../graphics/utils/Colors";
import { linInt } from "../../../graphics/utils/Functions";
import {
  EMPTY_COLOR,
  FILLED_COLOR,
  CELL_MID_LIGHT,
  CELL_CENTER_LIGHT,
  CELL_BASE_COLOR_BLEND,
} from "../../../graphics/Theme";

// A container for properties of a grid cell. GameState initializes with a 2D array
// of empty Cells of type 0 and no props.

// Type 0: Empty cells

// Type 1: Basic filled cells, permanent

// Use this as a base to add more functionalities and features to the game.


class Cell {
  constructor(type, props) {
    this.type = type;
    this.props = {
      ...DEFAULT_CELL_PROPS,
      ...props,
    }
    this.updateColors();
  }

  updateColors() {
    this.props.currentColor = interpolateColor(
      FILLED_COLOR,
      this.props.baseColor,
      CELL_BASE_COLOR_BLEND, 
      linInt,
    );
    if (this.props.ttl != -1) {
      this.props.currentColor = interpolateColor(
        EMPTY_COLOR,
        this.props.currentColor,
        this.props.ttl / this.props.lifetime,
        linInt,
      )
    }
    if (this.props.currentColor) {
      this.props.midLightColor = new Color({
        red: this.props.currentColor.red + CELL_MID_LIGHT,
        green: this.props.currentColor.green + CELL_MID_LIGHT,
        blue: this.props.currentColor.blue + CELL_MID_LIGHT,
      })
      this.props.centerLightColor = new Color({
        red: this.props.currentColor.red + CELL_CENTER_LIGHT,
        green: this.props.currentColor.green + CELL_CENTER_LIGHT,
        blue: this.props.currentColor.blue + CELL_CENTER_LIGHT,
      })
    }
  }
}

export default Cell;