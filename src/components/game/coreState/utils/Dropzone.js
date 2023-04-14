import { CELL_TYPE } from "../../Constants";
import { inBounds } from "./Functions";

// A function that finds all the cells under a piece about to be dropped, and calls
// another function on all the cells within. This utility function has several important
// use cases like marking EmptyCells for render, and also for executing drops and
// placements of TowerCells and DrillCells.

// cellFunction takes in x and y rather than the cell because sometimes dropzone is used
// to deliberately replace Cells and the board index reference will be needed for that.
export function dropzone(
  board,
  piece,
  gravity,
  cellFunction,
  passThrough = false
) {
  if (piece && piece.mainCell.type != CELL_TYPE.GHOST) {
    var alreadyCovered = new Set();
    var [dx, dy] = gravity.getDiff();
    for (const [pid, [x_, y_]] of piece.cells) {
      var [x, y] = [x_ + piece.cx, y_ + piece.cy];
      var index = gravity.isHorizontal() ? y : x;

      if (!alreadyCovered.has(index)) {
        alreadyCovered.add(index);
        while (
          inBounds(x, y, board.length) &&
          (passThrough || board[y][x].type == 0)
        ) {
          // Traverse in the falling direction of this piece to mark all empty pieces under it.
          cellFunction(x, y);
          x += dx;
          y += dy;
        }
      }
    }
  }
}
