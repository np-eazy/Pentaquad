import { Angle, Dxn } from "./utils/Direction";

import {
  PLACEMENT_COUNTDOWN,
  ROTATION_ADJUSTMENT_SIZE,
  CELL_TYPE,
} from "../Constants";

// Effectively an addendum to CoreState class since it got way too large. The following
// are all the actions that a user is capable of triggering in the CoreState.

// Move the current piece one cell in the given direction; rollback if not valid
export function executeMove(coreState, dxn) {
  if (
    coreState.currPiece.checkCollision(
      dxn,
      coreState.board,
      coreState.collisionSets
    )
  ) {
    while (
      coreState.currPiece.checkCollision(
        dxn,
        coreState.board,
        coreState.collisionSets
      )
    ) {
      coreState.currPiece.move(dxn.opposite());
    }
  }
  coreState.currPiece.move(dxn);
}
// Rotate the current piece in the given direction; rollback if not valid
export function executeRotate(coreState, angle) {
  coreState.currPiece.rotate(angle);
  if (
    coreState.currPiece.checkCollision(
      null,
      coreState.board,
      coreState.collisionSets
    )
  ) {
    var adjustment = 0;
    while (
      coreState.currPiece.checkCollision(
        null,
        coreState.board,
        coreState.collisionSets
      ) &&
      adjustment < ROTATION_ADJUSTMENT_SIZE
    ) {
      coreState.currPiece.move(coreState.gravity.opposite());
      adjustment += 1;
    }
    // Rollback if max rotation adjustment has been reached
    if (
      coreState.currPiece.checkCollision(
        null,
        coreState.board,
        coreState.collisionSets
      )
    ) {
      for (var i = 0; i < adjustment; i++) {
        coreState.currPiece.move(coreState.currPiece.dxn);
      }
      coreState.currPiece.rotate(-angle);
    }
  }
}
// Move the current piece as far towards the given position as possible before encountering other cells
export function executeMoveTo(coreState, x, y) {
  var moveAngle = coreState.gravity.isHorizontal()
    ? coreState.currPiece.cy < y
      ? Angle.DOWN
      : Angle.UP
    : coreState.currPiece.cx < x
    ? Angle.RIGHT
    : Angle.LEFT;
  var iterationsLeft = coreState.gravity.isHorizontal()
    ? Math.abs(coreState.currPiece.cy - y)
    : Math.abs(coreState.currPiece.cx - x);
  while (
    iterationsLeft > 0 &&
    !coreState.currPiece.checkCollision(
      Dxn[moveAngle],
      coreState.board,
      coreState.collisionSets
    )
  ) {
    coreState.currPiece.move(Dxn[moveAngle]);
    iterationsLeft -= 1;
  }
}
// Horizontally flip the current piece; rollback if not valid
export function executeFlip(coreState) {
  coreState.currPiece.flip();
  if (
    coreState.currPiece.checkCollision(
      null,
      coreState.board,
      coreState.collisionSets
    )
  ) {
    coreState.currPiece.flip();
  }
}
// Drop the current piece as far down as possible
export function executeDrop(coreState) {
  if (coreState.currPiece.mainCell.type == CELL_TYPE.TOWER) {
    coreState.placeTower(coreState.currPiece);
  } else if (coreState.currPiece.mainCell.type != CELL_TYPE.GHOST) {
    while (
      !coreState.currPiece.checkCollision(
        coreState.gravity,
        coreState.board,
        coreState.collisionSets
      )
    ) {
      coreState.currPiece.move(coreState.gravity);
    }
  }
  coreState.collisionTimer = PLACEMENT_COUNTDOWN;
  coreState.timer = -1;
  coreState.placeBlock = true;
}
// Unconditionally place the current piece where it is
export function executePlace(coreState) {
  coreState.collisionTimer = PLACEMENT_COUNTDOWN;
  coreState.placeBlock = true;
}
// Unmount the current piece into the holding slot on PieceProvider
export function executeHold(coreState, slotNumber) {
  coreState.currPiece.unmountPiece();
  coreState.pieceProvider.holdPiece(coreState.currPiece, slotNumber);
  coreState.currPiece = null;
  coreState.placeBlock = true;
}
// Lock the current piece for the next 5 moves
export function executeLock(coreState) {
  coreState.pieceProvider.lock(coreState.currPiece);
}
