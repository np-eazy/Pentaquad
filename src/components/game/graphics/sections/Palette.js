import {
  drawBackground,
  QUEUE_CELL_SIZE,
  PALETTE_X0,
  PALETTE_Y0,
  PALETTE_WIDTH,
  PALETTE_HEIGHT,
} from "../Layout";
import { drawPiece, updatePiece } from "../objects/Piece";

// The palette is the area where the user's held pieces are displayed, and where they
// can see which key to press to get a certain held piece, rendered on the right of the board.
// See comment in ./Board.js for more about convention with objects and sections

const CELL_OFFSET = 2.5;
const Y_CELL_INCREMENT = 6;

export function renderPalette(canvas, pieceProvider) {
  drawBackground(canvas, PALETTE_X0, PALETTE_Y0, PALETTE_WIDTH, PALETTE_HEIGHT);
  for (var i = 0; i < pieceProvider.palette.length; i++) {
    var [x_, y_] = [CELL_OFFSET, CELL_OFFSET + Y_CELL_INCREMENT * i];
    if (pieceProvider.palette[i] != null) {
      drawPiece(
        canvas,
        pieceProvider.palette[i],
        PALETTE_X0 + x_ * QUEUE_CELL_SIZE,
        PALETTE_Y0 + y_ * QUEUE_CELL_SIZE,
        QUEUE_CELL_SIZE,
        QUEUE_CELL_SIZE
      );
    }
  }
}

export function updatePalette(pieceProvider) {
  for (const piece of pieceProvider.palette) {
    updatePiece(piece);
  }
}
