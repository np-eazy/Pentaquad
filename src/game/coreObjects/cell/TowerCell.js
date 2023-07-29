import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";
import {
  drawRect,
  drawRectOffset,
  outlineRectOffset,
} from "../../../graphics/CanvasPipeline";

import { EMPTY_COLOR } from "../../../graphics/theme/ColorScheme";
import { LIGHT_AMPLITUDE } from "../../../graphics/theme/Dynamics";
import { interpolateColor } from "../../../graphics/utils/Colors";
import { linInt } from "../../../graphics/utils/Functions";
import { CELL_BORDER_OFFSET } from "./Cell";

const GHOST_LEVEL = 0.5;
const GHOST_AMP = 0.2;
const GHOST_FREQ = 0.2;
const CLOCK_FREQ = 0.01;


// A cell which when placed fills everything in its falling path with normal cells.
class TowerCell extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.TOWER, coreState);
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

  render(canvas, x0, y0, width, height) {
    var [x, y] = super.getPosition(x0, y0, width);

    if (this.currentColor) {
      var d = this.meter * LIGHT_AMPLITUDE * 0.5 + LIGHT_AMPLITUDE;
      var g = GHOST_LEVEL + GHOST_AMP * Math.sin(this.timer * GHOST_FREQ);

      drawRect(
        canvas,
        x,
        y,
        width,
        height,
        interpolateColor(this.currentColor, EMPTY_COLOR, g, linInt).getHex()
      );
      drawRectOffset(
        canvas,
        x,
        y,
        width,
        height,
        interpolateColor(
          this.colorSuite.shade2H,
          EMPTY_COLOR,
          g,
          linInt
        ).getHex(),
        d
      );
      drawRectOffset(
        canvas,
        x,
        y,
        width,
        height,
        interpolateColor(
          this.colorSuite.shade4H,
          EMPTY_COLOR,
          g,
          linInt
        ).getHex(),
        2 * d
      );
      outlineRectOffset(
        canvas,
        x,
        y,
        width,
        height,
        EMPTY_COLOR.getHex(),
        CELL_BORDER_OFFSET
      );

      var innerLength = ((1 - ((this.timer * CLOCK_FREQ) % 1)) * width) / 2;
      outlineRectOffset(
        canvas,
        x,
        y,
        width,
        height,
        this.colorSuite.shade4H.getHex(),
        innerLength
      );
    }
  }
}

export default TowerCell;
