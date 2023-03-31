import { ADVANCE_TIME } from "./Constants";
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
      this.coreState.update(this.ticks % this.ticksToMove == 0);
      this.ticks += 1;
    } else {
      this.delayTimer -= 1;
    }
    return this;
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
