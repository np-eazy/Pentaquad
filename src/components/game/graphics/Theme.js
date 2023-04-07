import { Color } from "./utils/Colors";

// Const colors are defined to be interpolated later
export const EMPTY_COLOR = new Color({
    red: 25,
    green: 25,
    blue: 30,
  });
export const MARKER_COLOR = new Color({
    red: 35,
    green: 35,
    blue: 40,
});
export const FILLED_COLOR = new Color({
    red: 125,
    green: 125,
    blue: 145,
});
export const CELL_BASE_COLOR_BLEND = 0.2;

export const CELL_MID_LIGHT = 30;
export const CELL_CENTER_LIGHT = 45;
export const LIGHT_AMPLITUDE = 3;
