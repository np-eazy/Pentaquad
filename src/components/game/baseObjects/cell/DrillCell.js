import Cell from "./Cell";
import { CELL_TYPE } from "../../Constants";

import { outlineRectOffset } from "../../graphics/Pipeline";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";
import { BORDER_OFFSET, EMPTY_COLOR, MARKER_COLOR } from "../../graphics/Theme";

const CLOCK_FREQ = 0.01;

// A cell that converts everything below it into EmptyCells when dropped
// or placed.
class DrillCell extends Cell {
  constructor() {
    super(CELL_TYPE.DRILL);
  }

  idleUpdate() {
    super.idleUpdate();
  }

  fallingUpdate() {
    super.fallingUpdate();
  }

  placementUpdate(computeColors) {
    super.placementUpdate(computeColors);
  }

  // Draw non-solid cell with a continually shrinking border
  render(canvas, x0, y0, width, height) {
    var [x, y] = super.getPosition(x0, y0);
    var borderColor = interpolateColor(
      MARKER_COLOR,
      this.currentColor,
      1 - this.meter,
      linInt
    );
    outlineRectOffset(
      canvas,
      x,
      y,
      width,
      height,
      borderColor.getHex(),
      BORDER_OFFSET
    );

    var clock = (this.timer * CLOCK_FREQ) % 1;
    var innerLength = (clock * width) / 2;
    var innerColor = interpolateColor(
      this.colorSuite.midLight,
      EMPTY_COLOR,
      clock,
      linInt
    );
    outlineRectOffset(
      canvas,
      x,
      y,
      width,
      height,
      innerColor.getHex(),
      innerLength
    );
  }
}

export default DrillCell;
