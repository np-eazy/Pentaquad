export const MAX_LEVELS = 10;
// export const LEVEL_SCORE_THRESHOLDS = [
//   200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 35000, 50000,
// ];


export const LEVEL_SCORE_THRESHOLDS = [
  [200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 35000, 50000,],
  [200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 35000, 50000,],
  [200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 35000, 50000,],
];

// Board parameters
export const FALLING_COUNTDOWN_LVL = [
  [60, 56, 44, 36, 30, 40, 36, 32, 28, 24],
  [30, 26, 22, 18, 15, 40, 36, 32, 28, 24],
  [30, 26, 22, 18, 15, 40, 36, 32, 28, 24],
]; // Wait this many ticks between each fallingUpdate() call on coreState

// Piece spawning
export const POWERUP_RARITY_LVL = [
  [5, 5, 5, 4, 4, 4, 3, 3, 3, 3],
  [7, 7, 7, 6, 6, 6, 5, 5, 5, 5],
  [8, 8, 8, 7, 7, 7, 6, 6, 6, 6],
];

// Target spawning
export const TARGET_SPAWN_RADIUS_LVL = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
];

export const TARGET_GROWTH_TIMER_LVL = [
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [8, 8, 8, 8, 7, 7, 7, 6, 12, 12],
  [5, 5, 5, 5, 5, 10, 10, 10, 10, 10],
];

export const NORMAL_CELL_LIFETIME_LVL = [
  [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
];
