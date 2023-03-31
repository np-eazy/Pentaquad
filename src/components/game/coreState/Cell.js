// A container for properties of a grid cell. GameState initializes with a 2D array
// of empty Cells of type 0 and no props.

// Type 0: Empty cells

// Type 1: Filled cells with a parent Piece

// Use this as a base to add more functionalities and features to the game.
class Cell {
    constructor(type, props) {
        this.type = type
        this.props = props
    }
}

export default Cell
