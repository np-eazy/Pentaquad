import Cell from "./Cell";
import { CELL_TYPE } from "../../Constants";

import { drawRect, outlineRect } from "../../graphics/Pipeline";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";
import {
  BORDER_OFFSET,
  EMPTY_COLOR,
  LIGHT_AMPLITUDE,
} from "../../graphics/Theme";

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

  activeUpdate() {
    super.activeUpdate();
  }

  advanceUpdate(computeColors) {
    super.advanceUpdate(computeColors);
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
    drawRect(
      canvas,
      x + d,
      y + d,
      width - 2 * d,
      height - 2 * d,
      interpolateColor(
        this.colorSuite.midLight,
        EMPTY_COLOR,
        g,
        linInt
      ).getHex()
    );
    drawRect(
      canvas,
      x + 2 * d,
      y + 2 * d,
      width - 4 * d,
      height - 4 * d,
      interpolateColor(
        this.colorSuite.centerLight,
        EMPTY_COLOR,
        g,
        linInt
      ).getHex()
    );
    outlineRect(
      canvas,
      x + BORDER_OFFSET,
      y + BORDER_OFFSET,
      width - BORDER_OFFSET * 2,
      height - BORDER_OFFSET * 2,
      EMPTY_COLOR.getHex()
    );
  }
}

export default GhostCell;
