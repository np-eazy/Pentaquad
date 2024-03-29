import { FillMarker } from "../graphics/objects/FillMarker";
import { BLACK, EMPTY_COLOR } from "../graphics/theme/ColorScheme";
import {
  QUEUE_INITIAL_OFFSET,
  DIFFUSE_ITERATIONS,
  DIFFUSE_RANGE,
  DIFFUSE_STEP_AMOUNT,
} from "../graphics/theme/Dynamics";
import { interpolateColor } from "../graphics/utils/Colors";
import { linInt } from "../graphics/utils/Functions";
import { Setting } from "./control/SettingsController";
import { idleUpdateBoundarySets } from "./coreObjects/Boundary";
import Piece from "./coreObjects/Piece";
import DrillCell from "./coreObjects/cell/DrillCell";
import TowerCell from "./coreObjects/cell/TowerCell";
import Target from "./coreObjects/target/Target";
import CoreState from "./coreState/CoreState";
import { callOnDropzone } from "./coreState/utils/Dropzone";
import { inBounds, sample, sampleAround } from "./coreState/utils/Functions";
import { CELL_TYPE, GLOBAL_SIZE } from "./rules/Constants";

// A wrapper state for CoreState, which controls the advancement of the game. GameState
// controls the flow of CoreState to effectively slow down, speed up, pause the game,
// or leave intervals for graphic transitions.

export const Mode = {
  MAIN_MENU: 0,
  TUTORIAL: 1,
  SETTINGS: 2,
  SINGLE_PLAYER: 3,
  GAME_OVER: 4,
};

// Required props:
// - controller: the GameController of the game
// - audioController: the AudioController of the game
// - settingsController: the SettingsController of the game

const GameState = class {
  constructor(props) {
    this.controller = props.controller;
    this.audioController = props.audioController;
    this.settingsController = props.settingsController;
    this.coreState = new CoreState({
      gameState: this,
      controller: props.controller,
      audioController: props.audioController,
      settingsController: props.settingsController,
    });
    this.ticks = 0;
    this.isRunning = false;
    this.delayTimer = 0;
    this.setMode(Mode.MAIN_MENU);
    this.queueOffset = 0;
    this.fillMarkers = [];
  }

  startOver() {
    this.controller.reset();
    this.audioController.reset();
    this.coreState = new CoreState({
      gameState: this,
      controller: this.controller,
      audioController: this.audioController,
      settingsController: this.settingsController,
    });
    this.ticks = 0;
    this.isRunning = false;
    this.delayTimer = 0;
    this.queueOffset = 0;
    this.fillMarkers = [];
  }

  // A special mode which creates a setup for a tutorial
  setupTutorial() {
    this.startOver();
    this.isRunning = false;
    for (var i = 0; i < 5; i++) {
      this.coreState.pieceProvider.queue.unshift(
        new Piece(5 - i, this.coreState)
      );
    }
    var smallTarget = new Target({
      x0: 13,
      y0: 13,
      x1: 15,
      y1: 15,
    });
    smallTarget.mainCell = new DrillCell(this.coreState);
    smallTarget.activate();
    var bigTarget = new Target({
      x0: 3,
      y0: 11,
      x1: 7,
      y1: 15,
    });
    bigTarget.mainCell = new TowerCell(this.coreState);
    bigTarget.activate();
    this.coreState.targets = [smallTarget, bigTarget];
  }

  // Set the display mode of this game (NOT game mode). 
  setMode(mode, props) {
    var prevMode = this.mode;
    this.mode = mode;
    if (mode == Mode.MAIN_MENU) {
      if (prevMode == Mode.GAME_OVER) {
        this.startOver();
        this.isRunning = false;
      }
    } else if (mode == Mode.TUTORIAL) {
      this.setupTutorial();
    } else if (mode == Mode.SETTINGS) {
    } else if (mode == Mode.SINGLE_PLAYER) {
      if (props && props.startOver) {
        this.startOver();
      }
      this.isRunning = true;
    } else if (mode == Mode.GAME_OVER) {
      //this.isRunning = false;
    }
  }

  // Globally reset all the cells' base colors in the board.
  resetBaseColors() {
    for (var y = 0; y < this.coreState.board.length; y++) {
      for (var x = 0; x < this.coreState.board[y].length; x++) {
        if (this.coreState.board[y][x].type == CELL_TYPE.EMPTY) {
          this.coreState.board[y][x].baseColor = EMPTY_COLOR;
          this.coreState.board[y][x].lightColor = BLACK;
          this.coreState.board[y][x].updateCurrentColor();
          this.coreState.board[y][x].updateColorSuite();
        }
      }
    }
  }

  // Add a y offset to the piece queue to initiate a sliding animation.
  onPlacement() {
    this.yOffset += QUEUE_INITIAL_OFFSET;
  }

  togglePause() {
    this.isRunning = !this.isRunning;
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

  // EmptyCells have marked fields set in order to render the drop
  // path of a piece; this should be called to clear the marks
  // before each frame when the piece could have moved elsewhere.
  unmarkBoard() {
    var board = this.coreState.board;
    for (var x = 0; x < GLOBAL_SIZE; x++) {
      for (var y = 0; y < GLOBAL_SIZE; y++) {
        board[y][x].marked = false;
      }
    }
  }

  // TODO (opt): only call this when the piece's position changes
  markDropZone() {
    var piece = this.coreState.currPiece;
    if (piece && piece.mainCell.type != CELL_TYPE.GHOST) {
      callOnDropzone(
        this.coreState.board,
        this.coreState.currPiece,
        this.coreState.gravity,
        (x, y) => {
          this.coreState.board[y][x].marked = piece.mainCell.type;
          this.coreState.board[y][x].markerAngle = this.coreState.gravity.angle;
        },
        piece.mainCell.type == CELL_TYPE.DRILL
      );
    }
  }

  // Randomly sample a pair of nearby Cells in the grid and mix their colors
  randomColorSwap() {
    var [x0, y0] = sample();
    if (this.coreState.board[y0][x0].type == CELL_TYPE.EMPTY) {
      var [x1, y1] = sampleAround(x0, y0, DIFFUSE_RANGE);
      if (inBounds(x1, y1, GLOBAL_SIZE)) {
        if (x0 != x1 && y0 != y1) {
          var [cell0, cell1] = [
            this.coreState.board[y0][x0],
            this.coreState.board[y1][x1],
          ];
          var [base0, base1] = [cell0.baseColor, cell1.baseColor];
          if (cell0.type == CELL_TYPE.EMPTY)
            cell0.setBaseColor(
              interpolateColor(base0, base1, DIFFUSE_STEP_AMOUNT, linInt)
            );
          cell0.updateCurrentColor();
          if (cell1.type == CELL_TYPE.EMPTY)
            cell1.setBaseColor(
              interpolateColor(base1, base0, DIFFUSE_STEP_AMOUNT, linInt)
            );
          cell1.updateCurrentColor();
        }
      }
    }
  }

  // Add a graphic for when a row is filled.
  rowFillMarker(i) {
    this.fillMarkers.push(new FillMarker(true, i));
  }

  // Add a column graphic for when a row is filled.
  colFillMarker(i) {
    this.fillMarkers.push(new FillMarker(false, i));
  }

  updateFillMarkers() {
    this.fillMarkers.forEach((fillMarker) => {
      fillMarker.idleUpdate();
    });
    if (this.fillMarkers.length > 0 && this.fillMarkers[0].ttl <= 0) {
      this.fillMarkers.shift();
    }
  }

  // Single update loop of the GameState; it calls CoreState to update then does follow-up logic based
  // on graphics and display mode.
  update() {
    if (
      this.isRunning &&
      this.delayTimer <= 0 &&
      this.coreState &&
      !this.coreState.scorekeeper.gameOver
    ) {
      // Update core logic
      this.coreState.update();
      this.ticks += 1;
      // Compute graphic props after core update
      this.unmarkBoard();
      this.markDropZone();
      this.updateFillMarkers();
      idleUpdateBoundarySets(this.coreState.collisionSets);
      if (this.settingsController.graphicsLevel == Setting.HIGH) {
        for (var i = 0; i < DIFFUSE_ITERATIONS; i++) {
          this.randomColorSwap();
        }
      }
    } else {
      if (this.coreState.scorekeeper.gameOver) {
        this.setMode(Mode.GAME_OVER);
      }
      this.delayTimer -= 1;
    }
    return this;
  }
};

export default GameState;
