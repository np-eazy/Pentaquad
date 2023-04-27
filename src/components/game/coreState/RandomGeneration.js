import Target from "../coreObjects/target/Target";
import { randint } from "./utils/Functions";
import { TARGET_GROWTH_TIMER } from "../rules/Constants";

// Generate a CellType with a powerup
export function generatePowerupCellType() {
  return randint(2, 6);
}

// Generate a cell with a chance of being a powerup
export function generateCellType() {
  return randint(0, 1) == 0 ? generatePowerupCellType() : 1;
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
    ticksToGrowth: TARGET_GROWTH_TIMER,
  });
}
