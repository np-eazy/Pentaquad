import EmptyCell from "./cell/EmptyCell";
import NormalCell from "./cell/NormalCell";
import GhostCell from "./cell/GhostCell";
import BombCell from "./cell/BombCell";
import DrillCell from "./cell/DrillCell";
import TowerCell from "./cell/TowerCell";

import BombIndicator from "./cell/indicator/BombIndicator";


import { PRESETS, CELL_TYPE, DEBUG } from "../rules/Constants";
import { BASE_COLORS, FILLED_COLOR, THEME_RED } from "../../graphics/theme/ColorScheme";
import { randomDxn } from "../coreState/utils/Direction";
import { randint, getPID } from "../coreState/utils/Functions";

import { COLLISION_RADIUS } from "../coreState/utils/Params";

// A single piece in the game, which can move in different directions and detect collisions
// based on which direction is moving.
class Piece {
  constructor(cellType, coreState) {
    this.coreState = coreState;
    this.activated = false;
    this.cx = 0;
    this.cy = 0;
    this.dxn = undefined;
    this.pidSize = undefined;
    this.graphicCell = null;

    var index = randint(0, PRESETS.length);
    if (DEBUG) {
      index = 0;
    }
    this.shapeIndex = index;
    this.preset = PRESETS[index];
    this.baseColor = BASE_COLORS[index];

    if (cellType == CELL_TYPE.EMPTY) {
      this.mainCell = new EmptyCell(coreState);
    } else if (cellType == CELL_TYPE.NORMAL) {
      this.mainCell = new NormalCell(coreState);
    } else if (cellType == CELL_TYPE.GHOST) {
      this.mainCell = new GhostCell(coreState);
    } else if (cellType == CELL_TYPE.BOMB) {
      this.mainCell = new BombCell(coreState);   
      this.graphicCell = new BombIndicator(coreState);
      this.graphicCell.setBaseColor(THEME_RED);
    } else if (cellType == CELL_TYPE.DRILL) {
      this.mainCell = new DrillCell(coreState);
    } else if (cellType == CELL_TYPE.TOWER) {
      this.mainCell = new TowerCell(coreState);
    }
    this.mainCell.setBaseColor(this.baseColor);
  }

  upgradeTo(newCell) {
    const tempColor = this.mainCell.baseColor;
    this.mainCell = newCell;
    newCell.setBaseColor(tempColor);
    if (this.mainCell.type == CELL_TYPE.DRILL) {
      this.graphicCell.setBaseColor(THEME_RED);
    } else if (this.mainCell.type == CELL_TYPE.TOWER) {
      this.graphicCell.setBaseColor(FILLED_COLOR);
    }
  }

  copyDeactivated() {
    var copy = new Piece(this.mainCell.type, this.coreState);
    copy.shapeIndex = this.shapeIndex;
    copy.preset = this.preset;
    copy.baseColor = this.baseColor;
    copy.dxn = this.dxn;
    copy.mainCell.setBaseColor(this.baseColor);
    copy.graphicCell = this.graphicCell;
    return copy;
  }

  // Before the piece is activated to a global location, it shouldn't be used/updated.
  activatePiece({ center_x, center_y, direction, pidSize, ttl }) {
    this.activated = true;
    this.cx = center_x;
    this.cy = center_y;
    this.dxn = direction;
    this.mainCell.dxn = this.dxn;
    this.pidSize = pidSize;
    this.mainCell.setTTL(ttl);

    this.cells = new Map();
    for (var [x, y] of this.preset) {
      this.cells.set(getPID(x, y, pidSize), [x, y]);
    }
    this.rotate(randomDxn());
    if (randint(0, 2) == 1) {
      this.flip();
    }
  }

  // Just for formality/convention, we do this each time we move something from the game
  // back to the provider.
  deactivatePiece() {
    this.activated = false;
    this.cx = 0;
    this.cy = 0;
    this.dxn = undefined;
    this.pidSie = undefined;
  }

  // The function to fill the coreState with cells corresponding to this Piece; this will
  // be used for cases like the render script accessing the color in the parents
  createCell(coreState) {
    var cell = new NormalCell(coreState);
    cell.getAttributesFrom(this.mainCell);
    return cell;
  }

  // Return whether or not the block has a collision with this angle.
  // Null angle option is for rotation collision check, only to make sure that the piece
  // doesn't rotate into any overlaps with filled cells.
  checkCollision(dxn, board, collisionSets, fallingDxn) {
    var [xSize, ySize] = [board.length, board[0].length];

    var collisionDxn = dxn == null ? { dx: 0, dy: 0 } : dxn;
    
    var collision = false;
    const checkBoundarySet = (boundarySet) => {
      var collision = false;
      // Check for a boundary collision
      this.cells.forEach((val) => {
        var globalPid = getPID(
          val[0] + this.cx + collisionDxn.dx,
          val[1] + this.cy + collisionDxn.dy,
          this.pidSize
        );
        if (!collision && boundarySet && boundarySet.has(globalPid)) {
          collision = true;
        }
      });
      return collision;
    }

    var groundSet = dxn == null ? new Set() : collisionSets.boundarySets[dxn.angle];
    
    if (checkBoundarySet(groundSet) == true) {
      return true;
    } else if (fallingDxn) { // If a 4th arg is passed, we are doing a more careful check for rotations. 
      var wallSetLeft = collisionSets.boundarySets[(fallingDxn.angle + 1) % 4]
      var wallSetRight = collisionSets.boundarySets[(fallingDxn.angle + 3) % 4]
      if (checkBoundarySet(wallSetLeft) || checkBoundarySet(wallSetRight)) {
        return true;
      }
    }

    if (this.mainCell.type != CELL_TYPE.GHOST) {
      for (
        var y = Math.max(0, this.cy - COLLISION_RADIUS);
        y < Math.min(this.cy + COLLISION_RADIUS + 1, ySize);
        y++
      ) {
        for (
          var x = Math.max(0, this.cx - COLLISION_RADIUS);
          x < Math.min(this.cx + COLLISION_RADIUS + 1, xSize);
          x++
        ) {
          if (board[y][x].type > 0) {
            // x, y generate global PIDs
            // Subtract cx and cy from PIDs to localize
            var globalPid = getPID(
              x - this.cx - collisionDxn.dx,
              y - this.cy - collisionDxn.dy,
              this.pidSize
            );
            if (!collision && this.cells && this.cells.has(globalPid)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  // Move this piece based on a given x and y direction and recheck its appropriate hitbox
  move(dxn) {
    this.cx += dxn.dx;
    this.cy += dxn.dy;
  }

  rotate(angle) {
    if (angle < 0) {
      this.signedRotate(angle, -1);
    } else {
      this.signedRotate(angle, 1);
    }
  }

  signedRotate(turns, sign) {
    for (var t = 0; t < (sign * turns) % 4; t++) {
      var newCells = new Map();
      this.cells.forEach((val) => {
        var [newX, newY] = [val[1] * sign, -val[0] * sign];
        var pid = getPID(newX, newY, this.pidSize);
        newCells.set(pid, [newX, newY]);
      });
      this.cells = newCells;
    }
  }

  flip() {
    var newCells = new Map();
    this.cells.forEach((val) => {
      var [newX, newY] = [val[0], -val[1]];
      var pid = getPID(newX, newY, this.pidSize);
      newCells.set(pid, [newX, newY]);
    });
    this.cells = newCells;
  }
}

export default Piece;
