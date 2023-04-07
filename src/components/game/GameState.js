import { ADVANCE_TIME } from "./Constants";
import { dropzone } from "./coreState/utils/Dropzone";
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
      dropzone(
        this.coreState.board, 
        this.coreState.currPiece, 
        this.coreState.gravity, 
        (cell) => {
          cell.props.marked = true;
          cell.props.markerAngle = this.coreState.gravity.angle;
        });
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
