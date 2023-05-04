import EmptyCell from "../coreObjects/cell/EmptyCell";
import NormalCell from "../coreObjects/cell/NormalCell";
import { callOnDropzone } from "./utils/Dropzone";
import { inBounds } from "./utils/Functions";

import { BOARD_SIZE, BOMB_RADIUS, CELL_TYPE } from "../rules/Constants";
import { Sound } from "../../audio/AudioController";

// increment times to live for each cell before converting to empty cell
export function cellPlacementUpdate(coreState) {
  for (var y = 0; y < BOARD_SIZE; y++) {
    for (var x = 0; x < BOARD_SIZE; x++) {
      var cell = coreState.board[y][x];
      if (cell.ttl != -1) {
        if (cell.ttl == 0) {
          var newCell = coreState.emptyCellProvider.newCell();
          newCell.getAttributesFrom(coreState.board[y][x]);
          coreState.board[y][x] = newCell;
        } else {
          cell.placementUpdate(true);
        }
      }
    }
  }
}

// Change the CoreState's grid values based on where the current piece is.
export function place(coreState, piece) {
  if (piece != null) {
    if (piece.mainCell.type == CELL_TYPE.BOMB) {
      placeBomb(coreState, piece);
    } else if (piece.mainCell.type == CELL_TYPE.DRILL) {
      placeDrill(coreState, piece);
    } else {
      placeNormal(coreState, piece);
    }
  }
  coreState.readyToPlace = false;
}

// Place a normal piece
export function placeNormal(coreState, piece) {
  var [x, y] = [0, 0];
  for (const [pid, [x_, y_]] of piece.cells) {
    [x, y] = [x_ + coreState.currPiece.cx, y_ + coreState.currPiece.cy];
    if (inBounds(x, y)) {
      var newCell = new NormalCell();
      newCell.getAttributesFrom(piece.mainCell);
      newCell.lightUp(piece.mainCell.baseColor);
      coreState.board[y][x] = newCell;
    }
  }
}

// Place a bomb and remove a square of length 2 * BOMB_RADIUS + 1
export function placeBomb(coreState, piece) {
  coreState.audioController.queueSound(Sound.PLACE_BOMB)
  for (
    var y = Math.max(0, piece.cy - BOMB_RADIUS);
    y < Math.min(BOARD_SIZE, piece.cy + BOMB_RADIUS + 1);
    y++
  ) {
    for (
      var x = Math.max(0, piece.cx - BOMB_RADIUS);
      x < Math.min(BOARD_SIZE, piece.cx + BOMB_RADIUS + 1);
      x++
    ) {
      coreState.board[y][x] = coreState.emptyCellProvider.newCell();
    }
  }
}

// Remove all blocks in the current piece's path.
export function placeDrill(coreState, piece) {
  coreState.audioController.queueSound(Sound.PLACE_DRILL)
  callOnDropzone(
    coreState.board,
    piece,
    coreState.gravity,
    (x, y) => {
      var newCell = new EmptyCell();
      newCell.getAttributesFrom(coreState.board[y][x]);
      newCell.meter = 1;
      coreState.board[y][x] = newCell;
    },
    true
  );
}

export function placeTower(coreState, piece) {
  coreState.audioController.queueSound(Sound.TOWER)
  callOnDropzone(
    coreState.board,
    piece,
    coreState.gravity,
    (x, y) => {
      coreState.board[y][x] = piece.createCell();
      coreState.board[y][x].getAttributesFrom(piece.mainCell);
      coreState.board[y][x].lightColor.add(piece.mainCell.baseColor);
    },
    false
  );
}
