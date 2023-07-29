import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

import {
  outlineRectOffset,
} from "../../../graphics/CanvasPipeline";
import { interpolateColor } from "../../../graphics/utils/Colors";
import { linInt } from "../../../graphics/utils/Functions";
import { MARKER_COLOR } from "../../../graphics/theme/ColorScheme";
import { LIGHT_AMPLITUDE } from "../../../graphics/theme/Dynamics";
import { Setting } from "../../control/SettingsController";

const METER_LEVEL = 1;
const METER_AMP = 0.5;
const METER_FREQ = 0.03;

// A special type of Cell which can pass through others before being placed.
class GhostCell extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.GHOST, coreState);
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


  render(canvas, x0, y0, width, height) {
    var borderColor = interpolateColor(
      MARKER_COLOR,
      this.currentColor,
      1 - this.meter,
      linInt
    );
    var [x, y] = super.getPosition(x0, y0, width);
    var d = this.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;
    canvas.globalAlpha = 0.75;
      if (this.coreState && this.coreState.settingsController && this.coreState.settingsController.graphicsLevel != Setting.LOW) {
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
  }
}

export default GhostCell;
