import { inBounds } from "../../coreState/utils/Functions";
import { outlineRect } from "../../graphics/Pipeline";
import { FILLED_COLOR, MARKER_COLOR } from "../../graphics/Theme";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt, sinusoid } from "../../graphics/utils/Functions";
import {
  BOARD_X0,
  BOARD_Y0,
} from "../../graphics/Layout";

const BORDER_COLOR = FILLED_COLOR;
const WARNING_BORDER_SIZE = 4;
const WARNING_WAVE_3 = {
  level: 0.5,
  frequency: 0.05,
  amplitude: 0.2,
};
const WARNING_WAVE_2 = {
  level: 0.5,
  frequency: 0.2,
  amplitude: 0.3,
};
const WARNING_WAVE_1 = {
  level: 0.5,
  frequency: 0.5,
  amplitude: 0.5,
};

const UNMOUNT_WAVE = {
  level: 0.2,
  frequency: 0.05,
  amplitude: 0.1,
}


// A single block whose corner bounds must be filled with Cells to achieve game objectives.
class Target {
  constructor(props) {
    this.coreState = props.coreState;
    this.boardSize = props.coreState.boardSize;
    this.x0 = props.x0;
    this.y0 = props.y0;
    this.x1 = props.x1;
    this.y1 = props.y1;

    // Similar to a lifetime-TTL loop, except each time it completes the Target's bounds grow,
    // making it harder to fill up. This can change
    this.ticksToGrowth = props.ticksToGrowth;
    this.ticksLeft = this.ticksToGrowth;
    this.isMounted = false;
    this.isGameOver = false;
    this.isFilled = false;
    this.isCleared = false;

    this.timer = 0;
  }

  mount() {
    this.mounted = true;
  }

  // Update attributes each frame to get animated renders; right now not implemented.
  idleUpdate() {
    this.timer += 1;
  }

  // Not really a relevant method for targets which don't have any meaningful graphics for when a piece falls down a step,
  // but keeping it here for sake of convention matching with Cell.
  activeUpdate() {}

  // To be called once each time the coreState updates; either the isFilled flag goes up or it continues to grow.
  // Currently, a Target only grows but others can be implemented to disappear or give the user power-ups upon being cleared.
  advanceUpdate() {
    if (this.checkFill(this.coreState.board)) {
      this.isFilled = true;
    } else if (!this.isGameOver) {
      this.ticksLeft -= 1;
      if (this.ticksLeft == 0) {
        this.ticksLeft = this.ticksToGrowth;
        this.grow();
      }
    }
  }

  // Check that every spot covered by this TargetBlock is "filled" with a Cell of type > 0, signifying that
  // it is not empty
  checkFill(board) {
    console.log(this.x0, this.y0, this.x1, this.y1);
    for (var x = this.x0; x < this.x1; x++) {
      for (var y = this.y0; y < this.y1; y++) {
        if (!board[y][x] || board[y][x].type < 1) {
          return false;
        }
      }
    }
    console.log("filled");
    return true;
  }

  // Clear the cells this TargetBlock covers and set its cleared flag to True
  clear(board, fillCell) {
    for (var x = this.x0 - 1; x < this.x1 + 1; x++) {
      for (var y = this.y0 - 1; y < this.y1 + 1; y++) {
        if (inBounds(x, y, this.boardSize)) {
          board[y][x] = fillCell();
        }
      }
    }
    this.isCleared = true;
  }

  // Extend the corners out by one cell. If any corner leaves the bounds of the game's board, GameOver flag goes up.
  grow() {
    if (inBounds(this.x0 - 1, this.y0 - 1, this.boardSize)) {
      this.x0 -= 1;
      this.y0 -= 1;
    }
    if (inBounds(this.x1 + 1, this.y1 + 1, this.boardSize)) {
      this.x1 += 1;
      this.y1 += 1;
    }
  }

  render(canvas, xCellSize, yCellSize) {
    if (this.mounted) {
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * xCellSize,
        BOARD_Y0 + this.y0 * yCellSize,
        (this.x1 - this.x0) * xCellSize,
        (this.y1 - this.y0) * yCellSize,
        BORDER_COLOR.getHex()
      );
      outlineRect(
        canvas,
        BOARD_X0 + (this.x0 - 1) * xCellSize,
        BOARD_Y0 + (this.y0 - 1) * yCellSize,
        (this.x1 - this.x0 + 2) * xCellSize,
        (this.y1 - this.y0 + 2) * yCellSize,
        MARKER_COLOR.getHex()
      );
      
      if (this.ticksLeft <= 3) {
        outlineRect(
          canvas,
          BOARD_X0 + (this.x0) * xCellSize - WARNING_BORDER_SIZE,
          BOARD_Y0 + (this.y0) * yCellSize - WARNING_BORDER_SIZE,
          (this.x1 - this.x0) * xCellSize + 2 * WARNING_BORDER_SIZE,
          (this.y1 - this.y0) * yCellSize + 2 * WARNING_BORDER_SIZE,
          interpolateColor(
            MARKER_COLOR,
            FILLED_COLOR,
            sinusoid(this.ticksLeft == 3 ? WARNING_WAVE_3 :
              this.ticksLeft == 2 ? WARNING_WAVE_2 :
              WARNING_WAVE_1, this.timer),
            linInt,
          ).getHex()
        );
      }
    } else {
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * xCellSize,
        BOARD_Y0 + this.y0 * yCellSize,
        (this.x1 - this.x0) * xCellSize,
        (this.y1 - this.y0) * yCellSize,
        interpolateColor(
          MARKER_COLOR,
          FILLED_COLOR,
          sinusoid(UNMOUNT_WAVE, this.timer),
          linInt,
        ).getHex()
      );
    }
  }
}
export default Target;
