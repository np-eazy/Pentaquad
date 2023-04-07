import { inBounds } from "./Functions";

export function dropzone(board, piece, gravity, cellFunction) {
    if (piece && piece.mainCell.type != 2) {
      var alreadyCovered = new Set();
      var [dx, dy] = gravity.getDiff();
      for (const cell of piece.cells) {
        var [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy];
        var index = gravity.isHorizontal() ? y : x;
        if (!alreadyCovered.has(index)) {
          alreadyCovered.add(index);
          while (
            inBounds(x, y, board.length) &&
            board[y][x].type == 0
          ) {
            // Traverse in the falling direction of this piece to mark all empty pieces under it.
            cellFunction(board[y][x]);
            x += dx;
            y += dy;
          }
        }
      }
    }
}