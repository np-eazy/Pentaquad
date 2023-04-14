import { outlineRect } from "../Pipeline";
import { BOARD_X0, BOARD_Y0 } from "../Layout";
import { FILLED_COLOR } from "../Theme";

export const drawCursor = (
  canvas,
  board,
  controller,
  windowSize,
  xCellSize,
  yCellSize
) => {
  var [x, y] = controller.gridCursor(windowSize, board.length);
  outlineRect(
    canvas,
    BOARD_X0 + x * xCellSize,
    BOARD_Y0 + y * yCellSize,
    xCellSize,
    yCellSize,
    FILLED_COLOR.getHex()
  );
};

export const updateCursor = (cursor) => {};
