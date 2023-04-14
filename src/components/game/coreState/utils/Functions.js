// Utility functions specifically for dealing with discrete ints and indices on the board for CoreState.
// Not to be confused with utility functions in graphics

import { SPAWN_OFFSET } from "../../Constants";
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
export function inBounds(x, y, boardSize) {
  return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

// Get a sensible spawn position to put a new Piece or Target based on
// the direction and boardSize. SPAWN_OFFSET keeps pieces from spawning
// on the edges but also allows them to spawn further off screen.
export function getSpawnPosition(dxn, boardSize) {
  var [x, y] = [0, 0];
  var r = randint(SPAWN_OFFSET, boardSize - SPAWN_OFFSET);
  if (dxn.equals(Dxn[Angle.RIGHT])) {
    [x, y] = [-SPAWN_OFFSET, r];
  } else if (dxn.equals(Dxn[Angle.UP])) {
    [x, y] = [r, SPAWN_OFFSET + this.boardSize];
  } else if (dxn.equals(Dxn[Angle.LEFT])) {
    [x, y] = [SPAWN_OFFSET + this.boardSize, r];
  } else if (dxn.equals(Dxn[Angle.DOWN])) {
    [x, y] = [r, -SPAWN_OFFSET];
  }
  return [x, y];
}
