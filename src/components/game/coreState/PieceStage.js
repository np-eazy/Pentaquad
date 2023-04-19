import Piece from "./Piece";
import { PIECE_STAGE_MAX_LENGTH } from "../Constants";
import { generateCellType } from "./RandomGeneration";

// A loading stage to provide Pieces for a CoreState and for the user to be
// able to see the next pieces, and also to hold/swap pieces.
class PieceStage {
  constructor(props) {
    this.coreState = props.coreState;
    this.maxLength = props.maxLength ? props.maxLength : PIECE_STAGE_MAX_LENGTH;
    this.nextPieces = [];
    this.palette = new Array(PIECE_STAGE_MAX_LENGTH).fill(null);
    this.locked = false;

    for (var i = 0; i < this.maxLength; i++) {
      this.nextPieces.push(new Piece(generateCellType()));
    }
  }

  // To be called by CoreState when it needs another piece
  consumePiece() {
    var piece = this.nextPieces.shift();
    if (this.locked) {
      this.nextPieces.unshift(piece);
    } else {
      if (this.nextPieces.length < this.maxLength) {
        this.nextPieces.push(new Piece(generateCellType()));
      }
    }
    return piece;
  }

  // To be called by CoreState when a piece is held
  holdPiece(piece, slotNumber) {
    if (this.palette[slotNumber] != null) {
      this.nextPieces.unshift(this.palette[slotNumber]);
    }
    this.palette[slotNumber] = piece;
  }

  lock(piece) {
    for (var i = 0; i < PIECE_STAGE_MAX_LENGTH; i++) {
      this.nextPieces.unshift(piece.copyUnmounted());
    }
  }
}
export default PieceStage;
