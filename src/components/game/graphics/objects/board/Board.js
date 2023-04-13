export const renderBoard = (canvas, board, xCellSize, yCellSize) => {
// Draw grid cells
  var [xSize, ySize] = [board[0].length, board.length];
    for (var y = 0; y < ySize; y++) {
      for (var x = 0; x < xSize; x++) {
        board[y][x].render(
          canvas, 
          x * xCellSize,
          y * yCellSize,
          xCellSize,
          yCellSize,
        );
      }
    }
}

export const updateBoard = (board) => {
    // Update grid cells
    var [xSize, ySize] = [board[0].length, board.length];
    for (var y = 0; y < ySize; y++) {
      for (var x = 0; x < xSize; x++) {
        board[y][x].idleUpdate();
      }
    }
}

