import { Color } from "../graphics/utils/Colors";

// Theme colors for the Game, and also other values used to generate
// color suites from a BaseColor. Anything else that is graphics/theme-related
// and used by many different classes/cases should be defined here.
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
  blue: 40,
});
export const FILLED_COLOR = new Color({
  // All NormalCells have a bit of this
  red: 125,
  green: 125,
  blue: 145,
});

export const BASE_COLORS = [
  new Color({ red: 255, green: 0, blue: 0 }),
  new Color({ red: 0, green: 255, blue: 0 }),
  new Color({ red: 0, green: 0, blue: 255 }),
  new Color({ red: 255, green: 255, blue: 0 }),
  new Color({ red: 0, green: 255, blue: 255 }),

  new Color({ red: 255, green: 0, blue: 255 }),
  new Color({ red: 0, green: 0, blue: 0 }),
  new Color({ red: 255, green: 0, blue: 255 }),

  new Color({ red: 65, green: 65, blue: 65 }),
  new Color({ red: 125, green: 125, blue: 125 }),
  new Color({ red: 185, green: 185, blue: 185 }),
  new Color({ red: 255, green: 255, blue: 255 }),
];

// The amount by which to blend the BaseColor with FILLED_COLOR to
// make the CurrentColor; this allows for more flexibility with BaseColors
// as they are all interpolated towards a common color.
export const CELL_BASE_COLOR_BLEND = 0.2;

// Add this value to all channels of the CurrentColor to generate 2h and 4h
export const CELL_MID_LIGHT = 30;
export const CELL_CENTER_LIGHT = 45;

// Used to oscillate between the EMPTY_COLOR and CurrentColor to give pulsating/ghost
// effects.
export const LIGHT_AMPLITUDE = 3;

// Every cell is rendered with a border that is offset from its
// actual dimensions by this much.
export const BORDER_OFFSET = 2;
