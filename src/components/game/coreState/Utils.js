// Generate a random integer from a up to but not including b
export function randint(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

// Generate a unique int of coordinate x, y given a maximum groupSize, in order
// to facilitate creating sets of coordinates for quick piece formation and collision detection.
export function getPID(x, y, groupSize) {
    return x * groupSize + y;
}

// Direction angle conventions for coreState's grid
export const DXN = {
    RIGHT: 0,
    UP: 1,
    LEFT: 2,
    DOWN: 3,
}

// Return the corresponding dx and dy with a certain angle.
export function getDiff(angle) {
    if (angle % 4 == DXN.RIGHT) {
        return [1, 0]
    } else if (angle % 4 == DXN.UP) {
        return [0, -1]
    } else if (angle % 4 == DXN.LEFT) {
        return [-1, 0]
    } else if (angle % 4 == DXN.DOWN) {
        return [0, 1]
    }
}

// A class to manage directionality and rotation in this game. Directions have
// angles which represent int values for each of 4 grid directions, and associated
// dx and dy values.
export class Direction {
    constructor(angle) {
        this.angle = angle
        this.updateDiff()
    }

    // Update the dx and dy after any angle is changed.
    updateDiff() {
        var diff = getDiff(this.angle)
        this.dx = diff[0]
        this.dy = diff[1]
    }

    // Turn left n times
    turnLeft(n) {
        this.angle = (this.angle + n) % 4
        this.updateDiff();
    }

    // Turn right n times
    turnRight(n) {
        this.angle = (this.angle + 3 * n) % 4
        this.updateDiff()
    }

    // Positive n leads to left turn, and negative with right.
    // This is meant to emulate 2D space angle conventions 
    turn(n) {
        if (n > 0) {
            this.turnLeft(n)
        } else {
            this.turnRight(-n)
        }
    }
}

