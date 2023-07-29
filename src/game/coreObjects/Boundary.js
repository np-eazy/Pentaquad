import { getPID } from "../coreState/utils/Functions";
import { Angle } from "../coreState/utils/Direction";
import { GLOBAL_SIZE } from "../rules/Constants";
import { drawRect } from "../../graphics/CanvasPipeline";
import { FILLED_COLOR, WHITE } from "../../graphics/theme/ColorScheme";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt } from "../../graphics/utils/Functions";

export const BoundaryFlags = {
  EMPTY: 0,
  SOLID: 1,
};

const DECAY_RATE = 0.8;
const THICKNESS = 6;
const BOUNDARY_COLOR = interpolateColor(
    WHITE,
    FILLED_COLOR,
    0.75,
    linInt,
)

// The Boundary class is tasked with two things: holding positions for boundary collision detection,
// and also rendering active vs inactive boundaries.

export class Boundary {
  constructor(x, y, fallingDxn) {
    this.x = x;
    this.y = y;
    this.fallingDxn = fallingDxn;
    this.flag = BoundaryFlags.EMPTY;
    this.meter = 0;
    this.timer = 0;
  }

  idleUpdate() {
    if (this.flag == BoundaryFlags.SOLID) {
      this.meter = this.meter + (1 - this.meter) * (1 - DECAY_RATE) / 2;
    } else {
      this.meter = this.meter * DECAY_RATE;
    }
    this.timer += 1;
  }

  placementUpdate(gravity) {
    if (this.fallingDxn != gravity.opposite().angle) {
      this.flag = BoundaryFlags.SOLID;
    } else {
      this.flag = BoundaryFlags.EMPTY;
    }
  }

  render(canvas, x0, y0, size) {
    if (this.fallingDxn == Angle.LEFT || this.fallingDxn == Angle.RIGHT) {
      drawRect(
        canvas,
        x0 - THICKNESS  * this.meter/ 2,
        y0 - (size * this.meter) / 2,
        THICKNESS * this.meter,
        size * this.meter,
        BOUNDARY_COLOR.getHex()
      );
    } else {
      drawRect(
        canvas,
        x0 - (size * this.meter) / 2,
        y0 - THICKNESS  * this.meter/ 2,
        size * this.meter,
        THICKNESS * this.meter,
        BOUNDARY_COLOR.getHex()
      );
    }
  }
}

export const initializeBoundarySets = (boundaryMargin, pidSize, inset = 0) => {
  var boundarySets = [];
  var [xSize, ySize] = [GLOBAL_SIZE, GLOBAL_SIZE];
  var pid;
  for (var i = 0; i < 4; i++) {
    boundarySets.push(new Map());
  }
  for (var i = 0; i < GLOBAL_SIZE; i++) {
    pid = getPID(xSize - inset, i, pidSize);
    boundarySets[Angle.RIGHT].set(
      pid,
      new Boundary(xSize - inset, i, Angle.RIGHT)
    );

    pid = getPID(i, inset - 1, pidSize);
    boundarySets[Angle.UP].set(pid, new Boundary(i, inset - 1, Angle.UP));

    pid = getPID(inset - 1, i, pidSize);
    boundarySets[Angle.LEFT].set(pid, new Boundary(inset - 1, i, Angle.LEFT));

    pid = getPID(i, ySize - inset, pidSize);
    boundarySets[Angle.DOWN].set(
      pid,
      new Boundary(i, ySize - inset, Angle.DOWN)
    );
  }
  return boundarySets;
};

export const idleUpdateBoundarySets = (boundarySets) => {
  for (const boundarySet of boundarySets) {
    for (const [pid, boundary] of boundarySet) {
      boundary.idleUpdate();
    }
  }
};

export const placementUpdateBoundarySets = (boundarySets, newGravity) => {
  for (const boundarySet of boundarySets) {
    for (const [pid, boundary] of boundarySet) {
      boundary.placementUpdate(newGravity);
    }
  }
};
