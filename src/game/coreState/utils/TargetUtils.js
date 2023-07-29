import { AudioEvents } from "../../../audio/AudioEventController";
import { CELL_TYPE } from "../../rules/Constants";

// Check all filled targets, remove them from targetBlocks, and erase all
// covered cells to replace with a call to newCell
export const handleClearedTargets = (coreState) => {
  var targets = coreState.targets;
  var board = coreState.board;
  var scorekeeper = coreState.scorekeeper;
  var queue = coreState.pieceProvider.queue;

  targets.forEach((target) => target.placementUpdate());
  // Clear the targets in a 2nd pass so that the player can hit combos on targets in the same move.
  var clearedTargets = 0;
  targets.forEach((target) => {
    if (target.isFilled) {
      clearedTargets += 1;
      target.clear(coreState, board, coreState.emptyCellProvider);
      if (target.mainCell) {
        var i = 0;
        while (i < queue.length && queue[i].mainCell.type != CELL_TYPE.NORMAL) {
          i += 1;
        }
        if (i < queue.length) {
          queue[i].upgradeTo(target.mainCell);
        }
      }
    } else if (target.isCleared) {
      coreState.audioController.queueAudioEvent(AudioEvents.STRIKE, {});
      target.markTargetArea(board, coreState.emptyCellProvider);
      scorekeeper.strike();
      if (scorekeeper.gameOver) {
        coreState.audioController.queueAudioEvent(AudioEvents.GAME_OVER, {});
      }
    }
  });
  var i = 0;
  while (i < targets.length) {
    if (targets[i].isCleared) {
      targets.splice(i, 1);
    } else {
      i += 1;
    }
  }
  coreState.audioController.queueAudioEvent(clearedTargets > 1 ? AudioEvents.CLEAR_MULTI_TARGET :
    clearedTargets == 1 ? AudioEvents.CLEAR_SINGLE_TARGET : AudioEvents.NOP, {});
  scorekeeper.scoreTargets(clearedTargets);
};

export const validateTargetBounds = (coreState, x0, y0, x1, y1) => {
  for (var i = 0; i < coreState.targets.length; i++) {
    var t = coreState.targets[i];
    if (isOverlap(t, x0, y0, x1, y1)) {
      return false;
    }
  }
  for (var i = 0; i < coreState.targetProvider.nextTargets.length; i++) {
    var t = coreState.targetProvider.nextTargets[i];
    if (isOverlap(t, x0, y0, x1, y1)) {
      return false;
    }
  }
  return true;
}


const MARGIN = 0
const isOverlap = (target, x0, y0, x1, y1) => {
  let [left1, top1, right1, bottom1] = [x0, y0, x1, y1];
  let [left2, top2, right2, bottom2] = [target.x0- MARGIN, target.y0- MARGIN, target.x1+ MARGIN, target.y1+ MARGIN];
  // The first rectangle is under the second or vice versa
  if ((top1 < bottom2 || top2 < bottom1) && (right1 < left2 || right2 < left1)) {
    console.log(target, x0, y0, x1, y1)
    return false;
  }

  // Rectangles overlap
  return true;
}

