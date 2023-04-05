// UpdateCell refers to the graphical state of the cell, which is
// a level above the CoreState of the game. The graphical state of the
// cell doesn't have any impact on the CoreState, but is effectively its
// own control system for each cell.

// This cell's t parameter always decays back down to 0, and is changed in the
// other direction only by GameState in order to light up blocks and have
// them fade. DrawCell, UpdateCell, and the correct props are the main parts
// that make these kinds of graphics, and much more, possible.
const updateEmptyCell = (cell) => {
  if (cell.props.t) {
    cell.props.t = cell.props.t * 0.9;
  }
};

const updateEmptyCellType1 = (cell) => {};

// The main function to export
export const updateCell = (cell) => {
  if (cell.type == 0) {
    updateEmptyCell(cell);
  } else if (cell.type == 1) {
    updateEmptyCellType1(cell);
  }
};
