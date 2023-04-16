import { drawBackground, STAGE_CELL_SIZE, PALETTE_X0, PALETTE_Y0, PALETTE_WIDTH, PALETTE_HEIGHT } from "../Layout";
import { drawPiece, updatePiece } from "../objects/Piece";

// The palette is the area where the user's held pieces are displayed, and where they
// can see which key to press to get a certain held piece, rendered on the right of the board.
// See comment in ./Board.js for more about convention with objects and sections

// TODO: implement the Palette class similar to PieceStage and then rewrite this
// one to iterate through Palette pieces instead of PieceStage pieces.
export function renderPalette(canvas, pieceStage) {
  drawBackground(canvas, PALETTE_X0, PALETTE_Y0, PALETTE_WIDTH, PALETTE_HEIGHT);
  for (var i = 0; i < pieceStage.palette.length; i++) {
    var [x_, y_] = [2.5, 2.5 + 6 * i];
    if (pieceStage.palette[i] != null) {
      drawPiece(
        canvas,
        pieceStage.palette[i],
        PALETTE_X0 + x_ * STAGE_CELL_SIZE,
        PALETTE_Y0 + y_ * STAGE_CELL_SIZE,
        STAGE_CELL_SIZE,
        STAGE_CELL_SIZE,
      );
    }
  }
}

export function updatePalette(pieceStage) {
  for (const piece of pieceStage.palette) {
    updatePiece(piece);
  }
}
