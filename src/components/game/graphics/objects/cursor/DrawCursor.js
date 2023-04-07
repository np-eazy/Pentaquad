import { outlineRect } from "../../Pipeline";

export const drawCursor = (canvas, board, controller, windowSize, xCellSize, yCellSize) => {
    var [x, y] = controller.gridCursor(
        windowSize,
        board.length
      );
      outlineRect(
        canvas,
        x * xCellSize,
        y * yCellSize,
        xCellSize,
        yCellSize,
        "#000000"
      );
}