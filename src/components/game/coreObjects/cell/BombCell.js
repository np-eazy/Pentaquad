import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

import { outlineRect, outlineRectOffset } from "../../graphics/CanvasPipeline";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";
import { LIGHT_AMPLITUDE, MARKER_COLOR } from "../../theme/Theme";

const METER_FREQ = 0.03;
const METER_AMP = 0.5;
const METER_LEVEL = 1;

// A cell that converts an area of other cells into EmptyCells
// when placed or dropped.
class BombCell extends Cell {
  constructor() {
    super(CELL_TYPE.BOMB);
  }

  idleUpdate() {
    super.idleUpdate();
    this.meter = METER_LEVEL - METER_AMP * Math.sin(this.timer * METER_FREQ);
  }

  fallingUpdate() {
    super.fallingUpdate();
  }

  placementUpdate(computeColors) {
    super.placementUpdate(computeColors);
  }

  // Draw non-solid cell with an oscillating border
  render(canvas, x0, y0, width, height) {
    var [x, y] = super.getPosition(x0, y0);

    var borderColor = interpolateColor(
      MARKER_COLOR,
      this.currentColor,
      1 - this.meter,
      linInt
    );
    var d = this.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;

    outlineRect(canvas, x, y, width, height, borderColor.getHex());
    outlineRectOffset(
      canvas,
      x,
      y,
      width,
      height,
      this.colorSuite.shade2H.getHex(),
      d
    );
    outlineRectOffset(
      canvas,
      x,
      y,
      width,
      height,
      this.colorSuite.shade4H.getHex(),
      2 * d
    );
    outlineRectOffset(canvas, x, y, width, height, borderColor.getHex(), 2);
  }
}

export default BombCell;
