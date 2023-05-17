import Target from "../coreObjects/target/Target";
import { randint } from "../coreState/utils/Functions";
import { POWERUP_RARITY_LVL, TARGET_GROWTH_TIMER_LVL } from "./Levels";

// Generate a CellType with a powerup
export function generatePowerupCellType(level = 1) {
  return randint(2, Math.min(3 + level, 6));
}

// Generate a CellType with a powerup
export function generateSuperCellType(level = 1) {
  return randint(4, 6);
}

// Generate a cell with a chance of being a powerup
export function generateCellType(level, coreState) {
  return randint(0, POWERUP_RARITY_LVL[coreState.settingsController.gameDifficulty][level]) == 0 ? generatePowerupCellType(level) : 1;
}

// Generate a target within a random location specified by minBound and maxBound
export function generateRandomTarget(coreState, minBound, maxBound, radius) {
  var [x, y] = [
    randint(minBound, maxBound - radius * 2),
    randint(minBound, maxBound - radius * 2),
  ];
  return new Target({
    coreState: coreState,
    x0: x - radius,
    y0: y - radius,
    x1: x + radius + 1,
    y1: y + radius + 1,
    ticksToGrowth: TARGET_GROWTH_TIMER_LVL[coreState.settingsController.gameDifficulty][coreState.scorekeeper.level],
  });
}
