import { Color } from "../utils/Colors";

// Theme colors for the Game, and also other values used to generate
// color suites from a BaseColor. Anything else that is graphics/theme-related
// and used by many different classes/cases should be defined here.

export const THEME_GRAY_6B = new Color({red: 45, green: 42, blue: 52});
export const THEME_GRAY_4B = new Color({red: 63, green: 57, blue: 68});
export const THEME_GRAY_2B = new Color({red: 78, green: 70, blue: 66});
export const THEME_GRAY_4H = new Color({red: 159, green: 149, blue: 173});
export const THEME_GRAY_6H = new Color({red: 182, green: 173, blue: 196});
export const THEME_GREEN = new Color({red: 84, green: 239, blue: 189});
export const THEME_BLUE = new Color({red: 66, green: 210, blue: 234});
export const THEME_MAGENTA = new Color({red: 234, green: 75, blue: 166});
export const THEME_ORANGE = new Color({red: 239, green: 142, blue: 46});

export const GRID_COLOR = new Color({
  // EmptyCell color
  red: 20,
  green: 20,
  blue: 24,
});
export const EMPTY_COLOR = new Color({
  // EmptyCell color
  red: 25,
  green: 25,
  blue: 30,
});
export const MARKER_COLOR = new Color({
  // EmptyCell color when marked
  red: 35,
  green: 35,
  blue: 42,
});
export const MARKER_COLOR_2 = new Color({
  // EmptyCell color when marked
  red: 45,
  green: 45,
  blue: 52,
});
export const FILLED_COLOR = new Color({
  // All NormalCells have a bit of this
  red: 125,
  green: 125,
  blue: 145,
});
export const WHITE = new Color({
  // All NormalCells have a bit of this
  red: 255,
  green: 255,
  blue: 255,
});
export const BLACK = new Color({
  red: 0,
  green: 0,
  blue: 0,
});

export const BASE_COLORS = [
  // Asymmetric pieces
  THEME_ORANGE,
  THEME_ORANGE,
  THEME_ORANGE,
  THEME_ORANGE,
  THEME_ORANGE,

  THEME_GREEN,
  THEME_GREEN,
  THEME_MAGENTA,

  THEME_BLUE,
  THEME_BLUE,
  THEME_BLUE,
  THEME_MAGENTA,
];

// The amount by which to blend the BaseColor with FILLED_COLOR to
// make the CurrentColor; this allows for more flexibility with BaseColors
// as they are all interpolated towards a common color.
export const CELL_BASE_COLOR_BLEND = 0.7;
// Add this value to all channels of the CurrentColor to generate 2h and 4h
export const CELL_MID_LIGHT = 30;
export const CELL_CENTER_LIGHT = 45;
// Every cell is rendered with a border that is offset from its
// actual dimensions by this much.

// Used to oscillate between the EMPTY_COLOR and CurrentColor to give pulsating/ghost
// effects.


