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
      target.clear(board, this.emptyCellProvider.newCell);
      if (target.mainCell) {
        var i = 0;
        while (i < queue.length &&
          queue[i].mainCell.type != CELL_TYPE.NORMAL) {
          i += 1;
        }
        if (i < queue.length) {
          queue[i].mainCell = target.mainCell;
        }
      }
    } else if (target.isCleared) {
      scorekeeper.strike();
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
  scorekeeper.scoreTargets(clearedTargets);
};
