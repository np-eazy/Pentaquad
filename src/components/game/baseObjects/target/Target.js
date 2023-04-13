// The primary objective of this game is not to fill up lines but to fill up rectangle-shaped TargetBlocks,

import { outlineRect } from "../../graphics/Pipeline";
import { FILLED_COLOR } from "../../graphics/Theme";
import { Color } from "../../graphics/utils/Colors";


const BORDER_COLOR = FILLED_COLOR;
// which grow over time and end the game once they exceed the bounds of the board.
class Target {
  constructor(props) {
    this.coreState = props.coreState;
    this.boardSize = props.coreState.boardSize;
    this.x0 = props.x0;
    this.y0 = props.y0;
    this.x1 = props.x1;
    this.y1 = props.y1;

    this.ticksToGrowth = props.ticksToGrowth;
    this.ticksLeft = this.ticksToGrowth;
    this.isGameOver = false;
    this.isFilled = false;
    this.isCleared = false;
  }

  idleUpdate() {

  }

  activeUpdate() {

  }

  // To be called once each time the coreState updates; either the isFilled flag goes up or it continues to grow.
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

  // Extend the corners out by one cell. If any corner leaves the bounds of the game's board, GameOver flag goes up.
  grow() {
    if (this.x0 > 0 && this.y0 > 0) {
      this.x0 -= 1;
      this.y0 -= 1;
    } else {
      this.isGameOver = true;
    }
    if (this.x1 < this.boardSize - 1 && this.y1 < this.boardSize - 1) {
      this.x1 += 1;
      this.y1 += 1;
    } else {
      this.isGameOver = true;
    }
  }

  // Check that every spot covered by this TargetBlock is "filled" with a Cell of type > 0, signifying that
  // it is not empty
  checkFill(board) {
    for (var x = this.x0; x < this.x1; x++) {
      for (var y = this.y0; y < this.y1; y++) {
        if (!board[y][x] || board[y][x].type < 1) {
          return false;
        }
      }
    }
    return true;
  }

  // Clear the cells this TargetBlock covers and set its cleared flag to True
  // TODO: Is it better to have this method in CoreState or TargetBlock?
  clear(board, fillCell) {
    for (var x = this.x0; x < this.x1; x++) {
      for (var y = this.y0; y < this.y1; y++) {
        board[y][x] = fillCell();
      }
    }
    this.isCleared = true;
  }


  render(canvas, xCellSize, yCellSize) {
    outlineRect(
      canvas,
      this.x0 * xCellSize,
      this.y0 * yCellSize,
      (this.x1 - this.x0) * xCellSize,
      (this.y1 - this.y0) * yCellSize,
      BORDER_COLOR.getHex(),
    );
  }
}
export default Target;
