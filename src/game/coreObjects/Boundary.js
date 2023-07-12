import { getPID } from "../coreState/utils/Functions";
import { Angle } from "../coreState/utils/Direction";
import { GLOBAL_SIZE } from "../rules/Constants";

export const BoundaryFlags = {
    EMPTY: 0,
    SOLID: 1,
}

const DECAY_RATE = 0.9;

export class Boundary {
    constructor(x, y, fallingDxn) {
        this.x = x;
        this.y = y;
        this.fallingDxn = fallingDxn;
        this.flag = BoundaryFlags.EMPTY;
        this.meter = 0;
    }
    
    idleUpdate() {
        if (this.flag == BoundaryFlags.SOLID) {
            this.meter = this.meter + (1 - this.meter) * DECAY_RATE;
        } else {
            this.meter = this.meter * DECAY_RATE;
        }
    }

    placementUpdate(gravity) {
        if (this.fallingDxn != gravity) {
            this.flag = BoundaryFlags.SOLID
        } else {
            this.flag = BoundaryFlags.EMPTY
        }
    }
}

export const initializeBoundarySets = (boundaryMargin, pidSize, inset=0) => {
    var boundarySets = [];
    var [xSize, ySize] = [GLOBAL_SIZE, GLOBAL_SIZE];
    var pid;
    for (var i = 0; i < 4; i++) {
      boundarySets.push(new Map());
    }
    for (var i = -boundaryMargin; i < ySize + boundaryMargin; i++) {
      pid = getPID(xSize - inset, i, pidSize);
      boundarySets[Angle.RIGHT].set(pid, new Boundary(xSize - inset, i, Angle.RIGHT));

      pid = getPID(i, inset-1, pidSize);
      boundarySets[Angle.UP].set(pid, new Boundary(i, inset - 1, Angle.UP));

      pid = getPID(inset-1, i, pidSize);
      boundarySets[Angle.LEFT].set(pid, new Boundary(inset - 1, i, Angle.LEFT));

      pid = getPID(i, ySize - inset, pidSize);
      boundarySets[Angle.DOWN].set(pid, new Boundary(i, ySize - inset, Angle.DOWN));
    }
    return boundarySets;
}

export const renderBoundarySets = (boundarySets) => {
    for (const boundarySet of boundarySets) {
        for (const boundary of boundarySet) {
            boundary.placementUpdate();
        }
    }
}

export const idleUpdateBoundarySets = (boundarySets) => {
    for (const boundarySet of boundarySets) {
        for (const boundary of boundarySet) {
            boundary.idleUpdate();
        }
    }
}

export const placementUpdateBoundarySets = (boundarySets) => {
    for (const boundarySet of boundarySets) {
        for (const boundary of boundarySet) {
            boundary.placementUpdate();
        }
    }
}