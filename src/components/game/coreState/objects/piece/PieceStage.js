import Piece from "./Piece";
import { PIECE_STAGE_MAX_LENGTH } from "../../../Constants";
import { randint } from "../../utils/Functions";

// A loading stage to provide Pieces for a CoreState and for the user to be
// able to see the next pieces, and also to hold/swap pieces.
class PieceStage {
  constructor(props) {
    this.coreState = props.coreState;
    this.maxLength = props.maxLength ? props.maxLength : PIECE_STAGE_MAX_LENGTH;
    this.nextPieces = [];
    this.heldPiece = null;
    for (var i = 0; i < this.maxLength; i++) {
      this.nextPieces.push(new Piece(this.createType()));
    }
  }

  createType() {
    if (randint(0, 10) == 0) {
      return 2;
    } else {
      return 1;
    }
  }

  // To be called by CoreState when it needs another piece
  consumePiece() {
    var piece = this.nextPieces.shift();
    if (this.nextPieces.length < this.maxLength) {
      this.nextPieces.push(new Piece(this.createType()));
    }
    return piece;
  }

  // To be called by CoreState when a piece is held
  holdPiece(piece) {
    if (this.heldPiece != null) {
      this.nextPieces.unshift(this.heldPiece);
    }
    this.heldPiece = piece;
  }
}
export default PieceStage;
