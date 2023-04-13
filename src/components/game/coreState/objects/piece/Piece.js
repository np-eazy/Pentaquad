import Cell from "../cell/Cell";
import { randint, getPID } from "../../utils/Functions";
import { randomDxn } from "../../utils/Direction";
import { Color } from "../../../graphics/utils/Colors";

import { PRESETS, BASE_COLORS, CELL_TYPE } from "../../../Constants";
import EmptyCell from "../cell/EmptyCell";
import NormalCell from "../cell/NormalCell";
import GhostCell from "../cell/GhostCell";
import BombCell from "../cell/BombCell";
import DrillCell from "../cell/DrillCell";
import TowerCell from "../cell/TowerCell";


// Collision window radius to save on collision calculations
const CWR = 3;
const DEBUG = false;

// A single piece in the game, which can move in different directions and detect collisions
// based on which direction is moving.
class Piece {
  constructor(cellType = 2) {
    this.mounted = false;
    this.cx = undefined;
    this.cy = undefined;
    this.dxn = undefined;
    this.pidSize = undefined;
    
    var index = randint(0, PRESETS.length);
    if (DEBUG) {
      index = 0;
    }
    this.preset = PRESETS[index];
    this.baseColor = BASE_COLORS[index];
    
    if (cellType == CELL_TYPE.EMPTY) {
      this.mainCell = new EmptyCell();
    } else if (cellType == CELL_TYPE.NORMAL) {
      this.mainCell = new NormalCell();
    } else if (cellType == CELL_TYPE.GHOST) {
      this.mainCell = new GhostCell();
    } else if (cellType == CELL_TYPE.BOMB) {
      this.mainCell = new BombCell();
    } else if (cellType == CELL_TYPE.DRILL) {
      this.mainCell = new DrillCell();
    } else if (cellType == CELL_TYPE.TOWER) {
      this.mainCell = new TowerCell();
    }
    this.mainCell.dxn = this.dxn;
    this.mainCell.setBaseColor(this.baseColor);
  }

  // Before the piece is mounted to a global location, it shouldn't be used/updated.
  mountPiece({ center_x, center_y, direction, pidSize }) {
    this.mounted = true;
    this.cx = center_x;
    this.cy = center_y;
    this.dxn = direction;
    this.pidSize = pidSize;

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
  // back to the stage.
  unmountPiece() {
    this.mounted = false;
    this.cx = undefined;
    this.cy = undefined;
    this.dxn = undefined;
    this.pidSie = undefined;
  }

  // The function to fill the coreState with cells corresponding to this Piece; this will
  // be used for cases like the render script accessing the color in the parents
  createCell() {
    var cell = new Cell(1, { 
      parent: this,
      baseColor: this.baseColor,
     });
    return cell;
  }

  // Return whether or not the block has a collision with this angle.
  // Null angle option is for rotation collision check, only to make sure that the piece
  // doesn't rotate into any overlaps with filled cells.
  checkCollision(dxn, board, collisionSets) {
    var [xSize, ySize] = [board.length, board[0].length];

    var collisionDxn = dxn == null ? { dx: 0, dy: 0 } : dxn;
    var boundarySet =
      dxn == null ? new Set() : collisionSets.boundarySets[dxn.angle];
    var collision = false;

    // Check for a boundary collision
    this.cells.forEach((val) => {
      var globalPid = getPID(
        val[0] + this.cx + collisionDxn.dx,
        val[1] + this.cy + collisionDxn.dy,
        this.pidSize
      );
      if (!collision && boundarySet.has(globalPid)) {
        collision = true;
      }
    });
    if (collision == true) {
      return true;
    }

    if (this.mainCell.type != 2) {
      for (
        var y = Math.max(0, this.cy - CWR);
        y < Math.min(this.cy + CWR + 1, ySize);
        y++
      ) {
        for (
          var x = Math.max(0, this.cx - CWR);
          x < Math.min(this.cx + CWR + 1, xSize);
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
            if (!collision && this.cells.has(globalPid)) {
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
