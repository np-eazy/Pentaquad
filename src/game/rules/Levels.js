export const MAX_LEVELS = 10;
// export const LEVEL_SCORE_THRESHOLDS = [
//   200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 35000, 50000,
// ];


export const LEVEL_SCORE_THRESHOLDS = [
  [200, 400, 600, 800, 1000, 1500, 3000, 6000, 10000, 50000,],
  [200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 35000, 50000,],
  [200, 400, 600, 800, 1000, 1500, 3000, 6000, 10000, 50000,],
];

// Board parameters
export const FALLING_COUNTDOWN_LVL = [
  [60, 56, 44, 36, 30, 40, 36, 32, 28, 24],
  [30, 26, 22, 18, 15, 40, 36, 32, 28, 24],
  [30, 26, 22, 18, 15, 25, 20, 15, 12, 10],
]; // Wait this many ticks between each fallingUpdate() call on coreState

// Piece spawning
export const POWERUP_RARITY_LVL = [
  [5, 5, 5, 4, 4, 4, 3, 3, 3, 3],
  [7, 7, 7, 6, 6, 6, 5, 5, 5, 5],
  [9, 9, 9, 8, 8, 8, 7, 7, 7, 7],
];

// Target spawning
export const TARGET_SPAWN_RADIUS_LVL = [
  [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

export const TARGET_GROWTH_TIMER_LVL = [
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [8, 8, 8, 8, 7, 7, 7, 6, 6, 5],
  [6, 6, 5, 5, 5, 8, 8, 7, 7, 7],
];

export const NORMAL_CELL_LIFETIME_LVL = [
  [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [8, 8, 7, 7, 6, 10, 10, 9, 9, 8],
  [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
];
