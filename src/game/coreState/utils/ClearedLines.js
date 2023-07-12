import { AudioEvents } from "../../../audio/AudioEventController";
import { BOARD_MARGIN, GLOBAL_SIZE } from "../../rules/Constants";
import { Angle, Dxn } from "./Direction";

// Check for filled lines within a certain threshold and clear them Tetris-style, based
// on the current direction of gravity.
export const handleClearedLines = (coreState) => {
  var threshold = coreState.lineClearThreshold;
  var board = coreState.board;
  var dxn = coreState.gravity;
  var scorekeeper = coreState.scorekeeper;

  var linesCleared = 0;
  if (dxn.isHorizontal()) {
    for (var x = BOARD_MARGIN; x < GLOBAL_SIZE - BOARD_MARGIN; x++) {
      var count = 0;
      for (var y = BOARD_MARGIN; y < GLOBAL_SIZE - BOARD_MARGIN; y++) {
        if (board[y][x].type > 0) {
          count += 1;
        }
      }
      // Horizontally shift everything on the left or the right of the cleared line
      if (count >= threshold) {
        linesCleared += 1;
        if (dxn.equals(Dxn[Angle.RIGHT])) {
          for (var i = x - 1; i >= BOARD_MARGIN; i--) {
            for (var y_ = BOARD_MARGIN; y_ < GLOBAL_SIZE - BOARD_MARGIN; y_++) {
              // Give the row the cell adjacent to it and also set its offset to -1;
              // this will make it seem as if the cell did not change locations when it rendered,
              // but the smooth movement will come as idleUpdates decay the offset back to 0.
              board[y_][i + 1] = board[y_][i];
              board[y_][i + 1].xOffset = -1;
            }
          }
          for (var y_ = BOARD_MARGIN; y_ < GLOBAL_SIZE - BOARD_MARGIN; y_++) {
            // There will be one row left at the "top" which will have to be filled with new empty values
            // after everything else is shifted down.
            board[y_][BOARD_MARGIN] = coreState.emptyCellProvider.generateCell(coreState);
            board[y_][BOARD_MARGIN].xOffset = -1;
          }
          // The above block is effectively implemented once for each direction in the else-if blocks below.
        } else {
          for (var i = x + 1; i < GLOBAL_SIZE - BOARD_MARGIN; i++) {
            for (var y_ = BOARD_MARGIN; y_ < GLOBAL_SIZE - BOARD_MARGIN; y_++) {
              board[y_][i - 1] = board[y_][i];
              board[y_][i - 1].xOffset = 1;
            }
          }
          for (var y_ = BOARD_MARGIN; y_ < GLOBAL_SIZE - BOARD_MARGIN; y_++) {
            board[y_][GLOBAL_SIZE - BOARD_MARGIN - 1] = coreState.emptyCellProvider.generateCell(coreState);
            board[y_][GLOBAL_SIZE - BOARD_MARGIN - 1].xOffset = 1;
          }
        }
      }
    }
  } else {
    for (var y = BOARD_MARGIN; y < GLOBAL_SIZE - BOARD_MARGIN; y++) {
      var count = 0;
      for (var x = BOARD_MARGIN; x < GLOBAL_SIZE - BOARD_MARGIN; x++) {
        if (board[y][x].type > 0) {
          count += 1;
        }
      }
      // Vertically shift everything on the top or bottom of the cleared line
      if (count >= threshold) {
        linesCleared += 1;
        if (dxn.equals(Dxn[Angle.DOWN])) {
          for (var i = y - 1; i >= 0; i--) {
            for (var x_ = BOARD_MARGIN; x_ < GLOBAL_SIZE - BOARD_MARGIN; x_++) {
              board[i + 1][x_] = board[i][x_];
              board[i + 1][x_].yOffset = -1;
            }
          }
          for (var x_ = BOARD_MARGIN; x_ < GLOBAL_SIZE - BOARD_MARGIN; x_++) {
            board[BOARD_MARGIN][x_] = coreState.emptyCellProvider.generateCell(coreState);
            board[BOARD_MARGIN][x_].yOffset = -1;
          }
        } else {
          for (var i = y + 1; i < GLOBAL_SIZE - BOARD_MARGIN; i++) {
            for (var x_ = BOARD_MARGIN; x_ < GLOBAL_SIZE - BOARD_MARGIN; x_++) {
              board[i - 1][x_] = board[i][x_];
              board[i - 1][x_].yOffset = 1;
            }
          }
          for (var x_ = BOARD_MARGIN; x_ < GLOBAL_SIZE - BOARD_MARGIN; x_++) {
            board[GLOBAL_SIZE - BOARD_MARGIN - 1][x_] = coreState.emptyCellProvider.generateCell(coreState);
            board[GLOBAL_SIZE - BOARD_MARGIN - 1][x_].yOffset = 1;
          }
        }
      }
    }
  }
  coreState.audioController.queueAudioEvent(linesCleared > 1 ? AudioEvents.CLEAR_MULTI_TARGET :
    linesCleared == 1 ? AudioEvents.CLEAR_SINGLE_TARGET : AudioEvents.NOP, {});
  scorekeeper.scoreFilledLines(linesCleared);
};
