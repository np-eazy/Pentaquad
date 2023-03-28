import Cell from "./Cell";
import { randint, getPID, Direction, DXN, NULL_DXN } from "./Utils";
import { Color } from "../graphics/Colors";

// A single piece in the game, which can move in different directions and detect collisions
// based on which direction is moving.
class Piece {
    constructor({
        center_x, 
        center_y, 
        angle, 
        pieceSize, 
        pidSize
    }) {
        [this.cx, this.cy, this.dxn] = [center_x, center_y, new Direction(angle)];
        this.pidSize = pidSize;

        // Create some arrangement of 5 contiguous cells.
        // TODO: It would be faster/easier to pull from a set of all possible existing cells
        this.cells = new Map();
        var [x, y, dxn] = [0, 0, new Direction(randint(0, 4))];
        var pid = getPID(x, y, pidSize);
        var turnAngle;
        var valid;
        for (var i = 0; i < pieceSize; i++) {
            valid = false;
            while (!valid) {
                this.cells.set(pid, [x, y])
                turnAngle = randint(-1, 2)
                dxn.turn(turnAngle)
                x += dxn.dx
                y += dxn.dy
                pid = getPID(x, y, this.pidSize)
                valid = this.cells.get(pid) == undefined
                if (!valid) {
                    x -= dxn.dx
                    y -= dxn.dy
                    dxn.turn(-turnAngle)
                }
            }
        }
        // Set this piece's color based on its initial direction; there will be more
        // room to customize this.
        if (angle % 4 == DXN.RIGHT) {
            this.color = new Color({ red: 225, green: 0, blue: 105})
        } else if (angle % 4 == DXN.UP) {
            this.color = new Color({ red: 255, green: 125, blue: 0})
        } else if (angle % 4 == DXN.LEFT) {
            this.color = new Color({ red: 0, green: 235, blue: 175})
        } else if (angle % 4 == DXN.DOWN) {
            this.color = new Color({ red: 0, green: 200, blue: 235})
        }  
    }

    // The function to fill the coreState with cells corresponding to this Piece; this will
    // be used for cases like the render script accessing the color in the parents
    createCell() {
        var cell = new Cell(1, {parent: this});
        return cell;
    }

    // Return whether or not the block has a collision with this angle.
    // Null angle option is for rotation collision check, only to make sure that the piece
    // doesn't rotate into any overlaps with filled cells.
    checkCollision(angle, board, boundarySets) {
        var [xSize, ySize] = [board.length, board[0].length];

        var collisionDxn = angle == null ? { dx: 0, dy: 0 } : new Direction(angle)
        var boundarySet = angle == null ? new Set() : boundarySets[angle];
        var collision = false;

        // Check for a boundary collision
        this.cells.forEach((val) => {
            var globalPid = getPID(
                val[0] + this.cx + collisionDxn.dx, 
                val[1] + this.cy + collisionDxn.dy, 
                this.pidSize)
            if (!collision && boundarySet.has(globalPid)) {
                collision = true;
            }
        })
        if (collision == true) {
            return true;
        }

        // Check for a board collision
        for (var y = 0; y < ySize; y++) {
            for (var x = 0; x < xSize; x++) {
                if (board[y][x].type > 0) {
                    // x, y generate global PIDs
                    // Subtract cx and cy from PIDs to localize
                    var globalPid = getPID(
                        x - this.cx - collisionDxn.dx, 
                        y - this.cy - collisionDxn.dy, 
                        this.pidSize)
                    if (!collision && this.cells.has(globalPid)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Move this piece based on a given x and y direction and recheck its appropriate hitbox
    activeMove(angle) {
        var adxn = new Direction(angle);
        this.cx += adxn.dx;
        this.cy += adxn.dy;
    }

    // Move this piece based on its gravity and recheck its appropriate hitbox.
    idleMove() {
        this.cx += this.dxn.dx;
        this.cy += this.dxn.dy;
    }

    rotate(angle) {
        if (angle < 0) {
            this.signedRotate(angle, -1)
        } else {
            this.signedRotate(angle, 1)
        }
    }

    signedRotate(turns, sign) {
        for (var t = 0; t < (sign * turns) % 4; t++) {
            var newCells = new Map()
            this.cells.forEach((val) => {
                var [newX, newY] = [val[1] * sign, -val[0] * sign]
                var pid = getPID(newX, newY, this.pidSize)
                newCells.set(pid, [newX, newY])
            })
            this.cells = newCells
        }
    }
}

export default Piece;