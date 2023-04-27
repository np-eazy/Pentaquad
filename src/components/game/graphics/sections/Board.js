import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOARD_X0,
  BOARD_Y0,
  drawBackground,
} from "../Layout";
import { drawCursor } from "../objects/Cursor";
import { drawPiece, updatePiece } from "../objects/Piece";

// For convention, a Section is effectively a rectangle with its own reference point
// for coordinates. It provides a way to organize render-update calls to BaseObjects
// and Objects, of which the latter further recurses to BaseObjects. Sections like the
// Board manage objects like Cursors and Pieces, and Pieces manage baseObject Cells.

// The Board here is the "meat" of all the rendering, and anything that is rendered on top
// like the game's current piece, target, queued targets, and cursors are all rendered
// and updated as a result of renderBoard.
export const renderBoard = (
  canvas,
  board,
  xCellSize,
  yCellSize,
  { piece, targets, targetProvider, controller }
) => {
  // Draw grid cells
  drawBackground(canvas, BOARD_X0, BOARD_Y0, BOARD_WIDTH, BOARD_HEIGHT);
  var [xSize, ySize] = [board[0].length, board.length];
  for (var y = 0; y < ySize; y++) {
    for (var x = 0; x < xSize; x++) {
      board[y][x].render(
        canvas,
        x * xCellSize + BOARD_X0,
        y * yCellSize + BOARD_Y0,
        xCellSize,
        yCellSize
      );
    }
  }
  drawPiece(canvas, piece, BOARD_X0, BOARD_Y0, xCellSize, yCellSize);
  targets.forEach((target) => target.render(canvas, xCellSize, yCellSize));
  targetProvider.nextTargets.forEach((target) =>
    target.render(canvas, xCellSize, yCellSize)
  );
  drawCursor(canvas, board, controller, BOARD_HEIGHT, xCellSize, yCellSize);
};

export const updateBoard = (board, { piece, targets, targetProvider }) => {
  // Update grid cells
  var [xSize, ySize] = [board[0].length, board.length];
  for (var y = 0; y < ySize; y++) {
    for (var x = 0; x < xSize; x++) {
      board[y][x].idleUpdate();
    }
  }
  updatePiece(piece);
  targets.forEach((target) => target.idleUpdate());
  targetProvider.nextTargets.forEach((target) => target.idleUpdate());
};
