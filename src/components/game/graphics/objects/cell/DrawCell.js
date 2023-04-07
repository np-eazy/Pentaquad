import { Color, interpolateColor } from "../../utils/Colors";
import { drawRect, outlineRect } from "../../Pipeline";
import { linInt } from "../../utils/Functions";

// Const colors are defined to be interpolated later
const EMPTY_COLOR = new Color({
  red: 25,
  green: 25,
  blue: 30,
});
const MARKER_COLOR = new Color({
  red: 35,
  green: 35,
  blue: 40,
});
const MARKER_COLOR_HEX = MARKER_COLOR.getHex();
const FILLED_COLOR = new Color({
  red: 125,
  green: 125,
  blue: 145,
})
const FILLED_COLOR_HEX = FILLED_COLOR.getHex();

// cell.type == 0
const drawEmptyCell = (canvas, cell, x0, y0, width, height) => {
  // TODO: Check that we aren't piling up garbage, or make sure that isn't a problem
  drawRect(canvas, x0, y0, width, height, EMPTY_COLOR.getHex());

  var d = cell.props.meter * width / 2;
  drawRect(canvas, x0 + d, y0 + d, width - 2 * d, height - 2 * d, MARKER_COLOR.getHex());
};

// cell.type == 1
const BRIGHTNESS = 30;
const CENTER_BRIGHTNESS = new Color({
  red: BRIGHTNESS,
  green: BRIGHTNESS,
  blue: BRIGHTNESS,
});
const LIGHT_FACTOR = 1.6;
const BASE_BLEND = 0.2;


const drawCellType1 = (canvas, cell, x0, y0, width, height) => {
  // TODO: calculate this at initialization, use wrapper OOP
  var color = cell.props.baseColor ? interpolateColor(
    FILLED_COLOR,
    cell.props.baseColor,
    BASE_BLEND, 
    linInt,
  ) : FILLED_COLOR;
  if (cell.props.ttl != -1) {
    color = interpolateColor(
      EMPTY_COLOR,
      color,
      cell.props.ttl / cell.props.lifetime,
      linInt,
    )
  }
  drawRect(canvas, x0, y0, width, height, color.getHex());

  // TODO: inefficient OOP
  // TODO: Color.add() function
  var d = cell.props.meter * 3 + 3;
  var midColor = new Color({
    red: color.red + CENTER_BRIGHTNESS.red,
    green: color.green + CENTER_BRIGHTNESS.green,
    blue: color.blue + CENTER_BRIGHTNESS.blue,
  }).getHex()
  drawRect(canvas, x0 + d, y0 + d, width - 2 * d, height - 2 * d, midColor);

  var centerColor = new Color({
    red: color.red + CENTER_BRIGHTNESS.red * LIGHT_FACTOR,
    green: color.green + CENTER_BRIGHTNESS.green * LIGHT_FACTOR,
    blue: color.blue + CENTER_BRIGHTNESS.blue * LIGHT_FACTOR,
  }).getHex()
  drawRect(canvas, x0 + 2 * d, y0 + 2 * d, width - 4 * d, height - 4 * d, centerColor);

  var borderColor = interpolateColor(
    MARKER_COLOR,
    color,
    1 - cell.props.meter, 
    linInt,
  );
  outlineRect(canvas, x0 + 2, y0 + 2, width - 4, height - 4, borderColor.getHex());
};

// The main function to call in order to render a cell within rectangular bounds. The Cell
// object and its coordinates are separate entities.
export const drawCell = (canvas, cell, x0, y0, width, height) => {
  var x = cell.props.xOffset ? x0 + cell.props.xOffset * width : x0;
  var y = cell.props.yOffset ? y0 + cell.props.yOffset * height : y0;
  if (cell.type == 0) {
    drawEmptyCell(canvas, cell, x, y, width, height);
  } else if (cell.type == 1) {
    drawCellType1(canvas, cell, x, y, width, height);
  }
};
