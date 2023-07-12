import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOARD_X0,
  BOARD_Y0,
  drawBackground,
} from "../theme/Layout";
import { drawCursor } from "../objects/Cursor";
import { drawPiece, updatePiece } from "../objects/Piece";
import { outlineRectOffset } from "../CanvasPipeline";
import { interpolateColor } from "../utils/Colors";
import { EMPTY_COLOR, FILLED_COLOR, WHITE } from "../theme/ColorScheme";
import { linInt, sinusoid } from "../utils/Functions";
import { BOARD_MARGIN, GLOBAL_SIZE } from "../../game/rules/Constants";

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
  cellWidth,
  cellHeight,
  { piece, targets, targetProvider, controller }
) => {
  // Draw grid cells
  drawBackground(canvas, BOARD_X0, BOARD_Y0, BOARD_WIDTH, BOARD_HEIGHT);
  var [xSize, ySize] = [board[0].length, board.length];
  for (var y = BOARD_MARGIN; y < GLOBAL_SIZE - BOARD_MARGIN; y++) {
    for (var x = BOARD_MARGIN; x < GLOBAL_SIZE - BOARD_MARGIN; x++) {
      board[y][x].render(
        canvas,
        (x - BOARD_MARGIN) * cellWidth + BOARD_X0,
        (y - BOARD_MARGIN) * cellHeight + BOARD_Y0,
        cellWidth,
        cellHeight
      );
    }
  }
  drawPiece(canvas, piece, BOARD_X0, BOARD_Y0, cellWidth, cellHeight);
  targets.forEach((target) => target.render(canvas, cellWidth, cellHeight));
  targetProvider.nextTargets.forEach((target) =>
    target.render(canvas, cellWidth, cellHeight)
  );
  drawCursor(canvas, board, controller, BOARD_HEIGHT, cellWidth, cellHeight);

  if (targetProvider.coreState.pieceProvider.isLockAllowed()) {
    outlineRectOffset(canvas, BOARD_X0, BOARD_Y0, BOARD_WIDTH, BOARD_HEIGHT, interpolateColor(
      FILLED_COLOR, WHITE, sinusoid({ level: 0.5, frequency: 5, amplitude: 0.5}, targetProvider.coreState.timer), linInt).getHex(), 4)
  }
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
