import Piece from "../../coreObjects/Piece";
import { QUEUE_MAX_LENGTH } from "../../rules/Constants";
import { generateCellType } from "../../rules/RandomGeneration";

// A loading stage to provide Pieces for a CoreState and for the user to be
// able to see the next pieces, and also to hold/swap pieces.
class PieceProvider {
  constructor(props) {
    this.coreState = props.coreState;
    this.maxLength = props.maxLength ? props.maxLength : QUEUE_MAX_LENGTH;
    this.queue = [];
    this.palette = new Array(QUEUE_MAX_LENGTH).fill(null);
    this.locked = false;
    this.yOffset = 0;

    for (var i = 0; i < this.maxLength; i++) {
      this.queue.push(new Piece(generateCellType(1)));
    }
  }

  // To be called by CoreState when it needs another piece
  consumePiece(level = 1) {
    var piece = this.queue.shift();
    if (this.locked) {
      this.queue.unshift(piece);
    } else {
      if (this.queue.length < this.maxLength) {
        this.queue.push(new Piece(generateCellType(level)));
      }
    }
    this.yOffset += 120;
    return piece;
  }

  // To be called by CoreState when a piece is held
  holdPiece(piece, slotNumber) {
    if (this.palette[slotNumber] != null) {
      this.queue.unshift(this.palette[slotNumber]);
    }
    this.palette[slotNumber] = piece;
  }

  lock(piece) {
    for (var i = 0; i < QUEUE_MAX_LENGTH; i++) {
      this.queue.unshift(piece.copyDeactivated());
    }
  }
}
export default PieceProvider;
