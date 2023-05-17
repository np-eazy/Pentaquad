import { Sound } from "../../../audio/AudioController";
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
          queue[i].mainCell = target.mainCell;
        }
      }
    } else if (target.isCleared) {
      coreState.audioController.queueSound(Sound.STRIKE);
      target.markTargetArea(board, coreState.emptyCellProvider);
      scorekeeper.strike();
      if (scorekeeper.gameOver) {
        coreState.audioController.queueSound(Sound.GAME_OVER);
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
  coreState.audioController.queueSound(clearedTargets > 1 ? Sound.CLEAR_MULTI_TARGET :
    clearedTargets == 1 ? Sound.CLEAR_SINGLE_TARGET : Sound.NOP);
  scorekeeper.scoreTargets(clearedTargets);
};
