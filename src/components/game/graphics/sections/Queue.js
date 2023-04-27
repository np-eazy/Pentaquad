import { drawPiece, updatePiece } from "../objects/Piece";
import {
  QUEUE_WIDTH,
  QUEUE_HEIGHT,
  QUEUE_X0,
  QUEUE_Y0,
  QUEUE_CELL_DIMENSIONS,
  drawBackground,
} from "../Layout";

const CELL_OFFSET = 2.5;
const Y_CELL_INCREMENT = 6;

// The provider shows all the incoming pieces that the user is about to receive,
// rendered on the left of the board.
// See comment in ./Board.js for more about convention with objects and sections
export function renderQueue(canvas, pieceProvider) {
  drawBackground(canvas, QUEUE_X0, QUEUE_Y0, QUEUE_WIDTH, QUEUE_HEIGHT);
  for (var i = 0; i < pieceProvider.queue.length; i++) {
    var [x_, y_] = [CELL_OFFSET, CELL_OFFSET + Y_CELL_INCREMENT * i];
    drawPiece(
      canvas,
      pieceProvider.queue[i],
      QUEUE_X0 + x_ * QUEUE_CELL_DIMENSIONS,
      QUEUE_Y0 + y_ * QUEUE_CELL_DIMENSIONS,
      QUEUE_CELL_DIMENSIONS,
      QUEUE_CELL_DIMENSIONS
    );
  }
}

export function updateQueue(pieceProvider) {
  for (const piece of pieceProvider.queue) {
    updatePiece(piece);
  }
}
