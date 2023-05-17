import GhostCell from "../cell/GhostCell";
import BombCell from "../cell/BombCell";
import DrillCell from "../cell/DrillCell";
import TowerCell from "../cell/TowerCell";

import { inBounds } from "../../coreState/utils/Functions";
import {
  outlineRect,
  outlineRectOffset,
} from "../../../graphics/CanvasPipeline";
import { EMPTY_COLOR, FILLED_COLOR, MARKER_COLOR } from "../../../graphics/theme/ColorScheme";
import { interpolateColor } from "../../../graphics/utils/Colors";
import { linInt, sinusoid } from "../../../graphics/utils/Functions";
import { BOARD_X0, BOARD_Y0 } from "../../../graphics/theme/Layout";
import { CELL_TYPE } from "../../rules/Constants";
import { generatePowerupCellType, generateSuperCellType } from "../../rules/RandomGeneration";

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
    this.x0 = props.x0;
    this.y0 = props.y0;
    this.x1 = props.x1;
    this.y1 = props.y1;

    // Similar to a lifetime-TTL loop, except each time it completes the Target's bounds grow,
    // making it harder to fill up. This can change
    this.placementsToPenalty = props.ticksToGrowth;
    this.penaltyCounter = this.placementsToPenalty;
    this.mainCell = this.generateCell(props.coreState);
    this.mainCell.setBaseColor(EMPTY_COLOR);
    this.activated = false;
    this.isFilled = false;
    this.isCleared = false;
    this.isGrowing = props.isGrowing ? true : false;

    this.timer = 0;
  }

  generateCell() {
    var type = generateSuperCellType();
    if (type == CELL_TYPE.GHOST) {
      return new GhostCell(this.coreState);
    } else if (type == CELL_TYPE.BOMB) {
      return new BombCell(this.coreState);
    } else if (type == CELL_TYPE.DRILL) {
      return new DrillCell(this.coreState);
    } else if (type == CELL_TYPE.TOWER) {
      return new TowerCell(this.coreState);
    }
  }

  activate() {
    this.activated = true;
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
  fallingUpdate() {}

  // To be called once each time the coreState updates; either the isFilled flag goes up or it continues to grow.
  // Currently, a Target only grows but others can be implemented to disappear or give the user power-ups upon being cleared.
  placementUpdate() {
    if (this.checkFill(this.coreState.board)) {
      this.isFilled = true;
    } else {
      this.penaltyCounter -= 1;
      if (this.penaltyCounter == 0) {
        this.penaltyCounter = this.placementsToPenalty;
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
  clear(coreState, board, emptyCellProvider) {
    for (var x = this.x0 - 1; x < this.x1 + 1; x++) {
      for (var y = this.y0 - 1; y < this.y1 + 1; y++) {
        if (inBounds(x, y)) {
          board[y][x] = emptyCellProvider.generateCell(coreState);
        }
      }
    }
    this.isCleared = true;
  }

  // Reset emptyCell meters when this cell is deleted to signify a failure
  markTargetArea(board) {
    for (var x = this.x0; x < this.x1; x++) {
      for (var y = this.y0; y < this.y1; y++) {
        if (inBounds(x, y) && board[y][x].type == 0) {
          board[y][x].meter = 0;
        }
      }
    }
  }

  // Extend the corners out by one cell.
  grow() {
    if (inBounds(this.x0 - 1, this.y0 - 1)) {
      this.x0 -= 1;
      this.y0 -= 1;
    }
    if (inBounds(this.x1 + 1, this.y1 + 1)) {
      this.x1 += 1;
      this.y1 += 1;
    }
  }

  render(canvas, cellWidth, cellHeight) {
    if (this.activated) {
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * cellWidth,
        BOARD_Y0 + this.y0 * cellHeight,
        (this.x1 - this.x0) * cellWidth,
        (this.y1 - this.y0) * cellHeight,
        BORDER_COLOR.getHex()
      );
      outlineRect(
        canvas,
        BOARD_X0 + (this.x0 - 1) * cellWidth,
        BOARD_Y0 + (this.y0 - 1) * cellHeight,
        (this.x1 - this.x0 + 2) * cellWidth,
        (this.y1 - this.y0 + 2) * cellHeight,
        MARKER_COLOR.getHex()
      );
      if (this.penaltyCounter <= 3) {
        this.renderWarning(canvas, cellWidth, cellHeight);
      }
      if (this.mainCell) {
        this.renderPowerup(canvas, cellWidth, cellHeight);
      }
    } else {
      outlineRect(
        canvas,
        BOARD_X0 + this.x0 * cellWidth,
        BOARD_Y0 + this.y0 * cellHeight,
        (this.x1 - this.x0) * cellWidth,
        (this.y1 - this.y0) * cellHeight,
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
  renderWarning(canvas, cellWidth, cellHeight) {
    outlineRect(
      canvas,
      BOARD_X0 + this.x0 * cellWidth - WARNING_BORDER_SIZE,
      BOARD_Y0 + this.y0 * cellHeight - WARNING_BORDER_SIZE,
      (this.x1 - this.x0) * cellWidth + 2 * WARNING_BORDER_SIZE,
      (this.y1 - this.y0) * cellHeight + 2 * WARNING_BORDER_SIZE,
      interpolateColor(
        MARKER_COLOR,
        FILLED_COLOR,
        sinusoid(
          this.penaltyCounter == 3
            ? WARNING_WAVE_3
            : this.penaltyCounter == 2
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
  renderPowerup(canvas, cellWidth, cellHeight) {
    var [x, y] = [
      BOARD_X0 + this.x0 * cellWidth,
      BOARD_Y0 + this.y0 * cellHeight,
    ];
    var [targetWidth, targetHeight] = [
      cellWidth * (this.x1 - this.x0),
      cellHeight * (this.y1 - this.y0),
    ];

    var borderColor = interpolateColor(
      EMPTY_COLOR,
      FILLED_COLOR,
      sinusoid(POWERUP_WAVE, this.timer),
      linInt
    );
    if (this.mainCell.type == CELL_TYPE.GHOST) {
      outlineRectOffset(
        canvas,
        x,
        y,
        targetWidth,
        targetHeight,
        borderColor.getHex(),
        POWERUP_OFFSET
      );
    } else if (this.mainCell.type == CELL_TYPE.BOMB) {
      var d = sinusoid(POWERUP_WAVE, this.timer);
      outlineRectOffset(
        canvas,
        x,
        y,
        targetWidth,
        targetHeight,
        borderColor.getHex(),
        d * POWERUP_OFFSET
      );
      outlineRectOffset(
        canvas,
        x,
        y,
        targetWidth,
        targetHeight,
        borderColor.getHex(),
        2 * d * POWERUP_OFFSET
      );
    } else if (this.mainCell.type == CELL_TYPE.DRILL) {
      var innerLength = (((this.timer * CLOCK_FREQ) % 1) * targetWidth) / 2;
      outlineRectOffset(
        canvas,
        x,
        y,
        targetWidth,
        targetHeight,
        FILLED_COLOR.getHex(),
        innerLength
      );
    } else if (this.mainCell.type == CELL_TYPE.TOWER) {
      var innerLength =
        ((1 - ((this.timer * CLOCK_FREQ) % 1)) * targetWidth) / 2;
      outlineRectOffset(
        canvas,
        x,
        y,
        targetWidth,
        targetHeight,
        FILLED_COLOR.getHex(),
        innerLength
      );
    }
  }
}
export default Target;
