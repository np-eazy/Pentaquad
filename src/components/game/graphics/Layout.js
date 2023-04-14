import { drawRect, outlineRect } from "./Pipeline";
import { EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR } from "./Theme";

// Layout.js is concerned with the "global" level of rendering, and managing
// local x and y positions for different sections. Also helper functions for
// background boxes. 

export const COLUMN_SIZE = 200;
export const BOARD_SIZE = 800;
export const SCORESHEET_SIZE = 400;

export const STAGE_X0 = 0;
export const STAGE_Y0 = 0;
export const STAGE_WIDTH = COLUMN_SIZE;
export const STAGE_HEIGHT = BOARD_SIZE;
export const STAGE_CELL_SIZE = BOARD_SIZE / 32;

export const BOARD_X0 = STAGE_WIDTH;
export const BOARD_Y0 = 0;
export const BOARD_WIDTH = BOARD_SIZE;
export const BOARD_HEIGHT = BOARD_SIZE;

export const PALETTE_X0 = STAGE_WIDTH + BOARD_SIZE;
export const PALETTE_Y0 = 0;
export const PALETTE_WIDTH = COLUMN_SIZE;
export const PALETTE_HEIGHT = BOARD_SIZE;

export const SCORESHEET_X0 = 0;
export const SCORESHEET_Y0 = BOARD_SIZE;
export const SCORESHEET_WIDTH = COLUMN_SIZE * 2 + BOARD_SIZE;
export const SCORESHEET_HEIGHT = SCORESHEET_SIZE;

export const TOTAL_WIDTH = COLUMN_SIZE * 2 + BOARD_SIZE;
export const TOTAL_HEIGHT = BOARD_SIZE + SCORESHEET_SIZE;

export const OUTER_OFFSET = 2;
export const INNER_OFFSET = 4;

export function drawBackground(canvas, x0, y0, width, height) {
  drawRect(canvas, x0, y0, width, height, EMPTY_COLOR.getHex());
  outlineRect(
    canvas,
    x0 + OUTER_OFFSET,
    y0 + OUTER_OFFSET,
    width - OUTER_OFFSET * 2,
    height - OUTER_OFFSET * 2,
    FILLED_COLOR.getHex()
  );
  outlineRect(
    canvas,
    x0 + INNER_OFFSET,
    y0 + INNER_OFFSET,
    width - INNER_OFFSET * 2,
    height - INNER_OFFSET * 2,
    MARKER_COLOR.getHex()
  );
}
