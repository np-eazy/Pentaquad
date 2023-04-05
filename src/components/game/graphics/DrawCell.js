import { Color, interpolateColor } from "./Colors";
import { drawRect, outlineRect } from "./Shapes";
import { linInt } from "./utils/Functions";

// Const colors are defined to be interpolated later
const EMPTY_COLOR = new Color({
  red: 25,
  green: 25,
  blue: 30,
});
const MARKER_COLOR = new Color({
  red: 50,
  green: 50,
  blue: 58,
});
const FILLED_COLOR_HEX = new Color({
  red: 125,
  green: 125,
  blue: 145,
}).getHex();

// cell.type == 0
const drawEmptyCell = (canvas, cell, x0, y0, width, height) => {
  // TODO: Check that we aren't piling up garbage, or make sure that isn't a problem
  var color = interpolateColor(
    EMPTY_COLOR,
    MARKER_COLOR,
    cell.props.t,
    linInt
  ).getHex();
  drawRect(canvas, x0, y0, width, height, color);
};

// cell.type == 1
const drawCellType1 = (canvas, cell, x0, y0, width, height) => {
  drawRect(canvas, x0, y0, width, height, FILLED_COLOR_HEX);
};

// The main function to call in order to render a cell within rectangular bounds. The Cell
// object and its coordinates are separate entities.
export const drawCell = (canvas, cell, x0, y0, width, height) => {
  if (cell.type == 0) {
    drawEmptyCell(canvas, cell, x0, y0, width, height);
  } else if (cell.type == 1) {
    drawCellType1(canvas, cell, x0, y0, width, height);
  }
};
