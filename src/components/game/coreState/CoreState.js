import Cell from "./Cell"
import Piece from "./Piece"
import { randint, getPID, Direction, DXN } from "./Utils"
import { ActionType } from "./GameAction"

// Number of cells in each piece.
const PIECE_SIZE = 5;
// The distance from the boundary that each piece 
const SPAWN_OFFSET = 2;
// Extend edge boundaries a bit further out of the grid to make sure
// pieces spawning on the edge can still hit the ground.
const BOUNDARY_MARGIN = 4;

// The most essential level of state in the game. Each update() call either
// moves an existing block, or places it and creates a new block after shifting
// gravity. 

const CoreState = class {
    constructor (props) {
        // The GameState's main controller
        this.controller = null;
        // A timer that increments once each update; updates should only be called from a higher-level state which is allowed to control the flow of "core" tempo.
        this.timer = 0;
        // The dimension of the square board on which this game takes place.
        this.boardSize = props.boardSize;
        // The default "empty" value of this grid: a type-0 Cell with no props
        this.emptyValue = () => new Cell(0, {}); 
        // The main board on which everything happens
        this.board = [...Array(props.boardSize)].map(e => Array(props.boardSize).fill(this.emptyValue()));
        // All sets of (x, y) pairs checking each other for collisions will have a unique PID dependent on a 3rd parameter describing the max size of the PID group, in order for uniqueness to work.
        this.pidSize = (props.boardSize + SPAWN_OFFSET * 2) * 2;
        // The direction in which the piece moves, and in which the board moves after a line is cleared.
        this.gravity = new Direction(DXN.LEFT);
        // Flag for placing a block
        this.placeBlock = true;
        // The GameState's current unplaced piece
        this.currPiece = null;


        // Create 4 different sets to check if a boundary has been hit
        var [xSize, ySize] = [props.boardSize, props.boardSize]
        var pid;
        this.boundarySets = [];
        for (var i = 0; i < 4; i++) {
            this.boundarySets.push(new Map())
        }
        for (var i = -BOUNDARY_MARGIN; i < ySize + BOUNDARY_MARGIN; i++) {
            pid = getPID(xSize, i, this.pidSize);
            this.boundarySets[DXN.RIGHT].set(pid, [xSize, i])

            pid = getPID(i, -1, this.pidSize);
            this.boundarySets[DXN.UP].set(pid, [i, -1])

            pid = getPID(-1, i, this.pidSize);
            this.boundarySets[DXN.LEFT].set(pid, [-1, i])

            pid = getPID(i, ySize, this.pidSize);
            this.boundarySets[DXN.DOWN].set(pid, [i, ySize])
        }
    }

    // Set this piece's controller
    setController(controller) {
        this.controller = controller
    }

\    // core rules of the game but is not very playable at all, nor does it have good objectives.
    update(move) {
        if (move) {
            if (this.placeBlock) {
                // Place the current piece, create a new one, and check for new filled lines
                this.placeBlock = false;
                this.placeCurrentPiece();
                this.gravity.turnLeft(1);
                this.createNewPiece();
                this.checkFilledLines(this.boardSize / 4);
            } else {
                // Move the current piece, first in its direction of gravity and second according to the player.
                if (this.currPiece) {
                    this.currPiece.idleMove()
                }
            }
        }
        if (this.currPiece.checkCollision(this.currPiece.dxn.angle, this.board, this.boundarySets)) {
            this.placeBlock = true
        } else {
            if (this.currPiece && this.controller && !this.placeBlock) {
                var action = this.controller.consumeAction()
                if (action) {
                    this.executeAction(action)
                }
            }
        }
        this.timer += 1
        return this; // CoreState.update() returns itself 
    }

    executeAction(action) {
        if (action.type == ActionType.MOVE) {
            if (!this.currPiece.checkCollision(action.props.angle, this.board, this.boundarySets)) {
                this.currPiece.activeMove(action.props.angle)
                if (this.currPiece.checkCollision(this.currPiece.dxn.angle, this.board, this.boundarySets) ) {
                    // Revert the move if it results in a collision in the active angle
                    this.currPiece.activeMove((action.props.angle + 2) % 4)
                }
            }
        } else if (action.type == ActionType.PLACE) {
            this.placeBlock = true
        }
        return this;
    }

    // Change the CoreState's grid values based on where the current piece is.
    placeCurrentPiece() {
        if (this.currPiece != null) {
            var [x, y] = [0, 0]
            for (const cell of this.currPiece.cells) {
                [x, y] = [cell[1][0] + this.currPiece.cx, cell[1][1] + this.currPiece.cy]
                if (x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize) {
                    this.board[y][x] = this.currPiece.createCell()
                }
            }
        }
    }

    // Create a new piece based on this CoreState's gravity, at a random location.
    createNewPiece() {
        var [x, y] = [0, 0]
        var r = randint(-SPAWN_OFFSET, this.boardSize + SPAWN_OFFSET)
        if (this.gravity.angle == DXN.RIGHT) {
            [x, y] = [-SPAWN_OFFSET, r]
        } else if (this.gravity.angle == DXN.UP) {
            [x, y] = [r, SPAWN_OFFSET + this.boardSize]
        } else if (this.gravity.angle == DXN.LEFT) {
            [x, y] = [SPAWN_OFFSET + this.boardSize, r]
        } else if (this.gravity.angle == DXN.DOWN) {
            [x, y] = [r, -SPAWN_OFFSET]
        }
        // Create the new piece
        this.currPiece = new Piece({
            center_x: x,
            center_y: y,
            angle: this.gravity.angle,
            pieceSize: PIECE_SIZE,
            pidSize: this.pidSize,
        })
    }

    // Check for filled lines within a certain threshold and clear them Tetris-style, based
    // on the current direction of gravity.
    checkFilledLines(threshold) {
        var angle = this.currPiece.dxn.angle
        if (angle % 2 == 0) {
            for (var x = 0; x < this.boardSize; x++) {
                var count = 0;
                for (var y = 0; y < this.boardSize; y++) {
                    if (this.board[y][x].type > 0) {
                        count += 1;
                    }
                }
                // Horizontally shift the left or the right of the cleared line
                if (count >= threshold) {
                    if (angle % 4 == DXN.RIGHT) {
                        for (var j = 0; j < x; j++) {
                            i = x - j - 1
                            for (var y_ = 0; y_ < this.boardSize; y_++) {
                                this.board[y_][i + 1] = this.board[y_][i]
                            }
                        }
                        for (var y_ = 0; y_ < this.boardSize; y_++) {
                            this.board[y_][0] = new Cell(0, {})
                        }
                    } else {
                        for (var i = x + 1; i < this.boardSize; i++) {
                            for (var y_ = 0; y_ < this.boardSize; y_++) {
                                this.board[y_][i - 1] = this.board[y_][i]
                            }
                        }
                        for (var y_ = 0; y_ < this.boardSize; y_++) {
                            this.board[y_][this.boardSize - 1] = new Cell(0, {})
                        }
                    }
                }
            }
        } else {
            for (var y = 0; y < this.boardSize; y++) {
                var count = 0;
                for (var x = 0; x < this.boardSize; x++) {
                    if (this.board[y][x].type > 0) {
                        count += 1;
                    }
                }
                // Horizontally shift the left or the right of the cleared line
                if (count >= threshold) {
                    if (angle % 4 == DXN.DOWN) {
                        for (var j = 0; j < y; j++) {
                            i = y - j - 1
                            for (var x_ = 0; x_ < this.boardSize; x_++) {
                                this.board[i + 1][x_] = this.board[i][x_]
                            }
                        }
                        for (var x_ = 0; x_ < this.boardSize; x_++) {
                            this.board[0][x_] = new Cell(0, {})
                        }
                    } else {
                        for (var i = y + 1; i < this.boardSize; i++) {
                            for (var x_ = 0; x_ < this.boardSize; x_++) {
                                this.board[i - 1][x_] = this.board[i][x_]
                            }
                        }
                        for (var x_ = 0; x_ < this.boardSize; x_++) {
                            this.board[this.boardSize - 1][x_] = new Cell(0, {})
                        }
                    }
                    break;
                }
            }
        }
    }
}

export default CoreState;