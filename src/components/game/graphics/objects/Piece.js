export const drawPiece = (canvas, piece, x0, y0, xCellSize, yCellSize) => {
    // Fill in cells from the coreState current piece.
    var [x, y] = [0, 0];
    // TODO: Improve
    if (piece) {
        var mainCell = piece.mainCell;
        if (piece.cells) {
            for (const [pid, [x_, y_]] of piece.cells) {
                [x, y] = [x_ + piece.cx, y_ + piece.cy];
                mainCell.render(
                    canvas,
                    x0 + x * xCellSize,
                    y0 + y * yCellSize,
                    xCellSize,
                    yCellSize,
                );
            }
        } else if (piece.preset) {
            for (const [x_, y_] of piece.preset) {
                mainCell.render(
                    canvas,
                    x0 + x_ * xCellSize,
                    y0 + y_ * yCellSize,
                    xCellSize,
                    yCellSize,
                );
            }
        }
    }
}


export const updatePiece = (piece) => {
    // Fill in cells from the coreState current piece.
    var [x, y] = [0, 0];
    // TODO: Improve
    if (piece) {
        var mainCell = piece.mainCell;
        mainCell.idleUpdate();
    }
}