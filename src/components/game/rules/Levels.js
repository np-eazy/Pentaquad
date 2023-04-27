export const MAX_LEVELS = 10;
export const LEVEL_SCORE_THRESHOLDS = [
  200, 500, 1000, 2000, 5000, 10000, 15000, 20000, 35000, 50000,
];

// Board parameters
export const FALLING_COUNTDOWN_LVL = [30, 28, 26, 24, 20, 40, 36, 32, 28, 24]; // Wait this many ticks between each fallingUpdate() call on coreState

// Piece spawning
export const POWERUP_RARITY_LVL = [5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

// Target spawning
export const TARGET_SPAWN_RADIUS_LVL = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
export const TARGET_GROWTH_TIMER_LVL = [6, 6, 5, 5, 5, 8, 8, 7, 7, 7];
export const NORMAL_CELL_LIFETIME_LVL = [8, 8, 7, 7, 6, 10, 10, 9, 9, 8];
