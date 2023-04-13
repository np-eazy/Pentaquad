import Cell from "./Cell";
import { CELL_TYPE } from "../../Constants";

import { drawRect, outlineRect } from "../../graphics/Pipeline";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";
import { MARKER_COLOR, LIGHT_AMPLITUDE, BORDER_OFFSET } from "../../graphics/Theme";

const METER_LEVEL = 1;
const METER_AMP = 0.5;
const METER_FREQ = 0.03;

// A normal cell which when placed blocks other cells from falling through if not
// ghost cells. Whenever a piece of any type is placed, newly added Cells are always
// normal cells.
class NormalCell extends Cell {
  constructor() {
    super(CELL_TYPE.NORMAL);
  }

  idleUpdate() {
    super.idleUpdate();
    this.meter = METER_LEVEL - METER_AMP * Math.sin(this.timer * METER_FREQ);
  }

  activeUpdate() {
    super.activeUpdate();
  }

  advanceUpdate() {
    super.advanceUpdate();
  }

  // Draw 3 concentric solid squares and 1 in the back. 
  render(canvas, x0, y0, width, height) {
    super.render();
    var [x, y] = super.getPosition(x0, y0);

    if (this.currentColor) {
      var borderColor = interpolateColor(
        MARKER_COLOR,
        this.currentColor,
        1 - this.meter,
        linInt
      );
      var d = this.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;

      drawRect(canvas, x, y, width, height, this.currentColor.getHex());
      drawRect(
        canvas,
        x + d,
        y + d,
        width - 2 * d,
        height - 2 * d,
        this.colorSuite.midLight.getHex()
      );
      drawRect(
        canvas,
        x + 2 * d,
        y + 2 * d,
        width - 4 * d,
        height - 4 * d,
        this.colorSuite.centerLight.getHex()
      );
      outlineRect(
        canvas,
        x + BORDER_OFFSET,
        y + BORDER_OFFSET,
        width - BORDER_OFFSET * 2,
        height - BORDER_OFFSET * 2,
        borderColor.getHex()
      );
    }
  }
}

export default NormalCell;
