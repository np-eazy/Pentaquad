import Cell from "./Cell";
import { CELL_TYPE } from "../../rules/Constants";

import {
  drawRect,
  drawRectOffset,
  outlineRect,
} from "../../../graphics/CanvasPipeline";
import { METER_DECAY_RATE } from "../../../graphics/theme/Dynamics";
import { EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR, MARKER_COLOR_2, WHITE } from "../../../graphics/theme/ColorScheme";
import { Color, interpolateColor } from "../../../graphics/utils/Colors";
import { linInt } from "../../../graphics/utils/Functions";
import { Setting } from "../../control/SettingsController";

const EMPTY_BASE_COLOR_BLEND = 0.15;
const EMPTY_2H_LIGHT = 10;
const EMPTY_4H_LIGHT = 20;
// The default empty value of a Cell on the 2D board. It has the special
// property of lighting up a different color if marked, which is taken care of
// during a GameState update.
class EmptyCell extends Cell {
  constructor(coreState) {
    super(CELL_TYPE.EMPTY, coreState);
    this.lightColor = WHITE;
    this.baseColor = EMPTY_COLOR;

    this.meter = 0;
  }

  // The meter either goes towards 0 or 1 based on whether or not the piece is marked.
  idleUpdate() {
    if (this.coreState.settingsController && this.coreState.settingsController.graphicsLevel == Setting.HIGH) {
      super.idleUpdate();
    } 
    this.ttl = 8;
    if (this.marked) {
      this.meter *= METER_DECAY_RATE;
    } else {
      this.meter += (1 - this.meter) * (1 - METER_DECAY_RATE);
    }
  }

  // Update the cell's main color based on its TTL; this is the default update color but it can
  // be overridden by extensions for cooler effects.
  updateCurrentColor() {
    if (this.ttl != -1 && this.currentColor) {
      this.currentColor = interpolateColor(
        EMPTY_COLOR,
        this.baseColor,
        EMPTY_BASE_COLOR_BLEND,
        linInt
      );
      this.currentColor.add(this.lightColor);
    } else {
      this.currentColor = this.baseColor;
    }
  }

  // Each time the current color changes, everything else follows
  updateColorSuite() {
    this.colorSuite.shade2H = new Color({
      red: this.currentColor.red + EMPTY_2H_LIGHT,
      green: this.currentColor.green + EMPTY_2H_LIGHT,
      blue: this.currentColor.blue + EMPTY_2H_LIGHT,
    });
    this.colorSuite.shade4H = new Color({
      red: this.currentColor.red + EMPTY_4H_LIGHT,
      green: this.currentColor.green + EMPTY_4H_LIGHT,
      blue: this.currentColor.blue + EMPTY_4H_LIGHT,
    });
  }

  fallingUpdate() {
    super.fallingUpdate();
  }

  placementUpdate(computeColors) {
    // super.placementUpdate(computeColors);
  }

  // "Mix" the background and foreground rectangle based on the meter level
  render(canvas, x0, y0, width, height) {
    if (this.meter < 0.5) {
      var [x, y] = super.getPosition(x0, y0, width);
      drawRect(canvas, x, y, width, height, this.colorSuite.shade4H.getHex());
      var d = ((1 - (this.meter * 2)) * width) / 2;
      drawRectOffset(canvas, x, y, width, height, this.colorSuite.shade2H.getHex(), d);
    } else {
      var [x, y] = super.getPosition(x0, y0, width);
      drawRect(canvas, x, y, width, height, this.colorSuite.shade2H.getHex());
      var d = ((1 - (this.meter * 2 - 1)) * width) / 2;
      drawRectOffset(canvas, x, y, width, height, this.currentColor.getHex(), d);
    }
    outlineRect(canvas, x, y, width, height, MARKER_COLOR.getHex());
  }
}

export default EmptyCell;
