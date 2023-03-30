const DEFAULT_TICKS_TO_GROWTH = 4

// The primary objective of this game is not to fill up lines but to fill up rectangle-shaped TargetBlocks,
// which grow over time and end the game once they exceed the bounds of the board. 
class TargetBlock {
    constructor(props) {
        [this.x0, this.y0, this.x1, this.y1] = [props.x0, props.y0, props.x1, props.y1]
        this.coreState = props.coreState
        this.boardSize = props.coreState.boardSize
        this.ticksToGrowth = props.ticksToGrowth ? props.ticksToGrowth : DEFAULT_TICKS_TO_GROWTH
        this.ticksLeft = this.ticksToGrowth
        this.isGameOver = false
        this.isFilled = false
        this.isCleared = false
    }

    // To be called once each time the coreState updates; either the isFilled flag goes up or it continues to grow.
    update() {
        if (this.checkFill(this.coreState.board)) {
            this.isFilled = true
        } else if (!this.isGameOver) {
            this.ticksLeft -= 1
            if (this.ticksLeft == 0) {
                this.ticksLeft = this.ticksToGrowth
                this.grow()
            }
        }
    }
    
    // Extend the corners out by one cell. If any corner leaves the bounds of the game's board, GameOver flag goes up.
    grow() {
        // Right now for testing purposes this is disabled.
        // this.x0 -= 1
        // this.y0 -= 1
        // this.x1 += 1
        // this.y1 += 1

        // if (this.x0 < 0 || this.y0 < 0 || this.x1 >= this.boardSize || this.y1 >= this.boardSize) {
        //     this.isGameOver = true
        // }
    }

    // Check that every spot covered by this TargetBlock is "filled" with a Cell of type > 0, signifying that 
    // it is not empty
    checkFill(board) {
        for (var x = this.x0; x < this.x1; x++) {
            for (var y = this.y0; y < this.y1; y++) {
                if (board[y][x].type < 1) {
                    return false
                }
            }
        }
        return true
    }

    // Clear the cells this TargetBlock covers and set its cleared flag to True
    // TODO: Is it better to have this method in CoreState or TargetBlock?
    clear(board, fillCell) {
        for (var x = this.x0; x < this.x1; x++) {
            for (var y = this.y0; y < this.y1; y++) {
                board[y][x] = fillCell()
            }
        }
        this.isCleared = true
    }
}
export default TargetBlock
