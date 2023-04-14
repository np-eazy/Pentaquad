import { Angle, Dxn } from "./Direction";

// Check for filled lines within a certain threshold and clear them Tetris-style, based
// on the current direction of gravity.
export const checkFilledLines = ({
  threshold,
  dxn,
  boardSize,
  board,
  emptyValue,
}) => {
  if (dxn.isHorizontal()) {
    for (var x = 0; x < boardSize; x++) {
      var count = 0;
      for (var y = 0; y < boardSize; y++) {
        if (board[y][x].type > 0) {
          count += 1;
        }
      }
      // Horizontally shift everything on the left or the right of the cleared line
      if (count >= threshold) {
        if (dxn.equals(Dxn[Angle.RIGHT])) {
          for (var i = x - 1; i >= 0; i--) {
            for (var y_ = 0; y_ < boardSize; y_++) {
              // Give the row the cell adjacent to it and also set its offset to -1;
              // this will make it seem as if the cell did not change locations when it rendered,
              // but the smooth movement will come as idleUpdates decay the offset back to 0.
              board[y_][i + 1] = board[y_][i];
              board[y_][i + 1].xOffset = -1;
            }
          }
          for (var y_ = 0; y_ < boardSize; y_++) {
            // There will be one row left at the "top" which will have to be filled with new empty values
            // after everything else is shifted down.
            board[y_][0] = emptyValue();
            board[y_][0].xOffset = -1;
          }
          // The above block is effectively implemented once for each direction in the else-if blocks below.
        } else {
          for (var i = x + 1; i < boardSize; i++) {
            for (var y_ = 0; y_ < boardSize; y_++) {
              board[y_][i - 1] = board[y_][i];
              board[y_][i - 1].xOffset = 1;
            }
          }
          for (var y_ = 0; y_ < boardSize; y_++) {
            board[y_][boardSize - 1] = emptyValue();
            board[y_][boardSize - 1].xOffset = 1;
          }
        }
      }
    }
  } else {
    for (var y = 0; y < boardSize; y++) {
      var count = 0;
      for (var x = 0; x < boardSize; x++) {
        if (board[y][x].type > 0) {
          count += 1;
        }
      }
      // Vertically shift everything on the top or bottom of the cleared line
      if (count >= threshold) {
        if (dxn.equals(Dxn[Angle.DOWN])) {
          for (var i = y - 1; i >= 0; i--) {
            for (var x_ = 0; x_ < boardSize; x_++) {
              board[i + 1][x_] = board[i][x_];
              board[i + 1][x_].yOffset = -1;
            }
          }
          for (var x_ = 0; x_ < boardSize; x_++) {
            board[0][x_] = emptyValue();
            board[0][x_].yOffset = -1;
          }
        } else {
          for (var i = y + 1; i < boardSize; i++) {
            for (var x_ = 0; x_ < boardSize; x_++) {
              board[i - 1][x_] = board[i][x_];
              board[i - 1][x_].yOffset = 1;
            }
          }
          for (var x_ = 0; x_ < boardSize; x_++) {
            board[boardSize - 1][x_] = emptyValue();
            board[boardSize - 1][x_].yOffset = 1;
          }
        }
        break;
      }
    }
  }
};

// Check all filled targets, remove them from targetBlocks, and erase all
// covered cells to replace with a call to emptyValue
export const advanceAndCheckTargets = ({ targets, board, emptyValue }) => {
  var gameOver = false;
  targets.forEach((target) => target.advanceUpdate());
  // Clear the targets in a 2nd pass so that the player can hit combos on targets in the same move.
  targets.forEach((target) => {
    if (target.isFilled) {
      target.clear(board, emptyValue);
    } else if (target.isGameOver) {
      gameOver = true;
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
  return gameOver;
};
