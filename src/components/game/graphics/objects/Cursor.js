import { DEBUG, MESSAGE_SIZE, MESSAGE_OFFSET, debugCell } from "../../Debug";
import { inBounds } from "../../coreState/utils/Functions";
import { outlineRect } from "../Pipeline";
import { FILLED_COLOR } from "../Theme";

export const drawCursor = (canvas, board, controller, windowSize, xCellSize, yCellSize) => {
    var [x, y] = controller.gridCursor(
      windowSize,
      board.length,
    );
    outlineRect(
      canvas,
      x * xCellSize,
      y * yCellSize,
      xCellSize,
      yCellSize,
      FILLED_COLOR.getHex()
    );
    
}

export const updateCursor = (cursor) => {
  
}