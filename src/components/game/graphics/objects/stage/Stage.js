import { STAGE_WIDTH, WINDOW_SIZE } from "../../../Constants";
import { drawCell } from "../cell/DrawCell";
import { drawRect, outlineRect } from "../../Pipeline";
import { updatePiece } from "../piece/UpdatePiece";

const STAGE_CELL_SIZE = WINDOW_SIZE / 32;

export function renderStage(canvas, stage) {
    drawRect(canvas, WINDOW_SIZE, 0, STAGE_WIDTH, WINDOW_SIZE, "#000000");
    // Draw outlines of future pieces
    for (var i = 0; i < stage.nextPieces.length; i++) {
      var preset = stage.nextPieces[i].preset;
      var [x_, y_] = [2.25, 2.5 + 6 * i];
      for (const [x, y] of preset) {
        drawCell(
          canvas,
          stage.nextPieces[i].mainCell,
          WINDOW_SIZE + (x + x_) * STAGE_CELL_SIZE,
          (y + y_) * STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
        );
      }
    }
    if (stage.heldPiece) {
      var preset = stage.heldPiece.preset;
      var [x_, y_] = [2.25, 26.5];
      for (const [x, y] of preset) {
        drawCell(
          canvas,
          stage.heldPiece.mainCell,
          WINDOW_SIZE + (x + x_) * STAGE_CELL_SIZE,
          (y + y_) * STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
        );
      }
    }
  }

export function updateStage(stage) {
  for (const piece of stage.nextPieces) {
    updatePiece(piece);
  }
  if (stage.heldPiece) {
    updatePiece(stage.heldPiece);
  }
}