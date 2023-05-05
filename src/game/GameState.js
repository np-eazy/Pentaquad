import { interpolateColor } from "../graphics/utils/Colors";
import { linInt } from "../graphics/utils/Functions";
import CoreState from "./coreState/CoreState";
import { callOnDropzone } from "./coreState/utils/Dropzone";
import { sample } from "./coreState/utils/Functions";
import { FALLING_COUNTDOWN, CELL_TYPE, BOARD_SIZE } from "./rules/Constants";

// A wrapper state for CoreState, which controls the advancement of the game. GameState
// controls the flow of CoreState to effectively slow down, speed up, pause the game,
// or leave intervals for graphic transitions.

export const Mode = {
  MAIN_MENU: 0,
  TUTORIAL: 1,
  SETTINGS: 2,
  SINGLE_PLAYER: 3,
}

const DIFFUSE_STEP_AMOUNT = 0.999;
const DIFFUSE_ITERATIONS = 50;
const INITIAL_Y_OFFSET = 120;
// Required props:
// - coreState: the CoreState of the game
// - controller: the GameController of the game
const GameState = class {
  constructor(props) {
    this.coreState = props.coreState;
    this.controller = props.controller;
    this.audioController = props.audioController;
    this.coreState.controller = this.controller;
    this.coreState.audioController = this.audioController;
    this.ticks = 0;
    this.isRunning = false;
    this.delayTimer = 0;
    this.setMode(Mode.MAIN_MENU);
    this.queueOffset = 0;
  }

  setMode(mode, props) {
    this.mode = mode;
    if (mode == Mode.MAIN_MENU) {

    } else if (mode == Mode.TUTORIAL) {

    } else if (mode == Mode.SETTINGS) {
      // this.isRunning = false; Commenting this out until we have another flag that says a game is currently going on
    } else if (mode == Mode.SINGLE_PLAYER) {
      if (props && props.startOver) {
        this.startOver();
      }
      this.isRunning = true;
    }
  }

  onPlacement() {
    this.yOffset += INITIAL_Y_OFFSET;
  }

  togglePause() {
    this.isRunning = !this.isRunning;
  }

  startOver() {
    this.coreState = new CoreState({});
    this.coreState.controller = this.controller;
    this.coreState.audioController = this.audioController;
    this.ticks = 0;
    this.isRunning = true;
    this.delayTimer = 0;
  }

  update() {
    if (this.isRunning && this.delayTimer <= 0 && !this.coreState.scorekeeper.gameOver) {
      // Update core logic
      this.coreState.update();
      this.ticks += 1;
      // Compute graphic props after core update
      this.unmarkBoard();
      this.markDropZone();
      for (var i = 0; i < DIFFUSE_ITERATIONS; i++) {
        this.diffuseColors();
      }
    } else {
      this.delayTimer -= 1;
    }
    return this;
  }

  // EmptyCells have marked fields set in order to render the drop
  // path of a piece; this should be called to clear the marks
  // before each frame when the piece could have moved elsewhere.
  unmarkBoard() {
    var board = this.coreState.board;
    for (var x = 0; x < BOARD_SIZE; x++) {
      for (var y = 0; y < BOARD_SIZE; y++) {
        board[y][x].marked = false;
      }
    }
  }
  // TODO (opt): only call this when the piece's position changes
  // TODO (opt): make less inBounds calls?
  markDropZone() {
    var piece = this.coreState.currPiece;
    if (piece && piece.mainCell.type != CELL_TYPE.GHOST) {
      callOnDropzone(
        this.coreState.board,
        this.coreState.currPiece,
        this.coreState.gravity,
        (x, y) => {
          this.coreState.board[y][x].marked = true;
          this.coreState.board[y][x].markerAngle = this.coreState.gravity.angle;
        }
      );
    }
  }

  diffuseColors() {
    // var [x0, y0] = sample();
    // var [x1, y1] = sample();
    // if (x0 != x1 && y0 != y1) {
    //   var [cell0, cell1] = [this.coreState.board[y0][x0], this.coreState.board[y1][x1]];
    //   if (cell0 && cell1 && cell0.type != CELL_TYPE.EMPTY && cell1.type != CELL_TYPE.EMPTY) {
    //     var [base0, base1] = [cell0.baseColor, cell1.baseColor];
    //     cell0.setBaseColor(interpolateColor(base0, base1, DIFFUSE_STEP_AMOUNT, linInt));
    //     cell0.updateCurrentColor();
    //     cell1.setBaseColor(interpolateColor(base0, base1, DIFFUSE_STEP_AMOUNT, linInt));
    //     cell1.updateCurrentColor();
    //   }
    // }
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
