import Cell from "./objects/cell/Cell";
import BoundarySets from "./BoundarySets";
import PieceStage from "./objects/piece/PieceStage";
import TargetStage from "./objects/target/TargetStage";

import { ActionType } from "../control/GameAction";
import { checkFilledLines, checkFilledTargets } from "./utils/FillCheck";
import { randint } from "./utils/Functions";
import { Angle, Direction, Dxn } from "./utils/Direction";
import {
  SPAWN_OFFSET,
  BOUNDARY_MARGIN,
  TARGET_MARGIN,
  COLLISION_TIME_LIMIT,
  MAX_ROTATION_ADJUSTMENT,
} from "../Constants";
import { dropzone } from "./utils/Dropzone";

// The most essential level of state in the game. Each update() call either
// moves an existing block, or places it and creates a new block after shifting
// gravity.
const CoreState = class {
  constructor(props) {
    // The GameState's main controller
    this.controller = null;
    // Create a new PieceStage
    this.pieceStage = new PieceStage({
      coreState: this,
    });
    // The GameState's current unplaced piece
    this.currPiece = null;
    // The GameState's roster of target blocks
    this.targetStage = new TargetStage({
      coreState: this,
      minBound: TARGET_MARGIN,
      maxBound: props.boardSize - TARGET_MARGIN,
    });
    this.targets = [];

    // A timer that increments once each update updates should only be called from a higher-level state which is allowed to control the flow of "core" tempo.
    this.timer = 0;
    // Keep track of how long this piece is in contact in its falling direction
    this.collisionTimer = 0;
    // Flag for placing a block
    this.placeBlock = true;
    // GameOver flag
    this.isGameOver = false;

    // All sets of (x, y) pairs checking each other for collisions will have a unique PID dependent on a 3rd parameter describing the max size of the PID group, in order for uniqueness to work.
    this.pidSize = (props.boardSize + BOUNDARY_MARGIN * 2) * 2;
    // The dimension of the square board on which this game takes place.
    this.boardSize = props.boardSize;
    // The default "empty" value of this grid: a type-0 Cell with no props
    this.emptyValue = () => new Cell(0, { t: 0 });
    // The main board on which everything happens
    this.board = [...Array(props.boardSize)].map((e) =>
      Array(props.boardSize).fill(null)
    ); // This loop fails to initialize unique objects all around so I'm using a double for loop instaed
    for (var y = 0; y < this.board.length; y++) {
      for (var x = 0; x < this.board.length; x++) {
        this.board[y][x] = this.emptyValue();
      }
    }
    // Create 4 different sets to check if a boundary has been hit
    this.collisionSets = new BoundarySets(
      props.boardSize,
      BOUNDARY_MARGIN,
      this.pidSize
    );
    // The direction in which the piece moves, and in which the board moves after a line is cleared.
    this.gravity = new Direction(Angle.DOWN);
  }

  // ===== INITIALIZATIONS =====
  // Set this piece's controller; this is separate from the constructor to avoid
  // async undefined shenanigans.
  setController(controller) {
    this.controller = controller;
  }

  // ===== ACTIONS =====
  // take in a GameAction and use it to change the GameState
  executeAction(action) {
    var action = this.controller.consumeAction();
    while (action) {
      if (action.type == ActionType.MOVE) {
        if (action.props.dxn.equals(this.currPiece.dxn.opposite())) {
          this.executeRotate(1);
        } else {
          this.executeMove(action.props.dxn);
        }
      } else if (action.type == ActionType.ROTATE) {
        this.executeRotate(1);
      } else if (action.type == ActionType.MOVE_TO) {
        this.executeMoveTo(action.props.x, action.props.y);
      } else if (action.type == ActionType.FLIP) {
        this.executeFlip();
      } else if (action.type == ActionType.DROP) {
        this.executeDrop();
      } else if (action.type == ActionType.PLACE) {
        this.executePlace();
      } else if (action.type == ActionType.HOLD) {
        this.executeHold();
      }
      action = this.controller.consumeAction();
    }
  }
  // Move the current piece one cell in the given direction; rollback if not valid
  executeMove(dxn) {
    if (this.currPiece.checkCollision(dxn, this.board, this.collisionSets)) {
      while (
        this.currPiece.checkCollision(dxn, this.board, this.collisionSets)
      ) {
        this.currPiece.move(dxn.opposite());
      }
    }
    this.currPiece.move(dxn);
  }
  // Rotate the current piece in the given direction; rollback if not valid
  executeRotate(angle) {
    this.currPiece.rotate(angle);
    if (this.currPiece.checkCollision(null, this.board, this.collisionSets)) {
      var adjustment = 0;
      while (
        this.currPiece.checkCollision(null, this.board, this.collisionSets) &&
        adjustment < MAX_ROTATION_ADJUSTMENT
      ) {
        this.currPiece.move(this.gravity.opposite());
        adjustment += 1;
      }
      // Rollback if max rotation adjustment has been reached
      if (this.currPiece.checkCollision(null, this.board, this.collisionSets)) {
        for (var i = 0; i < adjustment; i++) {
          this.currPiece.move(this.currPiece.dxn);
        }
        this.currPiece.rotate(-angle);
      }
    }
  }
  // Move the current piece as far towards the given position as possible before encountering other cells
  executeMoveTo(x, y) {
    var moveAngle = this.gravity.isHorizontal()
      ? this.currPiece.cy < y
        ? Angle.DOWN
        : Angle.UP
      : this.currPiece.cx < x
      ? Angle.RIGHT
      : Angle.LEFT;
    var iterationsLeft = this.gravity.isHorizontal()
      ? Math.abs(this.currPiece.cy - y)
      : Math.abs(this.currPiece.cx - x);
    while (
      iterationsLeft > 0 &&
      !this.currPiece.checkCollision(
        Dxn[moveAngle],
        this.board,
        this.collisionSets
      )
    ) {
      this.currPiece.move(Dxn[moveAngle]);
      iterationsLeft -= 1;
    }
  }
  // Horizontally flip the current piece; rollback if not valid
  executeFlip() {
    this.currPiece.flip();
    if (this.currPiece.checkCollision(null, this.board, this.collisionSets)) {
      this.currPiece.flip();
    }
  }
  // Drop the current piece as far down as possible
  executeDrop() {
    if (this.currPiece.mainCell.type == 5) {
      dropzone(this.board, this.currPiece, this.gravity, (cell) => {
        cell.type = 1;
        cell.props = {
          ...this.currPiece.mainCell.props
        }
      }, false);
    } else if (this.currPiece.mainCell.type != 2) {
      while (
        !this.currPiece.checkCollision(
          this.gravity,
          this.board,
          this.collisionSets
        )
      ) {
        this.currPiece.move(this.gravity);
      }
    }
    this.collisionTimer = COLLISION_TIME_LIMIT;
    this.placeBlock = true;
  }
  // Unconditionally place the current piece where it is
  executePlace() {
    this.collisionTimer = COLLISION_TIME_LIMIT;
    this.placeBlock = true;
  }
  // Unmount the current piece into the holding stage, and mount the holding stage in
  executeHold() {
    this.currPiece.unmountPiece();
    this.pieceStage.holdPiece(this.currPiece);
    this.currPiece = null;
    this.placeBlock = true;
  }

  // ===== IDLE ACTIONS =====
  // core rules of the game but is not very playable at all, nor does it have good objectives.
  update(idleMoveIncluded) {
    if (!this.isGameOver) {
      if (idleMoveIncluded) {
        if (this.placeBlock) {
          this.advance();
          this.updateCollisionTimer(idleMoveIncluded);
        } else {
          // Move the current piece, first in its direction of gravity and second according to the player.
          if (this.currPiece && this.collisionTimer == 0) {
            this.currPiece.move(this.gravity);
            this.updateCollisionTimer(idleMoveIncluded);
          }
        }
      } else {
        if (!this.placeBlock) {
          if (this.currPiece && this.controller && !this.placeBlock) {
            this.executeAction();
            this.updateCollisionTimer(true);
          }
        }
      }
      this.timer += 1;
    }
    return this; // CoreState.update() returns itself
  }

  advance() {
    // Place the current piece, create a new one, and check for new filled lines
    this.placeCurrentPiece();
    this.placeBlock = false;
    if (this.gravity && this.gravity.equals(Dxn[Angle.DOWN])) {
      this.gravity.turnLeft(1);
    } else {
      this.gravity.turnRight(1);
    }

    // Check and clear any filled targets or lines
    this.gameOver = checkFilledTargets({
      targets: this.targets,
      board: this.board,
      emptyValue: this.emptyValue,
    });
    checkFilledLines({
      threshold: this.boardSize,
      dxn: this.gravity,
      boardSize: this.boardSize,
      board: this.board,
      emptyValue: this.emptyValue,
    });

    // increment times to live for each cell before converting to empty cell
    for (var y = 0; y < this.boardSize; y++) {
      for (var x = 0; x < this.boardSize; x++) {
        var cell = this.board[y][x];
        if (cell.ttl != -1) {
          if (cell.ttl == 0) {
            cell.type = 0;
            cell.timer = 0;
          } else {
            cell.updateColors();
            cell.ttl -= 1;
          }
        }
      }
    }

    // Create new game objects
    this.createNewPiece();
    this.createNewTarget();
  }

  getSpawnPosition(dxn) {
    var [x, y] = [0, 0];
    var r = randint(-SPAWN_OFFSET, this.boardSize + SPAWN_OFFSET);
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

  // Create a new piece based on this CoreState's gravity, at a random location.
  createNewPiece() {
    var [x, y] = this.getSpawnPosition(this.gravity);
    // Get the unmounted piece from PieceStage; we need this loop in case async piece
    // doesn't arrive in time
    var piece;
    while (!piece) {
      piece = this.pieceStage.consumePiece();
    }
    piece.mountPiece({
      center_x: x,
      center_y: y,
      direction: this.gravity,
      pidSize: this.pidSize,
    });
    this.currPiece = piece;
  }
  // Create a new 2x2 Target in a random location.
  createNewTarget() {
    var target = this.targetStage.consumeTarget();
    if (target) {
      this.targets.push(target);
    }
  }
  // Change the CoreState's grid values based on where the current piece is.
  placeCurrentPiece() {
    if (this.currPiece != null) {
      if (this.currPiece.mainCell.type == 3) {
        for (var y = Math.max(0, this.currPiece.cy - 2); y < Math.min(this.boardSize, this.currPiece.cy + 3); y++) {
          for (var x = Math.max(0, this.currPiece.cx - 2); x < Math.min(this.boardSize, this.currPiece.cx + 3); x++) {
            this.board[y][x] = this.emptyValue();
          }
        }
      } else if (this.currPiece.mainCell.type == 4) {
        dropzone(this.board, this.currPiece, this.gravity, (cell) => {
          cell.type = 0;
          cell.setDefaults();
        }, true)
      } else {
        var [x, y] = [0, 0];
        for (const cell of this.currPiece.cells) {
          [x, y] = [
            cell[1][0] + this.currPiece.cx,
            cell[1][1] + this.currPiece.cy,
          ];
          if (x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize) {
            this.board[y][x] = new Cell(1,
              {...this.currPiece.mainCell.props}
            );
          }
        }
      }
    }
  }
  // If in contact with ground, increment the timer until it hits a threshold; otherwise, reset it
  updateCollisionTimer(idleMoveIncluded) {
    if (
      this.currPiece != null &&
      this.currPiece.checkCollision(
        this.gravity,
        this.board,
        this.collisionSets
      )
    ) {
      if (idleMoveIncluded) {
        this.collisionTimer += 1;
      }
      if (this.collisionTimer == COLLISION_TIME_LIMIT) {
        this.placeBlock = true;
      }
    } else {
      this.collisionTimer = 0;
    }
  }
};

export default CoreState;
