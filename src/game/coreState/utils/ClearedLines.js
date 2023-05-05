import { Sound } from "../../../audio/AudioController";
import { BOARD_SIZE } from "../../rules/Constants";
import { Angle, Dxn } from "./Direction";

// Check for filled lines within a certain threshold and clear them Tetris-style, based
// on the current direction of gravity.
export const handleClearedLines = (coreState) => {
  var threshold = coreState.threshold;
  var board = coreState.board;
  var dxn = coreState.gravity;
  var scorekeeper = coreState.scorekeeper;

  var linesCleared = 0;
  if (dxn.isHorizontal()) {
    for (var x = 0; x < BOARD_SIZE; x++) {
      var count = 0;
      for (var y = 0; y < BOARD_SIZE; y++) {
        if (board[y][x].type > 0) {
          count += 1;
        }
      }
      // Horizontally shift everything on the left or the right of the cleared line
      if (count >= threshold) {
        linesCleared += 1;
        if (dxn.equals(Dxn[Angle.RIGHT])) {
          for (var i = x - 1; i >= 0; i--) {
            for (var y_ = 0; y_ < BOARD_SIZE; y_++) {
              // Give the row the cell adjacent to it and also set its offset to -1;
              // this will make it seem as if the cell did not change locations when it rendered,
              // but the smooth movement will come as idleUpdates decay the offset back to 0.
              board[y_][i + 1] = board[y_][i];
              board[y_][i + 1].xOffset = -1;
            }
          }
          for (var y_ = 0; y_ < BOARD_SIZE; y_++) {
            // There will be one row left at the "top" which will have to be filled with new empty values
            // after everything else is shifted down.
            board[y_][0] = coreState.emptyCellProvider.newCell();
            board[y_][0].xOffset = -1;
          }
          // The above block is effectively implemented once for each direction in the else-if blocks below.
        } else {
          for (var i = x + 1; i < BOARD_SIZE; i++) {
            for (var y_ = 0; y_ < BOARD_SIZE; y_++) {
              board[y_][i - 1] = board[y_][i];
              board[y_][i - 1].xOffset = 1;
            }
          }
          for (var y_ = 0; y_ < BOARD_SIZE; y_++) {
            board[y_][BOARD_SIZE - 1] = coreState.emptyCellProvider.newCell();
            board[y_][BOARD_SIZE - 1].xOffset = 1;
          }
        }
      }
    }
  } else {
    for (var y = 0; y < BOARD_SIZE; y++) {
      var count = 0;
      for (var x = 0; x < BOARD_SIZE; x++) {
        if (board[y][x].type > 0) {
          count += 1;
        }
      }
      // Vertically shift everything on the top or bottom of the cleared line
      if (count >= threshold) {
        linesCleared += 1;
        if (dxn.equals(Dxn[Angle.DOWN])) {
          for (var i = y - 1; i >= 0; i--) {
            for (var x_ = 0; x_ < BOARD_SIZE; x_++) {
              board[i + 1][x_] = board[i][x_];
              board[i + 1][x_].yOffset = -1;
            }
          }
          for (var x_ = 0; x_ < BOARD_SIZE; x_++) {
            board[0][x_] = coreState.emptyCellProvider.newCell();
            board[0][x_].yOffset = -1;
          }
        } else {
          for (var i = y + 1; i < BOARD_SIZE; i++) {
            for (var x_ = 0; x_ < BOARD_SIZE; x_++) {
              board[i - 1][x_] = board[i][x_];
              board[i - 1][x_].yOffset = 1;
            }
          }
          for (var x_ = 0; x_ < BOARD_SIZE; x_++) {
            board[BOARD_SIZE - 1][x_] = coreState.emptyCellProvider.newCell();
            board[BOARD_SIZE - 1][x_].yOffset = 1;
          }
        }
      }
    }
  }
  coreState.audioController.queueSound(linesCleared > 1 ? Sound.CLEAR_MULTI_TARGET :
    linesCleared == 1 ? Sound.CLEAR_SINGLE_TARGET : Sound.NOP);
  scorekeeper.scoreFilledLines(linesCleared);
};
