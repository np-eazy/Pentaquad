import Piece from "./Piece"

const DEFAULT_MAX_LENGTH = 4

// A loading stage to provide Pieces for a CoreState and for the user to be
// able to see the next pieces, and also to hold/swap pieces.
class PieceStage {
    constructor(props) {
        this.coreState = props.coreState
        this.maxLength = props.maxLength ? props.maxLength : DEFAULT_MAX_LENGTH
        this.nextPieces = []
        this.heldPiece = null
        for (var i = 0; i < props.maxLength; i++) {
            this.nextPieces.push(new Piece())
        }
    }

    // To be called by CoreState when it needs another piece
    consumePiece() {
        var piece = this.nextPieces.shift()
        if (this.nextPieces.length < this.maxLength) {
            this.nextPieces.push(new Piece())
        }
        return piece
    }

    // To be called by CoreState when a piece is held 
    holdPiece(piece) {
        if (this.heldPiece != null) {
            this.nextPieces.unshift(this.heldPiece)
        }
        this.heldPiece = piece
    }
}
export default PieceStage