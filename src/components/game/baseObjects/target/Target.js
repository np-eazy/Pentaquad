import GhostCell from "../../baseObjects/cell/GhostCell";
import BombCell from "../../baseObjects/cell/BombCell";
import DrillCell from "../../baseObjects/cell/DrillCell";
import TowerCell from "../../baseObjects/cell/TowerCell";

import { inBounds, randint } from "../../coreState/utils/Functions";
import { drawRect, outlineRect } from "../../graphics/Pipeline";
import { EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR } from "../../graphics/Theme";
import { interpolateColor } from "../../graphics/utils/Colors";
import { linInt, sinusoid } from "../../graphics/utils/Functions";
import { BOARD_X0, BOARD_Y0 } from "../../graphics/Layout";
import { CELL_TYPE } from "../../Constants";
import { generatePowerupCellType } from "../../coreState/RandomGeneration";

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
};
const POWERUP_OFFSET = 4;
const POWERUP_WAVE = {
  level: 0.5,
  frequency: 0.05,
  amplitude: 0.4,
};
const CLOCK_FREQ = 0.01;

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
    this.mainCell = this.generateCell();
    this.mainCell.setBaseColor(EMPTY_COLOR);
    this.isMounted = false;
    this.isFilled = false;
    this.isCleared = false;
    this.isGrowing = props.isGrowing ? true : false;

    this.timer = 0;
  }

  generateCell() {
    var type = generatePowerupCellType();
    if (type == CELL_TYPE.GHOST) {
      return new GhostCell();
    } else if (type == CELL_TYPE.BOMB) {
      return new BombCell();
    } else if (type == CELL_TYPE.DRILL) {
      return new DrillCell();
    } else if (type == CELL_TYPE.TOWER) {
      return new TowerCell();
    }
  }

  mount() {
    this.mounted = true;
  }

  // Update attributes each frame to get animated renders; right now not implemented.
  idleUpdate() {
    this.timer += 1;
    if (this.mainCell) {
      this.mainCell.idleUpdate();
    }
  }

  // Not really a relevant method for targets which don't have any meaningful graphics for when a piece falls down a step,
  // but keeping it here for sake of convention matching with Cell.
  activeUpdate() {}

  // To be called once each time the coreState updates; either the isFilled flag goes up or it continues to grow.
  // Currently, a Target only grows but others can be implemented to disappear or give the user power-ups upon being cleared.
  advanceUpdate() {
    if (this.checkFill(this.coreState.board)) {
      this.isFilled = true;
    } else {
      this.ticksLeft -= 1;
      if (this.ticksLeft == 0) {
        this.ticksLeft = this.ticksToGrowth;
        if (this.isGrowing) {
          this.grow();
        } else {
          this.isCleared = true;
        }
      }
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

  // Extend the corners out by one cell.
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
        this.renderWarning(canvas, xCellSize, yCellSize);
      }
      if (this.mainCell) {
        this.renderPowerup(canvas, xCellSize, yCellSize);
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
          linInt
        ).getHex()
      );
    }
  }

  // Render a flashing inset border if TTL is less than or equal to 3
  renderWarning(canvas, xCellSize, yCellSize) {
    outlineRect(
      canvas,
      BOARD_X0 + this.x0 * xCellSize - WARNING_BORDER_SIZE,
      BOARD_Y0 + this.y0 * yCellSize - WARNING_BORDER_SIZE,
      (this.x1 - this.x0) * xCellSize + 2 * WARNING_BORDER_SIZE,
      (this.y1 - this.y0) * yCellSize + 2 * WARNING_BORDER_SIZE,
      interpolateColor(
        MARKER_COLOR,
        FILLED_COLOR,
        sinusoid(
          this.ticksLeft == 3
            ? WARNING_WAVE_3
            : this.ticksLeft == 2
            ? WARNING_WAVE_2
            : WARNING_WAVE_1,
          this.timer
        ),
        linInt
      ).getHex()
    );
  }

  // If the Target is holding onto a Cell with a special ability, the Target
  // is rendered with an animation matching the type of cell it is holding.
  renderPowerup(canvas, xCellSize, yCellSize) {
    if (this.mainCell.type == CELL_TYPE.GHOST) {
      var borderColor = interpolateColor(
        EMPTY_COLOR,
        FILLED_COLOR,
        sinusoid(POWERUP_WAVE, this.timer),
        linInt
      );
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * xCellSize + POWERUP_OFFSET,
        BOARD_Y0 + this.y0 * yCellSize + POWERUP_OFFSET,
        (this.x1 - this.x0) * xCellSize - 2 * POWERUP_OFFSET,
        (this.y1 - this.y0) * yCellSize - 2 * POWERUP_OFFSET,
        borderColor.getHex()
      );
    } else if (this.mainCell.type == CELL_TYPE.BOMB) {
      var d = sinusoid(POWERUP_WAVE, this.timer);
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * xCellSize + d * POWERUP_OFFSET,
        BOARD_Y0 + this.y0 * yCellSize + d * POWERUP_OFFSET,
        (this.x1 - this.x0) * xCellSize - 2 * d * POWERUP_OFFSET,
        (this.y1 - this.y0) * yCellSize - 2 * d * POWERUP_OFFSET,
        FILLED_COLOR.getHex()
      );
      d *= 2;
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * xCellSize + d * POWERUP_OFFSET,
        BOARD_Y0 + this.y0 * yCellSize + d * POWERUP_OFFSET,
        (this.x1 - this.x0) * xCellSize - 2 * d * POWERUP_OFFSET,
        (this.y1 - this.y0) * yCellSize - 2 * d * POWERUP_OFFSET,
        FILLED_COLOR.getHex()
      );
    } else if (this.mainCell.type == CELL_TYPE.DRILL) {
      var width = (this.x1 - this.x0) * xCellSize;
      var innerLength = (((this.timer * CLOCK_FREQ) % 1) * width) / 2;
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * xCellSize + innerLength,
        BOARD_Y0 + this.y0 * yCellSize + innerLength,
        (this.x1 - this.x0) * xCellSize - 2 * innerLength,
        (this.y1 - this.y0) * yCellSize - 2 * innerLength,
        FILLED_COLOR.getHex()
      );
    } else if (this.mainCell.type == CELL_TYPE.TOWER) {
      var width = (this.x1 - this.x0) * xCellSize;
      var innerLength = ((1 - ((this.timer * CLOCK_FREQ) % 1)) * width) / 2;
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * xCellSize + innerLength,
        BOARD_Y0 + this.y0 * yCellSize + innerLength,
        (this.x1 - this.x0) * xCellSize - 2 * innerLength,
        (this.y1 - this.y0) * yCellSize - 2 * innerLength,
        FILLED_COLOR.getHex()
      );
    }
  }
}
export default Target;
