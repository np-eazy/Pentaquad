export const drawPiece = (canvas, piece, x0, y0, xCellSize, yCellSize) => {
    // Fill in cells from the coreState current piece.
    var [x, y] = [0, 0];
    // TODO: Improve
    if (piece) {
        var mainCell = piece.mainCell;
        if (piece.cells) {
            for (const cell of piece.cells) {
                [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy];
                mainCell.render(
                    canvas,
                    x0 + x * xCellSize,
                    y0 + y * yCellSize,
                    xCellSize,
                    yCellSize,
                );
            }
        } else if (piece.preset) {
            for (const cell of piece.preset) {
                [x, y] = [cell[0], cell[1]];
                mainCell.render(
                    canvas,
                    x0 + x * xCellSize,
                    y0 + y * yCellSize,
                    xCellSize,
                    yCellSize,
                );
            }
        }
        
    }
}