import { outlineRect } from "../CanvasPipeline";
import { BOARD_X0, BOARD_Y0 } from "../Layout";
import { FILLED_COLOR } from "../../theme/Theme";

export const drawCursor = (
  canvas,
  board,
  controller,
  windowSize,
  cellWidth,
  cellHeight
) => {
  var [x, y] = controller.getCursorCoords(windowSize, board.length);
  outlineRect(
    canvas,
    BOARD_X0 + x * cellWidth,
    BOARD_Y0 + y * cellHeight,
    cellWidth,
    cellHeight,
    FILLED_COLOR.getHex()
  );
};

export const updateCursor = (cursor) => {};
