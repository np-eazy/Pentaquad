import { drawRect, outlineRect, outlineRectOffset } from "./CanvasPipeline";
import { EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR } from "../theme/Theme";

// Layout.js is concerned with the "global" level of rendering, and managing
// local x and y positions for different sections. Also helper functions for
// background boxes.

export const COLUMN_WIDTH = 150;
export const BOARD_DIMENSIONS = 600;
export const ROW_SIZE = 300;

export const QUEUE_X0 = 0;
export const QUEUE_Y0 = 0;
export const QUEUE_WIDTH = COLUMN_WIDTH;
export const QUEUE_HEIGHT = BOARD_DIMENSIONS;
export const QUEUE_CELL_DIMENSIONS = BOARD_DIMENSIONS / 32;

export const BOARD_X0 = QUEUE_WIDTH;
export const BOARD_Y0 = 0;
export const BOARD_WIDTH = BOARD_DIMENSIONS;
export const BOARD_HEIGHT = BOARD_DIMENSIONS;

export const PALETTE_X0 = QUEUE_WIDTH + BOARD_DIMENSIONS;
export const PALETTE_Y0 = 0;
export const PALETTE_WIDTH = COLUMN_WIDTH;
export const PALETTE_HEIGHT = BOARD_DIMENSIONS;

export const SCORESHEET_X0 = 0;
export const SCORESHEET_Y0 = BOARD_DIMENSIONS;
export const SCORESHEET_WIDTH = COLUMN_WIDTH * 2 + BOARD_DIMENSIONS;
export const SCORESHEET_HEIGHT = ROW_SIZE;

export const TOTAL_WIDTH = COLUMN_WIDTH * 2 + BOARD_DIMENSIONS;
export const TOTAL_HEIGHT = BOARD_DIMENSIONS;

export const OUTER_OFFSET = 2;
export const INNER_OFFSET = 4;

export function drawBackground(canvas, x0, y0, width, height) {
  drawRect(canvas, x0, y0, width, height, EMPTY_COLOR.getHex());
  outlineRectOffset(
    canvas,
    x0,
    y0,
    width,
    height,
    FILLED_COLOR.getHex(),
    OUTER_OFFSET
  );
  outlineRectOffset(
    canvas,
    x0,
    y0,
    width,
    height,
    MARKER_COLOR.getHex(),
    INNER_OFFSET
  );
}
