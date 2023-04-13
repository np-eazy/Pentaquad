import { STAGE_WIDTH, WINDOW_SIZE } from "../../../Constants";
import { drawRect, outlineRect } from "../../Pipeline";
import { updatePiece } from "../piece/UpdatePiece";

const STAGE_CELL_SIZE = WINDOW_SIZE / 32;

export function renderStage(canvas, stage) {
    drawRect(canvas, WINDOW_SIZE, 0, STAGE_WIDTH, WINDOW_SIZE, "#000000");
    // Draw outlines of future pieces
    for (var i = 0; i < stage.nextPieces.length; i++) {
      var preset = stage.nextPieces[i].preset;
      var [x_, y_] = [2.25, 2.5 + 6 * i];
      var cell = stage.nextPieces[i].mainCell;
      for (const [x, y] of preset) {
        cell.render(
          canvas, 
          WINDOW_SIZE + (x + x_) * STAGE_CELL_SIZE,
          (y + y_) * STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
          STAGE_CELL_SIZE,
        )
      }
    }
    if (stage.heldPiece) {
      var preset = stage.heldPiece.preset;
      var [x_, y_] = [2.25, 26.5];
      var cell = stage.heldPiece.mainCell
      for (const [x, y] of preset) {
        cell.render(
          canvas,
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