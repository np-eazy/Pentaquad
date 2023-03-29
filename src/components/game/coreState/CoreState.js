import Cell from "./Cell"
import CollisionSets from "./CollisionSets"
import Piece from "./Piece"
import TargetBlock from "./TargetBlock"

import { getPID, DXN, Direction, randint } from "./Utils"
import { ActionType } from "./GameAction"
import PieceStage from "./PieceStage"

// Number of cells in each piece.
const PIECE_SIZE = 5;
// The distance from the boundary that each piece 
const SPAWN_OFFSET = -3;
// Extend edge boundaries a bit further out of the grid to make sure
// pieces spawning on the edge can still hit the ground.
const BOUNDARY_MARGIN = 4;
// The number of ticks contact must take place in order to place a piece.
const COLLISION_TIME_LIMIT = 20;

// The most essential level of state in the game. Each update() call either
// moves an existing block, or places it and creates a new block after shifting
// gravity. 
const CoreState = class {
    constructor (props) {
        // The GameState's main controller
        this.controller = null
        // A timer that increments once each update; updates should only be called from a higher-level state which is allowed to control the flow of "core" tempo.
        this.timer = 0
        // The dimension of the square board on which this game takes place.
        this.boardSize = props.boardSize
        // The default "empty" value of this grid: a type-0 Cell with no props
        this.emptyValue = () => new Cell(0, {})
        // The main board on which everything happens
        this.board = [...Array(props.boardSize)].map(e => Array(props.boardSize).fill(this.emptyValue()))
        // All sets of (x, y) pairs checking each other for collisions will have a unique PID dependent on a 3rd parameter describing the max size of the PID group, in order for uniqueness to work.
        this.pidSize = (props.boardSize + BOUNDARY_MARGIN * 2) * 2
        // The direction in which the piece moves, and in which the board moves after a line is cleared.
        this.gravity = new Direction(DXN.LEFT)
        // Flag for placing a block
        this.placeBlock = true
        // The GameState's current unplaced piece
        this.currPiece = null
        // Create a new PieceStage
        this.pieceStage = new PieceStage({})
        // The GameState's roster of target blocks
        this.targetBlocks = []
        // Keep track of how long this piece is in contact in its falling direction
        this.collisionTimer = 0
        // GameOver flag
        this.isGameOver = false
        // Create 4 different sets to check if a boundary has been hit
        this.collisionSets = new CollisionSets(props.boardSize, BOUNDARY_MARGIN, this.pidSize)
    }

    // ===== INITIALIZATIONS =====
    // Set this piece's controller
    setController(controller) {
        this.controller = controller
    }
    // Generate a random index within SPAWN_OFFSET bounds; negative SPAWN_OFFSET guarantees spawnPosition is within the boundaries
    spawnPosition() {
        return randint(-SPAWN_OFFSET, this.boardSize + SPAWN_OFFSET)
    }

    // ===== ACTIONS =====
    // take in a GameAction and use it to change the GameState
    executeAction(action) {
        var action = this.controller.consumeAction()
        while (action) {
            if (action.type == ActionType.MOVE) {
                this.executeMove(action.props.angle)
            } else if (action.type == ActionType.ROTATE) {
                this.executeRotate(action.props.angle)
            } else if (action.type == ActionType.MOVE_TO) {
                this.executeMoveTo(action.props.x, action.props.y)
            } else if (action.type == ActionType.FLIP) {
                this.executeFlip()
            } else if (action.type == ActionType.DROP) {
                this.executeDrop()
            } else if (action.type == ActionType.PLACE) {
                this.executePlace()
            } else if (action.type == ActionType.HOLD) {
                this.executeHold()
            }
            action = this.controller.consumeAction()
        }
    }
    // Move the current piece one cell in the given direction; rollback if not valid
    executeMove(angle) {
        if (angle % 2 != this.currPiece.dxn.angle % 2) {
            if (this.currPiece.checkCollision(angle, this.board, this.collisionSets)) {
                while (this.currPiece.checkCollision(angle, this.board, this.collisionSets)) {
                    this.currPiece.activeMove((angle + 2) % 4)
                }
            }
            this.currPiece.activeMove(angle)
        }
    }
    // Rotate the current piece in the given direction; rollback if not valid
    executeRotate(angle) {
        this.currPiece.rotate(angle)
        if (this.currPiece.checkCollision(null, this.board, this.collisionSets)) {
            this.currPiece.rotate(-angle)
        }
    }
    // Move the current piece as far towards the given position as possible before encountering other cells
    executeMoveTo(x, y) {
        var moveAngle = this.gravity.angle % 2 == 0 ?
            (this.currPiece.cy < y ? 3 : 1) :
            (this.currPiece.cx < x ? 0 : 2)
        var iterationsLeft = this.gravity.angle % 2 == 0 ?
            Math.abs(this.currPiece.cy - y) :
            Math.abs(this.currPiece.cx - x)
        while (iterationsLeft > 0 && !this.currPiece.checkCollision(moveAngle, this.board, this.collisionSets)) {
            this.currPiece.activeMove(moveAngle)
            iterationsLeft -= 1
        }
    }
    // Horizontally flip the current piece; rollback if not valid
    executeFlip() {
        this.currPiece.flip()
        if (this.currPiece.checkCollision(null, this.board, this.collisionSets)) {
            this.currPiece.flip()
        }
    }
    // Drop the current piece as far down as possible
    executeDrop() {
        while (!this.currPiece.checkCollision(this.currPiece.dxn.angle, this.board, this.collisionSets)) {
            this.currPiece.activeMove(this.currPiece.dxn.angle)
        }
        this.collisionTimer = COLLISION_TIME_LIMIT
        this.placeBlock = true
    }
    // Unconditionally place the current piece where it is
    executePlace() {
        this.collisionTimer = COLLISION_TIME_LIMIT
        this.placeBlock = true
    }
    // Unmount the current piece into the holding stage, and mount the holding stage in
    executeHold() {
        this.currPiece.unmountPiece()
        this.pieceStage.holdPiece(this.currPiece)
        this.currPiece = null
        this.placeBlock = true
    }

    // ===== IDLE ACTIONS =====
    // core rules of the game but is not very playable at all, nor does it have good objectives.
    update(move) {
        if (!this.isGameOver) {
            if (move) {
                if (this.placeBlock) {
                    // Place the current piece, create a new one, and check for new filled lines
                    this.placeCurrentPiece();
                    this.placeBlock = false;
                    this.gravity.turnLeft(1);
    
                    this.createNewPiece();
                    this.checkTargets();
                    this.checkFilledLines(this.boardSize);
                    
                    this.createNewTargetBlock();
                } else {
                    // Move the current piece, first in its direction of gravity and second according to the player.
                    if (this.currPiece && this.collisionTimer == 0) {
                        this.currPiece.idleMove()
                    }
                }
                this.updateCollisionTimer()
            }
            if (!this.placeBlock) {
                if (this.currPiece && this.controller && !this.placeBlock) {
                    this.executeAction()
                }
            }
            this.timer += 1
        }
        return this; // CoreState.update() returns itself 
    }

    // Create a new piece based on this CoreState's gravity, at a random location.
    createNewPiece() {
        var [x, y] = [0, 0]
        var r = this.spawnPosition()
        if (this.gravity.angle == DXN.RIGHT) {
            [x, y] = [-SPAWN_OFFSET, r]
        } else if (this.gravity.angle == DXN.UP) {
            [x, y] = [r, SPAWN_OFFSET + this.boardSize]
        } else if (this.gravity.angle == DXN.LEFT) {
            [x, y] = [SPAWN_OFFSET + this.boardSize, r]
        } else if (this.gravity.angle == DXN.DOWN) {
            [x, y] = [r, -SPAWN_OFFSET]
        }
        // Get the unmounted piece from PieceStage; we need this loop in case async piece
        // doesn't arrive in time
        var piece
        while (!piece) {
            piece = this.pieceStage.consumePiece()
        }
        piece.mountPiece({
            center_x: x,
            center_y: y,
            angle: this.gravity.angle,
            pidSize: this.pidSize,
        })
        this.currPiece = piece
    }

    // Create a new 2x2 TargetBlock in a random location.
    createNewTargetBlock() {
        var [x, y] = [this.spawnPosition(), this.spawnPosition()]
        var targetBlock = new TargetBlock({
            coreState: this,
            x0: x - 1,
            y0: y - 1,
            x1: x + 1,
            y1: y + 1,
        })
        this.targetBlocks.push(targetBlock)
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
    // Check all TargetBlocks and update them as needed
    checkTargets() {
        // TODO: This code can possibly be improved, both in terms of format and in isCleared removal.
        this.targetBlocks.forEach(targetBlock => targetBlock.update())
        this.targetBlocks.forEach(targetBlock => {
            if (targetBlock.isFilled) {
                targetBlock.clear(this.board, this.emptyValue)
            } else if (targetBlock.isGameOver) {
                this.gameOver = true
            }
        })
        var remainingTargets = []
        this.targetBlocks.forEach(targetBlock => {
            if (!targetBlock.isCleared) {
                remainingTargets.push(targetBlock)
            }
        })
        this.targetBlocks = remainingTargets
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
    // If in contact with ground, increment the timer until it hits a threshold; otherwise, reset it
    updateCollisionTimer() {
        if (this.currPiece.checkCollision(this.currPiece.dxn.angle, this.board, this.collisionSets)) {
            this.collisionTimer += 1
            if (this.collisionTimer == COLLISION_TIME_LIMIT) {
                this.placeBlock = true
            }
        } else {
            this.collisionTimer = 0
        }
    }
}

export default CoreState
