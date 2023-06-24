import Cell from "../Cell";
import { CELL_TYPE } from "../../../rules/Constants";

import {
  drawRect,
  drawRectOffset,
  outlineRect,
  outlineRectOffset,
} from "../../../../graphics/CanvasPipeline";
import { interpolateColor } from "../../../../graphics/utils/Colors";
import { linInt, sinusoid } from "../../../../graphics/utils/Functions";
import { EMPTY_COLOR, MARKER_COLOR, THEME_RED } from "../../../../graphics/theme/ColorScheme";
import { CELL_BORDER_OFFSET } from "../Cell";
import { LIGHT_AMPLITUDE } from "../../../../graphics/theme/Dynamics";
import { Setting } from "../../../control/SettingsController";

const CLOCK_FREQ = 0.01;

const METER_LEVEL = 1;
const METER_AMP = 0.5;
const METER_FREQ = 0.03;

const GHOST_LEVEL = 0.5;
const GHOST_AMP = 0.1;
const GHOST_FREQ = 0.1;

// A special type of Cell which can pass through others before being placed.
class BombIndicator extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.GHOST, coreState);
  }

  idleUpdate() {
    super.idleUpdate();
    this.meter = METER_LEVEL - METER_AMP * Math.sin(this.timer * METER_FREQ);
  }

  render(canvas, x0, y0, width, height, activated=false) {
    var borderColor = interpolateColor(
      MARKER_COLOR,
      this.currentColor,
      1 - this.meter,
      linInt
    );
    var [x, y] = super.getPosition(x0, y0, width);
    var d = this.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;
    canvas.globalAlpha = 0.75;
      if (this.coreState.settingsController.graphicsLevel != Setting.LOW) {
        outlineRectOffset(
          canvas,
          x,
          y,
          width,
          height,
          this.colorSuite.shade4H.getHex(),
          d
        );
        outlineRectOffset(
          canvas,
          x,
          y,
          width,
          height,
          this.colorSuite.shade2H.getHex(),
          2 * d
        );
      }
    canvas.globalAlpha = sinusoid({level: 0.5, frequency: 10, amplitude: 0.5}, this.timer);
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
    if (activated) {
        outlineRectOffset(
            canvas,
            x - width * 2,
            y - height * 2,
            width * 5,
            height * 5,
            THEME_RED.getHex(),
            CELL_BORDER_OFFSET
        );
        canvas.globalAlpha = 0.1 * canvas.globalAlpha;
        drawRectOffset(
          canvas,
          x - width * 2,
          y - height * 2,
          width * 5,
          height * 5,
          THEME_RED.getHex(),
          CELL_BORDER_OFFSET
      );
    }
    canvas.globalAlpha = 1.0;
  }
}

export default BombIndicator;
