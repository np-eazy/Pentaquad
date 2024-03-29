import { drawPiece, updatePiece } from "../objects/Piece";
import {
  QUEUE_WIDTH,
  QUEUE_HEIGHT,
  QUEUE_X0,
  QUEUE_Y0,
  QUEUE_CELL_DIMENSIONS,
  drawBackground,
} from "../theme/Layout";
import { drawRectOffset, outlineRectOffset } from "../CanvasPipeline";
import { EMPTY_COLOR, MARKER_COLOR } from "../theme/ColorScheme";
import { QUEUE_DAMP_RATE } from "../theme/Dynamics";

const CELL_OFFSET = 3;
const Y_CELL_INCREMENT = 6;
const BOX_OFFSET = 12;
const BOX_BORDER_OFFSET = 16;

// The provider shows all the incoming pieces that the user is about to receive,
// rendered on the left of the board.
// See comment in ./Board.js for more about convention with objects and sections
export function renderQueue(canvas, pieceProvider) {
  drawBackground(canvas, QUEUE_X0, QUEUE_Y0, QUEUE_WIDTH, QUEUE_HEIGHT);
  for (var i = 0; i < pieceProvider.queue.length; i++) {
    var [x_, y_] = [CELL_OFFSET, CELL_OFFSET + Y_CELL_INCREMENT * i];
    var [x0, y0] = [QUEUE_X0, pieceProvider.yOffset + QUEUE_Y0 + Y_CELL_INCREMENT * QUEUE_CELL_DIMENSIONS * i];
    drawRectOffset(canvas,         
      x0,
      y0,
      QUEUE_WIDTH,
      (Y_CELL_INCREMENT + 1) * QUEUE_CELL_DIMENSIONS,
      MARKER_COLOR.getHex(),
      BOX_OFFSET,
    );
    outlineRectOffset(canvas,         
      x0,
      y0,
      QUEUE_WIDTH,
      (Y_CELL_INCREMENT + 1) * QUEUE_CELL_DIMENSIONS,
      EMPTY_COLOR.getHex(),
      BOX_BORDER_OFFSET,
    );

    drawPiece(
      canvas,
      pieceProvider.queue[i],
      QUEUE_X0 + x_ * QUEUE_CELL_DIMENSIONS,
      pieceProvider.yOffset + QUEUE_Y0 + y_ * QUEUE_CELL_DIMENSIONS,
      QUEUE_CELL_DIMENSIONS,
      QUEUE_CELL_DIMENSIONS
    );
  }
}

export function updateQueue(pieceProvider) {
  for (const piece of pieceProvider.queue) {
    updatePiece(piece);
  }
  pieceProvider.yOffset *= QUEUE_DAMP_RATE;
}
