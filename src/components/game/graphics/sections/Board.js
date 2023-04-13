import { WINDOW_SIZE } from "../../Constants";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOARD_X0,
  BOARD_Y0,
  drawBackground,
} from "../Layout";
import { drawCursor } from "../objects/Cursor";
import { drawPiece, updatePiece } from "../objects/Piece";
import { drawTargets } from "../objects/Targets";

export const renderBoard = (
  canvas,
  board,
  xCellSize,
  yCellSize,
  { piece, targets, targetStage, controller }
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
  targets.forEach(target => target.render(canvas, xCellSize, yCellSize));
  targetStage.nextTargets.forEach(target => target.render(canvas, xCellSize, yCellSize));
  drawCursor(canvas, board, controller, BOARD_HEIGHT, xCellSize, yCellSize);
};

export const updateBoard = (board, {
  piece,
  targets,
  targetStage,
}) => {
  // Update grid cells
  var [xSize, ySize] = [board[0].length, board.length];
  for (var y = 0; y < ySize; y++) {
    for (var x = 0; x < xSize; x++) {
      board[y][x].idleUpdate();
    }
  }
  updatePiece(piece);
  targets.forEach(target => target.idleUpdate());
  targetStage.nextTargets.forEach(target => target.idleUpdate());
};
