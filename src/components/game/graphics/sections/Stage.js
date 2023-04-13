import { STAGE_WIDTH, WINDOW_SIZE } from "../../Constants";
import { drawRect, outlineRect } from "../Pipeline";
import { STAGE_HEIGHT, STAGE_X0, STAGE_Y0, drawBackground, STAGE_CELL_SIZE } from "../Layout";
import { drawPiece, updatePiece } from "../objects/Piece";


export function renderStage(canvas, stage) {
  drawBackground(canvas, STAGE_X0, STAGE_Y0, STAGE_WIDTH, STAGE_HEIGHT);
  for (var i = 0; i < stage.nextPieces.length; i++) {
    var [x_, y_] = [2.5, 2.5 + 6 * i];
    drawPiece(
      canvas,
      stage.nextPieces[i],
      STAGE_X0 + x_ * STAGE_CELL_SIZE,
      STAGE_Y0 + y_ * STAGE_CELL_SIZE,
      STAGE_CELL_SIZE,
      STAGE_CELL_SIZE,
    );

  }
  if (stage.heldPiece) {
    var [x_, y_] = [2.25, 26.5];
    drawPiece(
      canvas,
      stage.heldPiece,
      STAGE_X0 + x_ * STAGE_CELL_SIZE,
      STAGE_Y0 + y_ * STAGE_CELL_SIZE,
      STAGE_CELL_SIZE,
      STAGE_CELL_SIZE
    );
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
