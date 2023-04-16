import { drawPiece, updatePiece } from "../objects/Piece";
import { STAGE_WIDTH } from "../../Constants";
import {
  STAGE_HEIGHT,
  STAGE_X0,
  STAGE_Y0,
  STAGE_CELL_SIZE,
  drawBackground,
} from "../Layout";

const CELL_OFFSET = 2.5;
const Y_CELL_INCREMENT = 6;

// The stage shows all the incoming pieces that the user is about to receive,
// rendered on the left of the board.
// See comment in ./Board.js for more about convention with objects and sections
export function renderStage(canvas, stage) {
  drawBackground(canvas, STAGE_X0, STAGE_Y0, STAGE_WIDTH, STAGE_HEIGHT);
  for (var i = 0; i < stage.nextPieces.length; i++) {
    var [x_, y_] = [CELL_OFFSET, CELL_OFFSET + Y_CELL_INCREMENT * i];
    drawPiece(
      canvas,
      stage.nextPieces[i],
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
