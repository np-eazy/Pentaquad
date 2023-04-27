import { Color } from "../graphics/utils/Colors";
import { BOARD_WIDTH } from "../graphics/Layout";
import { QUEUE_WIDTH } from "../graphics/Layout";

// Real time/space parameters
export const WINDOW_DIMENSIONS = BOARD_WIDTH;
export const REFRESH_MS = 10;

// Board parameters
export const BOARD_SIZE = 16;
export const PLACEMENT_COUNTDOWN = 100; // The number of ticks contact must take place in order to place a piece.
export const FALLING_COUNTDOWN = 30; // Wait this many ticks between each fallingUpdate() call on coreState

// Piece spawning
export const QUEUE_MAX_LENGTH = 5;
export const POWERUP_RARITY = 10;
export const PIECE_SPAWN_MARGIN = 2;

// Target spawning
export const TARGET_PROVIDER_MAX_LENGTH = 2;
export const TARGET_GRACE_PERIOD = 0;
export const TARGET_SPAWN_RADIUS = 1;
export const TARGET_SPAWN_TIMER = 4;
export const TARGET_GROWTH_TIMER = 6;
export const TARGET_SPAWN_MARGIN = 4;

export const NORMAL_CELL_LIFETIME = 8;
export const BOMB_RADIUS = 2;
export const ROTATION_ADJUSTMENT_SIZE = 2;

export const CELL_TYPE = {
  EMPTY: 0,
  NORMAL: 1,
  GHOST: 2,
  BOMB: 3,
  DRILL: 4,
  TOWER: 5,
};

// 5-long piece preset
export const I_PIECE = [
  [0, -2],
  [0, -1],
  [0, 0],
  [0, 1],
  [0, 2],
];
// 4-long piece presets
export const L1_PIECE = [
  [0, -2],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, 1],
];
export const S1_PIECE = [
  [0, -2],
  [0, -1],
  [0, 0],
  [1, 0],
  [1, 1],
];
export const T1_PIECE = [
  [0, -2],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, 0],
];
// 3-long piece presets
export const L2_PIECE = [
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];
export const S2_PIECE = [
  [-1, -1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, 1],
];
export const T2_PIECE = [
  [1, 1],
  [0, 1],
  [0, 0],
  [0, -1],
  [-1, 1],
];
export const X_PIECE = [
  [0, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
export const F_PIECE = [
  [0, 0],
  [0, 1],
  [1, 1],
  [0, -1],
  [-1, 0],
];
export const U_PIECE = [
  [1, -1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, 1],
];
export const B_PIECE = [
  [0, -1],
  [0, 0],
  [1, -1],
  [1, 0],
  [1, 1],
];
export const W_PIECE = [
  [-1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
  [1, -1],
];
// A list for easy export
export const PRESETS = [
  L1_PIECE, // normal
  S1_PIECE, // normal
  T1_PIECE, // normal
  F_PIECE, // normal
  B_PIECE, // normal

  L2_PIECE, // diag mirror sym
  W_PIECE, // diag mirror sym
  S2_PIECE, // 180 rot sym

  I_PIECE, // mirror sym
  T2_PIECE, // mirror sym
  U_PIECE, // mirror sym
  X_PIECE, // 90 rot sym
];
