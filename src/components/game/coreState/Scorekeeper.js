const MAX_STRIKES = 3;

const BASE_LINE_SCORE = 100;
const BASE_TARGET_SCORE = 250;
const BASE_DROP_SCORE = 5;

// A class which takes care of keeping score and strikes
const Scorekeeper = class {
  constructor(props) {
    this.score = 0;
    this.lineCombo = 1;
    this.targetCombo = 1;
    this.strikes = 0;
    this.gameOver = false;
  }

  // Add a score for the last cell placed, based on how far it was dropped.
  scoreDrop() {}

  // Add a score for all targets cleared in this advancement, based on a combo.
  // This must receive a list each advancement, if the list of cleared targets is
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
  }

  // Add a score for all filled lines in this advancement, which increases quadratically
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
  }

  // Keep log of strikes that would cause the game to be lost.
  strike() {
    this.strikes += 1;
    if (this.strikes > MAX_STRIKES) {
      this.gameOver = true;
    }
  }
};

export default Scorekeeper;
