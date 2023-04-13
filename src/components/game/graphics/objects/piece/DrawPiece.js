export const drawPiece = (canvas, piece, xCellSize, yCellSize) => {
    // Fill in cells from the coreState current piece.
    var [x, y] = [0, 0];
    // TODO: Improve
    if (piece) {
        var mainCell = piece.mainCell;
        if (piece != null) {
            for (const cell of piece.cells) {
                [x, y] = [cell[1][0] + piece.cx, cell[1][1] + piece.cy];
                mainCell.render(
                    canvas,
                    x * xCellSize,
                    y * yCellSize,
                    xCellSize,
                    yCellSize,
                );
            }
        }
    }
}