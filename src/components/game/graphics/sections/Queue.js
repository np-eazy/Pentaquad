import { drawPiece, updatePiece } from "../objects/Piece";
import { QUEUE_WIDTH } from "../../Constants";
import {
  QUEUE_HEIGHT,
  QUEUE_X0,
  QUEUE_Y0,
  QUEUE_CELL_SIZE as QUEUE_CELL_SIZE,
  drawBackground,
} from "../Layout";

const CELL_OFFSET = 2.5;
const Y_CELL_INCREMENT = 6;

// The stage shows all the incoming pieces that the user is about to receive,
// rendered on the left of the board.
// See comment in ./Board.js for more about convention with objects and sections
export function renderQueue(canvas, pieceStage) {
  drawBackground(canvas, QUEUE_X0, QUEUE_Y0, QUEUE_WIDTH, QUEUE_HEIGHT);
  for (var i = 0; i < pieceStage.queue.length; i++) {
    var [x_, y_] = [CELL_OFFSET, CELL_OFFSET + Y_CELL_INCREMENT * i];
    drawPiece(
      canvas,
      pieceStage.queue[i],
      QUEUE_X0 + x_ * QUEUE_CELL_SIZE,
      QUEUE_Y0 + y_ * QUEUE_CELL_SIZE,
      QUEUE_CELL_SIZE,
      QUEUE_CELL_SIZE
    );
  }
}

export function updateQueue(pieceStage) {
  for (const piece of pieceStage.queue) {
    updatePiece(piece);
  }
}
