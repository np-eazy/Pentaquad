import { CELL_TYPE } from "../../game/rules/Constants";

export const drawPiece = (canvas, piece, x0, y0, cellWidth, cellHeight) => {
  // Fill in cells from the coreState current piece.
  var [x, y] = [0, 0];
  // TODO: Improve
  if (piece) {
    var mainCell = piece.mainCell;
    if (piece.cells) {
      for (const [pid, [x_, y_]] of piece.cells) {
        [x, y] = [x_ + piece.cx, y_ + piece.cy];
        mainCell.render(
          canvas,
          x0 + x * cellWidth,
          y0 + y * cellHeight,
          cellWidth,
          cellHeight,
          false,
        );
      }
    } else if (piece.preset) {
      for (const [x_, y_] of piece.preset) {
        mainCell.render(
          canvas,
          x0 + x_ * cellWidth,
          y0 + y_ * cellHeight,
          cellWidth,
          cellHeight,
          false
        );
      }
    }

    if (piece.mainCell.type == CELL_TYPE.BOMB) {
      piece.graphicCell.render(
        canvas,
        x0 + piece.cx * cellWidth,
        y0 + piece.cy * cellHeight,
        cellWidth,
        cellHeight,
        piece.activated,
      );
    }
  }
};

export const updatePiece = (piece) => {
  if (piece) {
    var mainCell = piece.mainCell;
    mainCell.idleUpdate();
    if (piece.mainCell.type == CELL_TYPE.BOMB) {
      piece.graphicCell.idleUpdate();
    }
  }
};
