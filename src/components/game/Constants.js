// Real time/space parameters
export const WINDOW_SIZE = 800;
export const REFRESH_MS = 10;

// Board parameters
export const BOARD_SIZE = 20;
// The distance from the boundary that each piece
export const SPAWN_OFFSET = 2;
// Extend edge boundaries a bit further to ensure pieces finish falling.
export const BOUNDARY_MARGIN = 4;
// Distance from the borders tp spawn in targets
export const TARGET_MARGIN = 4;
// The number of ticks contact must take place in order to place a piece.
export const COLLISION_TIME_LIMIT = 100;
// The maximum number of movements to adjust a rotation
export const MAX_ROTATION_ADJUSTMENT = 2;
// Ticks between each block advancement
export const ADVANCE_TIME = 30; // Wait this many ticks between each idleMove() call on coreState

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
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
  [1, 2],
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
  I_PIECE,
  L1_PIECE,
  S1_PIECE,
  T1_PIECE,
  L2_PIECE,
  S2_PIECE,
  T2_PIECE,
  X_PIECE,
  F_PIECE,
  U_PIECE,
  B_PIECE,
  W_PIECE,
];

// Stage variables
export const PIECE_STAGE_MAX_LENGTH = 4;
export const TARGET_STAGE_MAX_LENGTH = 4;
export const TARGET_GRACE_PERIOD = 8;
export const TARGET_SPAWN_TIMER = 8;
export const TARGET_GROWTH_TIMER = 8;
