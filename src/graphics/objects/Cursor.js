import { outlineRect } from "../CanvasPipeline";
import { BOARD_X0, BOARD_Y0 } from "../theme/Layout";
import { FILLED_COLOR } from "../theme/ColorScheme";
import { BOARD_MARGIN } from "../../game/rules/Constants";

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
    BOARD_X0 + (x - BOARD_MARGIN) * cellWidth,
    BOARD_Y0 + (y - BOARD_MARGIN) * cellHeight,
    cellWidth,
    cellHeight,
    FILLED_COLOR.getHex()
  );
};

export const updateCursor = (cursor) => {};
