import { STAGE_WIDTH, WINDOW_SIZE } from "../../Constants";
import { drawRect, outlineRect } from "../Pipeline";
import { STAGE_HEIGHT, STAGE_X0, STAGE_Y0, drawBackground, STAGE_CELL_SIZE, PALETTE_X0, PALETTE_Y0, PALETTE_WIDTH, PALETTE_HEIGHT } from "../Layout";
import { drawPiece, updatePiece } from "../objects/Piece";


export function renderPalette(canvas, palette) {
  drawBackground(canvas, PALETTE_X0, PALETTE_Y0, PALETTE_WIDTH, PALETTE_HEIGHT);
  for (var i = 0; i < palette.nextPieces.length; i++) {
    var [x_, y_] = [2.5, 2.5 + 6 * i];
    drawPiece(
      canvas,
      palette.nextPieces[i],
      PALETTE_X0 + x_ * STAGE_CELL_SIZE,
      PALETTE_Y0 + y_ * STAGE_CELL_SIZE,
      STAGE_CELL_SIZE,
      STAGE_CELL_SIZE,
    );

  }
  if (palette.heldPiece) {
    var [x_, y_] = [2.25, 26.5];
    drawPiece(
      canvas,
      palette.heldPiece,
      PALETTE_X0 + x_ * STAGE_CELL_SIZE,
      PALETTE_Y0 + y_ * STAGE_CELL_SIZE,
      STAGE_CELL_SIZE,
      STAGE_CELL_SIZE
    );
  }
}

export function updatePalette(palette) {
  for (const piece of palette.nextPieces) {
    updatePiece(palette);
  }
  if (palette.heldPiece) {
    updatePiece(palette.heldPiece);
  }
}
