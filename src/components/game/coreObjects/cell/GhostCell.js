import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

import { drawRect, drawRectOffset, outlineRect, outlineRectOffset } from "../../graphics/CanvasPipeline";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";
import {
  BORDER_OFFSET,
  EMPTY_COLOR,
  LIGHT_AMPLITUDE,
} from "../../theme/Theme";

const METER_LEVEL = 1;
const METER_AMP = 0.5;
const METER_FREQ = 0.03;

const GHOST_LEVEL = 0.5;
const GHOST_AMP = 0.1;
const GHOST_FREQ = 0.1;

// A special type of Cell which can pass through others before being placed.
class GhostCell extends Cell {
  constructor() {
    super(CELL_TYPE.GHOST);
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

  // Draw a normal cell whose base color is flashing
  render(canvas, x0, y0, width, height) {
    var [x, y] = super.getPosition(x0, y0);
    var d = (this.meter * LIGHT_AMPLITUDE) / 2 + LIGHT_AMPLITUDE;
    var g = GHOST_LEVEL + GHOST_AMP * Math.sin(this.timer * GHOST_FREQ);
    drawRect(
      canvas,
      x,
      y,
      width,
      height,
      interpolateColor(this.currentColor, EMPTY_COLOR, g, linInt).getHex()
    );
    drawRectOffset(canvas, x, y, width, height, interpolateColor(
      this.colorSuite.shade2H,
      EMPTY_COLOR,
      g,
      linInt
    ).getHex(), d);

    drawRectOffset(canvas, x, y, width, height, interpolateColor(
      this.colorSuite.shade4H,
      EMPTY_COLOR,
      g,
      linInt
    ).getHex(), 2 * d);

    outlineRectOffset(canvas, x, y, width, height, EMPTY_COLOR.getHex(), BORDER_OFFSET);
  }
}

export default GhostCell;
