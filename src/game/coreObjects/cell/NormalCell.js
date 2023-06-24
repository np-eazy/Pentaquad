import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

import {
  drawRect,
  drawRectOffset,
  outlineRect,
  outlineRectOffset,
} from "../../../graphics/CanvasPipeline";
import { interpolateColor } from "../../../graphics/utils/Colors";
import { linInt, sinusoid } from "../../../graphics/utils/Functions";
import { EMPTY_COLOR, MARKER_COLOR, THEME_RED } from "../../../graphics/theme/ColorScheme";
import { CELL_BORDER_OFFSET } from "./Cell";
import { LIGHT_AMPLITUDE } from "../../../graphics/theme/Dynamics";
import { Setting } from "../../control/SettingsController";

const METER_LEVEL = 1;
const METER_AMP = 0.5;
const METER_FREQ = 0.03;

// A normal cell which when placed blocks other cells from falling through if not
// ghost cells. Whenever a piece of any type is placed, newly added Cells are always
// normal cells.
class NormalCell extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.NORMAL, coreState);
  }

  idleUpdate() {
    super.idleUpdate();
    this.meter = METER_LEVEL - METER_AMP * Math.sin(this.timer * METER_FREQ);
  }

  fallingUpdate() {
    super.fallingUpdate();
  }

  placementUpdate() {
    super.placementUpdate();
  }

  // Draw 3 concentric solid squares and 1 in the back.
  render(canvas, x0, y0, width, height) {
    super.render();
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
      if (
        this.coreState &&
        this.coreState.settingsController &&
        this.coreState.settingsController.graphicsLevel != Setting.LOW
      ) {
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

    if (this.marked == CELL_TYPE.DRILL) {
      canvas.globalAlpha = 0.5;
      drawRectOffset(
        canvas,
        x,
        y,
        width,
        height,
        EMPTY_COLOR.getHex(),
        0,
      );
      canvas.globalAlpha = 0.25 * sinusoid({level: 0.5, frequency: 5, amplitude: 0.5}, this.coreState.timer);
      drawRectOffset(
        canvas,
        x,
        y,
        width,
        height,
        THEME_RED.getHex(),
        0,
      );
      canvas.globalAlpha = 1;
    }
  }
}

export default NormalCell;
