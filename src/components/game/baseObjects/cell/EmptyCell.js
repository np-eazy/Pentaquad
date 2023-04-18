import Cell from "./Cell";
import { CELL_TYPE } from "../../Constants";

import { drawRect, outlineRect } from "../../graphics/Pipeline";
import { EMPTY_COLOR, FILLED_COLOR, GRID_COLOR, MARKER_COLOR } from "../../graphics/Theme";
import { interpolateColor } from "../../graphics/utils/Colors";
import { BOARD_HEIGHT } from "../../graphics/Layout";
import { linInt, sinusoid } from "../../graphics/utils/Functions";

const METER_DECAY_RATE = 0.9;

const GRID_WAVE = {
  level: 0.5,
  amplitude: 0.5,
  frequency: 0.02,
}

// The default empty value of a Cell on the 2D board. It has the special
// property of lighting up a different color if marked, which is taken care of
// during a GameState update.
class EmptyCell extends Cell {
  constructor() {
    super(CELL_TYPE.EMPTY);
    this.meter = 0;
  }

  // The meter either goes towards 0 or 1 based on whether or not the piece is marked.
  idleUpdate() {
    super.idleUpdate();
    if (this.marked) {
      this.meter *= METER_DECAY_RATE;
    } else {
      this.meter += (1 - this.meter) * (1 - METER_DECAY_RATE);
    }
  }

  activeUpdate() {
    super.activeUpdate();
  }

  advanceUpdate(computeColors) {
    super.advanceUpdate(computeColors);
  }

  // "Mix" the background and foreground rectangle based on the meter level
  render(canvas, x0, y0, width, height) {
    var [x, y] = super.getPosition(x0, y0);
    drawRect(canvas, x, y, width, height, MARKER_COLOR.getHex());
    var d = ((1 - this.meter) * width) / 2;
    drawRect(
      canvas,
      x + d,
      y + d,
      width - 2 * d,
      height - 2 * d,
      EMPTY_COLOR.getHex()
    );
    outlineRect(canvas, x, y, width, height, MARKER_COLOR.getHex());
  }
}

export default EmptyCell;
