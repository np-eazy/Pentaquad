import { EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR } from "../theme/ColorScheme";
import { drawRectOffset, outlineRectOffset } from "../CanvasPipeline";
import {
  drawBackground,
  QUEUE_CELL_DIMENSIONS,
  PALETTE_X0,
  PALETTE_Y0,
  PALETTE_WIDTH,
  PALETTE_HEIGHT,
} from "../theme/Layout";
import { drawPiece, updatePiece } from "../objects/Piece";

// The palette is the area where the user's held pieces are displayed, and where they
// can see which key to press to get a certain held piece, rendered on the right of the board.
// See comment in ./Board.js for more about convention with objects and sections

const CELL_OFFSET = 3;
const Y_CELL_INCREMENT = 6;

const [TEXT_X0, TEXT_Y0] = [25, 35];
const TEXT_SIZE = 16;

export function renderPalette(canvas, pieceProvider) {
  drawBackground(canvas, PALETTE_X0, PALETTE_Y0, PALETTE_WIDTH, PALETTE_HEIGHT);
  
  for (var i = 0; i < pieceProvider.palette.length; i++) {
    var [x_, y_] = [CELL_OFFSET, CELL_OFFSET + Y_CELL_INCREMENT * i];
    var [x0, y0] = [PALETTE_X0, PALETTE_Y0 + Y_CELL_INCREMENT * QUEUE_CELL_DIMENSIONS * i]
    drawRectOffset(canvas,         
      x0,
      y0,
      PALETTE_WIDTH,
      (Y_CELL_INCREMENT + 1) * QUEUE_CELL_DIMENSIONS,
      MARKER_COLOR.getHex(),
      12,
    );
    outlineRectOffset(canvas,         
      x0,
      y0,
      PALETTE_WIDTH,
      (Y_CELL_INCREMENT + 1) * QUEUE_CELL_DIMENSIONS,
      pieceProvider.palette[i] ? FILLED_COLOR.getHex() : EMPTY_COLOR.getHex(),
      16,
    );
    canvas.font = TEXT_SIZE.toString() + "px Arial";
    canvas.fillStyle = FILLED_COLOR.getHex();
    canvas.fillText((i + 1).toString(),
      x0 + TEXT_X0,
      y0 + TEXT_Y0,
    );

    
    if (pieceProvider.palette[i] != null) {
      drawPiece(
        canvas,
        pieceProvider.palette[i],
        PALETTE_X0 + x_ * QUEUE_CELL_DIMENSIONS,
        PALETTE_Y0 + y_ * QUEUE_CELL_DIMENSIONS,
        QUEUE_CELL_DIMENSIONS,
        QUEUE_CELL_DIMENSIONS
      );
    }
  }
}

export function updatePalette(pieceProvider) {
  for (const piece of pieceProvider.palette) {
    updatePiece(piece);
  }
}
