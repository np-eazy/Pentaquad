import Cell, { CELL_BORDER_OFFSET } from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

import { drawRect, drawRectOffset, outlineRect, outlineRectOffset } from "../../../graphics/CanvasPipeline";
import { interpolateColor } from "../../../graphics/utils/Colors";
import { linInt } from "../../../graphics/utils/Functions";
import { MARKER_COLOR } from "../../../graphics/theme/ColorScheme";
import { LIGHT_AMPLITUDE } from "../../../graphics/theme/Dynamics";
import { Setting } from "../../control/SettingsController";

const METER_FREQ = 0.03;
const METER_AMP = 0.5;
const METER_LEVEL = 1;

// A cell that converts an area of other cells into EmptyCells
// when placed or dropped.
class BombCell extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.BOMB, coreState);
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
    super.render(canvas, x0, y0, width, height);
    var [x, y] = super.getPosition(x0, y0, width);

    if (this.currentColor) {
      var borderColor = interpolateColor(
        MARKER_COLOR,
        this.currentColor,
        1 - this.meter,
        linInt
      );
      var d = this.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;

      drawRect(canvas, x, y, width, height, this.currentColor.getHex());
      if (this.coreState && this.coreState.settingsController && this.coreState.settingsController.graphicsLevel != Setting.LOW) {
        drawRectOffset(
          canvas,
          x,
          y,
          width,
          height,
          this.colorSuite.shade2H.getHex(),
          d
        );
        drawRectOffset(
          canvas,
          x,
          y,
          width,
          height,
          this.colorSuite.shade4H.getHex(),
          2 * d
        );
      }
      outlineRectOffset(
        canvas,
        x,
        y,
        width,
        height,
        borderColor.getHex(),
        CELL_BORDER_OFFSET
      );
    }
  }
}

export default BombCell;
