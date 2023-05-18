import { Angle, Direction, Dxn } from "../coreState/utils/Direction";
import { placeTower } from "../coreState/Placement";
import {
  PLACEMENT_COUNTDOWN,
  ROTATION_ADJUSTMENT_SIZE,
  CELL_TYPE,
} from "../rules/Constants";
import { AudioEvents } from "../../audio/AudioEventController";

// Different types of GameAction, with each different type telling us how the action props should be handled.
export const ActionType = {
  MOVE: 0,
  ROTATE: 1,
  MOVE_TO: 2,
  FLIP: 3,
  DROP: 4,
  PLACE: 5,
  HOLD: 6,
  LOCK: 7,
};

// A wrapper class whose instances are generated by keydown user input events
export class GameAction {
  constructor(type, props) {
    this.type = type;
    this.props = props;
  }
}

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
      coreState.collisionSets,
      coreState.gravity,
    ) // Normal rotation causes collision
  ) {
    // Passing in direction is equivalent to shifting the piece and checking normal collision,
    // loop through these from right direction counterclockwise and take the first one.
    var wallKick = false;
    for (var i = 0; i < 4; i++) {
      if (!coreState.currPiece.checkCollision( // If no collision, move the piece in that direction
        Dxn[i],
        coreState.board,
        coreState.collisionSets,
        coreState.gravity,
      )) {
        wallKick = true;
        coreState.currPiece.move(Dxn[i]);
        break;
      }
    }
    if (!wallKick) {
      coreState.currPiece.rotate(-angle);
    }
  }
}
// Move the current piece as far towards the given position as possible before encountering other cells
export function executeMoveTo(coreState, x, y, audioController) {
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
  var moved = false;
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
    moved = true;
  }
  if (moved) audioController.queueAudioEvent(AudioEvents.MOVE, {});
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
    placeTower(coreState, coreState.currPiece);
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
  coreState.readyToPlace = true;
}
// Unconditionally place the current piece where it is
export function executePlace(coreState) {
  coreState.collisionTimer = PLACEMENT_COUNTDOWN;
  coreState.readyToPlace = true;
}
// Deactivate the current piece into the holding slot on PieceProvider
export function executeHold(coreState, slotNumber) {
  if (coreState.currPiece) {
    coreState.currPiece.deactivatePiece();
    coreState.pieceProvider.holdPiece(coreState.currPiece, slotNumber);
    coreState.currPiece = null;
    coreState.readyToPlace = true;
  }
}
// Lock the current piece for the next 5 moves
export function executeLock(coreState) {
  coreState.pieceProvider.lock(coreState.currPiece);
}
