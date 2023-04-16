import EmptyCell from "../baseObjects/cell/EmptyCell";
import NormalCell from "../baseObjects/cell/NormalCell";
import BoundarySets from "./BoundarySets";
import PieceStage from "./PieceStage";
import TargetStage from "./TargetStage";

import { ActionType } from "../control/GameAction";
import { Angle, Direction, Dxn } from "./utils/Direction";
import { dropzone } from "./utils/Dropzone";
import { checkFilledLines, advanceAndCheckTargets } from "./utils/FillCheck";
import { getSpawnPosition, inBounds } from "./utils/Functions";

import {
  BOUNDARY_MARGIN,
  TARGET_MARGIN,
  COLLISION_TIME_LIMIT,
  BOMB_RADIUS,
  CELL_TYPE,
} from "../Constants";
import {
  executeDrop,
  executeFlip,
  executeHold,
  executeMove,
  executeMoveTo,
  executePlace,
  executeRotate,
} from "./Actions";

// The most essential level of state in the game. Each update() call either
// moves an existing block, or places it and creates a new block after shifting
// gravity.
const CoreState = class {
  constructor(props) {
    this.controller = null; // The GameState's main controller, postInit to allow impl room for 2-player hijacking
    this.pieceStage = new PieceStage({ coreState: this }); // Create a new PieceStage to take care of creating/dispensing pieces
    this.targetStage = new TargetStage({
      // Create a new TargetStage to take care of creating/dispensing targets
      coreState: this,
      minBound: TARGET_MARGIN,
      maxBound: props.boardSize - TARGET_MARGIN,
    });

    this.pidSize = (props.boardSize + BOUNDARY_MARGIN * 2) * 2; // All sets of (x, y) pairs checking each other for collisions will have a unique PID dependent on a 3rd parameter describing the max size of the PID group, in order for uniqueness to work.
    this.boardSize = props.boardSize; // The dimension of the square board on which this game takes place.
    this.emptyValue = () => new EmptyCell(); // The default "empty" value of this grid: a type-0 Cell with no props
    this.board = [...Array(props.boardSize)].map(
      (
        e // Create the main board for the game
      ) => Array(props.boardSize).fill(null)
    );
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

    this.gravity = new Direction(Angle.DOWN); // The direction in which the piece moves, and in which the board moves after a line is cleared.
    this.currPiece = null; // The GameState's current unplaced piece
    this.targets = []; // The GameState's roster of target blocks
    this.timer = 0; // A timer that increments once each update updates should only be called from a higher-level state which is allowed to control the flow of "core" tempo.
    this.collisionTimer = 0; // Keep track of how long this piece is in contact in its falling direction
    this.placeBlock = true; // Flag for placing a block
    this.isGameOver = false; // GameOver flag
  }

  // Set this piece's controller, in the future this can end up being called
  // while the game is going on when players hijack each other.
  setController(controller) {
    this.controller = controller;
  }

  // (Facilitated by Controller) Take in a GameAction and use it to change the GameState
  performNextAction(action) {
    var action = this.controller.consumeAction();
    while (action) {
      if (action.type == ActionType.MOVE) {
        if (action.props.dxn.equals(this.currPiece.dxn.opposite())) {
          executeRotate(this, 1);
        } else {
          executeMove(this, action.props.dxn);
        }
      } else if (action.type == ActionType.ROTATE) {
        executeRotate(this, 1);
      } else if (action.type == ActionType.MOVE_TO) {
        executeMoveTo(this, action.props.x, action.props.y);
      } else if (action.type == ActionType.FLIP) {
        executeFlip(this);
      } else if (action.type == ActionType.DROP) {
        executeDrop(this);
      } else if (action.type == ActionType.PLACE) {
        executePlace(this);
      } else if (action.type == ActionType.HOLD) {
        executeHold(this, action.props.item);
      }
      action = this.controller.consumeAction();
    }
  }

  // (Facilitated by PieceStage) Create a new piece based on this CoreState's gravity, at a random location.
  createNewPiece() {
    var [x, y] = getSpawnPosition(this.gravity, this.boardSize);
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

  // (Facilitated by TargetStage) Create a new Target in a random location.
  createNewTarget() {
    var target = this.targetStage.consumeTarget();
    if (target) {
      this.targets.push(target);
    }
  }

  // An update that happens each frame; idleMoveIncluded is called once every
  // several frames to actually move the block downwards, and that calls other
  // updates in Cells. Corresponds to idleUpdate and activeUpdate in Cell and Target classes
  update(idleMoveIncluded) {
    if (!this.isGameOver) {
      if (idleMoveIncluded) {
        if (this.placeBlock) {
          this.advance();
        } else if (this.currPiece && this.collisionTimer == 0) {
          this.active();
        }
      } else if (!this.placeBlock && this.currPiece && this.controller) {
        this.idle();
      }
      this.timer += 1;
    }
    return this; // CoreState.update() returns itself
  }

  // Attempt to perform the next action if dispensed by the game controller.
  idle() {
    this.performNextAction();
    this.updateCollisionTimer();
  }

  // If in contact with ground, increment the timer until it hits a threshold; otherwise, reset it
  updateCollisionTimer() {
    if (
      this.currPiece != null &&
      this.currPiece.checkCollision(
        this.gravity,
        this.board,
        this.collisionSets
      )
    ) {
      this.collisionTimer += 1;
      if (this.collisionTimer == COLLISION_TIME_LIMIT) {
        this.placeBlock = true;
      }
    } else {
      this.collisionTimer = 0;
    }
  }

  // Move the block down in its falling direction
  active() {
    this.currPiece.move(this.gravity);
    this.updateCollisionTimer();
  }

  // Place the current piece, create a new one, and check for new filled lines.
  // Basically all the logic that happens whenever the arrangement of board pieces
  // changes. Corresponds to advanceUpdate in Cell and Target classes.
  advance() {
    this.place(this.currPiece);
    if (this.gravity && this.gravity.equals(Dxn[Angle.DOWN])) {
      this.gravity.turnLeft(1);
    } else {
      this.gravity.turnRight(1);
    }
    // Check and clear any filled targets or lines
    this.gameOver = advanceAndCheckTargets({
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
    this.advanceCells();
    // Create new game objects
    this.createNewPiece();
    this.createNewTarget();
    this.updateCollisionTimer();
  }

  // increment times to live for each cell before converting to empty cell
  advanceCells() {
    for (var y = 0; y < this.boardSize; y++) {
      for (var x = 0; x < this.boardSize; x++) {
        var cell = this.board[y][x];
        if (cell.ttl != -1) {
          if (cell.ttl == 0) {
            var newCell = new EmptyCell();
            newCell.getAttributesFrom(this.board[y][x]);
            this.board[y][x] = newCell;
          } else {
            cell.advanceUpdate(true);
          }
        }
      }
    }
  }

  // Change the CoreState's grid values based on where the current piece is.
  place(piece) {
    if (piece != null) {
      if (piece.mainCell.type == CELL_TYPE.BOMB) {
        this.placeBomb(piece);
      } else if (this.currPiece.mainCell.type == CELL_TYPE.DRILL) {
        this.placeDrill(piece);
      } else {
        this.placeNormal(piece);
      }
    }
    this.placeBlock = false;
  }

  // Place a normal piece
  placeNormal(piece) {
    var [x, y] = [0, 0];
    for (const [pid, [x_, y_]] of piece.cells) {
      [x, y] = [x_ + this.currPiece.cx, y_ + this.currPiece.cy];
      if (inBounds(x, y, this.boardSize)) {
        var newCell = new NormalCell();
        newCell.getAttributesFrom(piece.mainCell);
        this.board[y][x] = newCell;
      }
    }
  }

  // Place a bomb and remove a square of length 2 * BOMB_RADIUS + 1
  placeBomb(piece) {
    for (
      var y = Math.max(0, piece.cy - BOMB_RADIUS);
      y < Math.min(this.boardSize, piece.cy + BOMB_RADIUS + 1);
      y++
    ) {
      for (
        var x = Math.max(0, piece.cx - BOMB_RADIUS);
        x < Math.min(this.boardSize, piece.cx + BOMB_RADIUS + 1);
        x++
      ) {
        this.board[y][x] = this.emptyValue();
      }
    }
  }

  // Remove all blocks in the current piece's path.
  placeDrill(piece) {
    dropzone(
      this.board,
      piece,
      this.gravity,
      (x, y) => {
        var newCell = new EmptyCell();
        newCell.getAttributesFrom(this.board[y][x]);
        this.board[y][x] = newCell;
      },
      true
    );
  }

  placeTower(piece) {
    dropzone(
      this.board,
      piece,
      this.gravity,
      (x, y) => {
        this.board[y][x] = piece.createCell();
        this.board[y][x].getAttributesFrom(piece.mainCell);
      },
      false
    );
  }
};

export default CoreState;
