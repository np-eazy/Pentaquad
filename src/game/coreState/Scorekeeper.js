import { AudioEvents } from "../../audio/AudioEventController";
import { LEVEL_SCORE_THRESHOLDS, MAX_LEVELS } from "../rules/Levels";

export const MAX_STRIKES = 3;

const BASE_LINE_SCORE = 100;
const BASE_TARGET_SCORE = 250;

// A class which takes care of keeping score and strikes as the game progresses.

// This pattern has a lot of potential to extend into turn-based multiplayer on the same device (pass and play).

const Scorekeeper = class {
  constructor(props) {
    this.score = 0;
    this.lineCombo = 1;
    this.targetCombo = 1;
    this.strikes = 0;
    this.level = 1;
    this.coreState = props.coreState;
    this.gameOver = false;
  }

  // Check for level update thresholds
  levelUpdate() {
    if (this.level < MAX_LEVELS && this.score > LEVEL_SCORE_THRESHOLDS[this.coreState.settingsController.gameDifficulty][this.level - 1]) {
      this.level += 1;
      this.coreState.audioController.queueAudioEvent(AudioEvents.LEVEL_UP, {})
    }
  }

  // Add a score for the last cell placed, based on how far it was dropped.
  scoreDrop() {}

  // Add a score for all targets cleared in this placement, based on a combo.
  // This must receive a list each placement, if the list of cleared targets is
  // empty then reset the combo.
  scoreTargets(targetsCleared) {
    this.score +=
      (this.targetCombo *
        this.lineCombo *
        BASE_TARGET_SCORE *
        targetsCleared *
        (targetsCleared + 1)) /
      2;
    if (targetsCleared == 0) {
      this.targetCombo = 1;
    } else {
      this.targetCombo += targetsCleared;
    }
    this.levelUpdate();
  }

  // Add a score for all filled lines in this placement, which increases quadratically
  // with more simultaneous lines cleared. If no lines were cleared, the combo resets.
  scoreFilledLines(linesCleared) {
    this.score +=
      (this.targetCombo *
        this.lineCombo *
        BASE_LINE_SCORE *
        linesCleared *
        (linesCleared + 1)) /
      2;
    if (linesCleared == 0) {
      this.lineCombo = 1;
    } else {
      this.lineCombo += linesCleared;
    }
    this.levelUpdate();
  }

  // Keep log of strikes that would cause the game to be lost.
  strike() {
    this.strikes += 1;
    if (this.strikes >= MAX_STRIKES) {
      this.gameOver = true;
    }
  }
};

export default Scorekeeper;
