import { WINDOW_SIZE } from "../../Constants";
import { BOARD_HEIGHT, BOARD_WIDTH, BOARD_X0, BOARD_Y0, drawBackground } from "../Layout";
import { drawCursor } from "../objects/cursor/DrawCursor";
import { drawPiece } from "../objects/piece/DrawPiece";
import { updatePiece } from "../objects/piece/UpdatePiece";
import { drawTargets } from "../objects/target/DrawTargets";

export const renderBoard = (canvas, board, xCellSize, yCellSize, {
  piece,
  targets,
  targetStage,
  controller,
}) => {
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
          yCellSize,
        );
      }
    }
  
    drawPiece(canvas, 
      piece,
      BOARD_X0, BOARD_Y0,
      xCellSize, yCellSize);

    drawTargets(canvas, 
      targets, 
      targetStage, 
      xCellSize, yCellSize);

    drawCursor(canvas,
      board,
      controller,
      BOARD_HEIGHT,
      xCellSize, yCellSize);
}

export const updateBoard = (board, piece) => {
    // Update grid cells
    var [xSize, ySize] = [board[0].length, board.length];
    for (var y = 0; y < ySize; y++) {
      for (var x = 0; x < xSize; x++) {
        board[y][x].idleUpdate();
      }
    }
  updatePiece(piece);
}

