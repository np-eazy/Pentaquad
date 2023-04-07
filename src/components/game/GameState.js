import { ADVANCE_TIME } from "./Constants";
import { inBounds } from "./coreState/utils/Functions";
// A wrapper state for CoreState, which controls the advancement of the game. GameState
// controls the flow of CoreState to effectively slow down, speed up, pause the game,
// or leave intervals for graphic transitions.

// Required props:
// - coreState: the CoreState of the game
// - controller: the GameController of the game

const GameState = class {
  constructor(props) {
    this.coreState = props.coreState;
    this.controller = props.controller;
    this.coreState.controller = this.controller;
    this.ticksToMove = props.ticksToMove ? props.ticksToMove : ADVANCE_TIME;
    this.ticks = 0;
    this.isRunning = true;
    this.delayTimer = 0;
  }

  update() {
    if (this.isRunning && this.delayTimer <= 0) {
      // Update core logic
      this.coreState.update(this.ticks % this.ticksToMove == 0);
      this.ticks += 1;
      // Compute graphic props after core update
      this.unmarkBoard();
      this.markDropZone();
    } else {
      this.delayTimer -= 1;
    }
    return this;
  }

  unmarkBoard() {
    var board = this.coreState.board;
    for (var x = 0; x < this.coreState.boardSize; x++) {
      for (var y = 0; y < this.coreState.boardSize; y++) {
        board[y][x].props.marked = false;
      }
    }
  }
  // TODO (opt): only call this when the piece's position changes
  // TODO (opt): make less inBounds calls?
  markDropZone() {
    var piece = this.coreState.currPiece;
    if (piece && piece.mainCell.type != 2) {
      var alreadyCovered = new Set();
      var counter = 0;
      var [dx, dy] = this.coreState.gravity.getDiff();
      for (const cell of piece.cells) {
        var [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy];
        var index = this.coreState.gravity.isHorizontal() ? y : x;
        if (!alreadyCovered.has(index)) {
          alreadyCovered.add(index);
          while (
            inBounds(x, y, this.coreState.boardSize) &&
            this.coreState.board[y][x].type == 0
          ) {
            // Traverse in the falling direction of this piece to mark all empty pieces under it.
            var cellProps = this.coreState.board[y][x].props;
            cellProps.marked = true;
            cellProps.markerAngle = this.coreState.gravity.angle;

            x += dx;
            y += dy;
          }
        }
        counter += 1;
      }
    }
  }

  // Delay any actions for the next t ticks to leave room for graphic transitions.
  setDelayTimer(t) {
    this.delayTimer = t;
  }

  // Pause/resume the game
  toggleRunningFlag() {
    this.isRunning = !this.isRunning;
  }

  executeAction(action) {
    this.coreState.executeAction();
  }
};

export default GameState;
