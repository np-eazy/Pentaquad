import { Color, interpolateColor } from "../../utils/Colors";
import { drawRect, outlineRect } from "../../Pipeline";
import { linInt } from "../../utils/Functions";
import {
  EMPTY_COLOR,
  MARKER_COLOR,
  FILLED_COLOR,
  CELL_MID_LIGHT,
  CELL_CENTER_LIGHT,
  CELL_BASE_COLOR_BLEND,
  LIGHT_AMPLITUDE,
} from "../../Theme";
// UpdateCell refers to the graphical state of the cell, which is
// a level above the CoreState of the game. The graphical state of the
// cell doesn't have any impact on the CoreState, but is effectively its
// own control system for each cell.

// This cell's t parameter always decays back down to 0, and is changed in the
// other direction only by GameState in order to light up blocks and have
// them fade. DrawCell, UpdateCell, and the correct props are the main parts
// that make these kinds of graphics, and much more, possible.
const updateEmptyCell = (cell) => {
  if (cell.props.marked) {
    cell.props.meter *= 0.9;
  } else {
    cell.props.meter += (1 - cell.props.meter) * 0.1;
  }
};

const updateCellType1 = (cell) => {
  // Set meter
  cell.props.meter = 1 - 0.5 * Math.sin(cell.props.timer * 0.03)
  cell.props.currentColor = interpolateColor(
    FILLED_COLOR,
    cell.props.baseColor,
    CELL_BASE_COLOR_BLEND, 
    linInt,
  );
  if (cell.props.ttl != -1) {
    cell.props.currentColor = interpolateColor(
      EMPTY_COLOR,
      cell.props.currentColor,
      cell.props.ttl / cell.props.lifetime,
      linInt,
    )
  }
  if (cell.props.currentColor) {
    cell.props.midLightColor = new Color({
      red: cell.props.currentColor.red + CELL_MID_LIGHT,
      green: cell.props.currentColor.green + CELL_MID_LIGHT,
      blue: cell.props.currentColor.blue + CELL_MID_LIGHT,
    })
    cell.props.centerLightColor = new Color({
      red: cell.props.currentColor.red + CELL_CENTER_LIGHT,
      green: cell.props.currentColor.green + CELL_CENTER_LIGHT,
      blue: cell.props.currentColor.blue + CELL_CENTER_LIGHT,
    })
  }
};

// The main function to export
export const updateCell = (cell) => {
  // xOffset and yOffset are constantly decaying towards 0
  cell.props.xOffset *= 0.8;
  cell.props.yOffset *= 0.8;
  // 
  cell.props.timer += 1;
  
  if (cell.type == 0) {
    updateEmptyCell(cell);
  } else if (cell.type == 1) {
    updateCellType1(cell);
  }
};
