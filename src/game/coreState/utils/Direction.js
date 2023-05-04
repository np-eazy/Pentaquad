import { randint } from "./Functions";

// A class to manage directionality and rotation in this game. Directions have
// angles which represent int values for each of 4 grid directions, and associated
// with dx and dy increments.
export class Direction {
  constructor(angle) {
    this.angle = angle;
    this.updateDiff();
  }

  // Update the dx and dy after any angle is changed.
  updateDiff() {
    var diff = this.getDiff();
    this.dx = diff[0];
    this.dy = diff[1];
  }

  // Return x and y increments that correspond with the direction
  getDiff() {
    if (this.angle % 4 == Angle.RIGHT) {
      return [1, 0];
    } else if (this.angle % 4 == Angle.UP) {
      return [0, -1];
    } else if (this.angle % 4 == Angle.LEFT) {
      return [-1, 0];
    } else if (this.angle % 4 == Angle.DOWN) {
      return [0, 1];
    }
  }

  // Turn left n times
  turnLeft(n) {
    this.angle = (this.angle + n) % 4;
    this.updateDiff();
  }

  // Turn right n times
  turnRight(n) {
    this.angle = (this.angle + 3 * n) % 4;
    this.updateDiff();
  }

  // Positive n leads to left turn, and negative with right.
  // This is meant to emulate 2D space angle conventions
  turn(n) {
    if (n > 0) {
      this.turnLeft(n);
    } else {
      this.turnRight(-n);
    }
  }

  equals(other) {
    return this.angle == other.angle;
  }

  opposite() {
    var newAngle = (this.angle + 2) % 4;
    return Dxn[newAngle];
  }

  isHorizontal() {
    return this.angle % 2 == 0;
  }

  isVertical() {
    return this.angle % 2 == 1;
  }
}

// Direction angle conventions for coreState's grid
export const Angle = {
  RIGHT: 0,
  UP: 1,
  LEFT: 2,
  DOWN: 3,
};

export const Dxn = [
  new Direction(Angle.RIGHT),
  new Direction(Angle.UP),
  new Direction(Angle.LEFT),
  new Direction(Angle.DOWN),
];

export const opposite = (angle) => {
  return (angle + 2) % 4;
};

export const randomDxn = () => {
  return Dxn[randint(0, 4)];
};
