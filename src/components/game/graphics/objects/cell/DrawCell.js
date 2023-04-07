import { interpolateColor } from "../../utils/Colors";
import { drawRect, outlineRect } from "../../Pipeline";
import { linInt } from "../../utils/Functions";
import {
  EMPTY_COLOR,
  MARKER_COLOR,
  LIGHT_AMPLITUDE,
} from "../../Theme";


// cell.type == 0
const drawEmptyCell = (canvas, cell, x0, y0, width, height) => {
  // TODO: Check that we aren't piling up garbage, or make sure that isn't a problem
  drawRect(canvas, x0, y0, width, height, EMPTY_COLOR.getHex());

  var d = cell.props.meter * width / 2;
  drawRect(canvas, x0 + d, y0 + d, width - 2 * d, height - 2 * d, MARKER_COLOR.getHex());
};

// cell.type == 1
const drawCellType1 = (canvas, cell, x0, y0, width, height) => {
  // TODO: calculate this at initialization, use wrapper OOP
  if (cell.props.currentColor) {
    var borderColor = interpolateColor(
      MARKER_COLOR,
      cell.props.currentColor,
      1 - cell.props.meter, 
      linInt,
    );
    var d = cell.props.meter * LIGHT_AMPLITUDE + LIGHT_AMPLITUDE;
  
    drawRect(canvas, x0, y0, width, height, cell.props.currentColor.getHex());
    drawRect(canvas, x0 + d, y0 + d, width - 2 * d, height - 2 * d, cell.props.midLightColor.getHex());
    drawRect(canvas, x0 + 2 * d, y0 + 2 * d, width - 4 * d, height - 4 * d, cell.props.centerLightColor.getHex());
    outlineRect(canvas, x0 + 2, y0 + 2, width - 4, height - 4, borderColor.getHex());
  }
};

const drawCellType2 = (canvas, cell, x0, y0, width, height) => {
  if (cell.props.currentColor) {
    var borderColor = interpolateColor(
      MARKER_COLOR,
      cell.props.currentColor,
      1 - cell.props.meter, 
      linInt,
    );
    var d = cell.props.meter * LIGHT_AMPLITUDE * 0.5 + LIGHT_AMPLITUDE;
    var g = 0.5 + 0.2 * Math.sin(cell.props.timer * 0.1)
  
    drawRect(canvas, x0, y0, width, height, interpolateColor(cell.props.currentColor, EMPTY_COLOR, g, linInt).getHex());
    drawRect(canvas, x0 + d, y0 + d, width - 2 * d, height - 2 * d, interpolateColor(cell.props.midLightColor, EMPTY_COLOR, g, linInt).getHex());
    drawRect(canvas, x0 + 2 * d, y0 + 2 * d, width - 4 * d, height - 4 * d, interpolateColor(cell.props.centerLightColor, EMPTY_COLOR, g, linInt).getHex());
    outlineRect(canvas, x0 + 2, y0 + 2, width - 4, height - 4, borderColor.getHex());
  }
}

// The main function to call in order to render a cell within rectangular bounds. The Cell
// object and its coordinates are separate entities.
export const drawCell = (canvas, cell, x0, y0, width, height) => {
  var x = cell.props.xOffset ? x0 + cell.props.xOffset * width : x0;
  var y = cell.props.yOffset ? y0 + cell.props.yOffset * height : y0;
  if (cell.type == 0) {
    drawEmptyCell(canvas, cell, x, y, width, height);
  } else if (cell.type == 1) {
    drawCellType1(canvas, cell, x, y, width, height);
  } else if (cell.type == 2) {
    drawCellType2(canvas, cell, x, y, width, height);
  }
};
