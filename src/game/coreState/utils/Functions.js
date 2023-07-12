// Utility functions specifically for dealing with discrete ints and indices on the board for CoreState.
// Not to be confused with utility functions in graphics

import { BOARD_MARGIN, BOARD_SIZE, GLOBAL_SIZE, PIECE_SPAWN_MARGIN } from "../../rules/Constants";
import { Angle, Dxn } from "./Direction";

// Generate a random integer from a up to but not including b
export function randint(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

// Generate a unique int of coordinate x, y given a maximum groupSize, in order
// to facilitate creating sets of coordinates for quick piece formation and collision detection.
export function getPID(x, y, groupSize) {
  return x * groupSize + y;
}

// Return whether or not x and y correspond to in-bound indices
export function inBounds(x, y) {
  return x >= 0 && x < GLOBAL_SIZE && y >= 0 && y < GLOBAL_SIZE;
}

export function insideTarget(x, y, target) {
  return target.x0 <= x && x < target.x1 && target.y0 <= y && y < target.y1;
}

// Get a sensible spawn position to put a new Piece or Target based on
// the direction and boardSize. SPAWN_OFFSET keeps pieces from spawning
// on the edges but also allows them to spawn further off screen.
export function getSpawnPosition(dxn) {
  var [x, y] = [0, 0];
  var r = randint(BOARD_MARGIN, GLOBAL_SIZE - BOARD_MARGIN);
  if (dxn.equals(Dxn[Angle.RIGHT])) {
    [x, y] = [PIECE_SPAWN_MARGIN, r];
  } else if (dxn.equals(Dxn[Angle.UP])) {
    [x, y] = [r, GLOBAL_SIZE - PIECE_SPAWN_MARGIN];
  } else if (dxn.equals(Dxn[Angle.LEFT])) {
    [x, y] = [GLOBAL_SIZE - PIECE_SPAWN_MARGIN, r];
  } else if (dxn.equals(Dxn[Angle.DOWN])) {
    [x, y] = [r, PIECE_SPAWN_MARGIN];
  }
  return [x, y];
}

export function sample(size) {
  return [randint(0, GLOBAL_SIZE), randint(0, GLOBAL_SIZE)];
}

export function sampleAround(x, y, size) {
  return [x + randint(-size, size + 1), y + randint(-size, size + 1)];
}
