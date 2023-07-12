import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

import {
  drawRect,
  drawRectOffset,
  outlineRect,
} from "../../../graphics/CanvasPipeline";
import { LIGHT_AMPLITUDE, METER_DECAY_RATE } from "../../../graphics/theme/Dynamics";
import { BLACK, EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR, THEME_RED } from "../../../graphics/theme/ColorScheme";
import { Color, copy, interpolateColor } from "../../../graphics/utils/Colors";

// The default empty value of a Cell on the 2D board. It has the special
// property of lighting up a different color if marked, which is taken care of
// during a GameState update.
class DeadCell extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.EMPTY, coreState);
  }

  // The meter either goes towards 0 or 1 based on whether or not the piece is marked.
  idleUpdate() {
  }

  // Update the cell's main color based on its TTL; this is the default update color but it can
  // be overridden by extensions for cooler effects.
  updateCurrentColor() {
  }

  // Each time the current color changes, everything else follows
  updateColorSuite() {
  }

  fallingUpdate() {
  }

  placementUpdate(computeColors) {
    // super.placementUpdate(computeColors);
  }

  // "Mix" the background and foreground rectangle based on the meter level
  render(canvas, x0, y0, width, height) {
    drawRect(canvas, x0, y0, width, height, EMPTY_COLOR.getHex());
  }
}


export default DeadCell;
