import Cell from "../Cell";
import { randint, getPID } from "../utils/Functions"
import { Direction, DXN } from "../utils/Direction"
import { Color } from "../../graphics/Colors"

import { PRESETS } from "../../Constants.js"



// A single piece in the game, which can move in different directions and detect collisions
// based on which direction is moving.
class Piece {
    constructor() {
        this.mounted = false
        this.cx = undefined
        this.cy = undefined
        this.dxn = undefined
        this.pidSize = undefined
        this.preset = PRESETS[randint(0, PRESETS.length)]
    }

    // Before the piece is mounted to a global location, it shouldn't be used/updated. 
    mountPiece({
        center_x, 
        center_y, 
        angle, 
        pidSize,}) {

        this.mounted = true
        this.cx = center_x 
        this.cy = center_y
        this.dxn = new Direction(angle)
        this.pidSize = pidSize

        this.cells = new Map()
        for (var [x, y] of this.preset) {
            this.cells.set(getPID(x, y, pidSize), [x, y])
        }
        this.rotate(randint(0, 4))
        if (randint(0, 2) == 1) {
            this.flip()
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

    // Just for formality/convention, we do this each time we move something from the game
    // back to the stage.
    unmountPiece() {
        this.mounted = false
        this.cx = undefined
        this.cy = undefined
        this.dxn = undefined
        this.pidSie = undefined
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
    checkCollision(angle, board, collisionSets) {
        var [xSize, ySize] = [board.length, board[0].length];

        var collisionDxn = angle == null ? { dx: 0, dy: 0 } : new Direction(angle)
        var boundarySet = angle == null ? new Set() : collisionSets.boundarySets[angle];
        var collision = false;

        // Check for a boundary collision
        this.cells.forEach((val) => {
            var globalPid = getPID(
                val[0] + this.cx + collisionDxn.dx, 
                val[1] + this.cy + collisionDxn.dy, 
                this.pidSize)
            if (!collision && boundarySet.has(globalPid)) {
                collision = true
            }
        })
        if (collision == true) {
            return true
        }

        for (var y = Math.max(0, this.cy - 3); y < Math.min(this.cy + 4, ySize); y++) {
            for (var x = Math.max(0, this.cx - 3); x < Math.min(this.cx + 4, xSize); x++) {
                if (board[y][x].type > 0) {
                    // x, y generate global PIDs
                    // Subtract cx and cy from PIDs to localize
                    var globalPid = getPID(
                        x - this.cx - collisionDxn.dx, 
                        y - this.cy - collisionDxn.dy, 
                        this.pidSize)
                    if (!collision && this.cells.has(globalPid)) {
                        return true
                    }
                }
            }
        }
        return false
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

    flip() {
        var newCells = new Map()
        this.cells.forEach((val) => {
            var [newX, newY] = [val[0], -val[1]]
            var pid = getPID(newX, newY, this.pidSize)
            newCells.set(pid, [newX, newY])
        })
        this.cells = newCells
    }
}

export default Piece;